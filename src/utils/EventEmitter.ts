/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {$ as jquery} from "../jqueryDI";
import EventEmitter from "eventemitter2";
//Register EventEmitter in DI
import {Core} from "../di";
export interface IEventHandler{
    on(events:string,data:any,handler: (eventObject: JQueryEventObject, ...args: any[]) => any):any;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any):any;
    off(events: string,handler?: (eventObject: JQueryEventObject) => any):any;
}
@Core({
    name:"EventEmitter",
    instantiable:true,
    dependencies:[
        jquery
    ]
})
export class EventEmitter{
    protected $context:JQuery;
    public globalEmitter:EventEmitter;
    constructor(protected $:JQueryStatic){

    }
    public activate(global:EventEmitter,bind:Object={}){
        this.$context = $(bind);
        this.globalEmitter = global;
    }
    public trigger(eventType:string|JQueryEventObject,...extraParameters:any[]):any{
        return this.$context.triggerHandler.apply(this.$context,arguments);
    }
    public on(events:string,data:any,handler: (eventObject: JQueryEventObject, ...args: any[]) => any):EventEmitter{
        if(typeof data === "function" && typeof handler !== "function"){
            this.$context.on(events,handler);
        }else{
            this.$context.on(events,data,handler);
        }
        return this;
    }
    public off(events: string,handler?: (eventObject: JQueryEventObject) => any):EventEmitter{
        this.$context.off(events,handler);
        return this;
    }
    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any):EventEmitter{
        if(typeof data === "function" && typeof handler !== "function"){
            this.$context.one(events,handler);
        }else{
            this.$context.one(events,data,handler);
        }
        return this;
    }


    /**
     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
     * @param {String}  name    Nombre del evento
     * @returns {JQueryEventObject}
     */
    createEvent(name:string):JQueryEventObject{
        return this.$.Event(name);
    }
}