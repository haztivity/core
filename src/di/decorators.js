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
//# sourceMappingURL=decorators.js.map