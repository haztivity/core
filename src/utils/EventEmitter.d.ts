/// <reference types="jquery" />
import EventEmitter from "eventemitter2";
export interface IEventHandler {
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): any;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): any;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): any;
}
export declare class EventEmitter {
    protected _$: JQueryStatic;
    protected _$context: JQuery;
    globalEmitter: EventEmitter;
    protected _namespace: String;
    constructor(_$: JQueryStatic);
    activate(global: EventEmitter, bind?: Object): void;
    trigger(eventType: string | JQueryEventObject, ...extraParameters: any[]): any;
    protected _attachNamespace(events: any): any;
    /**
     * Añade un handler para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
     * separados por
     * espacios
     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * function callback(e){
     *      let data = e.data,
     *          someVar = data.someVar;//"example"
     *      //do something
     * }
     * eventEmitter.on("someEvent",{someVar:"example"},callback);
     * @see http://api.jquery.com/on/
     */
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): EventEmitter;
    /**
     * Elimina los handlers para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a eliminar. Se pueden añadir varios eventos separados por
     * espacios
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * eventEmitter.off("someEvent");
     * @see http://api.jquery.com/off/
     */
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): EventEmitter;
    /**
     * Añade un handler para un evento que se auto elimina al lanzarse la primera vez. Hace uso del sistema de
     * eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
     * separados por
     * espacios
     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * function callback(e){
     *      let data = e.data,
     *          someVar = data.someVar;//"example"
     *      //do something
     * }
     * eventEmitter.on("someEvent",{someVar:"example"},callback);
     * @see http://api.jquery.com/one/
     */
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): EventEmitter;
    destroy(): void;
    /**
     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
     * @param {String}  name    Nombre del evento
     * @returns {JQueryEventObject}
     */
    createEvent(name: string): JQueryEventObject;
}
