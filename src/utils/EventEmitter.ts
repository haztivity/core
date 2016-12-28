/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "../di";
import EventEmitter from "eventemitter2";
import $ from "jquery";
$;
import {Injectable} from "../di";
//import d.ts
import {EventEmitter2 as IEventEmitter,
        EventEmitter2Configuration} from "@types/eventemitter2";
import {JQueryStatic} from "@types/jquery";

Injector.constant("EventEmitter",EventEmitter);
export interface IEventEmitterFactoryCreate extends EventEmitter2Configuration{};
@Injectable({
    dependencies:[
        "$",
        "EventEmitter"
    ]
})
export class EventEmitterFactory{
    public static DEFAULTS = <EventEmitter2Configuration>{
        wildcard:true
    };
    protected JQuery:JQueryStatic;
    protected EventEmitter:IEventEmitter;
    constructor(dependencies){

    }

    /**
     * Genera una instancia de EventEmitter2
     * @param options
     * @returns {IEventEmitter}
     */
    create(options?:EventEmitter2Configuration){
        let optionsParsed = this.JQuery.extend(true,{},EventEmitterFactory.DEFAULTS,options || {});
        return new this.EventEmitter(optionsParsed);
    }
}