var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "../jquery", "../resource", "./Errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var jquery_1 = require("../jquery");
    var resource_1 = require("../resource");
    var Errors_1 = require("./Errors");
    var PageController = PageController_1 = (function () {
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
        PageController.prototype.isCompleted = function (forceCheck) {
            var result = this.state.completed, current = this.state.completed;
            if (forceCheck || this.state.completed != true) {
                result = this._getNumCompletedResources() === this._resources.length;
                //if the state changes, trigger event
                this.state.completed = result;
                if (current !== result) {
                    this.eventEmitter.trigger(PageController_1.ON_COMPLETE_CHANGE, [result, this.$element, this]);
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
            return $element;
        };
        PageController.prototype._render = function (template) {
            var $element = jquery_1.$(template);
            return $element;
        };
        PageController.prototype._initializeResources = function () {
            this._resources = this._ResourceInitializerService.initialize(this.$element);
            for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
                var resource = _a[_i];
                resource.on(resource_1.ResourceController.ON_COMPLETED, { instance: this, resource: resource }, this._onResourceCompleted);
            }
            return this._resources;
        };
        PageController.prototype._onResourceCompleted = function (e) {
            var instance = e.data.instance;
            instance.eventEmitter.trigger(PageController_1.ON_RESOURCE_COMPLETED, [instance.$element, instance, e.data.resource]);
            instance.isCompleted(true);
        };
        /**
         * Gestiona la transición entre la página anterior y la nueva
         * @param {JQuery}          $oldPage                    Página anterior
         * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
         * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
         */
        PageController.prototype.show = function ($oldPage, oldPageRelativePosition) {
            var deferred = jquery_1.$.Deferred(), promise = deferred.promise(), event = this.eventEmitter.createEvent(PageController_1.ON_SHOW), result = this.eventEmitter.trigger(event, [this.$element, $oldPage, oldPageRelativePosition, this]);
            if (!event.isDefaultPrevented()) {
                //if the user doesn't prevent default
                this._show($oldPage, oldPageRelativePosition).then(function () {
                    if (typeof result === "function") {
                        //call the event's function
                        result(deferred);
                    }
                    else {
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
        };
        /**
         * Realiza la animación correspondiente
         * @param {JQuery}              $oldPage                Página anterior.
         * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
         * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
         * @protected
         */
        PageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
            var defer = jquery_1.$.Deferred();
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
            this.eventEmitter.trigger(PageController_1.ON_DESTROY, [this.$element, this]);
        };
        return PageController;
    }());
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
                resource_1.ResourceInitializerService
            ]
        })
    ], PageController);
    exports.PageController = PageController;
    var PageController_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi9yZXNvdXJjZVwiLCBcIi4vRXJyb3JzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBqcXVlcnlfMSA9IHJlcXVpcmUoXCIuLi9qcXVlcnlcIik7XG4gICAgdmFyIHJlc291cmNlXzEgPSByZXF1aXJlKFwiLi4vcmVzb3VyY2VcIik7XG4gICAgdmFyIEVycm9yc18xID0gcmVxdWlyZShcIi4vRXJyb3JzXCIpO1xuICAgIHZhciBQYWdlQ29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyXzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udHJvbGxlciBiYXNlIHBhcmEgdG9kYXMgbGFzIHDDoWdpbmFzLlxuICAgICAgICAgKiBUaXBvIFBhZ2VcbiAgICAgICAgICogQGNsYXNzXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5U3RhdGljfSAgICBfJCAgICAgICAgICAgICAgICAgICBPYmpldG8gSlF1ZXJ5XG4gICAgICAgICAqIEBwYXJhbSB7SW5qZWN0b3JTZXJ2aWNlfSBJbmplY3RvclNlcnZpY2UgICAgIFNlcnZpY2lvIGRlbCBpbnllY3RvclxuICAgICAgICAgKiBAc2VlIEluamVjdG9yLlRZUEVTXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBQYWdlQ29udHJvbGxlcihfJCwgSW5qZWN0b3JTZXJ2aWNlLCBfUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgIHRoaXMuSW5qZWN0b3JTZXJ2aWNlID0gSW5qZWN0b3JTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UgPSBfUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uZmlndXJhIGxhIGNsYXNlIG5hZGEgbcOhcyBpbnN0YW5jaWFybGFcbiAgICAgICAgICogQHBhcmFtIHtJUGFnZUNvbnRyb2xsZXJPcHRpb25zfSAgb3B0aW9ucyAgICAgICAgIE9wY2lvbmVzIHBhcmEgZWwgY29udHJvbGFkb3JcbiAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9ICAgICAgICAgICAgZXZlbnRFbWl0dGVyICAgIENvbnRleHRvIHBhcmEgZWwgbWFuZWpvIGRlIGV2ZW50b3NcbiAgICAgICAgICogQHBhcmFtIHtJUGFnZVN0YXRlfSAgICAgICAgICAgICAgc3RhdGUgICAgICAgICAgIEVzdGFkbyBkZWwgY29udHJvbGFkb3IuIFNlIGNvbXBhcnRlIGVudHJlIGluc3RhbmNpYXMgZGUgdW4gbWlzbW8gY29udHJvbGFkb3IgcGVybWl0aWVuZG8gYWxtYWNlbmFyIGVsIGVzdGFkbyBkZSBsb3MgZWxlbWVudG9zIGludGVybm9zXG4gICAgICAgICAqIEBwYXJhbSB7SVBhZ2VTdG9yZX0gICAgICAgICAgICAgIHN0b3JlICAgICAgICAgICBBbG1hY8OpbiBkZSBkYXRvcy4gU2UgY29tcGFydGUgZW50cmUgaW5zdGFuY2lhcyBkZSB1biBtaXNtbyBjb250cm9sYWRvci4gUGVybWl0ZSBjb21wYXJ0aXIgaW5mb3JtYWNpw7NuIGNvbiBvdHJvcyBjb250cm9sYWRvcmVzLlxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGV2ZW50RW1pdHRlciwgc3RhdGUsIHN0b3JlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gZXZlbnRFbWl0dGVyO1xuICAgICAgICB9O1xuICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX2dldE51bUNvbXBsZXRlZFJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX3Jlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgY29tcGxldGVkICs9IHJlc291cmNlLmlzQ29tcGxldGVkKClcbiAgICAgICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5pc0NvbXBsZXRlZCA9IGZ1bmN0aW9uIChmb3JjZUNoZWNrKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zdGF0ZS5jb21wbGV0ZWQsIGN1cnJlbnQgPSB0aGlzLnN0YXRlLmNvbXBsZXRlZDtcbiAgICAgICAgICAgIGlmIChmb3JjZUNoZWNrIHx8IHRoaXMuc3RhdGUuY29tcGxldGVkICE9IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXROdW1Db21wbGV0ZWRSZXNvdXJjZXMoKSA9PT0gdGhpcy5fcmVzb3VyY2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAvL2lmIHRoZSBzdGF0ZSBjaGFuZ2VzLCB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb21wbGV0ZWQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci50cmlnZ2VyKFBhZ2VDb250cm9sbGVyXzEuT05fQ09NUExFVEVfQ0hBTkdFLCBbcmVzdWx0LCB0aGlzLiRlbGVtZW50LCB0aGlzXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRFbWl0dGVyLmNyZWF0ZUV2ZW50KFBhZ2VDb250cm9sbGVyXzEuT05fUkVOREVSSU5HKSwgJGVsZW1lbnQsIFxuICAgICAgICAgICAgLy9hbGxvdyB0byB1c2VyIHRvIGN1c3RvbSByZW5kZXIgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmV2ZW50RW1pdHRlci50cmlnZ2VyKGV2ZW50LCBbdGhpcy5vcHRpb25zLnRlbXBsYXRlLCB0aGlzXSk7XG4gICAgICAgICAgICAvL2lmIGEgcmVzdWx0IGlzIHByb3ZpZGVkLCBpZ25vcmUgdGhlIGRlZmF1bHQgcmVuZGVyIGZ1bmN0aW9uXG4gICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgdGhpcy5fJCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQgPSB0aGlzLl9yZW5kZXIodGhpcy5vcHRpb25zLnRlbXBsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkZWxlbWVudCA9PSB1bmRlZmluZWQgfHwgJGVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3IodGhpcy5vcHRpb25zLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoUGFnZUNvbnRyb2xsZXJfMS5DTEFTU19QQUdFICsgXCIgXCIgKyBQYWdlQ29udHJvbGxlcl8xLkNMQVNTX1BBR0UgKyBcIi1cIiArIHRoaXMub3B0aW9ucy5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IGpxdWVyeV8xLiQodGVtcGxhdGUpO1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX2luaXRpYWxpemVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSB0aGlzLl9SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5pbml0aWFsaXplKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX3Jlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgcmVzb3VyY2Uub24ocmVzb3VyY2VfMS5SZXNvdXJjZUNvbnRyb2xsZXIuT05fQ09NUExFVEVELCB7IGluc3RhbmNlOiB0aGlzLCByZXNvdXJjZTogcmVzb3VyY2UgfSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VzO1xuICAgICAgICB9O1xuICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX29uUmVzb3VyY2VDb21wbGV0ZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gZS5kYXRhLmluc3RhbmNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuZXZlbnRFbWl0dGVyLnRyaWdnZXIoUGFnZUNvbnRyb2xsZXJfMS5PTl9SRVNPVVJDRV9DT01QTEVURUQsIFtpbnN0YW5jZS4kZWxlbWVudCwgaW5zdGFuY2UsIGUuZGF0YS5yZXNvdXJjZV0pO1xuICAgICAgICAgICAgaW5zdGFuY2UuaXNDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXN0aW9uYSBsYSB0cmFuc2ljacOzbiBlbnRyZSBsYSBww6FnaW5hIGFudGVyaW9yIHkgbGEgbnVldmFcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgICAgICRvbGRQYWdlICAgICAgICAgICAgICAgICAgICBQw6FnaW5hIGFudGVyaW9yXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbiAgICAgUG9zaWNpw7NuIGRlIGxhIHDDoWdpbmEgZGVzYWN0aXZhZGEgZW4gcmVsYWNpw7NuIGNvbiBsYSBhY3R1YWwuIC0xIHNpIGxhIHBhZ2luYSBhbnRlcmlvciBlcyBpbmZlcmlvciBhIGxhIGFjdHVhbCwgMSBzaSBsYSBwYWdpbmEgYW50ZXJpb3IgZXMgcG9zdGVyaW9yIGEgbGEgYWN0dWFsXG4gICAgICAgICAqIEByZXR1cm4ge0pRdWVyeVByb21pc2V9ICBQcm9tZXNhIHJlc3VsdGEgYWwgZmluYWxpemFyc2UgbGEgYW5pbWFjacOzblxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBqcXVlcnlfMS4kLkRlZmVycmVkKCksIHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlKCksIGV2ZW50ID0gdGhpcy5ldmVudEVtaXR0ZXIuY3JlYXRlRXZlbnQoUGFnZUNvbnRyb2xsZXJfMS5PTl9TSE9XKSwgcmVzdWx0ID0gdGhpcy5ldmVudEVtaXR0ZXIudHJpZ2dlcihldmVudCwgW3RoaXMuJGVsZW1lbnQsICRvbGRQYWdlLCBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbiwgdGhpc10pO1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgZG9lc24ndCBwcmV2ZW50IGRlZmF1bHRcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93KCRvbGRQYWdlLCBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FsbCB0aGUgZXZlbnQncyBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0KGRlZmVycmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiBpcyBkZWZhdWx0IHByZXZlbnRlZCwgY2hlY2sgaWYgdGhlIHVzZXIgcmV0dXJucyBhIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQoZGVmZXJyZWQpOyAvL2NhbGwgdGhlIGV2ZW50J3MgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbm90LCByZXR1cm4gYSByZXNvbHZlZCBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5fb25TaG93RW5kLmJpbmQodGhpcywgJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9jYWRvIGFsIGZpbmFsaXphciBlbCBwcm9jZXNvIGRlIGFuaW1hY2nDs25cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9vblNob3dFbmQgPSBmdW5jdGlvbiAoJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci50cmlnZ2VyKFBhZ2VDb250cm9sbGVyXzEuT05fU0hPV04sIFt0aGlzLiRlbGVtZW50LCAkb2xkUGFnZSwgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24sIHRoaXNdKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWxpemEgbGEgYW5pbWFjacOzbiBjb3JyZXNwb25kaWVudGVcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgICAgICAgICAkb2xkUGFnZSAgICAgICAgICAgICAgICBQw6FnaW5hIGFudGVyaW9yLlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uIEluZGljYSBsYSBwb3NpY2nDs24gZGUgbGEgcMOhZ2luYSBhbnRlcmlvciBlbiByZWxhY2nDs24gYSBsYSBudWV2YS4gLTEgc2kgZXMgYW50ZXJpb3IuIDEgc2kgZXMgcG9zdGVyaW9yXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPFQ+fSAgUHJvbWVzYSBxdWUgc2UgcmVzdWVsdmUgYWwgZmluYWxpemFyIGxhIGFuaW1hY2nDs25cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9zaG93ID0gZnVuY3Rpb24gKCRvbGRQYWdlLCBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbikge1xuICAgICAgICAgICAgdmFyIGRlZmVyID0ganF1ZXJ5XzEuJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgZWwgRE9NIGRlIGxhIHDDoWdpbmFcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeX1cbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZvY2FkbyBhbCBmaW5hbGl6YXIgbGEgcmVuZGVyaXphY2nDs24uIEluaWNpYWxpemEgbG9zIHJlY3Vyc29zLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9wb3N0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVJlc291cmNlcygpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIudHJpZ2dlcihQYWdlQ29udHJvbGxlcl8xLk9OX1JFTkRFUkVELCBbdGhpcy4kZWxlbWVudCwgdGhpc10pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2NhZG8gYWwgc29saWNpdGFyc2UgbGEgZGVzdHJ1Y2Npb24gZGUgbGEgcMOhZ2luYVxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIudHJpZ2dlcihQYWdlQ29udHJvbGxlcl8xLk9OX0RFU1RST1ksIFt0aGlzLiRlbGVtZW50LCB0aGlzXSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQYWdlQ29udHJvbGxlcjtcbiAgICB9KCkpO1xuICAgIFBhZ2VDb250cm9sbGVyLk5BTUVTUEFDRSA9IFwicGFnZUNvbnRyb2xsZXJcIjtcbiAgICBQYWdlQ29udHJvbGxlci5PTl9SRU5ERVJJTkcgPSBQYWdlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOnJlbmRlcmluZ1wiO1xuICAgIFBhZ2VDb250cm9sbGVyLk9OX1JFTkRFUkVEID0gUGFnZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjpyZW5kZXJlZFwiO1xuICAgIFBhZ2VDb250cm9sbGVyLk9OX0FQUEVOREVEID0gUGFnZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjphcHBlbmRlZFwiO1xuICAgIFBhZ2VDb250cm9sbGVyLk9OX1NIT1cgPSBQYWdlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOnNob3dcIjtcbiAgICBQYWdlQ29udHJvbGxlci5PTl9TSE9XTiA9IFBhZ2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6c2hvd25cIjtcbiAgICBQYWdlQ29udHJvbGxlci5PTl9DT01QTEVURV9DSEFOR0UgPSBQYWdlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOmNvbXBsZXRlY2hhbmdlXCI7XG4gICAgUGFnZUNvbnRyb2xsZXIuT05fUkVTT1VSQ0VfQ09NUExFVEVEID0gUGFnZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjpyZXNvdXJjZWNvbXBsZXRlXCI7XG4gICAgUGFnZUNvbnRyb2xsZXIuT05fREVTVFJPWSA9IFBhZ2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6ZGVzdHJveVwiO1xuICAgIFBhZ2VDb250cm9sbGVyLkNMQVNTX1BBR0UgPSBcImh6LXBhZ2VcIjtcbiAgICBQYWdlQ29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5EZXBlbmRlbmNpZXMoe1xuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICBkaV8xLkluamVjdG9yU2VydmljZSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xLlJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgUGFnZUNvbnRyb2xsZXIpO1xuICAgIGV4cG9ydHMuUGFnZUNvbnRyb2xsZXIgPSBQYWdlQ29udHJvbGxlcjtcbiAgICB2YXIgUGFnZUNvbnRyb2xsZXJfMTtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL1BhZ2VDb250cm9sbGVyLmpzIn0=
