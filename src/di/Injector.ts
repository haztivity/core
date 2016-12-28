import Bottle from "bottlejs";
import * as Bottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
import $ from "jquery";
import {BaseHaztivity} from "../base/BaseHaztivity";
import Bottle = require("../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle");
export interface IServiceConfig{
    dependencies?:String[];
}
export class InjectorError extends Error{
    public static readonly TYPES = {
        NOT_REGISTERED:0,
        ALREADY_REGISTERED:1,
        NAME_REQUIRED:2
    };

    /**
     * @constructor
     * @description Clase error de Injector
     * @extends Error
     * @param {number}          code            Código de error. Se ha de corresponder con alguno de los indicados en TYPES
     * @param {string}          dependencie     Nombre de la dependencia que lanza la excepción
     * @param {string}          [target]        Clase a la cual inyectar la dependencia
     */
    constructor(protected code:number,protected dependencie,protected target?){
        super();
        this.message = this._resolveMessage();
    }

    /**
     * @description Genera el mensaje en base al código
     * @param code
     * @returns {string}
     * @private
     */
    protected _resolveMessage(){
        let result = "";
        switch(this.code){
            case InjectorError.TYPES.NOT_REGISTERED:
                if(this.target){
                    result=`could not inject ${this.dependencie} into ${this.target} because is not registered`;
                }else {
                    result = `${this.dependencie} is not registered in the Injector.`
                }
                break;
            case InjectorError.TYPES.ALREADY_REGISTERED:
                result=`${this.dependencie} is already registered`;
                break;
            case InjectorEro.TYPES.NAME_REQUIRED:
                result = "The parameter 'name' is required";
                break;
        }
        result+=`[Error] Injector - ${result}`;
        return result;
    }
}
export class Injector{
    public static injector:Injector;
    public static getInstance(){
        if(!Injector.injector) {
            let bottle = new Bottle();
            Injector.injector = new Injector($, bottle);
            bottle.factory("Injector", (container) => {
                return new InjectorService(Injector.injector);
            });
        }
        return Injector.injector;
    }
    /**
     * @constructor
     * @description Injector de dependencias
     * @requires Bottle
     * @see https://github.com/young-steveo/bottlejs
     */
    protected constructor(protected $:JQueryStatic,protected bottle:Bottle){

    }

    /**
     * @description Resuelve y devuelve todas las dependencias para
     * @param target
     * @returns {Array}
     */
    public getFor(target:any):any{
        let result = null;
        if(target && target.prototype.$inject){
            let dependencies = target.prototype.$inject;
            result = [];
            for(let dependencie of dependencies){
                let depInstance = this.get(dependencie,false);
                if(depInstance != undefined){
                    result.push(depInstance);
                }else{
                    throw new InjectorError(InjectorError.TYPES.NOT_REGISTERED,dependencie,target.name);
                }
            }
        }
        return result;
    }
    /**
     * @description Obtiene un elemento del injector
     * @param {String}      name            Nombre de la dependencia a inyectar
     * @param {boolean}     [throwError]    Indica si lanzar excepción en caso de no encontrar la dependencia
     * @returns {any}
     */
    public get(name:string|string[],throwError=true):any{
        if(Array.isArray(name)){
            let result = [];
            for(let dep of name){
                result.push(this._get(dep,throwError));
            }
            return result;
        }else{
            return this._get(<string>name,throwError);
        }

    }
    protected _get(name:string,throwError=true){
        let dep = this.bottle.container[name];
        if(dep == undefined && throwError !== false){
            throw new InjectorError(InjectorError.TYPES.NOT_REGISTERED,name);
        }
        return dep;
    }
    /**
     * @description Comprueba si una dependencia ya ha sido registrada
     * @param {String}      name       dependencia a comprobar
     * @returns {boolean}
     * @protected
     */
    protected _check(name){
        if(name) {
            if (this.bottle.list().indexOf(name) === -1) {
                return true;
            } else {
                throw new InjectorError(InjectorError.TYPES.ALREADY_REGISTERED, name);
            }
        }else{
            throw new InjectorError(InjectorError.TYPES.NAME_REQUIRED);
        }
    }

    /**
     * @description Registra un servicio
     * Hace uso de _factory para la resolución de dependencias.
     * Se puede utilizar el decorador Injectable
     * @param {String}          name            Nombre del servicio
     * @param {Function}        service         Servicio a registrar
     * @param {IServiceConfig}  [config]        Configuración del registro
     * @see _factory
     * @see IServiceConfig
     * @example
     * class Test{
     *      constructor(dependencies){
     *
     *      }
     * }
     * Injector.service("Test",Test,{
     *      dependencies:["someDependencie"]
     * });
     * @example
     * @Injectable({
     *      dependencies:["someDependencie"]
     * })
     * class Test{
     *      constructor(dependencies){
     *
     *      }
     * }
     */
    public service(name:string,service:any,config:IServiceConfig){
        if(this._check(name)){
            this._registerDependencies(service,config.dependencies);
            this.bottle.factory(name,this._factory.bind({
                name:name,
                service:service,
                config:config,
                injector:this
            }));
        }
    }

    /**
     * @description Registra las depedencias en una clase
     * @param service
     * @param dependencies
     * @returns {boolean}
     * @private
     */
    protected _registerDependencies(service,dependencies){
        let currentDependencies = service.prototype.$inject || [];
        service.prototype.$inject = this.$.unique(this.$.extend(currentDependencies, dependencies || []));
        return true;
    }
    /**
     * @description Registra un servicio indicando cómo instanciarla
     * @param {String}              name        Nombre del servicio
     * @param {Function}            factory     Función que instancia el servicio
     * @example
     * class Test{
     *      constructor(someDependencie){
     *          this.someDependencie = someDependencie;
     *      }
     * }
     * Injector.factory("Test",function(container){
     *      let someDependencie = container.someDependencie;
     *      return new Test(someDependencie);
     * });
     */
    public factory(name:string,service,factory:Function,config){
        if(this._check(name)){
            this.bottle.factory(name,(container)=>{
                this._registerDependencies(service,config.dependencies);
                factory.call(null,container);
            });
        }
    }
    public instanceFactory(name:string,service,factory:Function,config){
        if(this._check(name)){
            this.bottle.instanceFactory(name,(container)=>{
                this._registerDependencies(service,config.dependencies);
                return factory.call(null,container);
            });
        }
    }
    /**
     * @description Registra una constante inyectable
     * @param {String}      name    Nombre de la constante
     * @param {*}           value   Valor de la constante
     * @example
     * Injector.constant("someVar","someValue");
     *
     */
    public constant(name:string,value:any){
        this.bottle.constant(name,value);
    }

    /**
     * @description Factoria base para servicios. Resuelve las dependencias y las inyecta como array al instanciar la clase.
     * Se debe ejecutar con contexto {name,service,config}
     * @param {Bottle}  container       Contenedor provisto por bottlejs
     * @see service
     * @protected
     * @example
     * class Test{
     *
     * }
     * let config = {
     *      dependencies:[
     *          "someDependencie"
     *      }
     * }
     * this._factory.bind({
     *      name:"Test",
     *      service:Test,
     *      config:config
     * })
     */
    protected _factory(container){
        let that = <any>this;
        debugger;
        let service = that.service,
            dependenciesInstances = that.injector.getFor(service);
        return new service(...dependenciesInstances);
    }

}
export class InjectorService{
    /**
     * @constructor
     * @description Servicio a inyectar por DI que expone las funciones públicas que se pueden utilizar en tiempo de ejecución
     * @param {InjectorClass}   injector       Inyector a utilizar
     */
    constructor(injector){
        this.get = Injector.get.bind(injector);
    }
    public get(name:string|string[]){

    }
}
