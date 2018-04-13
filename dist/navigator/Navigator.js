"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var jquery_1 = require("../jquery");
var di_1 = require("../di");
var page_1 = require("../page");
var utils_1 = require("../utils");
var Navigator = /** @class */ (function () {
    /**
     * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
     * @param {JQueryStatic}                _$
     * @param {PageManager}                 _PageManager
     * @param {EventEmitterFactory}         _EventEmitterFactory
     */
    function Navigator(_$, _PageManager, _EventEmitterFactory) {
        this._$ = _$;
        this._PageManager = _PageManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._development = false;
    }
    Navigator_1 = Navigator;
    Navigator.prototype.getProgressPercentage = function () {
        return parseFloat(((this._PageManager.getCompleted().length * 100) / this._PageManager.count()).toFixed(2));
    };
    Navigator.prototype.activate = function ($context) {
        this._$context = $context;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    };
    Navigator.prototype.enableDev = function () {
        this._development = true;
    };
    Navigator.prototype.disableDev = function () {
        this._development = false;
    };
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.goTo = function (index) {
        if (this.isDisabled() !== true && (!this._currentRenderProcess || this._currentRenderProcess.state() !== "pending")) {
            //get the page requested
            var newPage = this._PageManager.getPage(index);
            //the page must be provided and different of the current page
            if (newPage) {
                if (newPage !== this._currentPage) {
                    var currentPage = this.getCurrentPage(), //get current page and index
                    currentPageIndex = this.getCurrentPageIndex(), previousPageForTarget = this._PageManager.getPage(index - 1), currentPageIs = currentPageIndex - index < 0
                        ? -1
                        : 1; //check the position of the old page relative to the new page
                    //check if resources are completed to go to the next page
                    if (this._development === true || (currentPageIs === 1 || (previousPageForTarget == undefined || previousPageForTarget.isCompleted()))) {
                        this._currentRenderProcess = this._$.Deferred();
                        this._currentPage = newPage; //set new page as current
                        this._currentPageIndex = index;
                        var newPageName = newPage.getPageName(), //get name of new controller
                        newPageData = {
                            index: index,
                            name: newPageName,
                            state: newPage.getState()
                        }, currentPageData = void 0;
                        if (currentPage) {
                            currentPageData = {
                                index: currentPageIndex,
                                name: currentPage.getPageName(),
                                state: currentPage.getState()
                            };
                        }
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                        var currentPageElement = currentPage
                            ? currentPage.getController().getElement()
                            : null, //get current element
                        newPageController = newPage.getController(), //create a controller for new page
                        newPageElement = newPage.render(); //get the rendered element
                        //if the new page is before to the current page
                        if (currentPageIndex === -1) {
                            this._$context.prepend(newPageElement);
                        }
                        else { //if the new page is after the current page
                            this._$context.append(newPageElement);
                        }
                        //initialize resources and trigger rendered event
                        newPage.postRender();
                        this._$context.removeAttr(Navigator_1.ATTR_CURRENT);
                        this._$context.attr(Navigator_1.ATTR_TRANSITION_TO, newPageName);
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                        //request animations
                        var showPromise = newPageController.show(currentPageElement, currentPageIs);
                        //if the function returns a promise
                        if (typeof showPromise.then === "function") {
                            showPromise.then(this._onPageShowEnd.bind(this, newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess));
                        }
                        else { //otherwise, execute immediately
                            this._onPageShowEnd(newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess);
                        }
                        return this._currentRenderProcess;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                //todo throw
            }
        }
        return false;
    };
    /**
     * Devuelve el estado actual de deshabilitado
     * @returns {boolean}
     */
    Navigator.prototype.isDisabled = function () {
        return this._disabled;
    };
    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    Navigator.prototype.setDisabled = function (disabled) {
        if (this._disabled !== disabled) {
            this._disabled = disabled;
            if (disabled) {
                this._eventEmitter.trigger(Navigator_1.ON_ENABLE);
            }
            else {
                this._eventEmitter.trigger(Navigator_1.ON_DISABLE);
            }
        }
    };
    /**
     * Habilita la navegación
     */
    Navigator.prototype.enable = function () {
        this.setDisabled(false);
    };
    /**
     * Deshabilita la navegación
     */
    Navigator.prototype.disable = function () {
        this.setDisabled(true);
    };
    /**
     * Retrocede a la página posterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.next = function () {
        var numPages = this._PageManager.count(), currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex < numPages - 1) {
            return this.goTo(currentPageIndex + 1);
        }
        else {
            return false;
        }
    };
    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.prev = function () {
        var currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex > 0) {
            return this.goTo(currentPageIndex - 1);
        }
        else {
            return false;
        }
    };
    /**
     * Invocado al finalizarse la animación del cambio de página
     * @param {PageImplementation}      newPage     Página activada
     * @param {INavigatorPageData}      newPageData Datos de la página activada
     * @param {PageImplementation}      oldPage     Página desactivada
     * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
     * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
     * @private
     */
    Navigator.prototype._onPageShowEnd = function (newPage, newPageData, oldPage, oldPageData, defer) {
        if (oldPage) {
            var controller = oldPage.getController();
            oldPage.detach();
            controller.getElement().remove();
        }
        this._$context.removeAttr(Navigator_1.ATTR_TRANSITION_TO);
        this._$context.attr(Navigator_1.ATTR_CURRENT, newPageData.name);
        if (newPage.isCompleted()) {
            this.enable();
        }
        //trigger event in navigator
        this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        //trigger a global event that could be listened by anyone
        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        defer.resolve(newPageData, oldPageData);
    };
    /**
     * Obtiene el índice de la página actual
     * @returns {number}
     */
    Navigator.prototype.getCurrentPageIndex = function () {
        return this._currentPageIndex;
    };
    /**
     * Obtiene la implementación de página actual
     * @returns {PageImplementation}
     */
    Navigator.prototype.getCurrentPage = function () {
        return this._currentPage;
    };
    /**
     * Devuelve los datos de la página actual
     * @returns {INavigatorPageData}
     */
    Navigator.prototype.getCurrentPageData = function () {
        return {
            index: this._currentPageIndex,
            name: this._currentPage.getPageName(),
            state: this._currentPage.getState()
        };
    };
    /**
     * @see EventEmitter#on
     * @returns {Navigator}
     */
    Navigator.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events, data, handler);
        return this;
    };
    /**
     * @see EventEmitter#one
     * @returns {Navigator}
     */
    Navigator.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events, data, handler);
        return this;
    };
    /**
     * @see EventEmitter#off
     * @returns {Navigator}
     */
    Navigator.prototype.off = function (events, handler) {
        this._eventEmitter.off(events, handler);
        return this;
    };
    Navigator.NAMESPACE = "navigator";
    Navigator.ON_DRAW_PAGE = Navigator_1.NAMESPACE + ":draw";
    Navigator.ON_DISABLE = Navigator_1.NAMESPACE + ":disable";
    Navigator.ON_ENABLE = Navigator_1.NAMESPACE + ":enable";
    Navigator.ON_CHANGE_PAGE_END = Navigator_1.NAMESPACE + ":changeend";
    Navigator.ON_CHANGE_PAGE_START = Navigator_1.NAMESPACE + ":changestart";
    Navigator.ATTR_TRANSITION_TO = "data-hz-navigator-transition-to";
    Navigator.ATTR_CURRENT = "data-hz-navigator-page";
    Navigator = Navigator_1 = __decorate([
        di_1.Core({
            name: "Navigator",
            public: true,
            dependencies: [
                jquery_1.$,
                page_1.PageManager,
                utils_1.EventEmitterFactory
            ]
        })
    ], Navigator);
    return Navigator;
    var Navigator_1;
}());
exports.Navigator = Navigator;
//# sourceMappingURL=Navigator.js.map