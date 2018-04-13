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
var jquery_1 = require("../jquery");
var resource_1 = require("../resource");
var Errors_1 = require("./Errors");
var ScormService_1 = require("../scorm/ScormService");
var PageController = /** @class */ (function () {
    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    _$                   Objeto JQuery
     * @param {InjectorService} InjectorService     Servicio del inyector
     * @see Injector.TYPES
     */
    function PageController(_$, InjectorService, _ResourceInitializerService) {
        this._$ = _$;
        this.InjectorService = InjectorService;
        this._ResourceInitializerService = _ResourceInitializerService;
        this._resources = [];
    }
    PageController_1 = PageController;
    /**
     * Configura la clase nada más instanciarla
     * @param {IPageControllerOptions}  options         Opciones para el controlador
     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    PageController.prototype.activate = function (options, eventEmitter, state, store) {
        this.options = options;
        this.state = state;
        this.store = store;
        this.state.visited = true;
        this.eventEmitter = eventEmitter;
    };
    PageController.prototype._getNumCompletedResources = function () {
        var completed = 0;
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            completed += resource.isCompleted()
                ? 1
                : 0;
        }
        return completed;
    };
    PageController.prototype._getScore = function () {
        var score = 0, hasScore = false;
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            score += resource.getScore();
            if (hasScore == false) {
                hasScore = resource.hasScore();
            }
        }
        return hasScore == false ? null : score;
    };
    PageController.prototype.isCompleted = function (forceCheck) {
        var result = this.state.completed, current = this.state.completed;
        if (forceCheck || this.state.completed != true) {
            result = this._getNumCompletedResources() === this._resources.length;
            //if the state changes, trigger event
            this.state.completed = result;
            if (current !== result) {
                this.eventEmitter.trigger(PageController_1.ON_COMPLETE_CHANGE, [result, this.$element, this]);
                this.eventEmitter.globalEmitter.trigger(PageController_1.ON_COMPLETE_CHANGE, [result, this.$element, this]);
            }
        }
        return result;
    };
    PageController.prototype.render = function () {
        var event = this.eventEmitter.createEvent(PageController_1.ON_RENDERING), $element, 
        //allow to user to custom render the template
        result = this.eventEmitter.trigger(event, [this.options.template, this]);
        //if a result is provided, ignore the default render function
        if (result instanceof this._$) {
            $element = result;
        }
        else {
            $element = this._render(this.options.template);
        }
        if ($element == undefined || $element.length === 0) {
            throw new Errors_1.HaztivityPageElementError(this.options.name);
        }
        $element.addClass(PageController_1.CLASS_PAGE + " " + PageController_1.CLASS_PAGE + "-" + this.options.name);
        this.$element = $element;
        this.eventEmitter.globalEmitter.trigger(PageController_1.ON_RENDERING, [this.$element, this]);
        return $element;
    };
    PageController.prototype._render = function (template) {
        var $element = this._$(template);
        return $element;
    };
    PageController.prototype._initializeResources = function () {
        this._resources = this._ResourceInitializerService.initialize(this.$element);
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            resource.on(resource_1.ResourceController.ON_COMPLETED, { instance: this, resource: resource }, this._onResourceCompleted);
        }
        /*if(this._resources.length == 0){
            this.isCompleted(true);
        }*/
        return this._resources;
    };
    PageController.prototype._onResourceCompleted = function (e) {
        var instance = e.data.instance, resource = e.data.resource;
        instance.state.score = instance._getScore();
        instance.eventEmitter.trigger(PageController_1.ON_RESOURCE_COMPLETED, [instance.$element, instance, resource]);
        instance.eventEmitter.globalEmitter.trigger(PageController_1.ON_RESOURCE_COMPLETED, [instance.$element, instance, resource]);
        instance.isCompleted(true);
    };
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage                    Página anterior
     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    PageController.prototype.show = function ($oldPage, oldPageRelativePosition) {
        var deferred = this._$.Deferred(), promise = deferred.promise(), event = this.eventEmitter.createEvent(PageController_1.ON_SHOW), result = this.eventEmitter.trigger(event, [this.$element, $oldPage, oldPageRelativePosition, this]);
        this.eventEmitter.globalEmitter.trigger(PageController_1.ON_SHOW, [this.$element, $oldPage, oldPageRelativePosition, this]);
        if (!event.isDefaultPrevented()) {
            //if the user doesn't prevent default
            this._show($oldPage, oldPageRelativePosition).then(function () {
                if (typeof result === "function") {
                    //call the event's function
                    result(deferred);
                }
                else { //if any function is provided by the event
                    deferred.resolve();
                }
            });
        }
        else {
            //if is default prevented, check if the user returns a function
            if (typeof result === "function") {
                result(deferred); //call the event's function
            }
            else {
                //if not, return a resolved promise
                deferred.resolve();
            }
        }
        promise.then(this._onShowEnd.bind(this, $oldPage, oldPageRelativePosition));
        return promise;
    };
    /**
     * Invocado al finalizar el proceso de animación
     * @protected
     */
    PageController.prototype._onShowEnd = function ($oldPage, oldPageRelativePosition) {
        this.eventEmitter.trigger(PageController_1.ON_SHOWN, [this.$element, $oldPage, oldPageRelativePosition, this]);
        this.eventEmitter.globalEmitter.trigger(PageController_1.ON_SHOWN, [this.$element, $oldPage, oldPageRelativePosition, this]);
        this.isCompleted();
    };
    /**
     * Realiza la animación correspondiente
     * @param {JQuery}              $oldPage                Página anterior.
     * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
     * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
     * @protected
     */
    PageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
        var defer = this._$.Deferred();
        defer.resolve();
        return defer.promise();
    };
    /**
     * Obtiene el DOM de la página
     * @returns {JQuery}
     */
    PageController.prototype.getElement = function () {
        return this.$element;
    };
    /**
     * Invocado al finalizar la renderización. Inicializa los recursos.
     * @private
     */
    PageController.prototype._postRender = function () {
        this._initializeResources();
        this.eventEmitter.trigger(PageController_1.ON_RENDERED, [this.$element, this]);
    };
    /**
     * Invocado al solicitarse la destruccion de la página
     */
    PageController.prototype._destroy = function () {
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            resource.destroy();
        }
        this.eventEmitter.trigger(PageController_1.ON_DESTROY, [this.$element, this]);
    };
    PageController.NAMESPACE = "pageController";
    PageController.ON_RENDERING = PageController_1.NAMESPACE + ":rendering";
    PageController.ON_RENDERED = PageController_1.NAMESPACE + ":rendered";
    PageController.ON_APPENDED = PageController_1.NAMESPACE + ":appended";
    PageController.ON_SHOW = PageController_1.NAMESPACE + ":show";
    PageController.ON_SHOWN = PageController_1.NAMESPACE + ":shown";
    PageController.ON_COMPLETE_CHANGE = PageController_1.NAMESPACE + ":completechange";
    PageController.ON_RESOURCE_COMPLETED = PageController_1.NAMESPACE + ":resourcecomplete";
    PageController.ON_DESTROY = PageController_1.NAMESPACE + ":destroy";
    PageController.CLASS_PAGE = "hz-page";
    PageController = PageController_1 = __decorate([
        di_1.Dependencies({
            dependencies: [
                jquery_1.$,
                di_1.InjectorService,
                resource_1.ResourceInitializerService,
                ScormService_1.ScormService
            ]
        })
    ], PageController);
    return PageController;
    var PageController_1;
}());
exports.PageController = PageController;
//# sourceMappingURL=PageController.js.map