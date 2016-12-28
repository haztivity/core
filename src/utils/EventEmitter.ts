/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector,Injectable} from "../di";
import {BaseHaztivity} from "../base";
import EventEmitter from "eventemitter2";
//Register EventEmitter in DI
Injector.constant("EventEmitter",EventEmitter);
export interface IEventEmitterFactoryCreate extends EventEmitter2Configuration{};
@Injectable({
    name:"EventEmitterFactory",
    dependencies:[
        "$",
        "EventEmitter"
    ]
})
export class EventEmitterFactory extends BaseHaztivity{
    public static DEFAULTS = <EventEmitter2Configuration>{
        wildcard:true
    };
    protected $:JQueryStatic;
    protected EventEmitter:EventEmitter2;
    constructor(...dependencies){
        super(...dependencies);
    }

    /**
     * Genera una instancia de EventEmitter2
     * @param options
     * @returns {IEventEmitter}
     */
    create(options?:EventEmitter2Configuration){
        let optionsParsed = this.$.extend(true,{},EventEmitterFactory.DEFAULTS,options || {});
        return new this.EventEmitter(optionsParsed);
    }
}