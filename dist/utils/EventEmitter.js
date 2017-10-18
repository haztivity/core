"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var jquery_1 = require("../jquery");
//Register EventEmitter in DI
var di_1 = require("../di");
var EventEmitter = /** @class */ (function () {
    function EventEmitter(_$) {
        this._$ = _$;
        this._namespace = ".eventEmitter" + new Date().getTime();
    }
    EventEmitter.prototype.activate = function (global, bind) {
        if (bind === void 0) { bind = {}; }
        this._$context = this._$(bind);
        this.globalEmitter = global;
    };
    EventEmitter.prototype.trigger = function (eventType) {
        var extraParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParameters[_i - 1] = arguments[_i];
        }
        return this._$context.triggerHandler.apply(this._$context, arguments);
    };
    EventEmitter.prototype._attachNamespace = function (events) {
        events = events + " ";
        return events.replace(/\s/g, this._namespace + " ");
    };
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
    EventEmitter.prototype.on = function (events, data, handler) {
        var validEvents = this._attachNamespace(events);
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.on(validEvents, handler);
        }
        else {
            this._$context.on(validEvents, data, handler);
        }
        return this;
    };
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
    EventEmitter.prototype.off = function (events, handler) {
        var validEvents = this._attachNamespace(events);
        this._$context.off(validEvents, handler);
        return this;
    };
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
    EventEmitter.prototype.one = function (events, data, handler) {
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.one(events, handler);
        }
        else {
            this._$context.one(events, data, handler);
        }
        return this;
    };
    EventEmitter.prototype.destroy = function () {
        this.globalEmitter.off(this._namespace);
    };
    /**
     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
     * @param {String}  name    Nombre del evento
     * @returns {JQueryEventObject}
     */
    EventEmitter.prototype.createEvent = function (name) {
        return this._$.Event(name);
    };
    EventEmitter = __decorate([
        di_1.Core({
            name: "EventEmitter",
            instantiable: true,
            public: true,
            dependencies: [
                jquery_1.$
            ]
        })
    ], EventEmitter);
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map