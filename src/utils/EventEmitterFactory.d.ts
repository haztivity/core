import { EventEmitter } from "./EventEmitter";
export declare class EventEmitterFactory {
    protected _EventEmitter: EventEmitter;
    protected _globalEmitter: EventEmitter;
    /**
     * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
     * @requires _EventEmitter
     */
    constructor(_EventEmitter: EventEmitter);
    /**
     * Genera una instancia de EventEmitter2
     * @param {*}  bind     Object to be the context to bind and trigger events
     * @returns {EventEmitter}
     */
    createEmitter(bind?: Object): EventEmitter;
}
