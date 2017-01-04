/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./Injector";
const injectorInstance = Injector.getInstance();
interface IBaseParams {
    name: string;
    dependencies: any[];
    factory?: Function;
}
export interface ICoreParams extends IBaseParams{
    public?:boolean;
    instantiable?:boolean;
}
export interface IModuleParams extends IBaseParams{}
export interface IServiceParams extends IBaseParams{}
export interface IScoParams extends IBaseParams{}
export interface IPageParams extends IBaseParams{}
export interface IServiceInstanceParams {
    name:string;
    instance:any;
}
/**
 * Decorador para registrar una clase como Core.
 * Si se indica el parámetro public se registrará la clase como CorePublic, en caso contrario como Core
 * Si se indica el parámetro instantiable se registrará la clase como transient, en caso contrario como service
 * @param {ICoreParams}     params
 * @static
 * @function
 */
export function Core (params:ICoreParams){
    return (target)=> {
        if (params.public) {
            if(params.instantiable){
                injectorInstance.registerCorePublicTransient(params.name,target,params.dependencies,params.factory);
            }else {
                injectorInstance.registerCorePublic(params.name, target, params.dependencies, params.factory);
            }
        } else {
            if(params.instantiable){
                injectorInstance.registerCoreTransient(params.name, target, params.dependencies, params.factory);
            }else {
                injectorInstance.registerCore(params.name, target, params.dependencies, params.factory);
            }
        }
    }
}
/**
 * Decorador para registrar una clase como Module
 * @param {IModuleParams}     params
 * @static
 * @function
 */
export function Module(params:IModuleParams){
    return (target) =>{
        injectorInstance.registerModule(params.name,target,params.dependencies,params.factory);
    }
}
/**
 * Decorador para registrar una clase como Service
 * @param {IServiceParams}     params
 * @static
 * @function
 */
export function Service(params:IServiceParams){
    return (target)=>{
        injectorInstance.registerService(params.name,target,params.dependencies,params.factory);
    }
}
/**
 * Decorador para registrar una clase como ServiceInstance
 * @param {IServiceInstanceParams}     params
 * @static
 * @function
 */
export function ServiceInstance(params:IServiceInstanceParams){
    return (target) =>{
        injectorInstance.registerServiceInstance(params.name,params.instance);
    }
}
/**
 * Decorador para registrar una clase como Sco
 * @param {IScoParams}     params
 * @static
 * @function
 */
export function Sco(params:IScoParams){
    return (target) =>{
        injectorInstance.registerSco(params.name,target,params.dependencies,params.factory);
    }
}
/**
 * Decorador para registrar una clase como Page
 * @param {IPageParams}     params
 * @static
 * @function
 */
export function Page(params:IPageParams){
    return (target) =>{
        injectorInstance.registerPage(params.name,target,params.dependencies,params.factory);
    }
}