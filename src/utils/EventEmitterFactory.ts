/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {EventEmitter} from "./EventEmitter";
@Service({
    name:"EventEmitterFactory",
    dependencies:[
        EventEmitter
    ]
})
export class EventEmitterFactory{
    protected _globalEmitter:EventEmitter;
    /**
     * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
     * @requires _EventEmitter
     */
    constructor(protected _EventEmitter:EventEmitter){
        this._globalEmitter = this.createEmitter();
    }
    /**
     * Genera una instancia de EventEmitter2
     * @param {*}  bind     Object to be the context to bind and trigger events
     * @returns {EventEmitter}
     */
    createEmitter(bind?:Object):EventEmitter{
        let eventEmitter= this._EventEmitter.instance();
        eventEmitter.activate(this._globalEmitter,bind);
        return eventEmitter;
    }
}