/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./Injector";
const injectorInstance = Injector.getInstance();
interface IBaseParams {
    name: string;
    dependencies: string[];
    factory?: Function;
}
export interface ICoreParams extends IBaseParams{
    public:boolean;
}
export interface IModuleParams extends IBaseParams{}
export interface IServiceParams extends IBaseParams{}
export interface IServiceInstanceParams {
    name:string;
    instance:any;
}
export function Core (params:ICoreParams){
    return (target)=> {
        if (params.public) {
            injectorInstance.registerCorePublic(params.name, target,params.dependencies,params.factory);
        } else {
            injectorInstance.registerCore(params.name, target,params.dependencies,params.factory);
        }
    }
}
export function Module(params:IModuleParams){
    return (target) =>{
        injectorInstance.registerModule(params.name,target,params.dependencies,params.factory);
    }
}
export function Service(params:IServiceParams){
    return (target)=>{
        injectorInstance.registerService(params.name,target,params.dependencies,params.factory);
    }
}
export function ServiceInstance(params:IServiceInstanceParams){
    return (target) =>{
        injectorInstance.registerServiceInstance(params.name,params.instance);
    }
}