/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import * as jqDI from "../jqueryDI";
jqDI;//Typescript needs a reference to import the module
import EventEmitter from "eventemitter2";
//Register EventEmitter in DI
export interface ICreateEventEmitterOptions extends EventEmitter2Configuration{};
@Service({
    name:"EventEmitterFactory",
    dependencies:[
        "$"
    ]
})
export class EventEmitterFactory{
    public static DEFAULTS = <EventEmitter2Configuration>{
        wildcard:true
    };
    /**
     * Factoria de EventEmitter2. Permite generar instancias de EventEmitter2 para manipular eventos
     * @requires $
     */
    constructor(protected $:JQueryStatic){

    }
    /**
     * Genera una instancia de EventEmitter2
     * @param {ICreateEventEmitterOptions}  options     Opciones que acepta EventEmitter
     * @returns {EventEmitter2}
     */
    createEmitter(options?:ICreateEventEmitterOptions):EventEmitter2{
        let optionsParsed = this.$.extend(true,{},EventEmitterFactory.DEFAULTS,options || {});
        return <EventEmitter2>new EventEmitter(optionsParsed);
    }
}