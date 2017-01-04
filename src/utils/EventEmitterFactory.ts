/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {EventEmitter} from "./EventEmitter";
import {$ as jquery} from "../jqueryDI";
@Core({
    name:"EventEmitterFactory",
    public:true,
    dependencies:[
        jquery,
        EventEmitter
    ]
})
export class EventEmitterFactory{

    public static DEFAULTS = <EventEmitter2Configuration>{
        wildcard:true
    };
    public globalEmitter:EventEmitter;
    /**
     * Factoria de EventEmitter2. Permite generar instancias de EventEmitter2 para manipular eventos
     * @requires $
     * @requires EventEmitter
     */
    constructor(protected $:JQueryStatic,protected EventEmitter:EventEmitter){
        this.globalEmitter = this.createEmitter();
    }
    /**
     * Genera una instancia de EventEmitter2
     * @param {*}  bind     Object to be the context to bind and trigger events
     * @returns {EventEmitter}
     */
    createEmitter(bind?:Object):EventEmitter{
        let eventEmitter= this.EventEmitter.instance();
        eventEmitter.activate(this.globalEmitter,bind);
        return eventEmitter;
    }
}