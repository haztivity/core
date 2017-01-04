/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {IEventHandler,EventEmitter,EventEmitterFactory} from "../utils";
export interface IPageOptions{
    name:string;
    template:string;
    controller?:string;
    resources?:Resource[]
}
@Core({
    name:"Page",
    instantiable:true,
    dependencies:[
        EventEmitterFactory
    ]
})
export class Page implements IEventHandler{
    public static readonly NAMESPACE = "page";
    protected options:IPageOptions;
    protected eventEmitter:EventEmitter;

    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    constructor(protected EventEmitterFactory:EventEmitterFactory){
    }

    /**
     * Configura la clase nada más instanciarla
     * @param options
     */
    public activate(options:IPageOptions){
        this.options=options;
        this.eventEmitter = this.EventEmitterFactory.createEmitter();
    }
    public on(events:string,data:any,handler: (eventObject: JQueryEventObject, ...args: any[]) => any){
        this.eventEmitter.on(events+"."+Page.NAMESPACE,data,handler);
        return this;
    }
    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any){
        this.eventEmitter.one(events+"."+Page.NAMESPACE,data,handler);
        return this;
    }
    public off(events: string,handler?: (eventObject: JQueryEventObject) => any){
        this.eventEmitter.off(events+"."+Page.NAMESPACE,handler);
        return this;
    }

    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    public getName(){
        return this.options.name;
    }
}