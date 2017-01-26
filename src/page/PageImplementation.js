System.register(["../di", "../resource"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, di_2, resource_1, PageImplementation;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
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
                function PageImplementation(_ResourceManager, _Injector) {
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
                        controller.render();
                        controller.initializeResources();
                        this._currentController = controller;
                    }
                    return this._currentController;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VJbXBsZW1lbnRhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9yZXNvdXJjZVwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIGRpXzIsIHJlc291cmNlXzEsIFBhZ2VJbXBsZW1lbnRhdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgICAgICBkaV8yID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNvdXJjZV8xXzEpIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xID0gcmVzb3VyY2VfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEdlc3Rpb25hIGVsIGNpY2xvIGRlIHZpZGEgZGUgdW5hIHDDoWdpbmEgdW5hIHZleiByZWdpc3RyYWRhIGVuIGVsIFBhZ2VNYW5hZ2VyLiBBbG1hY2VuYSBlbCBlc3RhZG8geSBlbCBzdG9yZSB5IGdlc3Rpb25hIGVsIGNpY2xvIGRlIHZpZGEgZGVsIGNvbnRyb2xhZG9yLlxuICAgICAgICAgICAgICAgICAqIEBjbGFzc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBJbmplY3RvclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFBhZ2VJbXBsZW1lbnRhdGlvbihfUmVzb3VyY2VNYW5hZ2VyLCBfSW5qZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VNYW5hZ2VyID0gX1Jlc291cmNlTWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3IgPSBfSW5qZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZToge31cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSB7IGNvbXBsZXRlZDogZmFsc2UsIHZpc2l0ZWQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENvbmZpZ3VyYSBsYSBjbGFzZSBuYWRhIG3DoXMgaW5zdGFuY2lhcmxhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtQYWdlUmVnaXN0ZXJ9ICAgIHBhZ2UgICAgUMOhZ2luYSByZWdpc3RyYWRhIGVuIGVsIFBhZ2VNYW5hZ2VyLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBwYWdlLmdldFJlc291cmNlcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYWdlID0gcGFnZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgZWwgUGFnZVJlZ2lzdGVyIGFzb2NpYWRvXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge1BhZ2VSZWdpc3Rlcn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWdlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSBlbCBlc3RhZG8gYWN0dWFsXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0lQYWdlU3RhdGV9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWN0dWFsaXphIGVsIGVzdGFkb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SVBhZ2VTdGF0ZX0gIHN0YXRlICAgICAgIEVzdGFkbyBhIGVzdGFibGVjZXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGVsIG5vbWJyZSBkZSBsYSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmdldFBhZ2VOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFnZS5nZXROYW1lKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIHVuYSBpbnN0YW5jaWEgZGVsIGNvbnRyb2xhZG9yLlxuICAgICAgICAgICAgICAgICAqIFNpIHNlIHNvbGljaXRhIHkgbm8gaGF5IGNvbnRyb2xhZG9yIGFjdHVhbCBzZSBpbnN0YW5jaWEgdW5vIG51ZXZvIGluaWNpYW5kbyBlbCBjaWNsbyBkZSB2aWRhLlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtQYWdlQ29udHJvbGxlcn1cbiAgICAgICAgICAgICAgICAgKiBAc2VlIFBhZ2VDb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbnRDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZU9wdGlvbnMgPSB0aGlzLl9wYWdlLl9vcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jb250cm9sbGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xsZXJGYWN0b3J5ID0gdGhpcy5fSW5qZWN0b3IuZ2V0KHBhZ2VPcHRpb25zLmNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9jb250cm9sbGVyRmFjdG9yeS5pbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hY3RpdmF0ZShwYWdlT3B0aW9ucywgdGhpcy5fcGFnZS5fZXZlbnRFbWl0dGVyLCB0aGlzLl9zdGF0ZSwgdGhpcy5zdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5pbml0aWFsaXplUmVzb3VyY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRmluYWxpemEgZWwgY2ljbG8gZGUgdmlkYSBhY3R1YWwgaW52b2NhbmRvIGFsIG3DqXRvZG8gXCJkZXN0cm95XCIgZGVsIGNvbnRyb2xhZG9yIGRlIGxhIHDDoWdpbmEgeSBsaWJlcmFuZG8gbGEgaW5zdGFuY2lhIGRlbCBjb250cm9sYWRvclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlci5fZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZXNlY2hhIGxhIGluc3RhbmNpYSBkZWwgY29udHJvbGFkb3IgYWN0dWFsXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhZ2VJbXBsZW1lbnRhdGlvbjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24gPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBhZ2VJbXBsZW1lbnRhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlXzEuUmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlfMi5JbmplY3RvclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFBhZ2VJbXBsZW1lbnRhdGlvbik7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJQYWdlSW1wbGVtZW50YXRpb25cIiwgUGFnZUltcGxlbWVudGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicGFnZS9QYWdlSW1wbGVtZW50YXRpb24uanMifQ==
