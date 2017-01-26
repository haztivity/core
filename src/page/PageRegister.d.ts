/// <reference types="jquery" />
import { IEventHandler, EventEmitter, EventEmitterFactory } from "../utils";
import { ResourceController } from "../resource";
export interface IPageOptions {
    name: string;
    template: string;
    controller?: string;
    resources?: ResourceController[];
}
export declare class PageRegister implements IEventHandler {
    protected _EventEmitterFactory: EventEmitterFactory;
    static readonly NAMESPACE: string;
    protected _options: IPageOptions;
    protected _eventEmitter: EventEmitter;
    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    constructor(_EventEmitterFactory: EventEmitterFactory);
    getResources(): ResourceController[];
    /**
     * Configura la clase nada más instanciarla
     * @param options
     */
    activate(options: IPageOptions): void;
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): PageRegister;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): PageRegister;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): PageRegister;
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    getName(): string;
}
