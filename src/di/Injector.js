System.register(["bottlejs", "./Errors"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var bottlejs_1, Errors_1, TYPES, Injector, InjectorService, InjectorRegisterService;
    return {
        setters: [
            function (bottlejs_1_1) {
                bottlejs_1 = bottlejs_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            //Create readonly types
            exports_1("TYPES", TYPES = (function () {
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
            })());
            /**
             * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
             * @class
             */
            Injector = (function () {
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
                    this._registerService(TYPES.Service, name, service, dependencies, factory);
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
                    this._registerTransient(TYPES.Service, name, service, dependencies, factory);
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
                            type: TYPES.Service,
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
                    this._registerService(TYPES.Core, name, service, dependencies, factory);
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
                    this._registerTransient(TYPES.Core, name, Class, dependencies, factory);
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
                    this._registerService(TYPES.CorePublic, name, service, dependencies, factory);
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
                    this._registerTransient(TYPES.CorePublic, name, Class, dependencies, factory);
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
                    this._registerTransient(TYPES.Sco, name, service, dependencies, factory);
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
                    this._registerService(TYPES.Module, name, service, dependencies, factory);
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
                    this._registerService(TYPES.Component, name, service, dependencies, factory);
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
                    this._registerTransient(TYPES.Page, name, service, dependencies, factory);
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
                    this._registerTransient(TYPES.Resource, name, service, dependencies, factory);
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
            exports_1("Injector", Injector);
            InjectorService = (function () {
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
            exports_1("InjectorService", InjectorService);
            //Map dynamically the methods
            InjectorRegisterService = (function () {
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
            exports_1("InjectorRegisterService", InjectorRegisterService);
            //Register Injector as a instantiable service.
            Injector.getInstance().registerServiceTransient("InjectorService", InjectorService, [], function (service, dependencies, resolvedDependencies, requester) {
                return Injector.getInstance(requester);
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9JbmplY3Rvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiYm90dGxlanNcIiwgXCIuL0Vycm9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGJvdHRsZWpzXzEsIEVycm9yc18xLCBUWVBFUywgSW5qZWN0b3IsIEluamVjdG9yU2VydmljZSwgSW5qZWN0b3JSZWdpc3RlclNlcnZpY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGJvdHRsZWpzXzFfMSkge1xuICAgICAgICAgICAgICAgIGJvdHRsZWpzXzEgPSBib3R0bGVqc18xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKEVycm9yc18xXzEpIHtcbiAgICAgICAgICAgICAgICBFcnJvcnNfMSA9IEVycm9yc18xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIHJlYWRvbmx5IHR5cGVzXG4gICAgICAgICAgICBleHBvcnRzXzEoXCJUWVBFU1wiLCBUWVBFUyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VhbFByb3BlcnR5KHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAvL09iamVjdC5mcmVlemUodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyVHlwZSh0eXBlcywgbmFtZSwgYWxsb3dBY2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWFsUHJvcGVydHkobmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFsbG93QWNjZXNzXCI6IHNlYWxQcm9wZXJ0eShhbGxvd0FjY2VzcylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVzW25hbWVdID0gb2JqO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdHlwZXMgPSB7fTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiQ29yZVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiQ29yZVB1YmxpY1wiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiTW9kdWxlXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgXCJDb3JlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ29yZVB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcnZpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlXCJcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiU2VydmljZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiQ29yZVB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcnZpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNb2R1bGVcIlxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyVHlwZSh0eXBlcywgXCJTY29cIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIkNvcmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDb3JlUHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiUmVzb3VyY2VcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIlNlcnZpY2VcIlxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyVHlwZSh0eXBlcywgXCJDb21wb25lbnRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIkNvcmVQdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGUodHlwZXMsIFwiUGFnZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiU2VydmljZVwiXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgLy9PYmplY3QuZnJlZXplKHR5cGVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZXM7XG4gICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW55ZWN0b3IgZGUgZGVwZW5kZW5jaWFzLiBBcGkgcGFyYSBsYSBtYW5pcHVsYWNpw7NuIGRlIGNvbnRlbmVkb3JlcyB5IGRlcGVuZGVuY2lhc1xuICAgICAgICAgICAgICogQGNsYXNzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEluamVjdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnN0YW5jaWEgZWwgSW55ZWN0b3IuIFBvciBkZWZlY3RvIHNlIGdlbmVyYSB1biBjb250ZW5lZG9yIHJvb3RcbiAgICAgICAgICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBJbmplY3RvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcnNOYW1lID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb290ID0gbmV3IGJvdHRsZWpzXzEuQm90dGxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvbiBDb21wcnVlYmEgc2kgdW5hIGNsYXNlIHNlIGhhIHJlZ2lzdHJhZG8gZW4gZWwgY29udGVuZWRvciByb290LiBFcXVpdmFsZSBhIGluamVjdG9yLmdldENvbnRhaW5lcihcInJvb3RcIikuZXhpc3RzKFwiRGVwZW5kZW5jaWFcIik7XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICAgIE5vbWJyZSByZWdpc3RyYWRvIGRlIGxhIGNsYXNlIGEgY29tcHJvYmFyXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLmV4aXN0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RlcnNOYW1lLmhhcyhuYW1lKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0SW5qZWN0b3JSZWdpc3RlciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcmVnaXN0ZXJzTmFtZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3JlZ2lzdGVycy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uIE9idGllbmUgdW5hIGNsYXNlIG1lZGlhbnRlIGVsIG5vbWJyZSByZWdpc3RyYWRvIGRlbCBjb250ZW5lZG9yIHJvb3QuIEVxdWl2YWxlIGEgaW5qZWN0b3IuZ2V0Q29udGFpbmVyKFwicm9vdFwiKS5nZXQoXCJEZXBlbmRlbmNpYVwiKTtcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9ICBzZXJ2aWNlICAgIERlcGVuZGVuY2lhIGEgb2J0ZW5lci4gUHVlZGUgc2VyIGVsIG5vbWJyZSBjb24gZWwgcXVlIHNlIGhhIHJlZ2lzdHJhZG8gbyBsYSBjbGFzZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0RnJvbUJvdHRsZSA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb290LmNvbnRhaW5lcltzZXJ2aWNlXTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgZWwgcHJvdmlkZXIgcGFyYSB1bmEgY2xhc2VcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgICAgIE5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGxhIGN1YWwgb2J0ZW5lciBlbCBwcm92aWRlclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX2dldFByb3ZpZGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3QuY29udGFpbmVyW25hbWUgKyBcIlByb3ZpZGVyXCJdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgZWwgbm9tYnJlIGluZGljYWRvIHBhcmEgbGEgZGVwZW5kZW5jaWFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gICAgICAgICB0YXJnZXQgICAgICBEZXBlbmRlbmNpYSBlbiBsYSBjdWFsIHJlZ2lzdHJhciBlbCBub21icmVcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICBuYW1lICAgICAgICBOb21icmUgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fc2V0TmFtZSA9IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhdmUgPSB0YXJnZXQucHJvdG90eXBlIHx8IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNhdmUsIFwiX2luamVjdG9yTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGVsIG5vbWJyZSByZWdpc3RyYWRvIHBhcmEgdW5hIGRlcGVuZGVuY2lhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9ICAgICB0YXJnZXQgICAgICBPYmpldG8gZW4gZWwgY3VhbCBidXNjYXIgZWwgbm9tYnJlXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0TmFtZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5wcm90b3R5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGFyZ2V0LnByb3RvdHlwZS5faW5qZWN0b3JOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRhcmdldC5faW5qZWN0b3JOYW1lO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgZWwgdGlwbyBwYXJhIGxhIGRlcGVuZGVuY2lhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9ICAgICAgICAgdGFyZ2V0ICAgICAgICAgIERlcGVuZGVuY2lhIGVuIGxhIGN1YWwgcmVnaXN0cmFyIGVsIHRpcG9cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgICAgVGlwbyBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9zZXRUeXBlID0gZnVuY3Rpb24gKHRhcmdldCwgdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZSA9IHRhcmdldC5wcm90b3R5cGUgfHwgdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2F2ZSwgXCJfaW5qZWN0b3JUeXBlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgZWwgdGlwbyByZWdpc3RyYWRvIHBhcmEgdW5hIGRlcGVuZGVuY2lhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9ICAgICB0YXJnZXQgICAgICBPYmpldG8gZW4gZWwgY3VhbCBidXNjYXIgZWwgdGlwb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX2dldFR5cGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQucHJvdG90eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRhcmdldC5wcm90b3R5cGUuX2luamVjdG9yVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0YXJnZXQuX2luamVjdG9yVHlwZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgdW4gY29uanVudG8gZGUgZGVwZW5kZW5jaWFzIHBhcmEgdW4gdGlwbyBjb25jcmV0byB2YWxpZGFuZG8gZWwgYWNjZXNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICB0YXJnZXQgICAgICAgICBTZXJ2aWNpbyBwYXJhIGVsIGN1YWwgb2J0ZW5lciBpbnN0YW5jaWFzIGRlIHN1cyBkZXBlbmRlbmNpYXNcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgIFtkZXBlbmRlbmNpZXNdICBEZXBlbmRlbmNpYXMgY29uY3JldGFzIGEgb2J0ZW5lci4gRW4gY2FzbyBkZSBubyBpbmRpY2Fyc2Ugc2Ugb2J0aWVuZW4gdG9kYXNcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0Rm9yID0gZnVuY3Rpb24gKHRhcmdldCwgZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5qZWN0b3JSZWdpc3RlciA9IHRoaXMuX2dldEluamVjdG9yUmVnaXN0ZXIodGFyZ2V0KSwgcmVzb2x2ZWREZXBlbmRlbmNpZXMgPSBbXSwgc2VydmljZU5hbWUgPSBzZXJ2aWNlSW5qZWN0b3JSZWdpc3Rlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMgfHwgc2VydmljZUluamVjdG9yUmVnaXN0ZXIuZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgICAgICAgICAvL2VhY2ggZGVwZW5kZW5jeSB0byByZXNvbHZlXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgZGVwZW5kZW5jaWVzXzEgPSBkZXBlbmRlbmNpZXM7IF9pIDwgZGVwZW5kZW5jaWVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVwZW5kZW5jeVRvUmVzb2x2ZSA9IGRlcGVuZGVuY2llc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVwZW5kZW5jeSBtdXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lUb1Jlc29sdmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3lUb1Jlc29sdmVJbmplY3RvclJlZ2lzdGVyID0gdGhpcy5fZ2V0SW5qZWN0b3JSZWdpc3RlcihkZXBlbmRlbmN5VG9SZXNvbHZlKSwgZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lUb1Jlc29sdmVJbmplY3RvclJlZ2lzdGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmN5VG9SZXNvbHZlTmFtZSA9IGRlcGVuZGVuY3lUb1Jlc29sdmVJbmplY3RvclJlZ2lzdGVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJ5IHRvIGdldCB0aGUgcHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VUeXBlID0gc2VydmljZUluamVjdG9yUmVnaXN0ZXIudHlwZSwgZGVwZW5kZW5jeVR5cGUgPSBkZXBlbmRlbmN5VG9SZXNvbHZlSW5qZWN0b3JSZWdpc3Rlci50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZVR5cGUgJiYgZGVwZW5kZW5jeVR5cGUgJiYgKHNlcnZpY2VUeXBlLmFsbG93QWNjZXNzID09PSB0cnVlIHx8IHNlcnZpY2VUeXBlLmFsbG93QWNjZXNzLmluZGV4T2YoZGVwZW5kZW5jeVR5cGUubmFtZSkgIT09IC0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3kgPSB0aGlzLl9nZXRGcm9tQm90dGxlKGRlcGVuZGVuY3lUb1Jlc29sdmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIGRlcGVuZGVuY3kgaXMgdGhlIEluamVjdG9yU2VydmljZSwgY3JlYXRlIGRlIGluc3RhbmNlIHdpdGggdGhlIHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRm9yIG1vcmUgaW5mbyBzZWUgSW5qZWN0b3JTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUgPT09IFwiSW5qZWN0b3JTZXJ2aWNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmN5ID0gZGVwZW5kZW5jeS5pbnN0YW5jZShzZXJ2aWNlSW5qZWN0b3JSZWdpc3Rlci5zZXJ2aWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkRGVwZW5kZW5jaWVzLnB1c2goZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZChzZXJ2aWNlTmFtZSwgZGVwZW5kZW5jeVRvUmVzb2x2ZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvcihkZXBlbmRlbmN5VG9SZXNvbHZlLCBzZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZChzZXJ2aWNlTmFtZSwgZGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZWREZXBlbmRlbmNpZXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWdpc3RyYSB1biBzZXJ2aWNpb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SUluamVjdG9yVHlwZX0gICB0eXBlICAgICAgICAgICAgVGlwbyBkZSBlbGVtZW50byBkZSBoYXp0aXZpdHlcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZWwgc2VydmljaW8uIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgICAgICogY2xhc3MgTXlTZXJ2aWNle1xuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogfVxuICAgICAgICAgICAgICAgICAqIGxldCBteVNlcnZpY2VEZXBlbmRlbmNpZXMgPSBbXG4gICAgICAgICAgICAgICAgICogICAgICBcIlNvbWVEZXBlbmRlbmN5XCJcbiAgICAgICAgICAgICAgICAgKiBdXG4gICAgICAgICAgICAgICAgICogaW5qZWN0b3IuX3JlZ2lzdGVyU2VydmljZShcIk15U2VydmljZVwiLE15U2VydmljZSxteVNlcnZpY2VEZXBlbmRlbmNpZXMsKHNlcnZpY2UsZGVwZW5kZW5jaWVzLHJlc29sdmVkRGVwZW5kZW5jaWVzKT0+e1xuICAgICAgICAgICAgICAgICAqICAgICAgbGV0IGluc3RhbmNlID0gbmV3IHNlcnZpY2UoLi4ucmVzb2x2ZWREZXBlbmRlbmNpZXMpO1xuICAgICAgICAgICAgICAgICAqICAgICAgaW5zdGFuY2UuZG9Tb21ldGhpbmcoKTtcbiAgICAgICAgICAgICAgICAgKiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgKiB9KVxuICAgICAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAgICAgKiBAdGhyb3dzIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3lcbiAgICAgICAgICAgICAgICAgKiBAdGhyb3dzIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZFxuICAgICAgICAgICAgICAgICAqIEB0aHJvd3MgSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9yZWdpc3RlclNlcnZpY2UgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSwgZGVwZW5kZW5jaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdG9yZSB0eXBlIGluIHRoZSBjb25zdHJ1Y3RvciB0byBtYW5hZ2UgcGVybWlzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSZWdpc3RlcihpbmplY3RvclJlZ2lzdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBib3R0bGVJbnN0YW5jZSA9IHRoaXMuX3Jvb3QuZmFjdG9yeShuYW1lLCBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSBfdGhpcy5fZ2V0SW5qZWN0b3JSZWdpc3RlcihuYW1lKSwgc2VydmljZSA9IGluamVjdG9yUmVnaXN0ZXIuc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZWREZXBlbmRlbmNpZXMgPSBfdGhpcy5fZ2V0Rm9yKHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgYSBjdXN0b20gZmFjdG9yeSBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmFjdG9yeSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5LmNhbGwobnVsbCwgc2VydmljZSwgaW5qZWN0b3JSZWdpc3Rlci5kZXBlbmRlbmNpZXMsIHJlc29sdmVkRGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgKHNlcnZpY2UuYmluZC5hcHBseShzZXJ2aWNlLCBbdm9pZCAwXS5jb25jYXQocmVzb2x2ZWREZXBlbmRlbmNpZXMpKSkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLl9hZGRSZWdpc3RlciA9IGZ1bmN0aW9uIChyZWdpc3Rlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcnMuc2V0KHJlZ2lzdGVyLnNlcnZpY2UsIHJlZ2lzdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJzTmFtZS5zZXQocmVnaXN0ZXIubmFtZSwgcmVnaXN0ZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgZGVwZW5kZW5jaWFzIGVuIHVuYSBjbGFzZVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIFNlcnZpY2lvIGVuIGVsIGN1YWwgcmVnaXN0cmFyIGxhcyBkZXBlbmRlbmNpYXNcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgICAgIGRlcGVuZGVuY2llcyAgICBEZXBlbmRlbmNpYXMgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlckRlcGVuZGVuY2llcyA9IGZ1bmN0aW9uIChzZXJ2aWNlLCBkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWREZXBlbmRlbmNpZXMgPSB0aGlzLl9nZXRSZWdpc3RlcmVkRGVwZW5kZW5jaWVzKHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSBlbGVtZW50IGFscmVhZHkgaGFzIGRlcGVuZGVuY2llcywgY29uY2F0XG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llcyA9ICQudW5pcXVlKGRlcGVuZGVuY2llcy5jb25jYXQocmVnaXN0ZXJlZERlcGVuZGVuY2llcykpO1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnByb3RvdHlwZS4kaW5qZWN0ID0gZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVjdXBlcmEgbGFzIGRlcGVuZGVuY2lhcyByZWdpc3RyYWRhcyBlbiB1bmEgY2xhc2VcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgc2VydmljZSAgICAgU2VydmljaW8gZGVsIGN1YWwgcmVjdXBlcmFyIGxhcyBkZXBlbmRlbmNpYXNcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fZ2V0UmVnaXN0ZXJlZERlcGVuZGVuY2llcyA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnByb3RvdHlwZS4kaW5qZWN0IHx8IFtdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgdW5hIGNsYXNlIGluc3RhbmNpYWJsZSBnZW5lcmFuZG8gdW4gZmFjdG9yeS4gRnVuY2lvbmEgZGUgZm9ybWEgc2ltaWxhciBhIF9yZWdpc3RlclNlcnZpY2UgY29uIGxhIGRpZmVyZW5jaWEgZGUgcXVlIGxhIGZ1bmNpw7NuIGZhY3RvcnkgaW5kaWNhZGEgc2UgZWplY3V0YXLDoSBjYWRhIHZlelxuICAgICAgICAgICAgICAgICAqIHF1ZSBzZSBzb2xpY2l0ZSBsYSBkZXBlbmRlbmNpYSBnZW5lcmFuZG8gdW5hIGluc3RhbmNpYSBudWV2YSBkZSBsYSBjbGFzZS5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0lJbmplY3RvclR5cGV9ICAgdHlwZSAgICAgICAgICAgIFRpcG8gZGUgZWxlbWVudG8gZGUgaGF6dGl2aXR5XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgICAgICogY2xhc3MgTXlDbGFzc3tcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICAgICAgKiBsZXQgbXlDbGFzc0RlcGVuZGVuY2llcyA9IFtcbiAgICAgICAgICAgICAgICAgKiAgICAgIFwiU29tZURlcGVuZGVuY3lcIlxuICAgICAgICAgICAgICAgICAqIF1cbiAgICAgICAgICAgICAgICAgKiBpbmplY3Rvci5fcmVnaXN0ZXJUcmFuc2llbnQoXCJNeUNsYXNzXCIsTXlDbGFzcyxteUNsYXNzRGVwZW5kZW5jaWVzLChzZXJ2aWNlLGRlcGVuZGVuY2llcyxyZXNvbHZlZERlcGVuZGVuY2llcyk9PntcbiAgICAgICAgICAgICAgICAgKiAgICAgIGxldCBpbnN0YW5jZSA9IG5ldyBzZXJ2aWNlKC4uLnJlc29sdmVkRGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgICAgICAgKiAgICAgIGluc3RhbmNlLmRvU29tZXRoaW5nKCk7XG4gICAgICAgICAgICAgICAgICogICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICogfSlcbiAgICAgICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5XG4gICAgICAgICAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWRcbiAgICAgICAgICAgICAgICAgKiBAdGhyb3dzIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5fcmVnaXN0ZXJUcmFuc2llbnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSwgZGVwZW5kZW5jaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSZWdpc3RlcihpbmplY3RvclJlZ2lzdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0XzEgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGUgZmFjdG9yeSBmdW5jXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgR2VuZXJpY0ZhY3RvcnkgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5qZWN0b3JSZWdpc3RlciA9IHRoYXRfMS5fZ2V0SW5qZWN0b3JSZWdpc3RlcihuYW1lKSwgc2VydmljZSA9IGluamVjdG9yUmVnaXN0ZXIuc2VydmljZSwgZGVwZW5kZW5jaWVzVG9JbmplY3QgPSBpbmplY3RvclJlZ2lzdGVyLmRlcGVuZGVuY2llcywgcmVzb2x2ZWREZXBlbmRlbmNpZXMgPSB0aGF0XzEuX2dldEZvcihzZXJ2aWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGEgY3VzdG9tIGZhY3RvcnkgZnVuY3Rpb24gaXMgcHJvdmlkZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZhY3RvcnkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jYWxsKG51bGwsIHNlcnZpY2UsIGRlcGVuZGVuY2llc1RvSW5qZWN0LCByZXNvbHZlZERlcGVuZGVuY2llcywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgKHNlcnZpY2UuYmluZC5hcHBseShzZXJ2aWNlLCBbdm9pZCAwXS5jb25jYXQocmVzb2x2ZWREZXBlbmRlbmNpZXMpKSkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdC5pbnN0YW5jZUZhY3RvcnkobmFtZSwgR2VuZXJpY0ZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBWYWxpZGEgbGEgZGlzcG9uaWJpbGlkYWQgZGUgdW4gbm9tYnJlIHkgbGFzIGRlcGVuZGVuY2lhcy4gRWwgbm9tYnJlIG5vIGRlYmUgZXN0YXIgcmVnaXN0cmFkbyB5IGVsIHByb3BpbyBub21icmUgbm8gcHVlZGUgZXN0YXIgcmVnaXN0cmFkbyBjb21vIHVuYSBkZXBlbmRlbmNpYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIG5hbWUgICAgICAgICAgICAgICAgTm9tYnJlIGEgdmFsaWRhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3Rpcm5nW119ICAgIGRlcGVuZGVuY2llcyAgICAgICAgRGVwZW5kZW5jaWFzXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICAgICAqIEB0aHJvd3MgSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeVxuICAgICAgICAgICAgICAgICAqIEB0aHJvd3MgSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkXG4gICAgICAgICAgICAgICAgICogQHRocm93cyBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUuX3ZhbGlkYXRlTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV4aXN0cyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmNpZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZChcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gU2VydmljZSBkZSBoYXp0aXZpdHlcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlclNlcnZpY2UgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShUWVBFUy5TZXJ2aWNlLCBuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgdW4gc2VydmljaW8gZGUgdGlwbyBTZXJ2aWNlIGRlIGhhenRpdml0eSBpbnN0YW5jaWFibGUuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyU2VydmljZVxuICAgICAgICAgICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJTZXJ2aWNlVHJhbnNpZW50ID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChUWVBFUy5TZXJ2aWNlLCBuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgdW5hIGluc3RhbmNpYS4gTm8gcmVzdWVsdmUgZGVwZW5kZW5jaWFzLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlbCBzZXJ2aWNpby5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgaW5zdGFuY2UgICAgICAgIFNlcnZpY2lvIGEgcmVnaXN0YXJcbiAgICAgICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgICAgICAgICAqIGluamVjdG9yLnJlZ2lzdGVyU2VydmljZUluc3RhbmNlKFwiJFwiLCQpO1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlclNlcnZpY2VJbnN0YW5jZSA9IGZ1bmN0aW9uIChuYW1lLCBpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSwgZGVwZW5kZW5jaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluamVjdG9yUmVnaXN0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUWVBFUy5TZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkUmVnaXN0ZXIoaW5qZWN0b3JSZWdpc3Rlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb290LmNvbnN0YW50KG5hbWUsIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gQ29yZSBkZSBoYXp0aXZpdHlcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlckNvcmUgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShUWVBFUy5Db3JlLCBuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgdW5hIGNsYXNlIGRlIHRpcG8gQ29yZSBkZSBoYXp0aXZpdHkgaW5zdGFuY2lhYmxlXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGNvbiBlbCBjdWFsIHJlZ2lzdHJhciBsYSBjbGFzZVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgICAgQ2xhc3MgICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgICAgIGRlcGVuZGVuY2llcyAgICBEZXBlbmRlbmNpYXMgZGUgbGEgY2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBxdWUgYXBsaXF1ZSBsYSBsw7NnaWNhIGRlIGluc3RhbmNpYWNpw7NuXG4gICAgICAgICAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJUcmFuc2llbnRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJDb3JlVHJhbnNpZW50ID0gZnVuY3Rpb24gKG5hbWUsIENsYXNzLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJUcmFuc2llbnQoVFlQRVMuQ29yZSwgbmFtZSwgQ2xhc3MsIGRlcGVuZGVuY2llcywgZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWdpc3RyYSB1biBzZXJ2aWNpbyBkZSB0aXBvIENvcmVQdWJsaWMgZGUgaGF6dGl2aXR5XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyU2VydmljZVxuICAgICAgICAgICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJDb3JlUHVibGljID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclNlcnZpY2UoVFlQRVMuQ29yZVB1YmxpYywgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlZ2lzdHJhIHVuYSBjbGFzZSBkZSB0aXBvIENvcmVQdWJsaWMgZGUgaGF6dGl2aXR5IGluc3RhbmNpYWJsZVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBjb24gZWwgY3VhbCByZWdpc3RyYXIgbGEgY2xhc2VcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgICAgIENsYXNzICAgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICAgICAgZGVwZW5kZW5jaWVzICAgIERlcGVuZGVuY2lhcyBkZSBsYSBjbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHF1ZSBhcGxpcXVlIGxhIGzDs2dpY2EgZGUgaW5zdGFuY2lhY2nDs25cbiAgICAgICAgICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclRyYW5zaWVudFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlckNvcmVQdWJsaWNUcmFuc2llbnQgPSBmdW5jdGlvbiAobmFtZSwgQ2xhc3MsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChUWVBFUy5Db3JlUHVibGljLCBuYW1lLCBDbGFzcywgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gU2NvIGRlIGhhenRpdml0eVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgKiBAc2VlIFRZUEVTXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyU2NvID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChUWVBFUy5TY28sIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWdpc3RyYSB1biBzZXJ2aWNpbyBkZSB0aXBvIE1vZHVsZSBkZSBoYXp0aXZpdHlcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgbmFtZSAgICAgICAgICAgIE5vbWJyZSBkZSBsYSBkZXBlbmRlbmNpYS4gRGViZSBzZXIgw7puaWNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgIHNlcnZpY2UgICAgICAgICBDbGFzZSBhIHJlZ2lzdHJhclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119ICAgICAgICBkZXBlbmRlbmNpZXMgICAgQ29uanVudG8gZGUgbm9tYnJlIGRlIGRlcGVuZGVuY2lhcyBhIGlueWVjdGFyLiBMYXMgZGVwZW5kZW5jaWFzIHF1ZSBwdWVkZSBpbnllY3RhciBlc3TDoW4gcmVzdHJpbmdpZGFzIHBvciBlbCB0aXBvIGRlIGVsZW1lbnRvIHJlZ2lzdHJhZG9cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgW2ZhY3RvcnldICAgICAgIEZ1bmNpw7NuIHBhcmEgbGEgaW5zdGFuY2lhY2nDs24gZGUgbGEgY2xhc2UuIERlYmUgZGV2b2x2ZXIgdW4gb2JqZXRvXG4gICAgICAgICAgICAgICAgICogQHNlZSBfcmVnaXN0ZXJTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJTZXJ2aWNlKFRZUEVTLk1vZHVsZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlZ2lzdHJhIHVuIHNlcnZpY2lvIGRlIHRpcG8gQ29tcG9uZW50IGRlIGhhenRpdml0eVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgKiBAc2VlIFRZUEVTXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3IucHJvdG90eXBlLnJlZ2lzdGVyQ29tcG9uZW50ID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5fY29tcG9uZW50TmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuX2NvbXBvbmVudE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyU2VydmljZShUWVBFUy5Db21wb25lbnQsIG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWdpc3RyYSB1bmEgY2xhc2UgZGUgdGlwbyBQYWdlIGRlIGhhenRpdml0eVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBuYW1lICAgICAgICAgICAgTm9tYnJlIGRlIGxhIGRlcGVuZGVuY2lhLiBEZWJlIHNlciDDum5pY29cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgc2VydmljZSAgICAgICAgIENsYXNlIGEgcmVnaXN0cmFyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gICAgICAgIGRlcGVuZGVuY2llcyAgICBDb25qdW50byBkZSBub21icmUgZGUgZGVwZW5kZW5jaWFzIGEgaW55ZWN0YXIuIExhcyBkZXBlbmRlbmNpYXMgcXVlIHB1ZWRlIGlueWVjdGFyIGVzdMOhbiByZXN0cmluZ2lkYXMgcG9yIGVsIHRpcG8gZGUgZWxlbWVudG8gcmVnaXN0cmFkb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICBbZmFjdG9yeV0gICAgICAgRnVuY2nDs24gcGFyYSBsYSBpbnN0YW5jaWFjacOzbiBkZSBsYSBjbGFzZS4gRGViZSBkZXZvbHZlciB1biBvYmpldG9cbiAgICAgICAgICAgICAgICAgKiBAc2VlIF9yZWdpc3RlclRyYW5zaWVudFxuICAgICAgICAgICAgICAgICAqIEBzZWUgVFlQRVNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5wcm90b3R5cGUucmVnaXN0ZXJQYWdlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChUWVBFUy5QYWdlLCBuYW1lLCBzZXJ2aWNlLCBkZXBlbmRlbmNpZXMsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVnaXN0cmEgdW5hIGNsYXNlIGRlIHRpcG8gUmVzb3VyY2UgZGUgaGF6dGl2aXR5XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG5hbWUgICAgICAgICAgICBOb21icmUgZGUgbGEgZGVwZW5kZW5jaWEuIERlYmUgc2VyIMO6bmljb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICBzZXJ2aWNlICAgICAgICAgQ2xhc2UgYSByZWdpc3RyYXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSAgICAgICAgZGVwZW5kZW5jaWVzICAgIENvbmp1bnRvIGRlIG5vbWJyZSBkZSBkZXBlbmRlbmNpYXMgYSBpbnllY3Rhci4gTGFzIGRlcGVuZGVuY2lhcyBxdWUgcHVlZGUgaW55ZWN0YXIgZXN0w6FuIHJlc3RyaW5naWRhcyBwb3IgZWwgdGlwbyBkZSBlbGVtZW50byByZWdpc3RyYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgIFtmYWN0b3J5XSAgICAgICBGdW5jacOzbiBwYXJhIGxhIGluc3RhbmNpYWNpw7NuIGRlIGxhIGNsYXNlLiBEZWJlIGRldm9sdmVyIHVuIG9iamV0b1xuICAgICAgICAgICAgICAgICAqIEBzZWUgX3JlZ2lzdGVyVHJhbnNpZW50XG4gICAgICAgICAgICAgICAgICogQHNlZSBUWVBFU1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEluamVjdG9yLnByb3RvdHlwZS5yZWdpc3RlclJlc291cmNlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIGRlcGVuZGVuY2llcywgZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5fcmVzb3VyY2VOYW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5fcmVzb3VyY2VOYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRyYW5zaWVudChUWVBFUy5SZXNvdXJjZSwgbmFtZSwgc2VydmljZSwgZGVwZW5kZW5jaWVzLCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgdW5hIGluc3RhbmNpYSBkZWwgaW55ZWN0b3IuIFNpIHNlIGluZGljYSBlbCBwYXLDoW1ldHJvIHRhcmdldCBzZSBvYnRpZW5lIHVuYSBpbnN0YW5jaWEgZGVsIHNlcnZpY2lvIEluamVjdG9yU2VydmljZSBwYXJhIGVzZSB0YXJnZXQgaW5kaWNhZG8uXG4gICAgICAgICAgICAgICAgICogU2kgbm8gc2UgaW5kaWNhIHRhcmdldCBzZSBvYnRpZW5lIHVuYSBpbnN0YW5jaWEgZGUgSW5qZWN0b3JSZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gICB7Kn0gICAgICAgICBbdGFyZ2V0XSAgICAgICAgICAgIFRhcmdldCBwYXJhIGVsIGN1YWwgb2J0ZW5lciBlbCBzZXJ2aWNpb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtJbmplY3Rvcn1cbiAgICAgICAgICAgICAgICAgKiBAc2VlIEluamVjdG9yU2VydmljZVxuICAgICAgICAgICAgICAgICAqIEBzZWUgSW5qZWN0b3JSZWdpc3RlclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBJbmplY3Rvci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvUmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUluamVjdG9yLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5qZWN0b3IuX2luc3RhbmNlID0gbmV3IEluamVjdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbmplY3Rvci5fcmVnaXN0ZXJJbnN0YW5jZSA9IG5ldyBJbmplY3RvclJlZ2lzdGVyU2VydmljZShJbmplY3Rvci5faW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vVGhlIGluamVjdG9yIGhhcyBhIGludGVybmFsIHBlcm1pc3Npb24gcmVzb2x2ZXIsIHRoaXMgcmVzb2x2ZXIgcmVxdWlyZXMgYW4gaGF6dGl2aXR5IHR5cGUgdG8gd29yayBiZWNhdXNlIGVhY2ggdHlwZSBoYXMgYWNjZXNzIHRvIGRpZmZlcmVudCBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vVG8gZ2V0IHRoZSBJbmplY3RvclNlcnZpY2UgdGhhdCBjb3VsZCBnZXQgZGVwZW5kZW5jaWVzIGlzIHJlcXVpcmVkIHRlbGwgd2hhdCB0eXBlIG9mIGVsZW1lbnQgaXMgcmVxdWlyaW5nIHRoZSBkZXBlbmRlbmN5LCB0byBwcmV2ZW50IHRoYXQgYW55b25lIGNvdWxkIGdldCBhbnkgZGVwZW5kZW5jeSwgaXMgbmVjZXNzYXJ5IHBhc3MgdGhlIGVsZW1lbnQgdGhhdCB3YW50IHRvIGdldCBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4gPSBuZXcgSW5qZWN0b3JTZXJ2aWNlKEluamVjdG9yLl9pbnN0YW5jZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gSW5qZWN0b3IuX3JlZ2lzdGVySW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIEluamVjdG9yO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkluamVjdG9yXCIsIEluamVjdG9yKTtcbiAgICAgICAgICAgIEluamVjdG9yU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSW5qZWN0b3JTZXJ2aWNlKGluamVjdG9yLCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlcnZpY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5qZWN0b3IuX2dldEZvcih0YXJnZXQsIHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5qZWN0b3IuX2dldEZvcih0YXJnZXQsIFtzZXJ2aWNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXN0cyA9IGluamVjdG9yLmV4aXN0cy5iaW5kKGluamVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uIENvbXBydWViYSBzaSB1bmEgY2xhc2Ugc2UgaGEgcmVnaXN0cmFkbyBlbiBlbCBjb250ZW5lZG9yIHJvb3QuIEVxdWl2YWxlIGEgaW5qZWN0b3IuZ2V0Q29udGFpbmVyKFwicm9vdFwiKS5leGlzdHMoXCJEZXBlbmRlbmNpYVwiKTtcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8RnVuY3Rpb259ICBkZXBlbmRlbmN5ICAgIENsYXNlIGEgY29tcHJvYmFyXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3JTZXJ2aWNlLnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uIE9idGllbmUgdW5hIGNsYXNlIG1lZGlhbnRlIGVsIG5vbWJyZSByZWdpc3RyYWRvIGRlbCBjb250ZW5lZG9yIHJvb3QuIEVxdWl2YWxlIGEgaW5qZWN0b3IuZ2V0Q29udGFpbmVyKFwicm9vdFwiKS5nZXQoXCJEZXBlbmRlbmNpYVwiKTtcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8RnVuY3Rpb259ICBkZXBlbmRlbmN5ICAgICAgRGVwZW5kZW5jaWEgYSBvYnRlbmVyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgSW5qZWN0b3JTZXJ2aWNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIEluamVjdG9yU2VydmljZTtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJJbmplY3RvclNlcnZpY2VcIiwgSW5qZWN0b3JTZXJ2aWNlKTtcbiAgICAgICAgICAgIC8vTWFwIGR5bmFtaWNhbGx5IHRoZSBtZXRob2RzXG4gICAgICAgICAgICBJbmplY3RvclJlZ2lzdGVyU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSW5qZWN0b3JSZWdpc3RlclNlcnZpY2UoaW5qZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHB1Ymxpc2ggPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2VydmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RlclNlcnZpY2VUcmFuc2llbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJDb3JlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyQ29yZVRyYW5zaWVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RlckNvcmVQdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJDb3JlUHVibGljVHJhbnNpZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyTW9kdWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyQ29tcG9uZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyU2VydmljZUluc3RhbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyUGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RlclJlc291cmNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZ2lzdGVyRGVwZW5kZW5jaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwdWJsaXNoXzEgPSBwdWJsaXNoOyBfaSA8IHB1Ymxpc2hfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBwdWJsaXNoXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1ttZXRob2RdID0gaW5qZWN0b3JbbWV0aG9kXS5iaW5kKGluamVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSW5qZWN0b3JSZWdpc3RlclNlcnZpY2U7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSW5qZWN0b3JSZWdpc3RlclNlcnZpY2VcIiwgSW5qZWN0b3JSZWdpc3RlclNlcnZpY2UpO1xuICAgICAgICAgICAgLy9SZWdpc3RlciBJbmplY3RvciBhcyBhIGluc3RhbnRpYWJsZSBzZXJ2aWNlLlxuICAgICAgICAgICAgSW5qZWN0b3IuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlclNlcnZpY2VUcmFuc2llbnQoXCJJbmplY3RvclNlcnZpY2VcIiwgSW5qZWN0b3JTZXJ2aWNlLCBbXSwgZnVuY3Rpb24gKHNlcnZpY2UsIGRlcGVuZGVuY2llcywgcmVzb2x2ZWREZXBlbmRlbmNpZXMsIHJlcXVlc3Rlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBJbmplY3Rvci5nZXRJbnN0YW5jZShyZXF1ZXN0ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6ImRpL0luamVjdG9yLmpzIn0=
