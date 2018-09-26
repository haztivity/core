/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {IEventHandler, EventEmitter, EventEmitterFactory} from "../utils";
import {ResourceController} from "../resource";
export interface IPageOptions {
    name: string;
    template: string;
    controller?: string;
    resources?: any[];
    autoSequence?:boolean;
}
@Core(
    {
        name: "PageRegister",
        instantiable: true,
        dependencies: [
            EventEmitterFactory
        ]
    }
)
export class PageRegister implements IEventHandler {

    public static readonly NAMESPACE = "page";
    protected _options: IPageOptions;
    protected _eventEmitter: EventEmitter;

    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    constructor(protected _EventEmitterFactory: EventEmitterFactory) {
    }

    public getResources(): ResourceController[] {
        return this._options.resources;
    }

    /**
     * Configura la clase nada más instanciarla
     * @param options
     */
    public activate(options: IPageOptions) {
        this._options = options;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }

    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): PageRegister {
        this._eventEmitter.on(events + "." + PageRegister.NAMESPACE, data, handler);
        return this;
    }

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): PageRegister {
        this._eventEmitter.one(events + "." + PageRegister.NAMESPACE, data, handler);
        return this;
    }

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): PageRegister {
        this._eventEmitter.off(events + "." + PageRegister.NAMESPACE, handler);
        return this;
    }
    public getOptions():IPageOptions{
        return this._options;
    }
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    public getName() {
        return this._options.name;
    }
}