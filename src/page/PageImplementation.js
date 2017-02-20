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
        define(["require", "exports", "../di", "../di", "../jquery", "../resource"], factory);
    }
})(function (require, exports) {
    "use strict";
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
    exports.PageImplementation = PageImplementation;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VJbXBsZW1lbnRhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi9yZXNvdXJjZVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgZGlfMiA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIganF1ZXJ5XzEgPSByZXF1aXJlKFwiLi4vanF1ZXJ5XCIpO1xuICAgIHZhciByZXNvdXJjZV8xID0gcmVxdWlyZShcIi4uL3Jlc291cmNlXCIpO1xuICAgIHZhciBQYWdlSW1wbGVtZW50YXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2VzdGlvbmEgZWwgY2ljbG8gZGUgdmlkYSBkZSB1bmEgcMOhZ2luYSB1bmEgdmV6IHJlZ2lzdHJhZGEgZW4gZWwgUGFnZU1hbmFnZXIuIEFsbWFjZW5hIGVsIGVzdGFkbyB5IGVsIHN0b3JlIHkgZ2VzdGlvbmEgZWwgY2ljbG8gZGUgdmlkYSBkZWwgY29udHJvbGFkb3IuXG4gICAgICAgICAqIEBjbGFzc1xuICAgICAgICAgKiBAcGFyYW0gSW5qZWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFBhZ2VJbXBsZW1lbnRhdGlvbihfJCwgX1Jlc291cmNlTWFuYWdlciwgX0luamVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIgPSBfUmVzb3VyY2VNYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3IgPSBfSW5qZWN0b3I7XG4gICAgICAgICAgICB0aGlzLnN0b3JlID0ge1xuICAgICAgICAgICAgICAgIHB1YmxpYzoge30sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZToge31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHsgY29tcGxldGVkOiBmYWxzZSwgdmlzaXRlZDogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uZmlndXJhIGxhIGNsYXNlIG5hZGEgbcOhcyBpbnN0YW5jaWFybGFcbiAgICAgICAgICogQHBhcmFtIHtQYWdlUmVnaXN0ZXJ9ICAgIHBhZ2UgICAgUMOhZ2luYSByZWdpc3RyYWRhIGVuIGVsIFBhZ2VNYW5hZ2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBwYWdlLmdldFJlc291cmNlcygpO1xuICAgICAgICAgICAgdGhpcy5fcGFnZSA9IHBhZ2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIGVsIFBhZ2VSZWdpc3RlciBhc29jaWFkb1xuICAgICAgICAgKiBAcmV0dXJucyB7UGFnZVJlZ2lzdGVyfVxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIGVsIGVzdGFkbyBhY3R1YWxcbiAgICAgICAgICogQHJldHVybnMge0lQYWdlU3RhdGV9XG4gICAgICAgICAqL1xuICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWN0dWFsaXphIGVsIGVzdGFkb1xuICAgICAgICAgKiBAcGFyYW0ge0lQYWdlU3RhdGV9ICBzdGF0ZSAgICAgICBFc3RhZG8gYSBlc3RhYmxlY2VyXG4gICAgICAgICAqL1xuICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSBlbCBub21icmUgZGUgbGEgcMOhZ2luYVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRQYWdlTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWdlLmdldE5hbWUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgdW5hIGluc3RhbmNpYSBkZWwgY29udHJvbGFkb3IuXG4gICAgICAgICAqIFNpIHNlIHNvbGljaXRhIHkgbm8gaGF5IGNvbnRyb2xhZG9yIGFjdHVhbCBzZSBpbnN0YW5jaWEgdW5vIG51ZXZvIGluaWNpYW5kbyBlbCBjaWNsbyBkZSB2aWRhLlxuICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUNvbnRyb2xsZXJ9XG4gICAgICAgICAqIEBzZWUgUGFnZUNvbnRyb2xsZXJcbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuZ2V0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY3VycmVudENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZU9wdGlvbnMgPSB0aGlzLl9wYWdlLl9vcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29udHJvbGxlckZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlckZhY3RvcnkgPSB0aGlzLl9JbmplY3Rvci5nZXQocGFnZU9wdGlvbnMuY29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fY29udHJvbGxlckZhY3RvcnkuaW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFjdGl2YXRlKHBhZ2VPcHRpb25zLCB0aGlzLl9wYWdlLl9ldmVudEVtaXR0ZXIsIHRoaXMuX3N0YXRlLCB0aGlzLnN0b3JlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENvbnRyb2xsZXI7XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDb250cm9sbGVyICYmICF0aGlzLl9jdXJyZW50Q29udHJvbGxlci5nZXRFbGVtZW50KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENvbnRyb2xsZXIucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUucG9zdFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyLl9wb3N0UmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udHJvbGxlci5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5hbGl6YSBlbCBjaWNsbyBkZSB2aWRhIGFjdHVhbCBpbnZvY2FuZG8gYWwgbcOpdG9kbyBcImRlc3Ryb3lcIiBkZWwgY29udHJvbGFkb3IgZGUgbGEgcMOhZ2luYSB5IGxpYmVyYW5kbyBsYSBpbnN0YW5jaWEgZGVsIGNvbnRyb2xhZG9yXG4gICAgICAgICAqL1xuICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyLl9kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXNlY2hhIGxhIGluc3RhbmNpYSBkZWwgY29udHJvbGFkb3IgYWN0dWFsXG4gICAgICAgICAqL1xuICAgICAgICBQYWdlSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50Q29udHJvbGxlciA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFBhZ2VJbXBsZW1lbnRhdGlvbjtcbiAgICB9KCkpO1xuICAgIFBhZ2VJbXBsZW1lbnRhdGlvbiA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJQYWdlSW1wbGVtZW50YXRpb25cIixcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfMS5SZXNvdXJjZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgZGlfMi5JbmplY3RvclNlcnZpY2VcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbnN0YW50aWFibGU6IHRydWVcbiAgICAgICAgfSlcbiAgICBdLCBQYWdlSW1wbGVtZW50YXRpb24pO1xuICAgIGV4cG9ydHMuUGFnZUltcGxlbWVudGF0aW9uID0gUGFnZUltcGxlbWVudGF0aW9uO1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvUGFnZUltcGxlbWVudGF0aW9uLmpzIn0=
