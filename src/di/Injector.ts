/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Bottle} from "bottlejs";
import {DependencyHasItsOwnAsDependency,DependencyAlreadyRegistered,DependencyNotRegisteredError,DependencyOptionRequired,DependencyAccessDenied,DependencyNotValid} from "./Errors";
import * as IBottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
export interface InjectorRegister{

}
export interface IInjectorMetadata{
    name:string;
    type:string;
}
export interface IInjectorType{
    name:string;
    allowAccess:boolean|String[];
}

export interface ITypes{
    Core:IInjectorType;
    CorePublic:IInjectorType;
    Service:IInjectorType;
    Page:IInjectorType;
    Module:IInjectorType;
    Sco:IInjectorType;
    Component:IInjectorType;
    Resource:IInjectorType;

}
//Create readonly types
export const TYPES:ITypes = <ITypes>(function(){
    function sealProperty(val){
        return{
            writable:false,
            configurable:false,
            value:val
        };
        Object.freeze(val);
    }
    function registerType(types,name,allowAccess){
        let obj = {};
        Object.defineProperties(obj,{
            "name":sealProperty(name),
            "allowAccess":sealProperty(allowAccess)
        });
        types[name] = obj;
    }
    let types = {};
    registerType(types,"Core",true);
    registerType(types,"CorePublic",true);
    registerType(types,"Module",[
        "CorePublic",
        "Service",
        "Page"
    ]);
    registerType(types,"Service",[
        "CorePublic",
        "Service",
        "Module"
    ]);
    registerType(types,"Sco",[
        "Core",
        "CorePublic",
        "Resource",
        "Component",
        "Service"
    ]);
    registerType(types,"Resource",[
        "Service"
    ]);
    registerType(types,"Component",[
        "Service"
    ]);
    registerType(types,"Page",[
        "Service"
    ]);
    Object.freeze(types);
    return types;
})();
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
export class Injector{
    protected static _instance:Injector;
    protected static _registerInstance:InjectorRegisterService;
    /**
     * Contenedor principal
     * @member {InjectorContainer} _root
     * @protected
     */
    protected _root:IBottle;
    /**
     * Instancia el Inyector. Por defecto se genera un contenedor root
     * @constructor
     */
    protected constructor(){
        this._root = new Bottle();
    }


    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    public exists(name: string): boolean {
        return this._exists(name,this._root.container);
    }
    protected _exists(name:string,container:IBottle.IContainer){
        return container.$list().indexOf(name) !== -1;
    }
    /**
     * @description Comprueba si una clase se ha registrado en un contenedor en concreto. Equivale a injector.getContainer("contenedor").exists("Dependencia");
     * Si el contenedor no existe se resuelve como falso
     * @param {String}  name            Nombre registrado de la clase a comprobar
     * @param {String}  containerName   Nombre del contenedor en el cual comprobar
     * @returns {boolean}
     */
    public existsIn(name: string, containerName: string): boolean {
        let exists = false;
        if(this.exists(containerName)){
            let container = this._root[containerName];
            exists = this._exists(name,container);
        }
        return exists;
    }
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object}  dependency    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
     */
    protected _get(dependency: string|Object): any {
        return this._root.container[dependency];
    }

    /**
     * Obtiene el provider para una clase
     * @param {String}  name        Nombre de la clase para la cual obtener el provider
     * @returns {any}
     * @private
     */
    public _getProvider(name){
        return this._root.container[`${name}Provider`];
    }

    /**
     * Registra el nombre indicado para la dependencia
     * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
     * @param {String}                  name        Nombre a registrar
     * @private
     */
    protected _setName(target,name){
        let save = target.prototype || target;
        Object.defineProperty(save,"_injectorName",{
            configurable:false,
            writable:false,
            value:name
        });
    }

    /**
     * Obtiene el nombre registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el nombre
     * @returns {String}
     * @private
     */
    protected _getName(target){
        return target.prototype ? target.prototype._injectorName : target._injectorName;
    }

    /**
     * Registra el tipo para la dependencia
     * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
     * @param {String}                  type            Tipo a registrar
     * @private
     */
    protected _setType(target,type){
        let save = target.prototype || target;
        Object.defineProperty(save,"_injectorType",{
            configurable:false,
            writable:false,
            value:type
        });
    }

    /**
     * Obtiene el tipo registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el tipo
     * @returns {String}
     * @private
     */
    protected _getType(target){
        return target.prototype ? target.prototype._injectorType : target._injectorType;
    }
    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {Function|Object}                             service         Servicio para el cual obtener las dependencias
     * @param {String[]|Function[]|Object[]}                dependencies    Conjunto de dependencias a inyectar
     * @returns {Array}
     * @protected
     */
    protected _getFor(service,dependencies){
        let resolvedDependencies = [],
            serviceName = this._getName(service);
        //each dependency to resolve
        for (let dependencyToResolve of dependencies) {
            //dependency must exists
            if(dependencyToResolve != undefined) {
                let dependencyName;
                //The dependencies could be requested by object or by name
                if(typeof dependencyToResolve !== "string"){
                    //get the name registered
                    dependencyName = this._getName(dependencyToResolve);
                }else{
                    dependencyName = dependencyToResolve;
                }
                //the name must exists and not be ""
                if (!!dependencyName) {
                    //try to get the provider
                    let provider = this._getProvider(dependencyName),
                        dependency,
                        serviceType,
                        dependencyType;
                    //try to get the provider
                    if (provider != undefined) {
                        dependencyType = TYPES[this._getType(provider)]
                    } else {
                        //bottle js removes the provider of services after the first invocation. In that case, is necessary obtain the type of the dependency itself
                        dependency = this._get(dependencyName);
                        if (dependency == undefined) {
                            throw new DependencyNotRegisteredError(dependencyName);
                        }
                        dependencyType = TYPES[this._getType(dependency)];
                    }
                    serviceType = TYPES[this._getType(service)];
                    //validate access
                    if (serviceType && dependencyType && (serviceType.allowAccess === true || serviceType.allowAccess.indexOf(dependencyType.name) !== -1)) {
                        dependency = dependency || this._get(dependencyName);
                        //If the dependency is the InjectorService, create de instance with the service
                        //For more info see InjectorService
                        if (dependencyName === "InjectorService") {
                            dependency = dependency.instance(service);
                        }
                        resolvedDependencies.push(dependency);
                    } else {//If doesn't has access to the requested dependency
                        throw new DependencyAccessDenied(serviceName, dependencyName);
                    }
                } else {//If the dependency requested is not registered in the Injector
                    throw new DependencyNotRegisteredError(dependencyToResolve);
                }
            }else{//If the dependency requested is null
                throw new DependencyNotValid(serviceName,dependencies);
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
     * @throws DependencyHasItsOwnAsDependency
     * @throws DependencyAlreadyRegistered
     * @throws DependencyOptionRequired
     */
    protected  _registerService(type:IInjectorType,name:string,service,dependencies,factory?:Function){
        if(this._validateName(name,dependencies)){
            //store type in the constructor to manage permisions
            this._setType(service, type.name);
            this._setName(service, name);
            let registeredDependencies = this._getRegisteredDependencies(service);
            //if the element already has dependencies, concat
            dependencies = $.unique(dependencies.concat(registeredDependencies));
            this._registerDependencies(service,dependencies);
            let bottleInstance = this._root.factory(name,(container)=>{
                let dependenciesToInject = this._getRegisteredDependencies(service);
                let resolvedDependencies = this._getFor(service, dependenciesToInject);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null,service, dependenciesToInject, resolvedDependencies);
                } else {
                    return new service(...resolvedDependencies);
                }
            });
            let provider = bottleInstance.container[name+"Provider"];
            this._setType(provider, type.name);
        }
    }

    /**
     * Registra dependencias en una clase
     * @param {*}                   service         Servicio en el cual registrar las dependencias
     * @param {String[]}            dependencies    Dependencias a registrar
     * @private
     */
    protected _registerDependencies(service,dependencies){
        service.prototype.$inject = dependencies;
    }

    /**
     * Recupera las dependencias registradas en una clase
     * @param {*}   service     Servicio del cual recuperar las dependencias
     * @returns {Array<string>}
     * @private
     */
    protected _getRegisteredDependencies(service):string[]{
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
     * @throws DependencyHasItsOwnAsDependency
     * @throws DependencyAlreadyRegistered
     * @throws DependencyOptionRequired
     */
    protected _registerTransient(type:IInjectorType,name:string,service,dependencies,factory?:Function){
        if(this._validateName(name,dependencies)){
            this._setName(service,name);
            let that = this;
            //create factory func
            let GenericFactory = function(container,params){
                let dependenciesToInject = that._getRegisteredDependencies(service);
                let resolvedDependencies = that._getFor(service, dependenciesToInject);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null,service, dependenciesToInject, resolvedDependencies,params);
                } else {
                    return new service(...resolvedDependencies);
                }
            };
            //store type in the factory and in the constructor to manage permisions
            this._setType(service, type.name);
            let registeredDependencies = this._getRegisteredDependencies(service);
            //if the element already has dependencies, concat
            dependencies = $.unique(dependencies.concat(registeredDependencies));
            //store the dependencies
            this._registerDependencies(service,dependencies);
            //register element and get the instance of bottle
            let bottleInstance = this._root.instanceFactory(name,GenericFactory);
            //get the generated provider
            let provider = bottleInstance.container[name+"Provider"];
            //store the type in the provider
            this._setType(provider, type.name);
            //get the factory and store the type
            let dep = this._get(name);
            this._setType(dep, type.name);
        }
    }
    /**
     * Valida la disponibilidad de un nombre y las dependencias. El nombre no debe estar registrado y el propio nombre no puede estar registrado como una dependencia
     * @param {String}      name                Nombre a validar
     * @param {Stirng[]}    dependencies        Dependencias
     * @returns {boolean}
     * @protected
     * @throws DependencyHasItsOwnAsDependency
     * @throws DependencyAlreadyRegistered
     * @throws DependencyOptionRequired
     */
    protected _validateName(name,dependencies){
        if(!!name) {
            if (!this.exists(name)) {
                if (dependencies.indexOf(name) === -1) {
                    return true;
                } else {
                    throw new DependencyHasItsOwnAsDependency(name);
                }
            } else {
                throw new DependencyAlreadyRegistered(name);
            }
        }else{
            throw new DependencyOptionRequired("name");
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
    public registerService(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Service,name,service,dependencies,factory);
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
    public registerServiceTransient(name:string,service,dependencies,factory?:Function){
        this._registerTransient(TYPES.Service,name,service,dependencies,factory);
    }

    /**
     * Registra una instancia. No resuelve dependencias.
     * @param {String}          name            Nombre del servicio.
     * @param {*}               instance        Servicio a registar
     * @example
     * injector.registerServiceInstance("$",$);
     */
    public registerServiceInstance(name:string,instance){
        if(!this.exists(name)){
            this._setType(instance,TYPES.Service.name);
            this._registerService(TYPES.Service,name, instance, [],()=>{
                return instance;
            });
            this._root.constant(name,instance);
        }else{
            throw new DependencyAlreadyRegistered(name);
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
    public registerCore(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Core,name,service,dependencies,factory);
    }

    /**
     * Registra una clase de tipo Core de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class          Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    public registerCoreTransient(name:string,Class,dependencies,factory?:Function){
        this._registerTransient(TYPES.Core,name,Class,dependencies,factory);
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
    public registerCorePublic(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.CorePublic,name,service,dependencies,factory);
    }
    /**
     * Registra una clase de tipo CorePublic de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class           Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    public registerCorePublicTransient(name:string,Class,dependencies,factory?:Function){
        this._registerTransient(TYPES.CorePublic,name,Class,dependencies,factory);
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
    public registerSco(name:string,service,dependencies,factory?:Function){
        this._registerTransient(TYPES.Sco,name,service,dependencies,factory);
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
    public registerModule(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Module,name,service,dependencies,factory);
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
    public registerComponent(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Component,name,service,dependencies,factory);
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
    public registerPage(name:string,service,dependencies,factory?:Function){
        this._registerTransient(TYPES.Page,name,service,dependencies,factory);
    }

    /**
     * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
     * Si no se indica target se obtiene una instancia de InjectorRegisterService
     * @param   {*}         [target]            Target para el cual obtener el servicio
     * @returns {Injector}
     * @see InjectorService
     * @see InjectorRegisterService
     */
    public static getInstance(target?){
        let toReturn;
        if(!Injector._instance){
            Injector._instance = new Injector();
            Injector._registerInstance = new InjectorRegisterService(Injector._instance);
        }
        //The injector has a internal permission resolver, this resolver requires an haztivity type to work because each type has access to different dependencies.
        //To get the InjectorService that could get dependencies is required tell what type of element is requiring the dependency, to prevent that anyone could get any dependency, is necessary pass the element that want to get dependencies
        if(target){
            toReturn = new InjectorService(Injector._instance,target);
        }else{
            toReturn = Injector._registerInstance;
        }
        return toReturn;
    }

}

export interface IInjectorService{
    get(dependency:string|Object):any;
    exists(dependency:string|Object):boolean;
}
export class InjectorService{
    constructor(injector,target){
        this.get = function(dependency){
            let result;
            if(Array.isArray(name)){
                result = injector._getFor(target,dependency);
            }else{
                result = injector._getFor(target,[dependency]);
                if(result.length > 0){
                    result = result[0];
                }
            }
            return result;
        };
        this.exists = injector.exists.bind(injector);
    }
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    public exists(name: string): boolean {
        return undefined;
    }
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a obtener
     */
    public get(name: string): any {
    }
}
export interface IInjectorRegisterService{
    registerService(name:string,service,dependencies,factory?:Function):void;
    registerServiceTransient(name:string,service,dependencies,factory?:Function):void;
    registerCore(name:string,service,dependencies,factory?:Function):void;
    registerCoreTransient(name:string,Class,dependencies,factory?:Function):void;
    registerCorePublic(name:string,service,dependencies,factory?:Function):void;
    registerCorePublicTransient(name:string,Class,dependencies,factory?:Function):void;
    registerSco(name:string,service,dependencies,factory?:Function):void;
    registerModule(name:string,service,dependencies,factory?:Function):void;
    registerComponent(name:string,service,dependencies,factory?:Function):void;
    registerServiceInstance(name:string,instance):void;
    registerPage(name:string,service,dependencies,factory?:Function):void;
}
//Map dynamically the methods
export class InjectorRegisterService{
    constructor(injector){
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
            "registerPage"
        ];
        for (let method of publish) {
            this[method] = injector[method].bind(injector);
        }
    }
}
//Register Injector as a instantiable service.
Injector.getInstance().registerServiceTransient("InjectorService",InjectorService,[],(service,dependencies,resolvedDependencies,requester)=>{
    return Injector.getInstance(requester);
});