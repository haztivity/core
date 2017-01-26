declare module '@haztivity/core/debug/Logger' {
	 let log: any;
	export { log as Logger };

}
declare module '@haztivity/core/debug' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { Logger } from '@haztivity/core/debug/Logger';

}
declare module '@haztivity/core/base/BaseError' {
	export class BaseError extends Error {
	    constructor(name: any, message: string);
	}

}
declare module '@haztivity/core/di/Errors' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { BaseError } from '@haztivity/core/base/BaseError';
	/**
	 * Error al intentar obtener una dependencia no registrada
	 */
	export class HaztivityDependencyNotRegisteredError extends BaseError {
	    constructor(dependency: string, target?: string);
	}
	/**
	 * Error al intentar registrar una dependencia ya registrada
	 */
	export class HaztivityDependencyAlreadyRegistered extends BaseError {
	    constructor(dependency: string);
	}
	/**
	 * Error al no indicarse un parámetro obligatorio
	 */
	export class HaztivityDependencyOptionRequired extends BaseError {
	    constructor(parameterName: any);
	}
	/**
	 * Error al definir una clase como dependencia de ella misma
	 */
	export class HaztivityDependencyHasItsOwnAsDependency extends BaseError {
	    constructor(dependency: string);
	}
	/**
	 * Error al intentar inyectar una dependencia a la que no se tiene acceso
	 */
	export class HaztivityDependencyAccessDenied extends BaseError {
	    constructor(target: string, dependency: string);
	}
	/**
	 * Error al intentar inyectar una dependencia a la que no se tiene acceso
	 */
	export class HaztivityDependencyNotValid extends BaseError {
	    constructor(target: string, dependencies: any);
	}

}
declare module '@haztivity/core/di/Injector' {
	/// <reference types="core-js" />
	import * as IBottle from '@haztivity/jspm_packages/npm/bottlejs@1.5.0/dist/bottle';
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
	export const TYPES: ITypes;
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
	export class Injector {
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
	export class InjectorService {
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
	export class InjectorRegisterService {
	    constructor(injector: any);
	}

}
declare module '@haztivity/core/di/decorators' {
	export interface IBaseParams {
	    name: string;
	    dependencies: any[];
	    factory?: Function;
	}
	export interface ICoreParams extends IBaseParams {
	    public?: boolean;
	    instantiable?: boolean;
	}
	export interface IModuleParams extends IBaseParams {
	}
	export interface IServiceParams extends IBaseParams {
	}
	export interface IScoParams extends IBaseParams {
	}
	export interface IPageParams extends IBaseParams {
	}
	export interface IResourceParams extends IBaseParams {
	}
	export interface IComponentParams extends IBaseParams {
	}
	export interface IServiceInstanceParams {
	    name: string;
	    instance: any;
	}
	/**
	 * Decorador para registrar una clase como Core.
	 * Si se indica el parámetro public se registrará la clase como CorePublic, en caso contrario como Core
	 * Si se indica el parámetro instantiable se registrará la clase como transient, en caso contrario como service
	 * @param {ICoreParams}     params
	 * @static
	 * @function
	 */
	export function Core(params: ICoreParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Module
	 * @param {IModuleParams}     params
	 * @static
	 * @function
	 */
	export function Module(params: IModuleParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Service
	 * @param {IServiceParams}     params
	 * @static
	 * @function
	 */
	export function Service(params: IServiceParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como ServiceInstance
	 * @param {IServiceInstanceParams}     params
	 * @static
	 * @function
	 */
	export function ServiceInstance(params: IServiceInstanceParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Sco
	 * @param {IScoParams}     params
	 * @static
	 * @function
	 */
	export function Sco(params: IScoParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Page
	 * @param {IPageParams}     params
	 * @static
	 * @function
	 */
	export function Page(params: IPageParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Recurso
	 * @param {IResourceParams}     params
	 * @static
	 * @function
	 */
	export function Resource(params: IResourceParams): (target: any) => void;
	/**
	 * Decorador para registrar una clase como Recurso
	 * @param {IResourceParams}     params
	 * @static
	 * @function
	 */
	export function Component(params: IComponentParams): (target: any) => void;
	/**
	 * Decorador para registrar las dependencias sin registrar la clase como inyectable
	 * @param {{dependencies:any[]}}     params
	 * @static
	 * @function
	 */
	export function Dependencies(params: {
	    dependencies: any[];
	}): (target: any) => void;

}
declare module '@haztivity/core/di' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { Injector, TYPES, IInjectorType, InjectorRegisterService, IInjectorRegisterService, InjectorService, IInjectorService } from '@haztivity/core/di/Injector';
	export * from '@haztivity/core/di/decorators';

}
declare module '@haztivity/core/jquery' {
	import * as $ from "jquery";
	export { $ as $ };

}
declare module '@haztivity/core/utils/EventEmitter' {
	/// <reference types="jquery" />
	import EventEmitter from "eventemitter2";
	export interface IEventHandler {
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): any;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): any;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): any;
	}
	export class EventEmitter {
	    protected _$: JQueryStatic;
	    protected _$context: JQuery;
	    globalEmitter: EventEmitter;
	    protected _namespace: String;
	    constructor(_$: JQueryStatic);
	    activate(global: EventEmitter, bind?: Object): void;
	    trigger(eventType: string | JQueryEventObject, ...extraParameters: any[]): any;
	    protected _attachNamespace(events: any): any;
	    /**
	     * Añade un handler para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
	     * características, incluido el uso de namespaces
	     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
	     * separados por
	     * espacios
	     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
	     * @param {Function}                handler Función ha invocar al emitirse el evento
	     * @returns {EventEmitter}
	     * @example
	     * function callback(e){
	     *      let data = e.data,
	     *          someVar = data.someVar;//"example"
	     *      //do something
	     * }
	     * eventEmitter.on("someEvent",{someVar:"example"},callback);
	     * @see http://api.jquery.com/on/
	     */
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): EventEmitter;
	    /**
	     * Elimina los handlers para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
	     * características, incluido el uso de namespaces
	     * @param {String}                  events  Eventos a eliminar. Se pueden añadir varios eventos separados por
	     * espacios
	     * @param {Function}                handler Función ha invocar al emitirse el evento
	     * @returns {EventEmitter}
	     * @example
	     * eventEmitter.off("someEvent");
	     * @see http://api.jquery.com/off/
	     */
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): EventEmitter;
	    /**
	     * Añade un handler para un evento que se auto elimina al lanzarse la primera vez. Hace uso del sistema de
	     * eventos de JQuery, se dispone de todas sus
	     * características, incluido el uso de namespaces
	     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
	     * separados por
	     * espacios
	     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
	     * @param {Function}                handler Función ha invocar al emitirse el evento
	     * @returns {EventEmitter}
	     * @example
	     * function callback(e){
	     *      let data = e.data,
	     *          someVar = data.someVar;//"example"
	     *      //do something
	     * }
	     * eventEmitter.on("someEvent",{someVar:"example"},callback);
	     * @see http://api.jquery.com/one/
	     */
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): EventEmitter;
	    destroy(): void;
	    /**
	     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
	     * @param {String}  name    Nombre del evento
	     * @returns {JQueryEventObject}
	     */
	    createEvent(name: string): JQueryEventObject;
	}

}
declare module '@haztivity/core/utils/EventEmitterFactory' {
	import { EventEmitter } from '@haztivity/core/utils/EventEmitter';
	export class EventEmitterFactory {
	    protected _EventEmitter: EventEmitter;
	    protected _globalEmitter: EventEmitter;
	    /**
	     * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
	     * @requires _EventEmitter
	     */
	    constructor(_EventEmitter: EventEmitter);
	    /**
	     * Genera una instancia de EventEmitter2
	     * @param {*}  bind     Object to be the context to bind and trigger events
	     * @returns {EventEmitter}
	     */
	    createEmitter(bind?: Object): EventEmitter;
	}

}
declare module '@haztivity/core/utils/String' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	/**
	 * Exporta StringJS.
	 */
	import { S } from '@haztivity/core/libs/String';
	export { S as S };

}
declare module '@haztivity/core/utils/DataOptions' {
	/// <reference types="jquery" />
	import { S } from '@haztivity/core/utils/String';
	export class DataOptions {
	    protected _$: any;
	    protected _S: S;
	    constructor(_$: any, _S: S);
	    static readonly EXTRACT_DATA_MODE: {
	        underscore: string;
	        hypen: string;
	        camel: string;
	    };
	    getDataOptions(element: JQuery, prefix: string, optPrefix?: string, mode?: string): {};
	}

}
declare module '@haztivity/core/utils' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	/**
	 * @module
	 * @description
	 * El módulo "utils" contiene utilidades para el desarrollo
	 */
	export { EventEmitterFactory } from '@haztivity/core/utils/EventEmitterFactory';
	export { IEventHandler, EventEmitter } from '@haztivity/core/utils/EventEmitter';
	export { S } from '@haztivity/core/utils/String';
	export { DataOptions } from '@haztivity/core/utils/DataOptions';

}
declare module '@haztivity/core/component/ComponentController' {
	/// <reference types="jquery" />
	import { EventEmitter, EventEmitterFactory, IEventHandler } from '@haztivity/core/utils';
	export abstract class ComponentController implements IEventHandler {
	    protected _$: JQueryStatic;
	    protected _EventEmitterFactory: EventEmitterFactory;
	    protected _destroyed: boolean;
	    protected _$element: JQuery;
	    protected _eventEmitter: EventEmitter;
	    protected _options: any;
	    /**
	     * Controlador base para los recursos
	     * @param {JQueryStatic}            _$
	     * @param {EventEmitterFactory}     _EventEmitterFactory
	     */
	    constructor(_$: JQueryStatic, _EventEmitterFactory: EventEmitterFactory);
	    /**
	     * Invocado al obtenerse el factory del DI para establecer las opciones
	     * @param {JQuery}  $element        Elemento del componente
	     */
	    activate($element: any): void;
	    /**
	     * Inicializa el componente
	     * @param {*}   options             Opciones para el componente obtenidos principalmente a través de atributos data-
	     * @param {*}   [config]            Parámetros para el controlador
	     */
	    abstract init(options: any, config?: any): any;
	    /**
	     * Indica si se ha invocado al método destroy
	     * @returns {boolean}
	     */
	    isDestroyed(): boolean;
	    /**
	     * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
	     */
	    destroy(): void;
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ComponentController;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ComponentController;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): ComponentController;
	}

}
declare module '@haztivity/core/component/Errors' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { BaseError } from '@haztivity/core/base/BaseError';
	/**
	 * Error al intentar registrar un componente inválido
	 */
	export class HaztivityComponentInvalidError extends BaseError {
	    constructor();
	}
	/**
	 * Error al intentar registrar un componente inválido
	 */
	export class HaztivityComponentAlreadyRegisteredError extends BaseError {
	    constructor(component: string);
	}
	/**
	 * Error al intentar registrar un componente inválido
	 */
	export class HaztivityComponentNameInvalidError extends BaseError {
	    constructor(component: string);
	}
	/**
	 * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
	 */
	export class HaztivityComponentNameRequiredError extends BaseError {
	    constructor($element: string);
	}
	/**
	 * Error al intentar inicializar un componente no registrado
	 */
	export class HaztivityComponentNotRegisteredError extends BaseError {
	    constructor(component: string);
	}
	/**
	 * Error de controlador invalido
	 */
	export class HaztivityInvalidComponentControllerError extends BaseError {
	    constructor(component: string);
	}

}
declare module '@haztivity/core/component/ComponentManager' {
	/// <reference types="core-js" />
	import { ComponentController } from '@haztivity/core/component/ComponentController';
	import { InjectorService } from '@haztivity/core/di';
	export class ComponentManager {
	    protected _Injector: InjectorService;
	    protected _S: any;
	    protected _components: Map<string, ComponentController>;
	    constructor(_Injector: InjectorService, _S: any);
	    /**
	     * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
	     * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
	     * estar registrado en el DI con el tipo Component
	     * @see Injector.registerComponent
	     */
	    add(component: ComponentController): void;
	    nameIsValid(name: string): boolean;
	    exists(name: string): ComponentController;
	    /**
	     * Añade un conjunto de componentes.
	     * @see ComponentManager#add
	     * @param {ComponentController[]}    components       Componentes a añadir
	     */
	    addAll(components: ComponentController[]): void;
	}

}
declare module '@haztivity/core/component/ComponentInitializer' {
	/// <reference types="jquery" />
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { InjectorService } from '@haztivity/core/di';
	import { ComponentManager } from '@haztivity/core/component/ComponentManager';
	import { ComponentController } from '@haztivity/core/component/ComponentController';
	import { DataOptions } from '@haztivity/core/utils';
	export class ComponentInitializer {
	    protected _$: JQueryStatic;
	    protected _ComponentManager: ComponentManager;
	    protected _InjectorService: InjectorService;
	    protected _S: any;
	    protected _DataOptions: DataOptions;
	    protected _prefix: string;
	    protected _camelPrefix: string;
	    protected _instanceDataName: string;
	    /**
	     * Inicializador de componentes.
	     * @class
	     * @param {JQueryStatic}                    _$
	     * @param {ComponentManager}                _ComponentManager
	     * @param {InjectorService}                 _InjectorService
	     * @param {String.JS}                       _S
	     * @param {DataOptions}                     _DataOptions
	     */
	    constructor(_$: JQueryStatic, _ComponentManager: ComponentManager, _InjectorService: InjectorService, _S: any, _DataOptions: DataOptions);
	    /**
	     * Inicializa todos los componentes en un contexto en concreto
	     * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
	     */
	    initialize($context: JQuery): ComponentController[];
	    /**
	     * Inicializa un componente en un elemento en concreto. El elemento ha de tener un componente válido indicado
	     * @param {JQuery}  $element            Elemento en el que inicializar el componente
	     * @param {*}       [config]            Configuración para la inicialización. Acepta:
	     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
	     * @param {*}       [config.data]       Datos y configuración para el controlador del componente
	     */
	    initializeOne($element: any, config?: any): any;
	    /**
	     * Obtiene los elementos DOM indicados como componentes
	     * @param {JQuery}      $context            Contexto en el cual buscar los componentes
	     * @param {number}      [initState=2]       Establece que componentes obtener. Se puede indicar:
	     *                                          0   se obtienen los componentes sin inicializar
	     *                                          1   se obtienen los componentes inicializados
	     *                                          2   se obtienen los componentes sin inicializar e inicializados
	     * @returns {JQuery}
	     */
	    getComponents($context: any, initState?: number): JQuery;
	    /**
	     * Obtiene los controladores de componentes
	     * @param {JQuery}      $context            Contexto en el cual buscar.
	     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
	     * @returns {Array}
	     */
	    getComponentsControllers($context: any, recursive?: boolean): any[];
	    protected _findElementsInContext($context: JQuery): JQuery;
	}

}
declare module '@haztivity/core/component' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { ComponentController } from '@haztivity/core/component/ComponentController';
	export { ComponentManager } from '@haztivity/core/component/ComponentManager';
	export { ComponentInitializer } from '@haztivity/core/component/ComponentInitializer';

}
declare module '@haztivity/core/sco/Errors' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { BaseError } from '@haztivity/core/base/BaseError';
	/**
	 * Error al no indicarse contexto para la aplicación
	 */
	export class HaztivityAppContextNotFound extends BaseError {
	    constructor();
	}
	/**
	 * Error al no indicarse contexto para las páginas
	 */
	export class HaztivityPagesContextNotFound extends BaseError {
	    constructor();
	}

}
declare module '@haztivity/core/resource/ResourceController' {
	/// <reference types="jquery" />
	import { EventEmitter, EventEmitterFactory, IEventHandler } from '@haztivity/core/utils';
	export abstract class ResourceController implements IEventHandler {
	    protected _$: JQueryStatic;
	    protected _EventEmitterFactory: EventEmitterFactory;
	    static readonly NAMESPACE: string;
	    static readonly ON_COMPLETED: string;
	    protected _destroyed: boolean;
	    protected _completed: boolean;
	    protected _$element: JQuery;
	    protected _eventEmitter: EventEmitter;
	    protected _options: any;
	    /**
	     * Controlador base para los recursos
	     * @param {JQueryStatic}            $
	     * @param {EventEmitterFactory}     EventEmitterFactory
	     */
	    constructor(_$: JQueryStatic, _EventEmitterFactory: EventEmitterFactory);
	    /**
	     * Invocado al obtenerse el factory del DI para establecer las opciones
	     * @param {JQuery}  $element        Elemento del recurso
	     */
	    activate($element: any): void;
	    /**
	     * Inicializa el componente
	     * @param {*}   options             Opciones para el componente obtenidos principalmente a través de atributos data-
	     * @param {*}   [config]            Parámetros para el controlador
	     */
	    abstract init(options: any, config?: any): any;
	    /**
	     * Obtiene la instancia del componente
	     */
	    abstract getInstance(): any;
	    /**
	     * Indica si se ha invocado al método destroy
	     * @returns {boolean}
	     */
	    isDestroyed(): boolean;
	    /**
	     * Realiza la comprobación de objetivo completado
	     * @returns {boolean}
	     */
	    isCompleted(): boolean;
	    protected _markAsCompleted(): void;
	    setOption(name: any, value: any): void;
	    getOption(name: any): any;
	    /**
	     * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
	     */
	    destroy(): void;
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ResourceController;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ResourceController;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): ResourceController;
	}

}
declare module '@haztivity/core/resource/Errors' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { BaseError } from '@haztivity/core/base/BaseError';
	/**
	 * Error al intentar registrar un recurso inválido
	 */
	export class HaztivityResourceInvalidError extends BaseError {
	    constructor();
	}
	/**
	 * Error al intentar registrar un recurso inválido
	 */
	export class HaztivityResourceAlreadyRegisteredError extends BaseError {
	    constructor(resource: string);
	}
	/**
	 * Error al intentar registrar un recurso inválido
	 */
	export class HaztivityResourceNameInvalidError extends BaseError {
	    constructor(resource: string);
	}
	/**
	 * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
	 */
	export class HaztivityResourceNameRequiredError extends BaseError {
	    constructor($element: string);
	}
	/**
	 * Error al intentar inicializar un recurso no registrado
	 */
	export class HaztivityResourceNotRegisteredError extends BaseError {
	    constructor(resource: string);
	}
	/**
	 * Error de controlador invalido
	 */
	export class HaztivityInvalidResourceControllerError extends BaseError {
	    constructor(resource: string);
	}

}
declare module '@haztivity/core/resource/ResourceManager' {
	/// <reference types="core-js" />
	import { ResourceController } from '@haztivity/core/resource/ResourceController';
	import { InjectorService } from '@haztivity/core/di';
	export class ResourceManager {
	    protected _Injector: InjectorService;
	    protected _S: any;
	    protected _resources: Map<string, ResourceController>;
	    constructor(_Injector: InjectorService, _S: any);
	    /**
	     * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
	     * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
	     * @see Injector.registerResource
	     */
	    add(resource: ResourceController): void;
	    nameIsValid(name: string): boolean;
	    exists(name: string): boolean;
	    /**
	     * Añade un conjunto de recursos.
	     * @see ResourceManager#add
	     * @param {ResourceController[]}    resources       Recursos a añadir
	     */
	    addAll(resources: ResourceController[]): void;
	}

}
declare module '@haztivity/core/resource/ResourceInitializer' {
	/// <reference types="jquery" />
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { InjectorService } from '@haztivity/core/di';
	import { ResourceManager } from '@haztivity/core/resource/ResourceManager';
	import { ResourceController } from '@haztivity/core/resource/ResourceController';
	import { DataOptions } from '@haztivity/core/utils';
	export interface IResourceInitializer {
	    initialize($context: JQuery): ResourceController[];
	    getResources($context: JQuery, initState?: number): JQuery;
	    getResourcesControllers($context: any): ResourceController[];
	    initializeOne($element: any, config: any): ResourceController;
	}
	export class ResourceInitializer {
	    protected _$: JQueryStatic;
	    protected _ResourceManager: ResourceManager;
	    protected _InjectorService: InjectorService;
	    protected _S: any;
	    protected _DataOptions: DataOptions;
	    protected _prefix: string;
	    protected _camelPrefix: string;
	    protected _instanceDataName: string;
	    constructor(_$: JQueryStatic, _ResourceManager: ResourceManager, _InjectorService: InjectorService, _S: any, _DataOptions: DataOptions);
	    /**
	     * Inicializa todos los recursos en un contexto en concreto
	     * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
	     */
	    initialize($context: JQuery): ResourceController[];
	    /**
	     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
	     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
	     * @param {*}       [config]            Configuración para la inicialización. Acepta:
	     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
	     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
	     */
	    initializeOne($element: any, config?: any): any;
	    /**
	     * Obtiene los elementos DOM indicados como recursos
	     * @param {JQuery}      $context            Contexto en el cual buscar los recursos
	     * @param {number}      [initState=2]       Establece que recursos obtener. Se puede indicar:
	     *                                          0   se obtienen los recursos sin inicializar
	     *                                          1   se obtienen los recursos inicializados
	     *                                          2   se obtienen los recursos sin inicializar e inicializados
	     * @returns {JQuery}
	     */
	    getResources($context: any, initState?: number): JQuery;
	    /**
	     * Obtiene los controladores de recursos
	     * @param {JQuery}      $context            Contexto en el cual buscar.
	     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
	     * @returns {Array}
	     */
	    getResourcesControllers($context: any, recursive?: boolean): any[];
	    protected _findElementsInContext($context: JQuery): JQuery;
	}

}
declare module '@haztivity/core/resource/ResourceInitializerService' {
	/// <reference types="jquery" />
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { ResourceInitializer, IResourceInitializer } from '@haztivity/core/resource/ResourceInitializer';
	import { ResourceController } from '@haztivity/core/resource/ResourceController';
	export class ResourceInitializerService implements IResourceInitializer {
	    /**
	     * Servicio del inicializador de recursos
	     * @class
	     * @param ResourceInitializer
	     */
	    constructor(ResourceInitializer: ResourceInitializer);
	    initialize($context: JQuery): ResourceController[];
	    getResources($context: JQuery, initState?: number): JQuery;
	    getResourcesControllers($context: any): ResourceController[];
	    /**
	     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
	     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
	     * @param {*}       [config]            Configuración para la inicialización. Acepta:
	     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
	     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
	     */
	    initializeOne($element: any, config?: any): any;
	}

}
declare module '@haztivity/core/resource' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { ResourceController } from '@haztivity/core/resource/ResourceController';
	export { ResourceManager } from '@haztivity/core/resource/ResourceManager';
	export { ResourceInitializerService } from '@haztivity/core/resource/ResourceInitializerService';

}
declare module '@haztivity/core/page/PageRegister' {
	/// <reference types="jquery" />
	import { IEventHandler, EventEmitter, EventEmitterFactory } from '@haztivity/core/utils';
	import { ResourceController } from '@haztivity/core/resource';
	export interface IPageOptions {
	    name: string;
	    template: string;
	    controller?: string;
	    resources?: ResourceController[];
	}
	export class PageRegister implements IEventHandler {
	    protected _EventEmitterFactory: EventEmitterFactory;
	    static readonly NAMESPACE: string;
	    protected _options: IPageOptions;
	    protected _eventEmitter: EventEmitter;
	    /**
	     * Almacena la información de una página.
	     * Tipo Core
	     * @class
	     * @param EventEmitterFactory
	     */
	    constructor(_EventEmitterFactory: EventEmitterFactory);
	    getResources(): ResourceController[];
	    /**
	     * Configura la clase nada más instanciarla
	     * @param options
	     */
	    activate(options: IPageOptions): void;
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): PageRegister;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): PageRegister;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): PageRegister;
	    /**
	     * Obtiene el nombre de la página
	     * @returns {string}
	     */
	    getName(): string;
	}

}
declare module '@haztivity/core/page/Errors' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { BaseError } from '@haztivity/core/base/BaseError';
	/**
	 * Error al tratar de registrar una página existente
	 */
	export class HaztivityPageAlreadyRegistered extends BaseError {
	    constructor(pageName: string);
	}
	/**
	 * Error al indicarse un nombre de página inválido
	 */
	export class HaztivityPageNameInvalid extends BaseError {
	    constructor(pageName: string);
	}
	/**
	 * Error al no generarse elemento en la página
	 */
	export class HaztivityPageElementError extends BaseError {
	    constructor(pageName: string);
	}

}
declare module '@haztivity/core/page/PageController' {
	/// <reference types="jquery" />
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { InjectorService } from '@haztivity/core/di';
	import { IPageOptions } from '@haztivity/core/page/PageRegister';
	import { EventEmitter } from '@haztivity/core/utils';
	import { ResourceController, ResourceInitializerService } from '@haztivity/core/resource';
	export interface IPageControllerOptions extends IPageOptions {
	    name: string;
	    template: string;
	}
	export interface IPageStore {
	    public?: any;
	    private?: any;
	}
	export interface IPageState {
	    completed: boolean;
	    visited: boolean;
	}
	export abstract class PageController {
	    _$: any;
	    InjectorService: InjectorService;
	    protected _ResourceInitializerService: ResourceInitializerService;
	    static readonly NAMESPACE: string;
	    static readonly ON_RENDERING: string;
	    static readonly ON_RENDERED: string;
	    static readonly ON_SHOW: string;
	    static readonly ON_SHOWN: string;
	    static readonly ON_COMPLETE_CHANGE: string;
	    static readonly ON_DESTROY: string;
	    static readonly CLASS_PAGE: string;
	    $element: any;
	    options: IPageOptions;
	    eventEmitter: EventEmitter;
	    state: IPageState;
	    store: IPageStore;
	    protected _resources: ResourceController[];
	    /**
	     * Controller base para todas las páginas.
	     * Tipo Page
	     * @class
	     * @param {JQueryStatic}    _$                   Objeto JQuery
	     * @param {InjectorService} InjectorService     Servicio del inyector
	     * @see Injector.TYPES
	     */
	    constructor(_$: any, InjectorService: InjectorService, _ResourceInitializerService: ResourceInitializerService);
	    /**
	     * Configura la clase nada más instanciarla
	     * @param {IPageControllerOptions}  options         Opciones para el controlador
	     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
	     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
	     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
	     */
	    activate(options: IPageControllerOptions, eventEmitter: EventEmitter, state: IPageState, store: IPageStore): void;
	    protected _getNumCompletedResources(): number;
	    isCompleted(forceCheck?: boolean): boolean;
	    render(): any;
	    protected _render(template: any): JQuery;
	    initializeResources(): ResourceController[];
	    protected _onResourceCompleted(e: any): void;
	    /**
	     * Gestiona la transición entre la página anterior y la nueva
	     * @param {JQuery}          $oldPage                    Página anterior
	     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
	     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
	     */
	    show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
	    /**
	     * Invocado al finalizar el proceso de animación
	     * @protected
	     */
	    protected _onShowEnd($oldPage: any, oldPageRelativePosition: any): void;
	    /**
	     * Realiza la animación correspondiente
	     * @param {JQuery}              $oldPage                Página anterior.
	     * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
	     * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
	     * @protected
	     */
	    protected _show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
	    /**
	     * Obtiene el DOM de la página
	     * @returns {JQuery}
	     */
	    getElement(): JQuery;
	    /**
	     * Invocado al solicitarse la destruccion de la página
	     */
	    protected _destroy(): void;
	}

}
declare module '@haztivity/core/page/GenericPageController' {
	/// <reference types="jquery" />
	import { PageController } from '@haztivity/core/page/PageController';
	export class GenericPageController extends PageController {
	    protected _render(template: any): JQuery;
	    protected _show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
	}

}
declare module '@haztivity/core/page/PageFactory' {
	import { IPageOptions } from '@haztivity/core/page/PageRegister';
	/**
	 * Factory para crear páginas genéricas
	 * @class PageFactory
	 */
	export class PageFactory {
	    /**
	     * Genera una página genérica
	     * @static
	     * @param {IPageOptions}    options     Opciones para la creación de la página
	     * @returns {Page}
	     */
	    static createPage(options: IPageOptions): any;
	}

}
declare module '@haztivity/core/page/PageImplementation' {
	import { PageRegister } from '@haztivity/core/page/PageRegister';
	import { PageController, IPageState, IPageStore } from '@haztivity/core/page/PageController';
	import { InjectorService } from '@haztivity/core/di';
	import { ResourceController } from '@haztivity/core/resource';
	export class PageImplementation {
	    protected _ResourceManager: any;
	    protected _Injector: InjectorService;
	    protected store: IPageStore;
	    protected _state: IPageState;
	    protected _page: PageRegister;
	    protected _controllerFactory: any;
	    protected _currentController: PageController;
	    protected _resources: ResourceController[];
	    /**
	     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
	     * @class
	     * @param Injector
	     */
	    constructor(_ResourceManager: any, _Injector: InjectorService);
	    /**
	     * Configura la clase nada más instanciarla
	     * @param {PageRegister}    page    Página registrada en el PageManager.
	     */
	    activate(page: PageRegister): void;
	    /**
	     * Obtiene el PageRegister asociado
	     * @returns {PageRegister}
	     */
	    getPage(): PageRegister;
	    /**
	     * Obtiene el estado actual
	     * @returns {IPageState}
	     */
	    getState(): IPageState;
	    /**
	     * Actualiza el estado
	     * @param {IPageState}  state       Estado a establecer
	     */
	    setState(state: IPageState): void;
	    /**
	     * Obtiene el nombre de la página
	     * @returns {string}
	     */
	    getPageName(): string;
	    /**
	     * Obtiene una instancia del controlador.
	     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
	     * @returns {PageController}
	     * @see PageController
	     */
	    getController(): PageController;
	    /**
	     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
	     */
	    detach(): void;
	    /**
	     * Desecha la instancia del controlador actual
	     */
	    stop(): this;
	}

}
declare module '@haztivity/core/page/PageManager' {
	/// <reference types="core-js" />
	import { PageRegister } from '@haztivity/core/page/PageRegister';
	import { PageImplementation } from '@haztivity/core/page/PageImplementation';
	import { EventEmitter, EventEmitterFactory } from '@haztivity/core/utils';
	export interface IPageManagerService {
	}
	export class PageManager {
	    protected _ResourceManager: any;
	    protected _EventEmitterFactory: EventEmitterFactory;
	    protected _PageImplementationFactory: any;
	    protected _pages: PageImplementation[];
	    protected _pagesMap: Map<string, number>;
	    protected _eventEmitter: EventEmitter;
	    constructor(_ResourceManager: any, _EventEmitterFactory: EventEmitterFactory, _PageImplementationFactory: any);
	    /**
	     * Indica el número de páginas registradas
	     * @returns {number}
	     */
	    count(): number;
	    /**
	     * Añade un conjunto de páginas.
	     * @param {PageRegister[]}          pages       Conjunto de páginas a añadir
	     */
	    addPages(pages: PageRegister[]): void;
	    /**
	     * Añade una página
	     * @param {Page}    page        Página a añadir
	     */
	    addPage(page: PageRegister): void;
	    protected _validatePageName(name: string): boolean;
	    /**
	     * Actualiza el mapa de nombre-índice de las páginas
	     */
	    remapPages(): void;
	    /**
	     * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
	     * @param {string}      name    Nombre de la página
	     * @returns {number}
	     */
	    getPageIndex(name: string): number;
	    /**
	     * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
	     * @param {number}  index   Índice de la página a obtener
	     * @returns {PageImplementation}
	     */
	    getPage(index: number): PageImplementation;
	    /**
	     * Obtiene una página por el nombre registrado. Si no se encuentra se devuelve undefined
	     * @param {string}  name    Nombre de la página a obtener
	     * @returns {PageImplementation}
	     * @see getPageIndex
	     * @see getPage
	     */
	    getPageByName(name: string): PageImplementation;
	    on(): void;
	    off(): void;
	}

}
declare module '@haztivity/core/page' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { PageRegister, IPageOptions } from '@haztivity/core/page/PageRegister';
	export { PageController, IPageControllerOptions, IPageState, IPageStore } from '@haztivity/core/page/PageController';
	export { PageFactory } from '@haztivity/core/page/PageFactory';
	export { PageImplementation } from '@haztivity/core/page/PageImplementation';
	export { PageManager } from '@haztivity/core/page/PageManager';

}
declare module '@haztivity/core/navigator/Navigator' {
	/// <reference types="jquery" />
	import { PageManager, PageImplementation } from '@haztivity/core/page';
	import { EventEmitter, EventEmitterFactory, IEventHandler } from '@haztivity/core/utils';
	export interface INavigatorPageData {
	    index: number;
	    name: string;
	}
	export interface INavigatorService {
	    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    isDisabled(): boolean;
	    setDisabled(disabled: boolean): void;
	    enable(): void;
	    disable(): void;
	    next(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    prev(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    getCurrentPageData(): INavigatorPageData;
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
	}
	export class Navigator implements IEventHandler, INavigatorService {
	    protected _$: JQueryStatic;
	    protected _PageManager: PageManager;
	    protected _EventEmitterFactory: EventEmitterFactory;
	    static readonly NAMESPACE: string;
	    static readonly ON_DRAW_PAGE: string;
	    static readonly ON_DISABLE: string;
	    static readonly ON_ENABLE: string;
	    static readonly ON_CHANGE_PAGE_END: string;
	    static readonly ON_CHANGE_PAGE_START: string;
	    protected static readonly ATTR_TRANSITION_TO: string;
	    protected static readonly ATTR_CURRENT: string;
	    protected _$context: JQuery;
	    protected _currentPage: PageImplementation;
	    protected _currentPageIndex: number;
	    protected _currentRenderProcess: JQueryDeferred<INavigatorPageData, INavigatorPageData>;
	    protected _eventEmitter: EventEmitter;
	    protected _disabled: boolean;
	    /**
	     * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
	     * @param {JQueryStatic}                _$
	     * @param {PageManager}                 _PageManager
	     * @param {EventEmitterFactory}         _EventEmitterFactory
	     */
	    constructor(_$: JQueryStatic, _PageManager: PageManager, _EventEmitterFactory: EventEmitterFactory);
	    activate($context: JQuery): void;
	    /**
	     * Navega a la página solicitada.
	     * Debe estar registrada en PageManager
	     * @param {Number} index    Índice de la página a navegar
	     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
	     * página. False si no se realiza el cambio
	     */
	    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    /**
	     * Devuelve un array con los índices de las páginas que hayan sido visitadas
	     * @returns {Number[]}
	     */
	    getVisitedPages(): Number[];
	    /**
	     * Devuelve el estado actual de deshabilitado
	     * @returns {boolean}
	     */
	    isDisabled(): boolean;
	    /**
	     * Establece el estado de deshabilitado
	     * @param {boolean}     disabled        Estado a establecer
	     */
	    setDisabled(disabled: boolean): void;
	    /**
	     * Habilita la navegación
	     */
	    enable(): void;
	    /**
	     * Deshabilita la navegación
	     */
	    disable(): void;
	    /**
	     * Retrocede a la página posterior si existe.
	     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
	     * página. False si no se realiza el cambio
	     */
	    next(): any;
	    /**
	     * Retrocede a la página anterior si existe.
	     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
	     * página. False si no se realiza el cambio
	     */
	    prev(): any;
	    /**
	     * Invocado al finalizarse la animación del cambio de página
	     * @param {PageImplementation}      newPage     Página activada
	     * @param {INavigatorPageData}      newPageData Datos de la página activada
	     * @param {PageImplementation}      oldPage     Página desactivada
	     * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
	     * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
	     * @private
	     */
	    protected _onPageShowEnd(newPage: PageImplementation, newPageData: INavigatorPageData, oldPage: PageImplementation, oldPageData: INavigatorPageData, defer: any): void;
	    /**
	     * Obtiene el índice de la página actual
	     * @returns {number}
	     */
	    getCurrentPageIndex(): number;
	    /**
	     * Obtiene la implementación de página actual
	     * @returns {PageImplementation}
	     */
	    getCurrentPage(): PageImplementation;
	    /**
	     * Devuelve los datos de la página actual
	     * @returns {INavigatorPageData}
	     */
	    getCurrentPageData(): INavigatorPageData;
	    /**
	     * @see EventEmitter#on
	     * @returns {Navigator}
	     */
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
	    /**
	     * @see EventEmitter#one
	     * @returns {Navigator}
	     */
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
	    /**
	     * @see EventEmitter#off
	     * @returns {Navigator}
	     */
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
	}

}
declare module '@haztivity/core/navigator/NavigatorService' {
	/// <reference types="jquery" />
	import { Navigator, INavigatorService, INavigatorPageData } from '@haztivity/core/navigator/Navigator';
	export class NavigatorService implements INavigatorService {
	    static readonly ON_DRAW_PAGE: string;
	    static readonly ON_DISABLE: string;
	    static readonly ON_ENABLE: string;
	    static readonly ON_CHANGE_PAGE_END: string;
	    static readonly ON_CHANGE_PAGE_START: string;
	    constructor(_Navigator: Navigator);
	    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    isDisabled(): boolean;
	    setDisabled(disabled: boolean): void;
	    enable(): void;
	    disable(): void;
	    next(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    prev(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
	    getCurrentPageData(): INavigatorPageData;
	    /**
	     * @see EventEmitter#on
	     */
	    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
	    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
	    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
	}

}
declare module '@haztivity/core/navigator' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { Navigator, INavigatorPageData } from '@haztivity/core/navigator/Navigator';
	export { NavigatorService } from '@haztivity/core/navigator/NavigatorService';

}
declare module '@haztivity/core/sco/Sco' {
	/// <reference types="jquery" />
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { EventEmitter, EventEmitterFactory } from '@haztivity/core/utils';
	import { PageRegister, PageManager } from '@haztivity/core/page';
	import { Navigator } from '@haztivity/core/navigator';
	import { ResourceManager } from '@haztivity/core/resource';
	import { ComponentManager, ComponentInitializer } from '@haztivity/core/component';
	import { ComponentController } from '@haztivity/core/component/ComponentController';
	export interface ISco {
	    on(): void;
	    run(): void;
	}
	export interface IScoOptions {
	    name: string;
	    pages: PageRegister[];
	    components?: ComponentController[];
	}
	export class ScoController implements ISco {
	    protected _Navigator: Navigator;
	    protected _PageManager: PageManager;
	    protected _ResourceManager: ResourceManager;
	    protected _EventEmitterFactory: EventEmitterFactory;
	    protected _ComponentManager: ComponentManager;
	    protected _ComponentInitializer: ComponentInitializer;
	    static readonly CLASS_CONTEXT: string;
	    static readonly CLASS_PAGES: string;
	    protected _eventEmitter: EventEmitter;
	    protected _options: IScoOptions;
	    protected _$context: JQuery;
	    protected _$pagesContainer: JQuery;
	    constructor(_Navigator: Navigator, _PageManager: PageManager, _ResourceManager: ResourceManager, _EventEmitterFactory: EventEmitterFactory, _ComponentManager: ComponentManager, _ComponentInitializer: ComponentInitializer);
	    activate(options: IScoOptions): ScoController;
	    on(): ScoController;
	    protected _init(): boolean;
	    run(): ScoController;
	}

}
declare module '@haztivity/core/sco/ScoFactory' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	import { ScoController, IScoOptions } from '@haztivity/core/sco/Sco';
	export class ScoFactory {
	    static createSco(options: IScoOptions): ScoController;
	    static registerSco(scoController: any, options: IScoOptions): any;
	}

}
declare module '@haztivity/core/sco' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export * from '@haztivity/core/sco/Errors';
	export { ScoController, IScoOptions, ISco } from '@haztivity/core/sco/Sco';
	export { ScoFactory } from '@haztivity/core/sco/ScoFactory';

}
declare module '@haztivity/core/scorm/ScormService' {
	/// <reference types="loglevel" />
	export class ScormService {
	    protected Logger: LogLevel;
	    static readonly VERSIONS: {
	        auto: string;
	        v12: string;
	        v2004: string;
	    };
	    protected _version: string;
	    protected _API: any;
	    protected constructor(Logger: LogLevel);
	    setVersion(version: any): void;
	    getAPIVersion(): string;
	    doLMSInitialize(): boolean;
	    doLMSFinish(): boolean;
	    doLMSGetValue(parameter: any): any;
	    doLMSSetValue(parameter: any, value: any): boolean;
	    doLMSCommit(): boolean;
	    doLMSGetLastError(): any;
	    doLMSGetErrorString(errorCode: any): any;
	    doLMSGetDiagnostic(errorCode: any): any;
	    LMSIsInitialized(): any;
	    ErrorHandler(): void;
	    cmiBooleanToJs(value: any): boolean;
	    getAPIHandle(): void;
	    protected _findAPI(win: any): void;
	    protected _getAPICall(funcname12: any, funcname2004: any): () => void;
	}

}
declare module '@haztivity/core/scorm' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export { ScormService } from '@haztivity/core/scorm/ScormService';

}
declare module '@haztivity/core/index' {
	/**
	 * @license
	 * Copyright Davinchi. All Rights Reserved.
	 */
	export * from '@haztivity/core/jquery';
	export { Logger } from '@haztivity/core/debug';
	export { InjectorService, IInjectorService, IInjectorRegisterService, Service, IServiceParams, ServiceInstance, IServiceInstanceParams, Module, IModuleParams, Sco, IScoParams, Dependencies, Page, IPageParams, Resource, IResourceParams, Component, IComponentParams } from '@haztivity/core/di';
	export { EventEmitter, EventEmitterFactory } from '@haztivity/core/utils';
	export { ScoFactory, ISco, IScoOptions, ScoController } from '@haztivity/core/sco';
	export { PageController, PageRegister, IPageOptions, PageFactory, PageManager } from '@haztivity/core/page';
	export { ResourceInitializerService, ResourceController, ResourceManager } from '@haztivity/core/resource';
	export { Navigator, INavigatorPageData, NavigatorService } from '@haztivity/core/navigator';
	export { ComponentController, ComponentManager, ComponentInitializer } from '@haztivity/core/component';
	export { ScormService } from '@haztivity/core/scorm';

}
