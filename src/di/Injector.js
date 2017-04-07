"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var bottlejs_1 = require("bottlejs");
var Errors_1 = require("./Errors");
//Create readonly types
exports.TYPES = (function () {
    function sealProperty(val) {
        //Object.freeze(val);
        return {
            writable: false,
            configurable: false,
            value: val
        };
    }
    function registerType(types, name, allowAccess) {
        var obj = {};
        Object.defineProperties(obj, {
            "name": sealProperty(name),
            "allowAccess": sealProperty(allowAccess)
        });
        types[name] = obj;
    }
    var types = {};
    registerType(types, "Core", true);
    registerType(types, "CorePublic", true);
    registerType(types, "Module", [
        "Core",
        "CorePublic",
        "Service",
        "Page"
    ]);
    registerType(types, "Service", [
        "CorePublic",
        "Service",
        "Component",
        "Module"
    ]);
    registerType(types, "Sco", [
        "Core",
        "CorePublic",
        "Resource",
        "Component",
        "Service"
    ]);
    registerType(types, "Resource", [
        "Service"
    ]);
    registerType(types, "Component", [
        "CorePublic",
        "Service"
    ]);
    registerType(types, "Page", [
        "Service"
    ]);
    //Object.freeze(types);
    return types;
})();
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
var Injector = (function () {
    /**
     * Instancia el Inyector. Por defecto se genera un contenedor root
     * @constructor
     */
    function Injector() {
        this._registers = new Map();
        this._registersName = new Map();
        this._root = new bottlejs_1.Bottle();
    }
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    Injector.prototype.exists = function (name) {
        return this._registersName.has(name);
    };
    Injector.prototype._getInjectorRegister = function (key) {
        var result;
        if (typeof key == "string") {
            result = this._registersName.get(key);
        }
        else {
            result = this._registers.get(key);
        }
        return result;
    };
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object}  service    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
     */
    Injector.prototype._getFromBottle = function (service) {
        return this._root.container[service];
    };
    /**
     * Obtiene el provider para una clase
     * @param {String}  name        Nombre de la clase para la cual obtener el provider
     * @returns {any}
     * @private
     */
    Injector.prototype._getProvider = function (name) {
        return this._root.container[name + "Provider"];
    };
    /**
     * Registra el nombre indicado para la dependencia
     * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
     * @param {String}                  name        Nombre a registrar
     * @private
     */
    Injector.prototype._setName = function (target, name) {
        var save = target.prototype || target;
        Object.defineProperty(save, "_injectorName", {
            configurable: false,
            writable: false,
            value: name
        });
    };
    /**
     * Obtiene el nombre registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el nombre
     * @returns {String}
     * @private
     */
    Injector.prototype._getName = function (target) {
        return target.prototype
            ? target.prototype._injectorName
            : target._injectorName;
    };
    /**
     * Registra el tipo para la dependencia
     * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
     * @param {String}                  type            Tipo a registrar
     * @private
     */
    Injector.prototype._setType = function (target, type) {
        var save = target.prototype || target;
        Object.defineProperty(save, "_injectorType", {
            configurable: false,
            writable: false,
            value: type
        });
    };
    /**
     * Obtiene el tipo registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el tipo
     * @returns {String}
     * @private
     */
    Injector.prototype._getType = function (target) {
        return target.prototype
            ? target.prototype._injectorType
            : target._injectorType;
    };
    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {*}       target         Servicio para el cual obtener instancias de sus dependencias
     * @param {*}       [dependencies]  Dependencias concretas a obtener. En caso de no indicarse se obtienen todas
     * @returns {Array}
     * @protected
     */
    Injector.prototype._getFor = function (target, dependencies) {
        var serviceInjectorRegister = this._getInjectorRegister(target), resolvedDependencies = [], serviceName = serviceInjectorRegister.name;
        dependencies = dependencies || serviceInjectorRegister.dependencies;
        //each dependency to resolve
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var dependencyToResolve = dependencies_1[_i];
            //dependency must exists
            if (dependencyToResolve != undefined) {
                var dependencyToResolveInjectorRegister = this._getInjectorRegister(dependencyToResolve), dependencyToResolveName = void 0;
                if (dependencyToResolveInjectorRegister != undefined) {
                    dependencyToResolveName = dependencyToResolveInjectorRegister.name;
                    //try to get the provider
                    var serviceType = serviceInjectorRegister.type, dependencyType = dependencyToResolveInjectorRegister.type;
                    if (serviceType && dependencyType && (serviceType.allowAccess === true || serviceType.allowAccess.indexOf(dependencyType.name) !== -1)) {
                        var dependency = this._getFromBottle(dependencyToResolveName);
                        //If the dependency is the InjectorService, create de instance with the service
                        //For more info see InjectorService
                        if (dependencyToResolveName === "InjectorService") {
                            dependency = dependency.instance(serviceInjectorRegister.service);
                        }
                        resolvedDependencies.push(dependency);
                    }
                    else {
                        throw new Errors_1.HaztivityDependencyAccessDenied(serviceName, dependencyToResolveName);
                    }
                }
                else {
                    throw new Errors_1.HaztivityDependencyNotRegisteredError(dependencyToResolve, serviceName);
                }
            }
            else {
                throw new Errors_1.HaztivityDependencyNotValid(serviceName, dependencies);
            }
        }
        return resolvedDependencies;
    };
    /**
     * Registra un servicio
     * @param {IInjectorType}   type            Tipo de elemento de haztivity
     * @param {String}          name            Nombre del servicio. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @example
     * class MyService{
     *
     * }
     * let myServiceDependencies = [
     *      "SomeDependency"
     * ]
     * injector._registerService("MyService",MyService,myServiceDependencies,(service,dependencies,resolvedDependencies)=>{
     *      let instance = new service(...resolvedDependencies);
     *      instance.doSomething();
     *      return instance;
     * })
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._registerService = function (type, name, service, dependencies, factory) {
        var _this = this;
        if (this._validateName(name, dependencies)) {
            //store type in the constructor to manage permisions
            var injectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            var bottleInstance = this._root.factory(name, function (container) {
                var injectorRegister = _this._getInjectorRegister(name), service = injectorRegister.service;
                var resolvedDependencies = _this._getFor(service);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null, service, injectorRegister.dependencies, resolvedDependencies);
                }
                else {
                    return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                }
            });
        }
    };
    Injector.prototype._addRegister = function (register) {
        this._registers.set(register.service, register);
        this._registersName.set(register.name, register);
    };
    /**
     * Registra dependencias en una clase
     * @param {*}                   service         Servicio en el cual registrar las dependencias
     * @param {String[]}            dependencies    Dependencias a registrar
     * @private
     */
    Injector.prototype.registerDependencies = function (service, dependencies) {
        var registeredDependencies = this._getRegisteredDependencies(service);
        //if the element already has dependencies, concat
        dependencies = $.unique(dependencies.concat(registeredDependencies));
        service.prototype.$inject = dependencies;
        return dependencies;
    };
    /**
     * Recupera las dependencias registradas en una clase
     * @param {*}   service     Servicio del cual recuperar las dependencias
     * @returns {Array<string>}
     * @private
     */
    Injector.prototype._getRegisteredDependencies = function (service) {
        return service.prototype.$inject || [];
    };
    /**
     * Registra una clase instanciable generando un factory. Funciona de forma similar a _registerService con la diferencia de que la función factory indicada se ejecutará cada vez
     * que se solicite la dependencia generando una instancia nueva de la clase.
     * @param {IInjectorType}   type            Tipo de elemento de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @example
     * class MyClass{
     *
     * }
     * let myClassDependencies = [
     *      "SomeDependency"
     * ]
     * injector._registerTransient("MyClass",MyClass,myClassDependencies,(service,dependencies,resolvedDependencies)=>{
     *      let instance = new service(...resolvedDependencies);
     *      instance.doSomething();
     *      return instance;
     * })
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._registerTransient = function (type, name, service, dependencies, factory) {
        if (this._validateName(name, dependencies)) {
            var injectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            var that_1 = this;
            //create factory func
            var GenericFactory = function (container, params) {
                var injectorRegister = that_1._getInjectorRegister(name), service = injectorRegister.service, dependenciesToInject = injectorRegister.dependencies, resolvedDependencies = that_1._getFor(service);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null, service, dependenciesToInject, resolvedDependencies, params);
                }
                else {
                    return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                }
            };
            this._root.instanceFactory(name, GenericFactory);
        }
    };
    /**
     * Valida la disponibilidad de un nombre y las dependencias. El nombre no debe estar registrado y el propio nombre no puede estar registrado como una dependencia
     * @param {String}      name                Nombre a validar
     * @param {Stirng[]}    dependencies        Dependencias
     * @returns {boolean}
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._validateName = function (name, dependencies) {
        if (!!name) {
            if (!this.exists(name)) {
                if (dependencies.indexOf(name) === -1) {
                    return true;
                }
                else {
                    throw new Errors_1.HaztivityDependencyHasItsOwnAsDependency(name);
                }
            }
            else {
                throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
            }
        }
        else {
            throw new Errors_1.HaztivityDependencyOptionRequired("name");
        }
    };
    /**
     * Registra un servicio de tipo Service de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerService = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Service, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Service de haztivity instanciable.
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerServiceTransient = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Service, name, service, dependencies, factory);
    };
    /**
     * Registra una instancia. No resuelve dependencias.
     * @param {String}          name            Nombre del servicio.
     * @param {*}               instance        Servicio a registar
     * @example
     * injector.registerServiceInstance("$",$);
     */
    Injector.prototype.registerServiceInstance = function (name, instance) {
        var dependencies = [];
        if (this._validateName(name, dependencies)) {
            var injectorRegister = {
                name: name,
                type: exports.TYPES.Service,
                dependencies: dependencies,
                service: instance
            };
            this._addRegister(injectorRegister);
            this._root.constant(name, instance);
        }
        else {
            throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
        }
    };
    /**
     * Registra un servicio de tipo Core de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerCore = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Core, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Core de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class          Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    Injector.prototype.registerCoreTransient = function (name, Class, dependencies, factory) {
        this._registerTransient(exports.TYPES.Core, name, Class, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo CorePublic de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerCorePublic = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.CorePublic, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo CorePublic de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class           Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    Injector.prototype.registerCorePublicTransient = function (name, Class, dependencies, factory) {
        this._registerTransient(exports.TYPES.CorePublic, name, Class, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Sco de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerSco = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Sco, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Module de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerModule = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Module, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Component de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerComponent = function (name, service, dependencies, factory) {
        if (service._componentName == undefined) {
            service._componentName = name;
        }
        this._registerService(exports.TYPES.Component, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Page de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    Injector.prototype.registerPage = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Page, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Resource de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    Injector.prototype.registerResource = function (name, service, dependencies, factory) {
        if (service._resourceName == undefined) {
            service._resourceName = name;
        }
        this._registerTransient(exports.TYPES.Resource, name, service, dependencies, factory);
    };
    /**
     * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
     * Si no se indica target se obtiene una instancia de InjectorRegisterService
     * @param   {*}         [target]            Target para el cual obtener el servicio
     * @returns {Injector}
     * @see InjectorService
     * @see InjectorRegisterService
     */
    Injector.getInstance = function (target) {
        var toReturn;
        if (!Injector._instance) {
            Injector._instance = new Injector();
            Injector._registerInstance = new InjectorRegisterService(Injector._instance);
        }
        //The injector has a internal permission resolver, this resolver requires an haztivity type to work because each type has access to different dependencies.
        //To get the InjectorService that could get dependencies is required tell what type of element is requiring the dependency, to prevent that anyone could get any dependency, is necessary pass the element that want to get dependencies
        if (target) {
            toReturn = new InjectorService(Injector._instance, target);
        }
        else {
            toReturn = Injector._registerInstance;
        }
        return toReturn;
    };
    return Injector;
}());
exports.Injector = Injector;
var InjectorService = (function () {
    function InjectorService(injector, target) {
        this.get = function (service) {
            var result;
            if (Array.isArray(service)) {
                result = injector._getFor(target, service);
            }
            else {
                result = injector._getFor(target, [service]);
                if (result.length > 0) {
                    result = result[0];
                }
            }
            return result;
        };
        this.exists = injector.exists.bind(injector);
    }
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String|Object|Function}  dependency    Clase a comprobar
     * @returns {boolean}
     */
    InjectorService.prototype.exists = function (dependency) {
        return undefined;
    };
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object|Function}  dependency      Dependencia a obtener
     */
    InjectorService.prototype.get = function (dependency) {
    };
    return InjectorService;
}());
exports.InjectorService = InjectorService;
//Map dynamically the methods
var InjectorRegisterService = (function () {
    function InjectorRegisterService(injector) {
        var publish = [
            "registerService",
            "registerServiceTransient",
            "registerCore",
            "registerCoreTransient",
            "registerCorePublic",
            "registerCorePublicTransient",
            "registerSco",
            "registerModule",
            "registerComponent",
            "registerServiceInstance",
            "registerPage",
            "registerResource",
            "registerDependencies"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = injector[method].bind(injector);
        }
    }
    return InjectorRegisterService;
}());
exports.InjectorRegisterService = InjectorRegisterService;
//Register Injector as a instantiable service.
Injector.getInstance().registerServiceTransient("InjectorService", InjectorService, [], function (service, dependencies, resolvedDependencies, requester) {
    return Injector.getInstance(requester);
});
//# sourceMappingURL=Injector.js.map