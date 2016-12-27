import {Bottle} from "bottlejs";
import Bottle = require("../jspm_packages/npm/bottlejs@1.5.0/dist/bottle");
import $ from "jquery";
export interface IServiceConfig{
    dependencies?:String[];
}
class InjectorClass{
    /**
     * @constructor
     * @description Injector de dependencias
     * @param {Bottle}  bottle       Instancia de bottlejs a utilizar como contenedor
     * @requires Bottle
     * @see https://github.com/young-steveo/bottlejs
     */
    constructor(protected bottle:Bottle){
    }

    /**
     * @description Obtiene un elemento del injector
     * @param {String}      name        Nombre de la dependencia a inyectar
     * @returns {any}
     */
    public get(name:string):any{
        return this.bottle.container[name];
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
            let dependencies = service.$inject;
            service.$inject = $.unique($.extend(dependencies,config.dependencies || []));
            this.bottle.factory(name,this._factory.bind({
                name:name,
                service:service,
                config:config
            }));
        }
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
    public factory(name:string,factory:Function){
        if(this._check(name)){
            this.bottle.factory(name,factory);
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
        let service = this.service,
            dependencies = service.$inject,
            dependenciesInstances = [];
        if(dependencies){
            for(let dependencie of dependencies){
                let dep = container[dependencie];
                if(dep == undefined){
                    throw `Injector: could not inject ${dependencie} to ${this.name}`;
                }else {
                    dependenciesInstances.push(dep);
                }
            }
        }
        return new service(dependenciesInstances);
    }
}

//Create instance and register injector
let bottle = new Bottle();
export const Injector = new InjectorClass(bottle);
bottle.factory("Injector",(container)=>{
    return Injector;
});


//Decorator
export interface IInjectableParams extends IServiceConfig{}
/**
 * @description Decorator to make a element injectable by the injector
 * @param params
 * @returns {(target:any)=>undefined}
 * @function
 */
export function Injectable(params:IInjectableParams){
    return (target)=>{
        Injector.service(target.name,target,params);
    }
}
