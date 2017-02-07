System.register(["../di", "../jquery", "../resource", "./Errors"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, resource_1, Errors_1, PageController, PageController_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            PageController = PageController_1 = (function () {
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
                        resource.on(resource_1.ResourceController.ON_COMPLETED, { instance: this }, this._onResourceCompleted);
                    }
                    return this._resources;
                };
                PageController.prototype._onResourceCompleted = function (e) {
                    var instance = e.data.instance;
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
            exports_1("PageController", PageController);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4uL2pxdWVyeVwiLCBcIi4uL3Jlc291cmNlXCIsIFwiLi9FcnJvcnNcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgcmVzb3VyY2VfMSwgRXJyb3JzXzEsIFBhZ2VDb250cm9sbGVyLCBQYWdlQ29udHJvbGxlcl8xO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAganF1ZXJ5XzEgPSBqcXVlcnlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNvdXJjZV8xXzEpIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xID0gcmVzb3VyY2VfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChFcnJvcnNfMV8xKSB7XG4gICAgICAgICAgICAgICAgRXJyb3JzXzEgPSBFcnJvcnNfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyXzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENvbnRyb2xsZXIgYmFzZSBwYXJhIHRvZGFzIGxhcyBww6FnaW5hcy5cbiAgICAgICAgICAgICAgICAgKiBUaXBvIFBhZ2VcbiAgICAgICAgICAgICAgICAgKiBAY2xhc3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgXyQgICAgICAgICAgICAgICAgICAgT2JqZXRvIEpRdWVyeVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SW5qZWN0b3JTZXJ2aWNlfSBJbmplY3RvclNlcnZpY2UgICAgIFNlcnZpY2lvIGRlbCBpbnllY3RvclxuICAgICAgICAgICAgICAgICAqIEBzZWUgSW5qZWN0b3IuVFlQRVNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQYWdlQ29udHJvbGxlcihfJCwgSW5qZWN0b3JTZXJ2aWNlLCBfUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkluamVjdG9yU2VydmljZSA9IEluamVjdG9yU2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UgPSBfUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDb25maWd1cmEgbGEgY2xhc2UgbmFkYSBtw6FzIGluc3RhbmNpYXJsYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SVBhZ2VDb250cm9sbGVyT3B0aW9uc30gIG9wdGlvbnMgICAgICAgICBPcGNpb25lcyBwYXJhIGVsIGNvbnRyb2xhZG9yXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9ICAgICAgICAgICAgZXZlbnRFbWl0dGVyICAgIENvbnRleHRvIHBhcmEgZWwgbWFuZWpvIGRlIGV2ZW50b3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0lQYWdlU3RhdGV9ICAgICAgICAgICAgICBzdGF0ZSAgICAgICAgICAgRXN0YWRvIGRlbCBjb250cm9sYWRvci4gU2UgY29tcGFydGUgZW50cmUgaW5zdGFuY2lhcyBkZSB1biBtaXNtbyBjb250cm9sYWRvciBwZXJtaXRpZW5kbyBhbG1hY2VuYXIgZWwgZXN0YWRvIGRlIGxvcyBlbGVtZW50b3MgaW50ZXJub3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0lQYWdlU3RvcmV9ICAgICAgICAgICAgICBzdG9yZSAgICAgICAgICAgQWxtYWPDqW4gZGUgZGF0b3MuIFNlIGNvbXBhcnRlIGVudHJlIGluc3RhbmNpYXMgZGUgdW4gbWlzbW8gY29udHJvbGFkb3IuIFBlcm1pdGUgY29tcGFydGlyIGluZm9ybWFjacOzbiBjb24gb3Ryb3MgY29udHJvbGFkb3Jlcy5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAob3B0aW9ucywgZXZlbnRFbWl0dGVyLCBzdGF0ZSwgc3RvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gZXZlbnRFbWl0dGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9nZXROdW1Db21wbGV0ZWRSZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fcmVzb3VyY2VzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkICs9IHJlc291cmNlLmlzQ29tcGxldGVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5pc0NvbXBsZXRlZCA9IGZ1bmN0aW9uIChmb3JjZUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnN0YXRlLmNvbXBsZXRlZCwgY3VycmVudCA9IHRoaXMuc3RhdGUuY29tcGxldGVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VDaGVjayB8fCB0aGlzLnN0YXRlLmNvbXBsZXRlZCAhPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXROdW1Db21wbGV0ZWRSZXNvdXJjZXMoKSA9PT0gdGhpcy5fcmVzb3VyY2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIHN0YXRlIGNoYW5nZXMsIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29tcGxldGVkID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLnRyaWdnZXIoUGFnZUNvbnRyb2xsZXJfMS5PTl9DT01QTEVURV9DSEFOR0UsIFtyZXN1bHQsIHRoaXMuJGVsZW1lbnQsIHRoaXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudEVtaXR0ZXIuY3JlYXRlRXZlbnQoUGFnZUNvbnRyb2xsZXJfMS5PTl9SRU5ERVJJTkcpLCAkZWxlbWVudCwgXG4gICAgICAgICAgICAgICAgICAgIC8vYWxsb3cgdG8gdXNlciB0byBjdXN0b20gcmVuZGVyIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmV2ZW50RW1pdHRlci50cmlnZ2VyKGV2ZW50LCBbdGhpcy5vcHRpb25zLnRlbXBsYXRlLCB0aGlzXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgYSByZXN1bHQgaXMgcHJvdmlkZWQsIGlnbm9yZSB0aGUgZGVmYXVsdCByZW5kZXIgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIHRoaXMuXyQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSB0aGlzLl9yZW5kZXIodGhpcy5vcHRpb25zLnRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQgPT0gdW5kZWZpbmVkIHx8ICRlbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3IodGhpcy5vcHRpb25zLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKFBhZ2VDb250cm9sbGVyXzEuQ0xBU1NfUEFHRSArIFwiIFwiICsgUGFnZUNvbnRyb2xsZXJfMS5DTEFTU19QQUdFICsgXCItXCIgKyB0aGlzLm9wdGlvbnMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0ganF1ZXJ5XzEuJCh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5faW5pdGlhbGl6ZVJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gdGhpcy5fUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX3Jlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLm9uKHJlc291cmNlXzEuUmVzb3VyY2VDb250cm9sbGVyLk9OX0NPTVBMRVRFRCwgeyBpbnN0YW5jZTogdGhpcyB9LCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9vblJlc291cmNlQ29tcGxldGVkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gZS5kYXRhLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5pc0NvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEdlc3Rpb25hIGxhIHRyYW5zaWNpw7NuIGVudHJlIGxhIHDDoWdpbmEgYW50ZXJpb3IgeSBsYSBudWV2YVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgICAgICAgICAkb2xkUGFnZSAgICAgICAgICAgICAgICAgICAgUMOhZ2luYSBhbnRlcmlvclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbiAgICAgUG9zaWNpw7NuIGRlIGxhIHDDoWdpbmEgZGVzYWN0aXZhZGEgZW4gcmVsYWNpw7NuIGNvbiBsYSBhY3R1YWwuIC0xIHNpIGxhIHBhZ2luYSBhbnRlcmlvciBlcyBpbmZlcmlvciBhIGxhIGFjdHVhbCwgMSBzaSBsYSBwYWdpbmEgYW50ZXJpb3IgZXMgcG9zdGVyaW9yIGEgbGEgYWN0dWFsXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7SlF1ZXJ5UHJvbWlzZX0gIFByb21lc2EgcmVzdWx0YSBhbCBmaW5hbGl6YXJzZSBsYSBhbmltYWNpw7NuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGpxdWVyeV8xLiQuRGVmZXJyZWQoKSwgcHJvbWlzZSA9IGRlZmVycmVkLnByb21pc2UoKSwgZXZlbnQgPSB0aGlzLmV2ZW50RW1pdHRlci5jcmVhdGVFdmVudChQYWdlQ29udHJvbGxlcl8xLk9OX1NIT1cpLCByZXN1bHQgPSB0aGlzLmV2ZW50RW1pdHRlci50cmlnZ2VyKGV2ZW50LCBbdGhpcy4kZWxlbWVudCwgJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uLCB0aGlzXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgZG9lc24ndCBwcmV2ZW50IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3coJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FsbCB0aGUgZXZlbnQncyBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQoZGVmZXJyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBpcyBkZWZhdWx0IHByZXZlbnRlZCwgY2hlY2sgaWYgdGhlIHVzZXIgcmV0dXJucyBhIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0KGRlZmVycmVkKTsgLy9jYWxsIHRoZSBldmVudCdzIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIG5vdCwgcmV0dXJuIGEgcmVzb2x2ZWQgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5fb25TaG93RW5kLmJpbmQodGhpcywgJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW52b2NhZG8gYWwgZmluYWxpemFyIGVsIHByb2Nlc28gZGUgYW5pbWFjacOzblxuICAgICAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX29uU2hvd0VuZCA9IGZ1bmN0aW9uICgkb2xkUGFnZSwgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIudHJpZ2dlcihQYWdlQ29udHJvbGxlcl8xLk9OX1NIT1dOLCBbdGhpcy4kZWxlbWVudCwgJG9sZFBhZ2UsIG9sZFBhZ2VSZWxhdGl2ZVBvc2l0aW9uLCB0aGlzXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWFsaXphIGxhIGFuaW1hY2nDs24gY29ycmVzcG9uZGllbnRlXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgICAgICAgICAkb2xkUGFnZSAgICAgICAgICAgICAgICBQw6FnaW5hIGFudGVyaW9yLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24gSW5kaWNhIGxhIHBvc2ljacOzbiBkZSBsYSBww6FnaW5hIGFudGVyaW9yIGVuIHJlbGFjacOzbiBhIGxhIG51ZXZhLiAtMSBzaSBlcyBhbnRlcmlvci4gMSBzaSBlcyBwb3N0ZXJpb3JcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxUPn0gIFByb21lc2EgcXVlIHNlIHJlc3VlbHZlIGFsIGZpbmFsaXphciBsYSBhbmltYWNpw7NuXG4gICAgICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uICgkb2xkUGFnZSwgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyID0ganF1ZXJ5XzEuJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGVsIERPTSBkZSBsYSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0pRdWVyeX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnZvY2FkbyBhbCBmaW5hbGl6YXIgbGEgcmVuZGVyaXphY2nDs24uIEluaWNpYWxpemEgbG9zIHJlY3Vyc29zLlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9wb3N0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplUmVzb3VyY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLnRyaWdnZXIoUGFnZUNvbnRyb2xsZXJfMS5PTl9SRU5ERVJFRCwgW3RoaXMuJGVsZW1lbnQsIHRoaXNdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEludm9jYWRvIGFsIHNvbGljaXRhcnNlIGxhIGRlc3RydWNjaW9uIGRlIGxhIHDDoWdpbmFcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLnRyaWdnZXIoUGFnZUNvbnRyb2xsZXJfMS5PTl9ERVNUUk9ZLCBbdGhpcy4kZWxlbWVudCwgdGhpc10pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhZ2VDb250cm9sbGVyO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLk5BTUVTUEFDRSA9IFwicGFnZUNvbnRyb2xsZXJcIjtcbiAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLk9OX1JFTkRFUklORyA9IFBhZ2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6cmVuZGVyaW5nXCI7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlci5PTl9SRU5ERVJFRCA9IFBhZ2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6cmVuZGVyZWRcIjtcbiAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyLk9OX0FQUEVOREVEID0gUGFnZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjphcHBlbmRlZFwiO1xuICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIuT05fU0hPVyA9IFBhZ2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6c2hvd1wiO1xuICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIuT05fU0hPV04gPSBQYWdlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOnNob3duXCI7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlci5PTl9DT01QTEVURV9DSEFOR0UgPSBQYWdlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOmNvbXBsZXRlY2hhbmdlXCI7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlci5PTl9ERVNUUk9ZID0gUGFnZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjpkZXN0cm95XCI7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlci5DTEFTU19QQUdFID0gXCJoei1wYWdlXCI7XG4gICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkRlcGVuZGVuY2llcyh7XG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpXzEuSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfMS5SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFBhZ2VDb250cm9sbGVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlBhZ2VDb250cm9sbGVyXCIsIFBhZ2VDb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicGFnZS9QYWdlQ29udHJvbGxlci5qcyJ9
