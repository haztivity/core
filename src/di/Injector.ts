/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as Bottle from "bottlejs";
debugger;
import * as arrUnique from "array-unique";
import {
    HaztivityDependencyHasItsOwnAsDependency,
    HaztivityDependencyAlreadyRegistered,
    HaztivityDependencyNotRegisteredError,
    HaztivityDependencyOptionRequired,
    HaztivityDependencyAccessDenied,
    HaztivityDependencyNotValid
} from "./Errors";
import * as IBottle from "bottlejs/dist/bottle";
export interface InjectorRegister {

}
export interface IInjectorMetadata {
    name: string;
    type: string;
}
export interface IInjectorType {
    name: string;
    allowAccess: boolean|String[];
}

export interface ITypes {
    Core: IInjectorType;
    CorePublic: IInjectorType;
    Service: IInjectorType;
    Page: IInjectorType;
    Module: IInjectorType;
    Sco: IInjectorType;
    Component: IInjectorType;
    Resource: IInjectorType;

}
//Create readonly types
export const TYPES: ITypes = <ITypes>(function () {
    function sealProperty(val) {
        //Object.freeze(val);
        return {
            writable: false,
            configurable: false,
            value: val
        };
    }

    function registerType(types, name, allowAccess) {
        let obj = {};
        Object.defineProperties(
            obj, {
                "name": sealProperty(name),
                "allowAccess": sealProperty(allowAccess)
            }
        );
        types[name] = obj;
    }

    let types = {};
    registerType(types, "Core", true);
    registerType(types, "CorePublic", true);
    registerType(
        types, "Module", [
            "Core",
            "CorePublic",
            "Service",
            "Page"
        ]
    );
    registerType(
        types, "Service", [
            "CorePublic",
            "Service",
            "Component",
            "Module"
        ]
    );
    registerType(
        types, "Sco", [
            "Core",
            "CorePublic",
            "Resource",
            "Component",
            "Service"
        ]
    );
    registerType(
        types, "Resource", [
            "Service"
        ]
    );
    registerType(
        types, "Component", [
            "CorePublic",
            "Service"
        ]
    );
    registerType(
        types, "Page", [
            "Service"
        ]
    );
    //Object.freeze(types);
    return types;
})();
export interface IInjectorRegister {
    name: string;
    service: Function|Object;
    dependencies: any[];
    type: IInjectorType;
}
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
export class Injector {
    protected static _instance: Injector;
    protected static _registerInstance: InjectorRegisterService;
    protected _registers: Map<Object|Function,IInjectorRegister> = new Map<Object|Function,IInjectorRegister>();
    protected _registersName: Map<string,IInjectorRegister> = new Map<string,IInjectorRegister>();
    protected _arrUnique= arrUnique;
    /**
     * Contenedor principal
     * @member {InjectorContainer} _root
     * @protected
     */
    protected _root: IBottle;

    /**
     * Instancia el Inyector. Por defecto se genera un contenedor root
     * @constructor
     */
    protected constructor() {
        this._root = new Bottle();
    }


    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    public exists(name: string): boolean {
        return this._registersName.has(name);
    }

    protected _getInjectorRegister(key: string|Object|Function): any {
        let result;
        if (typeof key == "string") {
            result = this._registersName.get(<string>key);
        } else {
            result = this._registers.get(key);
        }
        return result;
    }

    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object}  service    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
     */
    protected _getFromBottle(service: string|Object): any {
        return this._root.container[service];
    }

    /**
     * Obtiene el provider para una clase
     * @param {String}  name        Nombre de la clase para la cual obtener el provider
     * @returns {any}
     * @private
     */
    public _getProvider(name) {
        return this._root.container[`${name}Provider`];
    }

    /**
     * Registra el nombre indicado para la dependencia
     * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
     * @param {String}                  name        Nombre a registrar
     * @private
     */
    protected _setName(target, name) {
        let save = target.prototype || target;
        Object.defineProperty(
            save, "_injectorName", {
                configurable: false,
                writable: false,
                value: name
            }
        );
    }

    /**
     * Obtiene el nombre registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el nombre
     * @returns {String}
     * @private
     */
    protected _getName(target) {
        return target.prototype
            ? target.prototype._injectorName
            : target._injectorName;
    }

    /**
     * Registra el tipo para la dependencia
     * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
     * @param {String}                  type            Tipo a registrar
     * @private
     */
    protected _setType(target, type) {
        let save = target.prototype || target;
        Object.defineProperty(
            save, "_injectorType", {
                configurable: false,
                writable: false,
                value: type
            }
        );
    }

    /**
     * Obtiene el tipo registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el tipo
     * @returns {String}
     * @private
     */
    protected _getType(target) {
        return target.prototype
            ? target.prototype._injectorType
            : target._injectorType;
    }

    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {*}       target         Servicio para el cual obtener instancias de sus dependencias
     * @param {*}       [dependencies]  Dependencias concretas a obtener. En caso de no indicarse se obtienen todas
     * @returns {Array}
     * @protected
     */
    protected _getFor(target: any, dependencies?: any[]) {
        let serviceInjectorRegister = this._getInjectorRegister(target),
            resolvedDependencies = [],
            serviceName = serviceInjectorRegister.name;
        dependencies = dependencies || serviceInjectorRegister.dependencies;
        //each dependency to resolve
        for (let dependencyToResolve of dependencies) {
            //dependency must exists
            if (dependencyToResolve != undefined) {
                let dependencyToResolveInjectorRegister: IInjectorRegister = this._getInjectorRegister(
                    dependencyToResolve
                    ),
                    dependencyToResolveName: string;
                if (dependencyToResolveInjectorRegister != undefined) {
                    dependencyToResolveName = dependencyToResolveInjectorRegister.name;
                    //try to get the provider
                    let serviceType = serviceInjectorRegister.type,
                        dependencyType = dependencyToResolveInjectorRegister.type;
                    if (serviceType && dependencyType && (serviceType.allowAccess === true || (<string[]>serviceType.allowAccess).indexOf(
                            dependencyType.name
                        ) !== -1)) {
                        let dependency = this._getFromBottle(dependencyToResolveName);
                        //If the dependency is the InjectorService, create de instance with the service
                        //For more info see InjectorService
                        if (dependencyToResolveName === "InjectorService") {
                            dependency = dependency.instance(serviceInjectorRegister.service);
                        }
                        resolvedDependencies.push(dependency);
                    } else {//If doesn't has access to the requested dependency
                        throw new HaztivityDependencyAccessDenied(serviceName, dependencyToResolveName);
                    }
                } else {
                    throw new HaztivityDependencyNotRegisteredError(dependencyToResolve,serviceName);
                }
            } else {//If the dependency requested is null
                throw new HaztivityDependencyNotValid(serviceName, dependencies);
            }
        }
        return resolvedDependencies;
    }

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
    protected  _registerService(type: IInjectorType, name: string, service, dependencies, factory?: Function) {
        if (this._validateName(name, dependencies)) {
            //store type in the constructor to manage permisions
            let injectorRegister: IInjectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            let bottleInstance = this._root.factory(
                name, (container) => {
                    let injectorRegister = this._getInjectorRegister(name),
                        service = injectorRegister.service;
                    let resolvedDependencies = this._getFor(service);
                    //if a custom factory function is provided
                    if (typeof factory === "function") {
                        return factory.call(null, service, injectorRegister.dependencies, resolvedDependencies);
                    } else {
                        return new service(...resolvedDependencies);
                    }
                }
            );
        }
    }

    protected _addRegister(register: IInjectorRegister) {
        this._registers.set(register.service, register);
        this._registersName.set(register.name, register);
    }

    /**
     * Registra dependencias en una clase
     * @param {*}                   service         Servicio en el cual registrar las dependencias
     * @param {String[]}            dependencies    Dependencias a registrar
     * @private
     */
    protected registerDependencies(service, dependencies) {
        let registeredDependencies = this._getRegisteredDependencies(service);
        //if the element already has dependencies, concat
        debugger;
        dependencies = this._arrUnique(dependencies.concat(registeredDependencies));
        service.prototype.$inject = dependencies;
        return dependencies;
    }

    /**
     * Recupera las dependencias registradas en una clase
     * @param {*}   service     Servicio del cual recuperar las dependencias
     * @returns {Array<string>}
     * @private
     */
    protected _getRegisteredDependencies(service): string[] {
        return service.prototype.$inject || [];
    }

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
    protected _registerTransient(type: IInjectorType, name: string, service, dependencies, factory?: Function) {
        if (this._validateName(name, dependencies)) {
            let injectorRegister: IInjectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            let that = this;
            //create factory func
            let GenericFactory = function (container, params) {
                let injectorRegister = that._getInjectorRegister(name),
                    service = injectorRegister.service,
                    dependenciesToInject = injectorRegister.dependencies,
                    resolvedDependencies = that._getFor(service);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null, service, dependenciesToInject, resolvedDependencies, params);
                } else {
                    return new service(...resolvedDependencies);
                }
            };
            this._root.instanceFactory(name, <any>GenericFactory);
        }
    }

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
    protected _validateName(name, dependencies) {
        if (!!name) {
            if (!this.exists(name)) {
                if (dependencies.indexOf(name) === -1) {
                    return true;
                } else {
                    throw new HaztivityDependencyHasItsOwnAsDependency(name);
                }
            } else {
                throw new HaztivityDependencyAlreadyRegistered(name);
            }
        } else {
            throw new HaztivityDependencyOptionRequired("name");
        }
    }

    /**
     * Registra un servicio de tipo Service de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerService(name: string, service, dependencies, factory?: Function) {
        this._registerService(TYPES.Service, name, service, dependencies, factory);
    }

    /**
     * Registra un servicio de tipo Service de haztivity instanciable.
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerServiceTransient(name: string, service, dependencies, factory?: Function) {
        this._registerTransient(TYPES.Service, name, service, dependencies, factory);
    }

    /**
     * Registra una instancia. No resuelve dependencias.
     * @param {String}          name            Nombre del servicio.
     * @param {*}               instance        Servicio a registar
     * @example
     * injector.registerServiceInstance("$",$);
     */
    public registerServiceInstance(name: string, instance) {
        let dependencies = [];
        if (this._validateName(name, dependencies)) {
            let injectorRegister: IInjectorRegister = {
                name: name,
                type: TYPES.Service,
                dependencies: dependencies,
                service: instance
            };
            this._addRegister(injectorRegister);
            this._root.constant(name, instance);
        } else {
            throw new HaztivityDependencyAlreadyRegistered(name);
        }
    }

    /**
     * Registra un servicio de tipo Core de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerCore(name: string, service, dependencies, factory?: Function) {
        this._registerService(TYPES.Core, name, service, dependencies, factory);
    }

    /**
     * Registra una clase de tipo Core de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class          Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    public registerCoreTransient(name: string, Class, dependencies, factory?: Function) {
        this._registerTransient(TYPES.Core, name, Class, dependencies, factory);
    }

    /**
     * Registra un servicio de tipo CorePublic de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerCorePublic(name: string, service, dependencies, factory?: Function) {
        this._registerService(TYPES.CorePublic, name, service, dependencies, factory);
    }

    /**
     * Registra una clase de tipo CorePublic de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class           Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    public registerCorePublicTransient(name: string, Class, dependencies, factory?: Function) {
        this._registerTransient(TYPES.CorePublic, name, Class, dependencies, factory);
    }

    /**
     * Registra un servicio de tipo Sco de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerSco(name: string, service, dependencies, factory?: Function) {
        this._registerTransient(TYPES.Sco, name, service, dependencies, factory);
    }

    /**
     * Registra un servicio de tipo Module de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerModule(name: string, service, dependencies, factory?: Function) {
        this._registerService(TYPES.Module, name, service, dependencies, factory);
    }

    /**
     * Registra un servicio de tipo Component de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    public registerComponent(name: string, service, dependencies, factory?: Function) {
        if (service._componentName == undefined) {
            service._componentName = name;
        }
        this._registerService(TYPES.Component, name, service, dependencies, factory);
    }

    /**
     * Registra una clase de tipo Page de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    public registerPage(name: string, service, dependencies, factory?: Function) {
        this._registerTransient(TYPES.Page, name, service, dependencies, factory);
    }

    /**
     * Registra una clase de tipo Resource de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    public registerResource(name: string, service, dependencies, factory?: Function) {
        if (service._resourceName == undefined) {
            service._resourceName = name;
        }
        this._registerTransient(TYPES.Resource, name, service, dependencies, factory);
    }

    /**
     * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
     * Si no se indica target se obtiene una instancia de InjectorRegisterService
     * @param   {*}         [target]            Target para el cual obtener el servicio
     * @returns {Injector}
     * @see InjectorService
     * @see InjectorRegisterService
     */
    public static getInstance(target?) {
        let toReturn;
        if (!Injector._instance) {
            Injector._instance = new Injector();
            Injector._registerInstance = new InjectorRegisterService(Injector._instance);
        }
        //The injector has a internal permission resolver, this resolver requires an haztivity type to work because each type has access to different dependencies.
        //To get the InjectorService that could get dependencies is required tell what type of element is requiring the dependency, to prevent that anyone could get any dependency, is necessary pass the element that want to get dependencies
        if (target) {
            toReturn = new InjectorService(Injector._instance, target);
        } else {
            toReturn = Injector._registerInstance;
        }
        return toReturn;
    }

}

export interface IInjectorService {
    get(service: string|Object): any;
    exists(service: string|Object): boolean;
}
export class InjectorService {
    constructor(injector, target) {
        this.get = function (service) {
            let result;
            if (Array.isArray(service)) {
                result = injector._getFor(target, service);
            } else {
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
    public exists(dependency: string): boolean {
        return undefined;
    }

    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object|Function}  dependency      Dependencia a obtener
     */
    public get(dependency: string|Object|Function): any {
    }
}
export interface IInjectorRegisterService {
    registerService(name: string, service, dependencies, factory?: Function): void;
    registerServiceTransient(name: string, service, dependencies, factory?: Function): void;
    registerCore(name: string, service, dependencies, factory?: Function): void;
    registerCoreTransient(name: string, Class, dependencies, factory?: Function): void;
    registerCorePublic(name: string, service, dependencies, factory?: Function): void;
    registerCorePublicTransient(name: string, Class, dependencies, factory?: Function): void;
    registerSco(name: string, service, dependencies, factory?: Function): void;
    registerModule(name: string, service, dependencies, factory?: Function): void;
    registerComponent(name: string, service, dependencies, factory?: Function): void;
    registerServiceInstance(name: string, instance): void;
    registerPage(name: string, service, dependencies, factory?: Function): void;
    registerResource(name: string, service, dependencies, factory?: Function): void;
    registerDependencies(service: any, dependencies: any[]);
}
//Map dynamically the methods
export class InjectorRegisterService {
    constructor(injector) {
        let publish = [
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
        for (let method of publish) {
            this[method] = injector[method].bind(injector);
        }
    }
}
//Register Injector as a instantiable service.
Injector.getInstance().registerServiceTransient(
    "InjectorService", InjectorService, [], (service, dependencies, resolvedDependencies, requester) => {
        return Injector.getInstance(requester);
    }
);