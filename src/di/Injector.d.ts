/// <reference types="core-js" />
import * as IBottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
export interface InjectorRegister {
}
export interface IInjectorMetadata {
    name: string;
    type: string;
}
export interface IInjectorType {
    name: string;
    allowAccess: boolean | String[];
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
export declare const TYPES: ITypes;
export interface IInjectorRegister {
    name: string;
    service: Function | Object;
    dependencies: any[];
    type: IInjectorType;
}
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
export declare class Injector {
    protected static _instance: Injector;
    protected static _registerInstance: InjectorRegisterService;
    protected _registers: Map<Object | Function, IInjectorRegister>;
    protected _registersName: Map<string, IInjectorRegister>;
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
    protected constructor();
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    exists(name: string): boolean;
    protected _getInjectorRegister(key: string | Object | Function): any;
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object}  service    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
     */
    protected _getFromBottle(service: string | Object): any;
    /**
     * Obtiene el provider para una clase
     * @param {String}  name        Nombre de la clase para la cual obtener el provider
     * @returns {any}
     * @private
     */
    _getProvider(name: any): any;
    /**
     * Registra el nombre indicado para la dependencia
     * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
     * @param {String}                  name        Nombre a registrar
     * @private
     */
    protected _setName(target: any, name: any): void;
    /**
     * Obtiene el nombre registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el nombre
     * @returns {String}
     * @private
     */
    protected _getName(target: any): any;
    /**
     * Registra el tipo para la dependencia
     * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
     * @param {String}                  type            Tipo a registrar
     * @private
     */
    protected _setType(target: any, type: any): void;
    /**
     * Obtiene el tipo registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el tipo
     * @returns {String}
     * @private
     */
    protected _getType(target: any): any;
    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {*}       target         Servicio para el cual obtener instancias de sus dependencias
     * @param {*}       [dependencies]  Dependencias concretas a obtener. En caso de no indicarse se obtienen todas
     * @returns {Array}
     * @protected
     */
    protected _getFor(target: any, dependencies?: any[]): any[];
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
    protected _registerService(type: IInjectorType, name: string, service: any, dependencies: any, factory?: Function): void;
    protected _addRegister(register: IInjectorRegister): void;
    /**
     * Registra dependencias en una clase
     * @param {*}                   service         Servicio en el cual registrar las dependencias
     * @param {String[]}            dependencies    Dependencias a registrar
     * @private
     */
    protected registerDependencies(service: any, dependencies: any): any;
    /**
     * Recupera las dependencias registradas en una clase
     * @param {*}   service     Servicio del cual recuperar las dependencias
     * @returns {Array<string>}
     * @private
     */
    protected _getRegisteredDependencies(service: any): string[];
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
    protected _registerTransient(type: IInjectorType, name: string, service: any, dependencies: any, factory?: Function): void;
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
    protected _validateName(name: any, dependencies: any): boolean;
    /**
     * Registra un servicio de tipo Service de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerService(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra un servicio de tipo Service de haztivity instanciable.
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerServiceTransient(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra una instancia. No resuelve dependencias.
     * @param {String}          name            Nombre del servicio.
     * @param {*}               instance        Servicio a registar
     * @example
     * injector.registerServiceInstance("$",$);
     */
    registerServiceInstance(name: string, instance: any): void;
    /**
     * Registra un servicio de tipo Core de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerCore(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra una clase de tipo Core de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class          Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    registerCoreTransient(name: string, Class: any, dependencies: any, factory?: Function): void;
    /**
     * Registra un servicio de tipo CorePublic de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerCorePublic(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra una clase de tipo CorePublic de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class           Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    registerCorePublicTransient(name: string, Class: any, dependencies: any, factory?: Function): void;
    /**
     * Registra un servicio de tipo Sco de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerSco(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra un servicio de tipo Module de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerModule(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra un servicio de tipo Component de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    registerComponent(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra una clase de tipo Page de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    registerPage(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Registra una clase de tipo Resource de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    registerResource(name: string, service: any, dependencies: any, factory?: Function): void;
    /**
     * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
     * Si no se indica target se obtiene una instancia de InjectorRegisterService
     * @param   {*}         [target]            Target para el cual obtener el servicio
     * @returns {Injector}
     * @see InjectorService
     * @see InjectorRegisterService
     */
    static getInstance(target?: any): any;
}
export interface IInjectorService {
    get(service: string | Object): any;
    exists(service: string | Object): boolean;
}
export declare class InjectorService {
    constructor(injector: any, target: any);
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String|Object|Function}  dependency    Clase a comprobar
     * @returns {boolean}
     */
    exists(dependency: string): boolean;
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object|Function}  dependency      Dependencia a obtener
     */
    get(dependency: string | Object | Function): any;
}
export interface IInjectorRegisterService {
    registerService(name: string, service: any, dependencies: any, factory?: Function): void;
    registerServiceTransient(name: string, service: any, dependencies: any, factory?: Function): void;
    registerCore(name: string, service: any, dependencies: any, factory?: Function): void;
    registerCoreTransient(name: string, Class: any, dependencies: any, factory?: Function): void;
    registerCorePublic(name: string, service: any, dependencies: any, factory?: Function): void;
    registerCorePublicTransient(name: string, Class: any, dependencies: any, factory?: Function): void;
    registerSco(name: string, service: any, dependencies: any, factory?: Function): void;
    registerModule(name: string, service: any, dependencies: any, factory?: Function): void;
    registerComponent(name: string, service: any, dependencies: any, factory?: Function): void;
    registerServiceInstance(name: string, instance: any): void;
    registerPage(name: string, service: any, dependencies: any, factory?: Function): void;
    registerResource(name: string, service: any, dependencies: any, factory?: Function): void;
    registerDependencies(service: any, dependencies: any[]): any;
}
export declare class InjectorRegisterService {
    constructor(injector: any);
}
