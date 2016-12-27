import {Injector,IServiceConfig} from "./Injector";
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
