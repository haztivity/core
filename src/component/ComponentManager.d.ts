/// <reference types="core-js" />
import { ComponentController } from "./ComponentController";
import { InjectorService } from "../di";
export declare class ComponentManager {
    protected _Injector: InjectorService;
    protected _S: any;
    protected _components: Map<string, ComponentController>;
    constructor(_Injector: InjectorService, _S: any);
    /**
     * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
     * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
     * estar registrado en el DI con el tipo Component
     * @see Injector.registerComponent
     */
    add(component: ComponentController): void;
    nameIsValid(name: string): boolean;
    exists(name: string): ComponentController;
    /**
     * Añade un conjunto de componentes.
     * @see ComponentManager#add
     * @param {ComponentController[]}    components       Componentes a añadir
     */
    addAll(components: ComponentController[]): void;
}
