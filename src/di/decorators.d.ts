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
export declare function Core(params: ICoreParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Module
 * @param {IModuleParams}     params
 * @static
 * @function
 */
export declare function Module(params: IModuleParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Service
 * @param {IServiceParams}     params
 * @static
 * @function
 */
export declare function Service(params: IServiceParams): (target: any) => void;
/**
 * Decorador para registrar una clase como ServiceInstance
 * @param {IServiceInstanceParams}     params
 * @static
 * @function
 */
export declare function ServiceInstance(params: IServiceInstanceParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Sco
 * @param {IScoParams}     params
 * @static
 * @function
 */
export declare function Sco(params: IScoParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Page
 * @param {IPageParams}     params
 * @static
 * @function
 */
export declare function Page(params: IPageParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Recurso
 * @param {IResourceParams}     params
 * @static
 * @function
 */
export declare function Resource(params: IResourceParams): (target: any) => void;
/**
 * Decorador para registrar una clase como Recurso
 * @param {IResourceParams}     params
 * @static
 * @function
 */
export declare function Component(params: IComponentParams): (target: any) => void;
/**
 * Decorador para registrar las dependencias sin registrar la clase como inyectable
 * @param {{dependencies:any[]}}     params
 * @static
 * @function
 */
export declare function Dependencies(params: {
    dependencies: any[];
}): (target: any) => void;
