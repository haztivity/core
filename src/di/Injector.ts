/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Bottle} from "bottlejs";
import {DependencyHasItsOwnAsDependency,DependencyAlreadyRegistered,DependencyNotRegisteredError,DependencyOptionRequired} from "./Errors";
import * as IBottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
export const TYPES = {
    core:"Core",
    page:"Page",
    service:"Service",
    resource:"Resourece",
    component:"Component"
};
export interface IInjector{
    exists(name:string):boolean;
    existsIn(name:string,containerName:string):boolean;
    get(name:string):any;
    getOf(name:string,containerName:string):any;
}
export interface IInjectorMetadata{
    name:string;
    type:string;
}
export interface IInjectorType{
    name:string;
    allowAccess:boolean|String[];
}
//Create readonly types
let TYPES:any = (function(){
    function sealProperty(val){
        return{
            writable:false,
            configurable:false,
            value:val
        }
    }
    function registerType(types,name,allowAccess){
        let obj = {};
        Object.defineProperties(obj,{
            "name":sealProperty(name),
            "allowAccess":sealProperty(true)
        });
        types[name] = obj;
    }
    let types = {};
    registerType(types,"Core",true);
    registerType(types,"CoreType",true);
    registerType(types,"Module",[
        "Core",
        "CorePublic",
        "Service",
        "Page"
    ]);
    registerType(types,"Service",[
        "CorePublic",
        "Module"
    ]);
    registerType(types,"Sco",[
        "CorePublic",
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
export {TYPES};
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
export class Injector implements IInjector{
    protected static _instance:Injector;
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
     * @param {String}  name    Nombre registrado de la clase a obtener
     */
    public get(name: string): any {
        return this._root.container[name];
    }
    /**
     * @description Obtiene una clase mediante el nombre registrado para un contenedor en concreto. Equivale a injector.getContainer("contenedor").get("Dependencia");
     * Si el contenedor no existe se resuelve como null
     * @param {String}  name            Nombre registrado de la clase a obtener
     * @param {String}  containerName   Nombre del contenedor del cual obtener la clase
     */
    public getOf(name: string, containerName: string): any {
        let result;
        if(this.existsIn(name,containerName)){
            result = this._root.container[containerName][name];
        }
        return result;
    }
    protected _setType(target,type){
        Object.defineProperty(target,"haztivityType",{
            configurable:false,
            writable:false,
            value:type
        });
    }

    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {*}                       service         Servicio para el cual obtener las dependencias
     * @param {String[]}                dependencies    Conjunto de nombres de dependencias a obtener
     * @returns {Array}
     * @protected
     */
    protected _getFor(type:IInjectorType,dependencies){
        let resolvedDependencies = [];
        for (let dependencieName of dependencies) {
            let dependency = this.get(dependencieName);
            if(dependency == undefined){
                throw new DependencyNotRegisteredError(dependency);
            }
            resolvedDependencies.push(dependency);
        }
        //todo Validate access
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
     * injector.registerService("MyService",MyService,myServiceDependencies,(service,dependencies,resolvedDependencies)=>{
     *      let instance = new service(...resolvedDependencies);
     *      instance.doSomething();
     *      return instance;
     * })
     * @protected
     */
    protected _registerService(type:IInjectorType,name:string,service,dependencies,factory?:Function){
        if(!!name) {
            if (!this.exists(name)) {
                if (dependencies.indexOf(name) === -1) {
                    let that = this;
                    this._root.provider(name,function() {
                        //store type in the factory and in the constructor to manage permisions
                        that._setType(this, type.name);
                        that._setType(service.constructor, type.name);
                        //create getter, the getter provides the instance
                        this.$get = (container) => {
                            let resolvedDependencies = that._getFor(service, dependencies);
                            //if a custom factory function is provided
                            if (typeof factory === "function") {
                                return factory.call(service, dependencies, resolvedDependencies);
                            } else {
                                return new service(...resolvedDependencies);
                            }
                        }
                    })
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
     * @see _registerService
     * @see TYPES
     */
    public registerService(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Service,name,service,dependencies,factory);
    }
    /**
     * Registra un servicio de tipo Core de haztivity
     * @see _registerService
     * @see TYPES
     */
    public registerCore(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Core,name,service,dependencies,factory);
    }
    /**
     * Registra un servicio de tipo Sco de haztivity
     * @see _registerService
     * @see TYPES
     */
    public registerSco(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Sco,name,service,dependencies,factory);
    }
    /**
     * Registra un servicio de tipo CorePublic de haztivity
     * @see _registerService
     * @see TYPES
     */
    public registerCorePublic(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.CorePublic,name,service,dependencies,factory);
    }
    /**
     * Registra un servicio de tipo Module de haztivity
     * @see _registerService
     * @see TYPES
     */
    public registerModule(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Module,name,service,dependencies,factory);
    }
    /**
     * Registra un servicio de tipo Component de haztivity
     * @see _registerService
     * @see TYPES
     */
    public registerComponent(name:string,service,dependencies,factory?:Function){
        this._registerService(TYPES.Component,name,service,dependencies,factory);
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
            this._root.constant(name,instance);
        }else{
            //todo throw
        }
    }

    /**
     * Obtiene una instancia del inyector
     * @returns {Injector}
     */
    public static getInstance(){
        if(!Injector._instance){
            Injector._instance = new Injector();
        }
        return Injector._instance;
    }

}

