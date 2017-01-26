/// <reference types="core-js" />
import { ResourceController } from "./ResourceController";
import { InjectorService } from "../di";
export declare class ResourceManager {
    protected _Injector: InjectorService;
    protected _S: any;
    protected _resources: Map<string, ResourceController>;
    constructor(_Injector: InjectorService, _S: any);
    /**
     * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
     * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
     * @see Injector.registerResource
     */
    add(resource: ResourceController): void;
    nameIsValid(name: string): boolean;
    exists(name: string): boolean;
    /**
     * Añade un conjunto de recursos.
     * @see ResourceManager#add
     * @param {ResourceController[]}    resources       Recursos a añadir
     */
    addAll(resources: ResourceController[]): void;
}
