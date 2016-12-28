import {Injector,IServiceConfig} from "./Injector";
//Decorator
export interface IInjectableParams extends IServiceConfig{}
export interface IInjectParams extends IServiceConfig{}
function injectableDecoratorFun(target){
    Injector.service(this.name,target,this);
}
/**
 * @description Decora una clase para hacerla inyectable a través del Injector
 * @param params
 * @returns {(target:any)=>undefined}
 * @function
 */
export function Injectable(params:IInjectableParams){
    return injectableDecoratorFun.bind(params);
}
function construct(...args){
    if(typeof this.params.factory === "function"){
        return this.params.factory.call(null,args,this.Injector.getFor(this.target));
    }else {
        return new this.target(...this.Injector.getFor(this.target));
    }
}
function injectDecoratorFun(target){
    Injector._registerDependencies(target,this.dependencies);
    target.instance=construct.bind({
        Injector:Injector,
        target:target,
        params:this
    });
}
/**
 * @description Registra las dependencias en una clase e implementa la función "instance" para instanciarla sin habilitar su uso a través de Injector
 * @param params
 * @returns {any}
 * @constructor
 */
export function Inject(params:IInjectParams){
    return injectDecoratorFun.bind(params);
}