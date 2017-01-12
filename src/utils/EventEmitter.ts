/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$} from "../jquery";
import EventEmitter from "eventemitter2";
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
    protected _namespace: String = ".eventEmitter" + new Date().getTime();

    constructor(protected _$: JQueryStatic) {
    }

    public activate(global: EventEmitter, bind: Object = {}) {
        this._$context = $(bind);
        this.globalEmitter = global;
    }

    public trigger(eventType: string|JQueryEventObject, ...extraParameters: any[]): any {
        return this._$context.triggerHandler.apply(this._$context, arguments);
    }

    protected _attachNamespace(events) {
        events = events + " ";
        return events.replace(/\s/g, this._namespace + " ");
    }

    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): EventEmitter {
        let validEvents = this._attachNamespace(events);
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.on(validEvents, handler);
        } else {
            this._$context.on(validEvents, data, handler);
        }
        return this;
    }

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): EventEmitter {
        let validEvents = this._attachNamespace(events);
        this._$context.off(validEvents, handler);
        return this;
    }

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