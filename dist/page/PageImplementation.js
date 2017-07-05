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
var di_1 = require("../di");
var di_2 = require("../di");
var jquery_1 = require("../jquery");
var resource_1 = require("../resource");
var PageImplementation = (function () {
    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    function PageImplementation(_$, _ResourceManager, _Injector) {
        this._$ = _$;
        this._ResourceManager = _ResourceManager;
        this._Injector = _Injector;
        this.store = {
            public: {},
            private: {}
        };
        this._state = { completed: false, visited: false, score: null };
    }
    /**
     * Configura la clase nada más instanciarla
     * @param {PageRegister}    page    Página registrada en el PageManager.
     */
    PageImplementation.prototype.activate = function (page) {
        this._resources = page.getResources();
        this._page = page;
    };
    /**
     * Obtiene el PageRegister asociado
     * @returns {PageRegister}
     */
    PageImplementation.prototype.getPage = function () {
        return this._page;
    };
    /**
     * Obtiene el estado actual
     * @returns {IPageState}
     */
    PageImplementation.prototype.getState = function () {
        return this._state;
    };
    /**
     * Obtiene si la página ha sido visitada
     * @returns {boolean}
     */
    PageImplementation.prototype.isVisited = function () {
        return this._state.visited;
    };
    /**
     * Obtiene si la página ha sido completada
     * @returns {boolean}
     */
    PageImplementation.prototype.isCompleted = function () {
        return this._state.completed;
    };
    /**
     * Actualiza el estado
     * @param {IPageState}  state       Estado a establecer
     */
    PageImplementation.prototype.setState = function (state) {
        this._state = state;
    };
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    PageImplementation.prototype.getPageName = function () {
        return this._page.getName();
    };
    /**
     * Obtiene una instancia del controlador.
     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
     * @returns {PageController}
     * @see PageController
     */
    PageImplementation.prototype.getController = function () {
        if (!this._currentController) {
            var pageOptions = this._page._options;
            if (!this._controllerFactory) {
                this._controllerFactory = this._Injector.get(pageOptions.controller);
            }
            var controller = this._controllerFactory.instance();
            controller.activate(pageOptions, this._page._eventEmitter, this._state, this.store);
            this._currentController = controller;
        }
        return this._currentController;
    };
    PageImplementation.prototype.render = function () {
        if (this._currentController && !this._currentController.getElement()) {
            return this._currentController.render();
        }
    };
    PageImplementation.prototype.postRender = function () {
        if (this._currentController) {
            this._currentController._postRender();
        }
    };
    PageImplementation.prototype.getElement = function () {
        if (this._currentController) {
            return this._currentController.getElement();
        }
    };
    /**
     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
     */
    PageImplementation.prototype.detach = function () {
        this._currentController._destroy();
        this._currentController = null;
    };
    /**
     * Desecha la instancia del controlador actual
     */
    PageImplementation.prototype.stop = function () {
        this._currentController = null;
        return this;
    };
    PageImplementation = __decorate([
        di_1.Core({
            name: "PageImplementation",
            dependencies: [
                jquery_1.$,
                resource_1.ResourceManager,
                di_2.InjectorService
            ],
            instantiable: true
        })
    ], PageImplementation);
    return PageImplementation;
}());
exports.PageImplementation = PageImplementation;
//# sourceMappingURL=PageImplementation.js.map