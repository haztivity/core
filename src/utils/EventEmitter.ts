/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$} from "../jquery";
//Register EventEmitter in DI
import {Core} from "../di";
export interface IEventHandler {
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): any;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): any;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): any;
}
@Core(
    {
        name: "EventEmitter",
        instantiable: true,
        public: true,
        dependencies: [
            $
        ]
    }
)
export class EventEmitter {
    protected _$context: JQuery;
    public globalEmitter: EventEmitter;
    protected _namespace: string = ".eventEmitter" + new Date().getTime();

    constructor(protected _$: JQueryStatic) {
    }

    public activate(global: EventEmitter, bind: Object = {}) {
        this._$context = this._$(bind);
        this.globalEmitter = global;
    }

    public trigger(eventType: string|JQueryEventObject, ...extraParameters: any[]): any {
        return this._$context.triggerHandler.apply(this._$context, arguments);
    }

    protected _attachNamespace(events) {
        events = events + " ";
        return events.replace(/\s/g, this._namespace + " ");
    }

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
    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): EventEmitter {
        let validEvents = this._attachNamespace(events);
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.on(validEvents, handler);
        } else {
            this._$context.on(validEvents, data, handler);
        }
        return this;
    }
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
    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): EventEmitter {
        let validEvents = this._attachNamespace(events);
        this._$context.off(validEvents, handler);
        return this;
    }
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
    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): EventEmitter {
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.one(events, handler);
        } else {
            this._$context.one(events, data, handler);
        }
        return this;
    }

    public destroy() {
        this.globalEmitter.off(this._namespace);
    }

    /**
     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
     * @param {String}  name    Nombre del evento
     * @returns {JQueryEventObject}
     */
    createEvent(name: string): JQueryEventObject {
        return this._$.Event(name);
    }
}
