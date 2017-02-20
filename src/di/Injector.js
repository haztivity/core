(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bottlejs", "./Errors"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9JbmplY3Rvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcImJvdHRsZWpzXCIsIFwiLi9FcnJvcnNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGJvdHRsZWpzXzEgPSByZXF1aXJlKFwiYm90dGxlanNcIik7XG4gICAgdmFyIEVycm9yc18xID0gcmVxdWlyZShcIi4vRXJyb3JzXCIpO1xuICAgIC8vQ3JlYXRlIHJlYWRvbmx5IHR5cGVzXG4gICAgZXhwb3J0cy5UWVBFUyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNlYWxQcm9wZXJ0eSh2YWwpIHtcbiAgICAgICAgICAgIC8vT2JqZWN0LmZyZWV6ZSh2YWwpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyVHlwZSh0eXBlcywgbmFtZSwgYWxsb3dBY2Nlc3MpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWFsUHJvcGVydHkobmFtZSksXG4gICAgICAgICAgICAgICAgXCJhbGxvd0FjY2Vzc1wiOiBzZWFsUHJvcGVydHkoYWxsb3dBY2Nlc3MpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHR5cGVzW25hbWVdID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlcyA9IHt9O1xuICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiQ29yZVwiLCB0cnVlKTtcbiAgICAgICAgcmVnaXN0ZXJUeXBlKHR5cGVzLCBcIkNvcmVQdWJsaWNcIiwgdHJ1ZSk7XG4gICAgICAgIHJlZ2lzdGVyVHlwZSh0eXBlcywgXCJNb2R1bGVcIiwgW1xuICAgICAgICAgICAgXCJDb3JlXCIsXG4gICAgICAgICAgICBcIkNvcmVQdWJsaWNcIixcbiAgICAgICAgICAgIFwiU2VydmljZVwiLFxuICAgICAgICAgICAgXCJQYWdlXCJcbiAgICAgICAgXSk7XG4gICAgICAgIHJlZ2lzdGVyVHlwZSh0eXBlcywgXCJTZXJ2aWNlXCIsIFtcbiAgICAgICAgICAgIFwiQ29yZVB1YmxpY1wiLFxuICAgICAgICAgICAgXCJTZXJ2aWNlXCIsXG4gICAgICAgICAgICBcIkNvbXBvbmVudFwiLFxuICAgICAgICAgICAgXCJNb2R1bGVcIlxuICAgICAgICBdKTtcbiAgICAgICAgcmVnaXN0ZXJUeXBlKHR5cGVzLCBcIlNjb1wiLCBbXG4gICAgICAgICAgICBcIkNvcmVcIixcbiAgICAgICAgICAgIFwiQ29yZVB1YmxpY1wiLFxuICAgICAgICAgICAgXCJSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJDb21wb25lbnRcIixcbiAgICAgICAgICAgIFwiU2VydmljZVwiXG4gICAgICAgIF0pO1xuICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiUmVzb3VyY2VcIiwgW1xuICAgICAgICAgICAgXCJTZXJ2aWNlXCJcbiAgICAgICAgXSk7XG4gICAgICAgIHJlZ2lzdGVyVHlwZSh0eXBlcywgXCJDb21wb25lbnRcIiwgW1xuICAgICAgICAgICAgXCJDb3JlUHVibGljXCIsXG4gICAgICAgICAgICBcIlNlcnZpY2VcIlxuICAgICAgICBdKTtcbiAgICAgICAgcmVnaXN0ZXJUeXBlKHR5cGVzLCBcIlBhZ2VcIiwgW1xuICAgICAgICAgICAgXCJTZXJ2aWNlXCJcbiAgICAgICAgXSk7XG4gICAgICAgIC8vT2JqZWN0LmZyZWV6ZSh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0eXBlcztcbiAgICB9KSgpO1xuICAgIC8qKlxuICAgICAqIElueWVjdG9yIGRlIGRlcGVuZGVuY2lhcy4gQXBpIHBhcmEgbGEgbWFuaXB1bGFjacOzbiBkZSBjb250ZW5lZG9yZXMgeSBkZXBlbmRlbmNpYXNcbiAgICAgKiBAY2xhc3NcbiAgICAgKi9cbiAgICB2YXIgSW5qZWN0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5zdGFuY2lhIGVsIElueWVjdG9yLiBQb3IgZGVmZWN0byBzZSBnZW5lcmEgdW4gY29udGVuZWRvciByb290XG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gSW5qZWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcnNOYW1lID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdCA9IG5ldyBib3R0bGVqc18xLkJvdHRsZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQ29tcHJ1ZWJhIHNpIHVuYSBjbGFzZSBzZSBoYSByZWdpc3RyYWRvIGVuIGVsIGNvbnRlbmVkb3Igcm9vdC4gRXF1aXZhbGUgYSBpbmplY3Rvci5nZXRDb250YWluZXIoXCJyb290XCIpLmV4aXN0cyhcIkRlcGVuZGVuY2lhXCIpO1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgTm9tYnJlIHJlZ2lzdHJhZG8gZGUgbGEgY2xhc2UgYSBjb21wcm9iYXJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RlcnNOYW1lLmhhcyhuYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9nZXRJbmplY3RvclJlZ2lzdGVyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9yZWdpc3RlcnNOYW1lLmdldChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcmVnaXN0ZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPYnRpZW5lIHVuYSBjbGFzZSBtZWRpYW50ZSBlbCBub21icmUgcmVnaXN0cmFkbyBkZWwgY29udGVuZWRvciByb290LiBFcXVpdmFsZSBhIGluamVjdG9yLmdldENvbnRhaW5lcihcInJvb3RcIikuZ2V0KFwiRGVwZW5kZW5jaWFcIik7XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gIHNlcnZpY2UgICAgRGVwZW5kZW5jaWEgYSBvYnRlbmVyLiBQdWVkZSBzZXIgZWwgbm9tYnJlIGNvbiBlbCBxdWUgc2UgaGEgcmVnaXN0cmFkbyBvIGxhIGNsYXNlXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX2dldEZyb21Cb3R0bGUgPSBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3QuY29udGFpbmVyW3NlcnZpY2VdO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSBlbCBwcm92aWRlciBwYXJhIHVuYSBjbGFzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgICAgIE5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGxhIGN1YWwgb2J0ZW5lciBlbCBwcm92aWRlclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9nZXRQcm92aWRlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9vdC5jb250YWluZXJbbmFtZSArIFwiUHJvdmlkZXJcIl07XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RyYSBlbCBub21icmUgaW5kaWNhZG8gcGFyYSBsYSBkZXBlbmRlbmNpYVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gICAgICAgICB0YXJnZXQgICAgICBEZXBlbmRlbmNpYSBlbiBsYSBjdWFsIHJlZ2lzdHJhciBlbCBub21icmVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgTm9tYnJlIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX3NldE5hbWUgPSBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgICAgICB2YXIgc2F2ZSA9IHRhcmdldC5wcm90b3R5cGUgfHwgdGFyZ2V0O1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNhdmUsIFwiX2luamVjdG9yTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSBlbCBub21icmUgcmVnaXN0cmFkbyBwYXJhIHVuYSBkZXBlbmRlbmNpYVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gICAgIHRhcmdldCAgICAgIE9iamV0byBlbiBlbCBjdWFsIGJ1c2NhciBlbCBub21icmVcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0TmFtZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQucHJvdG90eXBlXG4gICAgICAgICAgICAgICAgPyB0YXJnZXQucHJvdG90eXBlLl9pbmplY3Rvck5hbWVcbiAgICAgICAgICAgICAgICA6IHRhcmdldC5faW5qZWN0b3JOYW1lO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0cmEgZWwgdGlwbyBwYXJhIGxhIGRlcGVuZGVuY2lhXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSAgICAgICAgIHRhcmdldCAgICAgICAgICBEZXBlbmRlbmNpYSBlbiBsYSBjdWFsIHJlZ2lzdHJhciBlbCB0aXBvXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICBUaXBvIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX3NldFR5cGUgPSBmdW5jdGlvbiAodGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgc2F2ZSA9IHRhcmdldC5wcm90b3R5cGUgfHwgdGFyZ2V0O1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNhdmUsIFwiX2luamVjdG9yVHlwZVwiLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSBlbCB0aXBvIHJlZ2lzdHJhZG8gcGFyYSB1bmEgZGVwZW5kZW5jaWFcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9ICAgICB0YXJnZXQgICAgICBPYmpldG8gZW4gZWwgY3VhbCBidXNjYXIgZWwgdGlwb1xuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9nZXRUeXBlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5wcm90b3R5cGVcbiAgICAgICAgICAgICAgICA/IHRhcmdldC5wcm90b3R5cGUuX2luamVjdG9yVHlwZVxuICAgICAgICAgICAgICAgIDogdGFyZ2V0Ll9pbmplY3RvclR5cGU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIHVuIGNvbmp1bnRvIGRlIGRlcGVuZGVuY2lhcyBwYXJhIHVuIHRpcG8gY29uY3JldG8gdmFsaWRhbmRvIGVsIGFjY2Vzb1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgIHRhcmdldCAgICAgICAgIFNlcnZpY2lvIHBhcmEgZWwgY3VhbCBvYnRlbmVyIGluc3RhbmNpYXMgZGUgc3VzIGRlcGVuZGVuY2lhc1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgIFtkZXBlbmRlbmNpZXNdICBEZXBlbmRlbmNpYXMgY29uY3JldGFzIGEgb2J0ZW5lci4gRW4gY2FzbyBkZSBubyBpbmRpY2Fyc2Ugc2Ugb2J0aWVuZW4gdG9kYXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX2dldEZvciA9IGZ1bmN0aW9uICh0YXJnZXQsIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbmplY3RvclJlZ2lzdGVyID0gdGhpcy5fZ2V0SW5qZWN0b3JSZWdpc3Rlcih0YXJnZXQpLCByZXNvbHZlZERlcGVuZGVuY2llcyA9IFtdLCBzZXJ2aWNlTmFtZSA9IHNlcnZpY2VJbmplY3RvclJlZ2lzdGVyLm5hbWU7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMgfHwgc2VydmljZUluamVjdG9yUmVnaXN0ZXIuZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgLy9lYWNoIGRlcGVuZGVuY3kgdG8gcmVzb2x2ZVxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBkZXBlbmRlbmNpZXNfMSA9IGRlcGVuZGVuY2llczsgX2kgPCBkZXBlbmRlbmNpZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwZW5kZW5jeVRvUmVzb2x2ZSA9IGRlcGVuZGVuY2llc18xW19pXTtcbiAgICAgICAgICAgICAgICAvL2RlcGVuZGVuY3kgbXVzdCBleGlzdHNcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVRvUmVzb2x2ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3lUb1Jlc29sdmVJbmplY3RvclJlZ2lzdGVyID0gdGhpcy5fZ2V0SW5qZWN0b3JSZWdpc3RlcihkZXBlbmRlbmN5VG9SZXNvbHZlKSwgZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VG9SZXNvbHZlSW5qZWN0b3JSZWdpc3RlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY3lUb1Jlc29sdmVOYW1lID0gZGVwZW5kZW5jeVRvUmVzb2x2ZUluamVjdG9yUmVnaXN0ZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJ5IHRvIGdldCB0aGUgcHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlVHlwZSA9IHNlcnZpY2VJbmplY3RvclJlZ2lzdGVyLnR5cGUsIGRlcGVuZGVuY3lUeXBlID0gZGVwZW5kZW5jeVRvUmVzb2x2ZUluamVjdG9yUmVnaXN0ZXIudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlVHlwZSAmJiBkZXBlbmRlbmN5VHlwZSAmJiAoc2VydmljZVR5cGUuYWxsb3dBY2Nlc3MgPT09IHRydWUgfHwgc2VydmljZVR5cGUuYWxsb3dBY2Nlc3MuaW5kZXhPZihkZXBlbmRlbmN5VHlwZS5uYW1lKSAhPT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3kgPSB0aGlzLl9nZXRGcm9tQm90dGxlKGRlcGVuZGVuY3lUb1Jlc29sdmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBkZXBlbmRlbmN5IGlzIHRoZSBJbmplY3RvclNlcnZpY2UsIGNyZWF0ZSBkZSBpbnN0YW5jZSB3aXRoIHRoZSBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Gb3IgbW9yZSBpbmZvIHNlZSBJbmplY3RvclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUgPT09IFwiSW5qZWN0b3JTZXJ2aWNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jeSA9IGRlcGVuZGVuY3kuaW5zdGFuY2Uoc2VydmljZUluamVjdG9yUmVnaXN0ZXIuc2VydmljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkRGVwZW5kZW5jaWVzLnB1c2goZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZChzZXJ2aWNlTmFtZSwgZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3IoZGVwZW5kZW5jeVRvUmVzb2x2ZSwgc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkKHNlcnZpY2VOYW1lLCBkZXBlbmRlbmNpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlZERlcGVuZGVuY2llcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvXG4gICAgICAgICAqIEBwYXJhbSB7SUluamVjdG9yVHlwZX0gICB0eXBlICAgICAgICAgICAgVGlwbyBkZSBlbGVtZW50byBkZSBoYXp0aXZpdHlcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGVsIHNlcnZpY2lvLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2xhc3MgTXlTZXJ2aWNle1xuICAgICAgICAgKlxuICAgICAgICAgKiB9XG4gICAgICAgICAqIGxldCBteVNlcnZpY2VEZXBlbmRlbmNpZXMgPSBbXG4gICAgICAgICAqICAgICAgXCJTb21lRGVwZW5kZW5jeVwiXG4gICAgICAgICAqIF1cbiAgICAgICAgICogaW5qZWN0b3IuX3JlZ2lzdGVyU2VydmljZShcIk15U2VydmljZVwiLE15U2VydmljZSxteVNlcnZpY2VEZXBlbmRlbmNpZXMsKHNlcnZpY2UsZGVwZW5kZW5jaWVzLHJlc29sdmVkRGVwZW5kZW5jaWVzKT0+e1xuICAgICAgICAgKiAgICAgIGxldCBpbnN0YW5jZSA9IG5ldyBzZXJ2aWNlKC4uLnJlc29sdmVkRGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICogICAgICBpbnN0YW5jZS5kb1NvbWV0aGluZygpO1xuICAgICAgICAgKiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICogfSlcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAdGhyb3dzIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3lcbiAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWRcbiAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWRcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fcmVnaXN0ZXJTZXJ2aWNlID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSwgZGVwZW5kZW5jaWVzKSkge1xuICAgICAgICAgICAgICAgIC8vc3RvcmUgdHlwZSBpbiB0aGUgY29uc3RydWN0b3IgdG8gbWFuYWdlIHBlcm1pc2lvbnNcbiAgICAgICAgICAgICAgICB2YXIgaW5qZWN0b3JSZWdpc3RlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXMsXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFJlZ2lzdGVyKGluamVjdG9yUmVnaXN0ZXIpO1xuICAgICAgICAgICAgICAgIHZhciBib3R0bGVJbnN0YW5jZSA9IHRoaXMuX3Jvb3QuZmFjdG9yeShuYW1lLCBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmplY3RvclJlZ2lzdGVyID0gX3RoaXMuX2dldEluamVjdG9yUmVnaXN0ZXIobmFtZSksIHNlcnZpY2UgPSBpbmplY3RvclJlZ2lzdGVyLnNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNvbHZlZERlcGVuZGVuY2llcyA9IF90aGlzLl9nZXRGb3Ioc2VydmljZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgYSBjdXN0b20gZmFjdG9yeSBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZhY3RvcnkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkuY2FsbChudWxsLCBzZXJ2aWNlLCBpbmplY3RvclJlZ2lzdGVyLmRlcGVuZGVuY2llcywgcmVzb2x2ZWREZXBlbmRlbmNpZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyAoc2VydmljZS5iaW5kLmFwcGx5KHNlcnZpY2UsIFt2b2lkIDBdLmNvbmNhdChyZXNvbHZlZERlcGVuZGVuY2llcykpKSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fYWRkUmVnaXN0ZXIgPSBmdW5jdGlvbiAocmVnaXN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVycy5zZXQocmVnaXN0ZXIuc2VydmljZSwgcmVnaXN0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJzTmFtZS5zZXQocmVnaXN0ZXIubmFtZSwgcmVnaXN0ZXIpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0cmEgZGVwZW5kZW5jaWFzIGVuIHVuYSBjbGFzZVxuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBTZXJ2aWNpbyBlbiBlbCBjdWFsIHJlZ2lzdHJhciBsYXMgZGVwZW5kZW5jaWFzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICAgICAgZGVwZW5kZW5jaWVzICAgIERlcGVuZGVuY2lhcyBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyRGVwZW5kZW5jaWVzID0gZnVuY3Rpb24gKHNlcnZpY2UsIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWREZXBlbmRlbmNpZXMgPSB0aGlzLl9nZXRSZWdpc3RlcmVkRGVwZW5kZW5jaWVzKHNlcnZpY2UpO1xuICAgICAgICAgICAgLy9pZiB0aGUgZWxlbWVudCBhbHJlYWR5IGhhcyBkZXBlbmRlbmNpZXMsIGNvbmNhdFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzID0gJC51bmlxdWUoZGVwZW5kZW5jaWVzLmNvbmNhdChyZWdpc3RlcmVkRGVwZW5kZW5jaWVzKSk7XG4gICAgICAgICAgICBzZXJ2aWNlLnByb3RvdHlwZS4kaW5qZWN0ID0gZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY2llcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY3VwZXJhIGxhcyBkZXBlbmRlbmNpYXMgcmVnaXN0cmFkYXMgZW4gdW5hIGNsYXNlXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICBzZXJ2aWNlICAgICBTZXJ2aWNpbyBkZWwgY3VhbCByZWN1cGVyYXIgbGFzIGRlcGVuZGVuY2lhc1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0UmVnaXN0ZXJlZERlcGVuZGVuY2llcyA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5wcm90b3R5cGUuJGluamVjdCB8fCBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuYSBjbGFzZSBpbnN0YW5jaWFibGUgZ2VuZXJhbmRvIHVuIGZhY3RvcnkuIEZ1bmNpb25hIGRlIGZvcm1hIHNpbWlsYXIgYSBfcmVnaXN0ZXJTZXJ2aWNlIGNvbiBsYSBkaWZlcmVuY2lhIGRlIHF1ZSBsYSBmdW5jacOzbiBmYWN0b3J5IGluZGljYWRhIHNlIGVqZWN1dGFyw6EgY2FkYSB2ZXpcbiAgICAgICAgICogcXVlIHNlIHNvbGljaXRlIGxhIGRlcGVuZGVuY2lhIGdlbmVyYW5kbyB1bmEgaW5zdGFuY2lhIG51ZXZhIGRlIGxhIGNsYXNlLlxuICAgICAgICAgKiBAcGFyYW0ge0lJbmplY3RvclR5cGV9ICAgdHlwZSAgICAgICAgICAgIFRpcG8gZGUgZWxlbWVudG8gZGUgaGF6dGl2aXR5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2xhc3MgTXlDbGFzc3tcbiAgICAgICAgICpcbiAgICAgICAgICogfVxuICAgICAgICAgKiBsZXQgbXlDbGFzc0RlcGVuZGVuY2llcyA9IFtcbiAgICAgICAgICogICAgICBcIlNvbWVEZXBlbmRlbmN5XCJcbiAgICAgICAgICogXVxuICAgICAgICAgKiBpbmplY3Rvci5fcmVnaXN0ZXJUcmFuc2llbnQoXCJNeUNsYXNzXCIsTXlDbGFzcyxteUNsYXNzRGVwZW5kZW5jaWVzLChzZXJ2aWNlLGRlcGVuZGVuY2llcyxyZXNvbHZlZERlcGVuZGVuY2llcyk9PntcbiAgICAgICAgICogICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgc2VydmljZSguLi5yZXNvbHZlZERlcGVuZGVuY2llcyk7XG4gICAgICAgICAqICAgICAgaW5zdGFuY2UuZG9Tb21ldGhpbmcoKTtcbiAgICAgICAgICogICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAqIH0pXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5XG4gICAgICAgICAqIEB0aHJvd3MgSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkXG4gICAgICAgICAqIEB0aHJvd3MgSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX3JlZ2lzdGVyVHJhbnNpZW50ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlTmFtZShuYW1lLCBkZXBlbmRlbmNpZXMpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRSZWdpc3RlcihpbmplY3RvclJlZ2lzdGVyKTtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBmYWN0b3J5IGZ1bmNcbiAgICAgICAgICAgICAgICB2YXIgR2VuZXJpY0ZhY3RvcnkgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSB0aGF0XzEuX2dldEluamVjdG9yUmVnaXN0ZXIobmFtZSksIHNlcnZpY2UgPSBpbmplY3RvclJlZ2lzdGVyLnNlcnZpY2UsIGRlcGVuZGVuY2llc1RvSW5qZWN0ID0gaW5qZWN0b3JSZWdpc3Rlci5kZXBlbmRlbmNpZXMsIHJlc29sdmVkRGVwZW5kZW5jaWVzID0gdGhhdF8xLl9nZXRGb3Ioc2VydmljZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgYSBjdXN0b20gZmFjdG9yeSBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZhY3RvcnkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkuY2FsbChudWxsLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXNUb0luamVjdCwgcmVzb2x2ZWREZXBlbmRlbmNpZXMsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IChzZXJ2aWNlLmJpbmQuYXBwbHkoc2VydmljZSwgW3ZvaWQgMF0uY29uY2F0KHJlc29sdmVkRGVwZW5kZW5jaWVzKSkpKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3QuaW5zdGFuY2VGYWN0b3J5KG5hbWUsIEdlbmVyaWNGYWN0b3J5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkYSBsYSBkaXNwb25pYmlsaWRhZCBkZSB1biBub21icmUgeSBsYXMgZGVwZW5kZW5jaWFzLiBFbCBub21icmUgbm8gZGViZSBlc3RhciByZWdpc3RyYWRvIHkgZWwgcHJvcGlvIG5vbWJyZSBubyBwdWVkZSBlc3RhciByZWdpc3RyYWRvIGNvbW8gdW5hIGRlcGVuZGVuY2lhXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIG5hbWUgICAgICAgICAgICAgICAgTm9tYnJlIGEgdmFsaWRhclxuICAgICAgICAgKiBAcGFyYW0ge1N0aXJuZ1tdfSAgICBkZXBlbmRlbmNpZXMgICAgICAgIERlcGVuZGVuY2lhc1xuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAdGhyb3dzIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3lcbiAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWRcbiAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWRcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgaWYgKCEhbmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5leGlzdHMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY2llcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZChuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkKFwibmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gU2VydmljZSBkZSBoYXp0aXZpdHlcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyU2VydmljZSA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShleHBvcnRzLlRZUEVTLlNlcnZpY2UsIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RyYSB1biBzZXJ2aWNpbyBkZSB0aXBvIFNlcnZpY2UgZGUgaGF6dGl2aXR5IGluc3RhbmNpYWJsZS5cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyU2VydmljZVRyYW5zaWVudCA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyVHJhbnNpZW50KGV4cG9ydHMuVFlQRVMuU2VydmljZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuYSBpbnN0YW5jaWEuIE5vIHJlc3VlbHZlIGRlcGVuZGVuY2lhcy5cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGVsIHNlcnZpY2lvLlxuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgaW5zdGFuY2UgICAgICAgIFNlcnZpY2lvIGEgcmVnaXN0YXJcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogaW5qZWN0b3IucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UoXCIkXCIsJCk7XG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UgPSBmdW5jdGlvbiAobmFtZSwgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSwgZGVwZW5kZW5jaWVzKSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmplY3RvclJlZ2lzdGVyID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBleHBvcnRzLlRZUEVTLlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkUmVnaXN0ZXIoaW5qZWN0b3JSZWdpc3Rlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdC5jb25zdGFudChuYW1lLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0cmEgdW4gc2VydmljaW8gZGUgdGlwbyBDb3JlIGRlIGhhenRpdml0eVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyU2VydmljZVxuICAgICAgICAgKiBAc2VlIFRZUEVTXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJDb3JlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJTZXJ2aWNlKGV4cG9ydHMuVFlQRVMuQ29yZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuYSBjbGFzZSBkZSB0aXBvIENvcmUgZGUgaGF6dGl2aXR5IGluc3RhbmNpYWJsZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgY29uIGVsIGN1YWwgcmVnaXN0cmFyIGxhIGNsYXNlXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgICAgQ2xhc3MgICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgICAgICBkZXBlbmRlbmNpZXMgICAgRGVwZW5kZW5jaWFzIGRlIGxhIGNsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHF1ZSBhcGxpcXVlIGxhIGzDs2dpY2EgZGUgaW5zdGFuY2lhY2nDs25cbiAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJUcmFuc2llbnRcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlckNvcmVUcmFuc2llbnQgPSBmdW5jdGlvbiAobmFtZSwgQ2xhc3MsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJUcmFuc2llbnQoZXhwb3J0cy5UWVBFUy5Db3JlLCBuYW1lLCBDbGFzcywgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gQ29yZVB1YmxpYyBkZSBoYXp0aXZpdHlcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyQ29yZVB1YmxpYyA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShleHBvcnRzLlRZUEVTLkNvcmVQdWJsaWMsIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RyYSB1bmEgY2xhc2UgZGUgdGlwbyBDb3JlUHVibGljIGRlIGhhenRpdml0eSBpbnN0YW5jaWFibGVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGNvbiBlbCBjdWFsIHJlZ2lzdHJhciBsYSBjbGFzZVxuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgICAgIENsYXNzICAgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgICAgIGRlcGVuZGVuY2llcyAgICBEZXBlbmRlbmNpYXMgZGUgbGEgY2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcXVlIGFwbGlxdWUgbGEgbMOzZ2ljYSBkZSBpbnN0YW5jaWFjacOzblxuICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclRyYW5zaWVudFxuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyQ29yZVB1YmxpY1RyYW5zaWVudCA9IGZ1bmN0aW9uIChuYW1lLCBDbGFzcywgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChleHBvcnRzLlRZUEVTLkNvcmVQdWJsaWMsIG5hbWUsIENsYXNzLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0cmEgdW4gc2VydmljaW8gZGUgdGlwbyBTY28gZGUgaGF6dGl2aXR5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlclNjbyA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyVHJhbnNpZW50KGV4cG9ydHMuVFlQRVMuU2NvLCBuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0cmEgdW4gc2VydmljaW8gZGUgdGlwbyBNb2R1bGUgZGUgaGF6dGl2aXR5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShleHBvcnRzLlRZUEVTLk1vZHVsZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gQ29tcG9uZW50IGRlIGhhenRpdml0eVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyU2VydmljZVxuICAgICAgICAgKiBAc2VlIFRZUEVTXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJDb21wb25lbnQgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICBpZiAoc2VydmljZS5fY29tcG9uZW50TmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLl9jb21wb25lbnROYW1lID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShleHBvcnRzLlRZUEVTLkNvbXBvbmVudCwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuYSBjbGFzZSBkZSB0aXBvIFBhZ2UgZGUgaGF6dGl2aXR5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJUcmFuc2llbnRcbiAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyUGFnZSA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyVHJhbnNpZW50KGV4cG9ydHMuVFlQRVMuUGFnZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdHJhIHVuYSBjbGFzZSBkZSB0aXBvIFJlc291cmNlIGRlIGhhenRpdml0eVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyVHJhbnNpZW50XG4gICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlclJlc291cmNlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgaWYgKHNlcnZpY2UuX3Jlc291cmNlTmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLl9yZXNvdXJjZU5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJUcmFuc2llbnQoZXhwb3J0cy5UWVBFUy5SZXNvdXJjZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgdW5hIGluc3RhbmNpYSBkZWwgaW55ZWN0b3IuIFNpIHNlIGluZGljYSBlbCBwYXLDoW1ldHJvIHRhcmdldCBzZSBvYnRpZW5lIHVuYSBpbnN0YW5jaWEgZGVsIHNlcnZpY2lvIEluamVjdG9yU2VydmljZSBwYXJhIGVzZSB0YXJnZXQgaW5kaWNhZG8uXG4gICAgICAgICAqIFNpIG5vIHNlIGluZGljYSB0YXJnZXQgc2Ugb2J0aWVuZSB1bmEgaW5zdGFuY2lhIGRlIEluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAqIEBwYXJhbSAgIHsqfSAgICAgICAgIFt0YXJnZXRdICAgICAgICAgICAgVGFyZ2V0IHBhcmEgZWwgY3VhbCBvYnRlbmVyIGVsIHNlcnZpY2lvXG4gICAgICAgICAqIEByZXR1cm5zIHtJbmplY3Rvcn1cbiAgICAgICAgICogQHNlZSBJbmplY3RvclNlcnZpY2VcbiAgICAgICAgICogQHNlZSBJbmplY3RvclJlZ2lzdGVyU2VydmljZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5qZWN0b3IuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgdG9SZXR1cm47XG4gICAgICAgICAgICBpZiAoIUluamVjdG9yLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIEluamVjdG9yLl9pbnN0YW5jZSA9IG5ldyBJbmplY3RvcigpO1xuICAgICAgICAgICAgICAgIEluamVjdG9yLl9yZWdpc3Rlckluc3RhbmNlID0gbmV3IEluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlKEluamVjdG9yLl9pbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1RoZSBpbmplY3RvciBoYXMgYSBpbnRlcm5hbCBwZXJtaXNzaW9uIHJlc29sdmVyLCB0aGlzIHJlc29sdmVyIHJlcXVpcmVzIGFuIGhhenRpdml0eSB0eXBlIHRvIHdvcmsgYmVjYXVzZSBlYWNoIHR5cGUgaGFzIGFjY2VzcyB0byBkaWZmZXJlbnQgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAgLy9UbyBnZXQgdGhlIEluamVjdG9yU2VydmljZSB0aGF0IGNvdWxkIGdldCBkZXBlbmRlbmNpZXMgaXMgcmVxdWlyZWQgdGVsbCB3aGF0IHR5cGUgb2YgZWxlbWVudCBpcyByZXF1aXJpbmcgdGhlIGRlcGVuZGVuY3ksIHRvIHByZXZlbnQgdGhhdCBhbnlvbmUgY291bGQgZ2V0IGFueSBkZXBlbmRlbmN5LCBpcyBuZWNlc3NhcnkgcGFzcyB0aGUgZWxlbWVudCB0aGF0IHdhbnQgdG8gZ2V0IGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gbmV3IEluamVjdG9yU2VydmljZShJbmplY3Rvci5faW5zdGFuY2UsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b1JldHVybiA9IEluamVjdG9yLl9yZWdpc3Rlckluc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gSW5qZWN0b3I7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkluamVjdG9yID0gSW5qZWN0b3I7XG4gICAgdmFyIEluamVjdG9yU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEluamVjdG9yU2VydmljZShpbmplY3RvciwgdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJ2aWNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmplY3Rvci5fZ2V0Rm9yKHRhcmdldCwgc2VydmljZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmplY3Rvci5fZ2V0Rm9yKHRhcmdldCwgW3NlcnZpY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmV4aXN0cyA9IGluamVjdG9yLmV4aXN0cy5iaW5kKGluamVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIENvbXBydWViYSBzaSB1bmEgY2xhc2Ugc2UgaGEgcmVnaXN0cmFkbyBlbiBlbCBjb250ZW5lZG9yIHJvb3QuIEVxdWl2YWxlIGEgaW5qZWN0b3IuZ2V0Q29udGFpbmVyKFwicm9vdFwiKS5leGlzdHMoXCJEZXBlbmRlbmNpYVwiKTtcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fEZ1bmN0aW9ufSAgZGVwZW5kZW5jeSAgICBDbGFzZSBhIGNvbXByb2JhclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIEluamVjdG9yU2VydmljZS5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gT2J0aWVuZSB1bmEgY2xhc2UgbWVkaWFudGUgZWwgbm9tYnJlIHJlZ2lzdHJhZG8gZGVsIGNvbnRlbmVkb3Igcm9vdC4gRXF1aXZhbGUgYSBpbmplY3Rvci5nZXRDb250YWluZXIoXCJyb290XCIpLmdldChcIkRlcGVuZGVuY2lhXCIpO1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8RnVuY3Rpb259ICBkZXBlbmRlbmN5ICAgICAgRGVwZW5kZW5jaWEgYSBvYnRlbmVyXG4gICAgICAgICAqL1xuICAgICAgICBJbmplY3RvclNlcnZpY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkZXBlbmRlbmN5KSB7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBJbmplY3RvclNlcnZpY2U7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkluamVjdG9yU2VydmljZSA9IEluamVjdG9yU2VydmljZTtcbiAgICAvL01hcCBkeW5hbWljYWxseSB0aGUgbWV0aG9kc1xuICAgIHZhciBJbmplY3RvclJlZ2lzdGVyU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlKGluamVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgcHVibGlzaCA9IFtcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2VydmljZVwiLFxuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJTZXJ2aWNlVHJhbnNpZW50XCIsXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlckNvcmVcIixcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyQ29yZVRyYW5zaWVudFwiLFxuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJDb3JlUHVibGljXCIsXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlckNvcmVQdWJsaWNUcmFuc2llbnRcIixcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2NvXCIsXG4gICAgICAgICAgICAgICAgXCJyZWdpc3Rlck1vZHVsZVwiLFxuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJDb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2VydmljZUluc3RhbmNlXCIsXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlclBhZ2VcIixcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyUmVzb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyRGVwZW5kZW5jaWVzXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHB1Ymxpc2hfMSA9IHB1Ymxpc2g7IF9pIDwgcHVibGlzaF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBwdWJsaXNoXzFbX2ldO1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXSA9IGluamVjdG9yW21ldGhvZF0uYmluZChpbmplY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlO1xuICAgIH0oKSk7XG4gICAgZXhwb3J0cy5JbmplY3RvclJlZ2lzdGVyU2VydmljZSA9IEluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlO1xuICAgIC8vUmVnaXN0ZXIgSW5qZWN0b3IgYXMgYSBpbnN0YW50aWFibGUgc2VydmljZS5cbiAgICBJbmplY3Rvci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyU2VydmljZVRyYW5zaWVudChcIkluamVjdG9yU2VydmljZVwiLCBJbmplY3RvclNlcnZpY2UsIFtdLCBmdW5jdGlvbiAoc2VydmljZSwgZGVwZW5kZW5jaWVzLCByZXNvbHZlZERlcGVuZGVuY2llcywgcmVxdWVzdGVyKSB7XG4gICAgICAgIHJldHVybiBJbmplY3Rvci5nZXRJbnN0YW5jZShyZXF1ZXN0ZXIpO1xuICAgIH0pO1xufSk7XG4iXSwiZmlsZSI6ImRpL0luamVjdG9yLmpzIn0=
