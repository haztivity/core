(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Injector"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var Injector_1 = require("./Injector");
    var injectorInstance = Injector_1.Injector.getInstance();
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
    exports.Core = Core;
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
    exports.Module = Module;
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
    exports.Service = Service;
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
    exports.ServiceInstance = ServiceInstance;
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
    exports.Sco = Sco;
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
    exports.Page = Page;
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
    exports.Resource = Resource;
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
    exports.Component = Component;
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
    exports.Dependencies = Dependencies;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9kZWNvcmF0b3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi9JbmplY3RvclwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgSW5qZWN0b3JfMSA9IHJlcXVpcmUoXCIuL0luamVjdG9yXCIpO1xuICAgIHZhciBpbmplY3Rvckluc3RhbmNlID0gSW5qZWN0b3JfMS5JbmplY3Rvci5nZXRJbnN0YW5jZSgpO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciB1bmEgY2xhc2UgY29tbyBDb3JlLlxuICAgICAqIFNpIHNlIGluZGljYSBlbCBwYXLDoW1ldHJvIHB1YmxpYyBzZSByZWdpc3RyYXLDoSBsYSBjbGFzZSBjb21vIENvcmVQdWJsaWMsIGVuIGNhc28gY29udHJhcmlvIGNvbW8gQ29yZVxuICAgICAqIFNpIHNlIGluZGljYSBlbCBwYXLDoW1ldHJvIGluc3RhbnRpYWJsZSBzZSByZWdpc3RyYXLDoSBsYSBjbGFzZSBjb21vIHRyYW5zaWVudCwgZW4gY2FzbyBjb250cmFyaW8gY29tbyBzZXJ2aWNlXG4gICAgICogQHBhcmFtIHtJQ29yZVBhcmFtc30gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb3JlKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5wdWJsaWMpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmluc3RhbnRpYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyQ29yZVB1YmxpY1RyYW5zaWVudChwYXJhbXMubmFtZSwgdGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzLCBwYXJhbXMuZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyQ29yZVB1YmxpYyhwYXJhbXMubmFtZSwgdGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzLCBwYXJhbXMuZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5pbnN0YW50aWFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlckNvcmVUcmFuc2llbnQocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlckNvcmUocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0cy5Db3JlID0gQ29yZTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gTW9kdWxlXG4gICAgICogQHBhcmFtIHtJTW9kdWxlUGFyYW1zfSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1vZHVsZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJNb2R1bGUocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLk1vZHVsZSA9IE1vZHVsZTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gU2VydmljZVxuICAgICAqIEBwYXJhbSB7SVNlcnZpY2VQYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2VydmljZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlKHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0cy5TZXJ2aWNlID0gU2VydmljZTtcbiAgICAvKipcbiAgICAgKiBEZWNvcmFkb3IgcGFyYSByZWdpc3RyYXIgdW5hIGNsYXNlIGNvbW8gU2VydmljZUluc3RhbmNlXG4gICAgICogQHBhcmFtIHtJU2VydmljZUluc3RhbmNlUGFyYW1zfSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNlcnZpY2VJbnN0YW5jZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UocGFyYW1zLm5hbWUsIHBhcmFtcy5pbnN0YW5jZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHMuU2VydmljZUluc3RhbmNlID0gU2VydmljZUluc3RhbmNlO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciB1bmEgY2xhc2UgY29tbyBTY29cbiAgICAgKiBAcGFyYW0ge0lTY29QYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2NvKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlclNjbyhwYXJhbXMubmFtZSwgdGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzLCBwYXJhbXMuZmFjdG9yeSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHMuU2NvID0gU2NvO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciB1bmEgY2xhc2UgY29tbyBQYWdlXG4gICAgICogQHBhcmFtIHtJUGFnZVBhcmFtc30gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBQYWdlKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaW5qZWN0b3JJbnN0YW5jZS5yZWdpc3RlclBhZ2UocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLlBhZ2UgPSBQYWdlO1xuICAgIC8qKlxuICAgICAqIERlY29yYWRvciBwYXJhIHJlZ2lzdHJhciB1bmEgY2xhc2UgY29tbyBSZWN1cnNvXG4gICAgICogQHBhcmFtIHtJUmVzb3VyY2VQYXJhbXN9ICAgICBwYXJhbXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gUmVzb3VyY2UocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyUmVzb3VyY2UocGFyYW1zLm5hbWUsIHRhcmdldCwgcGFyYW1zLmRlcGVuZGVuY2llcywgcGFyYW1zLmZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLlJlc291cmNlID0gUmVzb3VyY2U7XG4gICAgLyoqXG4gICAgICogRGVjb3JhZG9yIHBhcmEgcmVnaXN0cmFyIHVuYSBjbGFzZSBjb21vIFJlY3Vyc29cbiAgICAgKiBAcGFyYW0ge0lSZXNvdXJjZVBhcmFtc30gICAgIHBhcmFtc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21wb25lbnQocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpbmplY3Rvckluc3RhbmNlLnJlZ2lzdGVyQ29tcG9uZW50KHBhcmFtcy5uYW1lLCB0YXJnZXQsIHBhcmFtcy5kZXBlbmRlbmNpZXMsIHBhcmFtcy5mYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4gICAgLyoqXG4gICAgICogRGVjb3JhZG9yIHBhcmEgcmVnaXN0cmFyIGxhcyBkZXBlbmRlbmNpYXMgc2luIHJlZ2lzdHJhciBsYSBjbGFzZSBjb21vIGlueWVjdGFibGVcbiAgICAgKiBAcGFyYW0ge3tkZXBlbmRlbmNpZXM6YW55W119fSAgICAgcGFyYW1zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlcGVuZGVuY2llcyhwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGluamVjdG9ySW5zdGFuY2UucmVnaXN0ZXJEZXBlbmRlbmNpZXModGFyZ2V0LCBwYXJhbXMuZGVwZW5kZW5jaWVzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZXhwb3J0cy5EZXBlbmRlbmNpZXMgPSBEZXBlbmRlbmNpZXM7XG59KTtcbiJdLCJmaWxlIjoiZGkvZGVjb3JhdG9ycy5qcyJ9
