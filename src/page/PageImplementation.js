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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VJbXBsZW1lbnRhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi9yZXNvdXJjZVwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIGRpXzIsIGpxdWVyeV8xLCByZXNvdXJjZV8xLCBQYWdlSW1wbGVtZW50YXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICAgICAgZGlfMiA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb3VyY2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfMSA9IHJlc291cmNlXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBHZXN0aW9uYSBlbCBjaWNsbyBkZSB2aWRhIGRlIHVuYSBww6FnaW5hIHVuYSB2ZXogcmVnaXN0cmFkYSBlbiBlbCBQYWdlTWFuYWdlci4gQWxtYWNlbmEgZWwgZXN0YWRvIHkgZWwgc3RvcmUgeSBnZXN0aW9uYSBlbCBjaWNsbyBkZSB2aWRhIGRlbCBjb250cm9sYWRvci5cbiAgICAgICAgICAgICAgICAgKiBAY2xhc3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gSW5qZWN0b3JcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQYWdlSW1wbGVtZW50YXRpb24oXyQsIF9SZXNvdXJjZU1hbmFnZXIsIF9JbmplY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1Jlc291cmNlTWFuYWdlciA9IF9SZXNvdXJjZU1hbmFnZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0luamVjdG9yID0gX0luamVjdG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGU6IHt9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0geyBjb21wbGV0ZWQ6IGZhbHNlLCB2aXNpdGVkOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDb25maWd1cmEgbGEgY2xhc2UgbmFkYSBtw6FzIGluc3RhbmNpYXJsYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7UGFnZVJlZ2lzdGVyfSAgICBwYWdlICAgIFDDoWdpbmEgcmVnaXN0cmFkYSBlbiBlbCBQYWdlTWFuYWdlci5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gcGFnZS5nZXRSZXNvdXJjZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGVsIFBhZ2VSZWdpc3RlciBhc29jaWFkb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtQYWdlUmVnaXN0ZXJ9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgZWwgZXN0YWRvIGFjdHVhbFxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtJUGFnZVN0YXRlfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFjdHVhbGl6YSBlbCBlc3RhZG9cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0lQYWdlU3RhdGV9ICBzdGF0ZSAgICAgICBFc3RhZG8gYSBlc3RhYmxlY2VyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSBlbCBub21icmUgZGUgbGEgcMOhZ2luYVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRQYWdlTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2UuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSB1bmEgaW5zdGFuY2lhIGRlbCBjb250cm9sYWRvci5cbiAgICAgICAgICAgICAgICAgKiBTaSBzZSBzb2xpY2l0YSB5IG5vIGhheSBjb250cm9sYWRvciBhY3R1YWwgc2UgaW5zdGFuY2lhIHVubyBudWV2byBpbmljaWFuZG8gZWwgY2ljbG8gZGUgdmlkYS5cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUNvbnRyb2xsZXJ9XG4gICAgICAgICAgICAgICAgICogQHNlZSBQYWdlQ29udHJvbGxlclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuZ2V0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW50Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VPcHRpb25zID0gdGhpcy5fcGFnZS5fb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29udHJvbGxlckZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250cm9sbGVyRmFjdG9yeSA9IHRoaXMuX0luamVjdG9yLmdldChwYWdlT3B0aW9ucy5jb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fY29udHJvbGxlckZhY3RvcnkuaW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWN0aXZhdGUocGFnZU9wdGlvbnMsIHRoaXMuX3BhZ2UuX2V2ZW50RW1pdHRlciwgdGhpcy5fc3RhdGUsIHRoaXMuc3RvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENvbnRyb2xsZXIgJiYgIXRoaXMuX2N1cnJlbnRDb250cm9sbGVyLmdldEVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyLnJlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLnBvc3RSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIuX3Bvc3RSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udHJvbGxlci5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEZpbmFsaXphIGVsIGNpY2xvIGRlIHZpZGEgYWN0dWFsIGludm9jYW5kbyBhbCBtw6l0b2RvIFwiZGVzdHJveVwiIGRlbCBjb250cm9sYWRvciBkZSBsYSBww6FnaW5hIHkgbGliZXJhbmRvIGxhIGluc3RhbmNpYSBkZWwgY29udHJvbGFkb3JcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIuX2Rlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzZWNoYSBsYSBpbnN0YW5jaWEgZGVsIGNvbnRyb2xhZG9yIGFjdHVhbFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBQYWdlSW1wbGVtZW50YXRpb247XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQYWdlSW1wbGVtZW50YXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBqcXVlcnlfMS4kLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfMS5SZXNvdXJjZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaV8yLkluamVjdG9yU2VydmljZVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgUGFnZUltcGxlbWVudGF0aW9uKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlBhZ2VJbXBsZW1lbnRhdGlvblwiLCBQYWdlSW1wbGVtZW50YXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL1BhZ2VJbXBsZW1lbnRhdGlvbi5qcyJ9
