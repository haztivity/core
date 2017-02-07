System.register(["../di", "../jquery", "../resource"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, di_2, jquery_1, resource_1, PageImplementation;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            }
        ],
        execute: function () {
            PageImplementation = (function () {
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
                    this._state = { completed: false, visited: false };
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
                return PageImplementation;
            }());
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
            exports_1("PageImplementation", PageImplementation);
        }
    };
});
//# sourceMappingURL=PageImplementation.js.map