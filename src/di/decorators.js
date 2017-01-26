System.register(["./Injector"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Decorador para registrar una clase como Core.
     * Si se indica el parámetro public se registrará la clase como CorePublic, en caso contrario como Core
     * Si se indica el parámetro instantiable se registrará la clase como transient, en caso contrario como service
     * @param {ICoreParams}     params
     * @static
     * @function
     */
    function Core(params) {
        return function (target) {
            if (params.public) {
                if (params.instantiable) {
                    injectorInstance.registerCorePublicTransient(params.name, target, params.dependencies, params.factory);
                }
                else {
                    injectorInstance.registerCorePublic(params.name, target, params.dependencies, params.factory);
                }
            }
            else {
                if (params.instantiable) {
                    injectorInstance.registerCoreTransient(params.name, target, params.dependencies, params.factory);
                }
                else {
                    injectorInstance.registerCore(params.name, target, params.dependencies, params.factory);
                }
            }
        };
    }
    exports_1("Core", Core);
    /**
     * Decorador para registrar una clase como Module
     * @param {IModuleParams}     params
     * @static
     * @function
     */
    function Module(params) {
        return function (target) {
            injectorInstance.registerModule(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Module", Module);
    /**
     * Decorador para registrar una clase como Service
     * @param {IServiceParams}     params
     * @static
     * @function
     */
    function Service(params) {
        return function (target) {
            injectorInstance.registerService(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Service", Service);
    /**
     * Decorador para registrar una clase como ServiceInstance
     * @param {IServiceInstanceParams}     params
     * @static
     * @function
     */
    function ServiceInstance(params) {
        return function (target) {
            injectorInstance.registerServiceInstance(params.name, params.instance);
        };
    }
    exports_1("ServiceInstance", ServiceInstance);
    /**
     * Decorador para registrar una clase como Sco
     * @param {IScoParams}     params
     * @static
     * @function
     */
    function Sco(params) {
        return function (target) {
            injectorInstance.registerSco(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Sco", Sco);
    /**
     * Decorador para registrar una clase como Page
     * @param {IPageParams}     params
     * @static
     * @function
     */
    function Page(params) {
        return function (target) {
            injectorInstance.registerPage(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Page", Page);
    /**
     * Decorador para registrar una clase como Recurso
     * @param {IResourceParams}     params
     * @static
     * @function
     */
    function Resource(params) {
        return function (target) {
            injectorInstance.registerResource(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Resource", Resource);
    /**
     * Decorador para registrar una clase como Recurso
     * @param {IResourceParams}     params
     * @static
     * @function
     */
    function Component(params) {
        return function (target) {
            injectorInstance.registerComponent(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Component", Component);
    /**
     * Decorador para registrar las dependencias sin registrar la clase como inyectable
     * @param {{dependencies:any[]}}     params
     * @static
     * @function
     */
    function Dependencies(params) {
        return function (target) {
            injectorInstance.registerDependencies(target, params.dependencies);
        };
    }
    exports_1("Dependencies", Dependencies);
    var Injector_1, injectorInstance;
    return {
        setters: [
            function (Injector_1_1) {
                Injector_1 = Injector_1_1;
            }
        ],
        execute: function () {
            injectorInstance = Injector_1.Injector.getInstance();
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9kZWNvcmF0b3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuL0luamVjdG9yXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gQ29yZS5cbiAgICAgKiBTaSBzZSBpbmRpY2EgZWwgcGFyw6FtZXRybyBwdWJsaWMgc2UgcmVnaXN0cmFyw6EgbGEgY2xhc2UgY29tbyBDb3JlUHVibGljLCBlbiBjYXNvIGNvbnRyYXJpbyBjb21vIENvcmVcbiAgICAgKiBTaSBzZSBpbmRpY2EgZWwgcGFyw6FtZXRybyBpbnN0YW50aWFibGUgc2UgcmVnaXN0cmFyw6EgbGEgY2xhc2UgY29tbyB0cmFuc2llbnQsIGVuIGNhc28gY29udHJhcmlvIGNvbW8gc2VydmljZVxuICAgICAqIEBwYXJhbSB7SUNvcmVQYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ29yZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMucHVibGljKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5pbnN0YW50aWFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlckNvcmVQdWJsaWNUcmFuc2llbnQocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlckNvcmVQdWJsaWMocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaW5zdGFudGlhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJDb3JlVHJhbnNpZW50KHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJDb3JlKHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHNfMShcIkNvcmVcIiwgQ29yZSk7XG4gICAgLyoqXG4gICAgICogRGVjb3JhZG9yIHBhcmEgcmVnaXN0cmFyIHVuYSBjbGFzZSBjb21vIE1vZHVsZVxuICAgICAqIEBwYXJhbSB7SU1vZHVsZVBhcmFtc30gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNb2R1bGUocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyTW9kdWxlKHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0c18xKFwiTW9kdWxlXCIsIE1vZHVsZSk7XG4gICAgLyoqXG4gICAgICogRGVjb3JhZG9yIHBhcmEgcmVnaXN0cmFyIHVuYSBjbGFzZSBjb21vIFNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge0lTZXJ2aWNlUGFyYW1zfSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNlcnZpY2UocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShwYXJhbXMubmFtZSwgdGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzLCBwYXJhbXMuZmFjdG9yeSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHNfMShcIlNlcnZpY2VcIiwgU2VydmljZSk7XG4gICAgLyoqXG4gICAgICogRGVjb3JhZG9yIHBhcmEgcmVnaXN0cmFyIHVuYSBjbGFzZSBjb21vIFNlcnZpY2VJbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7SVNlcnZpY2VJbnN0YW5jZVBhcmFtc30gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZXJ2aWNlSW5zdGFuY2UocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyU2VydmljZUluc3RhbmNlKHBhcmFtcy5uYW1lLCBwYXJhbXMuaW5zdGFuY2UpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzXzEoXCJTZXJ2aWNlSW5zdGFuY2VcIiwgU2VydmljZUluc3RhbmNlKTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gU2NvXG4gICAgICogQHBhcmFtIHtJU2NvUGFyYW1zfSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNjbyhwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJTY28ocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzXzEoXCJTY29cIiwgU2NvKTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gUGFnZVxuICAgICAqIEBwYXJhbSB7SVBhZ2VQYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gUGFnZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJQYWdlKHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0c18xKFwiUGFnZVwiLCBQYWdlKTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gUmVjdXJzb1xuICAgICAqIEBwYXJhbSB7SVJlc291cmNlUGFyYW1zfSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlc291cmNlKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlclJlc291cmNlKHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0c18xKFwiUmVzb3VyY2VcIiwgUmVzb3VyY2UpO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciB1bmEgY2xhc2UgY29tbyBSZWN1cnNvXG4gICAgICogQHBhcmFtIHtJUmVzb3VyY2VQYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlckNvbXBvbmVudChwYXJhbXMubmFtZSwgdGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzLCBwYXJhbXMuZmFjdG9yeSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHNfMShcIkNvbXBvbmVudFwiLCBDb21wb25lbnQpO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciBsYXMgZGVwZW5kZW5jaWFzIHNpbiByZWdpc3RyYXIgbGEgY2xhc2UgY29tbyBpbnllY3RhYmxlXG4gICAgICogQHBhcmFtIHt7ZGVwZW5kZW5jaWVzOmFueVtdfX0gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZXBlbmRlbmNpZXMocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyRGVwZW5kZW5jaWVzKHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHNfMShcIkRlcGVuZGVuY2llc1wiLCBEZXBlbmRlbmNpZXMpO1xuICAgIHZhciBJbmplY3Rvcl8xLCBpbmplY3Rvckluc3RhbmNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChJbmplY3Rvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBJbmplY3Rvcl8xID0gSW5qZWN0b3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlID0gSW5qZWN0b3JfMS5JbmplY3Rvci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJkaS9kZWNvcmF0b3JzLmpzIn0=
