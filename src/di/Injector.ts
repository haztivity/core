import Bottle from "bottlejs";
import * as Bottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
import $ from "jquery";
export interface IServiceConfig{
    dependencies?:String[];
}
export class InjectorClass{
    /**
     * @constructor
     * @description Injector de dependencias
     * @param {Bottle}  bottle       Instancia de bottlejs a utilizar como contenedor
     * @requires Bottle
     * @see https://github.com/young-steveo/bottlejs
     */
    constructor(protected $,protected bottle:Bottle){
    }

    /**
     * @description Resuelve y devuelve todas las dependencias para
     * @param target
     * @returns {Array}
     */
    public getFor(target:any):any{
        let result = null;
        if(target && target.prototype.$inject){
            result = this.get(target.prototype.$inject);
        }
        return result;
    }
    /**
     * @description Obtiene un elemento del injector
     * @param {String}      name        Nombre de la dependencia a inyectar
     * @returns {any}
     */
    public get(name:string|string[]):any{
        if(Array.isArray(name)){
            let result = [];
            for(let dep of name){
                result.push(this._get(dep));
            }
            return result;
        }else{
            return this._get(<string>name);
        }

    }
    protected _get(name:string){
        let dep = this.bottle.container[name];
        if(dep == undefined){
            throw `Injector: could not inject ${name} because is not registered`;
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
        if(this.bottle.list().indexOf(name) === -1){
            return true;
        }else{
            throw ``;
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
                config:config
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
                factory.call(null,container);
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
        let service = <any>this.service,
            dependencies = service.prototype.$inject,
            dependenciesInstances = [],
            that =<any>this;
        if(dependencies){
            for(let dependencie of dependencies){
                let dep = container[dependencie];
                if(dep == undefined){
                    throw `Injector: could not inject ${dependencie} to ${that.name}`;
                }else {
                    dependenciesInstances.push(dep);
                }
            }
        }
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
//Create instance and register injector
let bottle = new Bottle();
export const Injector = new InjectorClass($,bottle);
bottle.factory("Injector",(container)=>{
    return new InjectorService(Injector);
});