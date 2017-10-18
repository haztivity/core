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
var di_1 = require("../di");
var EventEmitter_1 = require("./EventEmitter");
var EventEmitterFactory = /** @class */ (function () {
    /**
     * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
     * @requires _EventEmitter
     */
    function EventEmitterFactory(_EventEmitter) {
        this._EventEmitter = _EventEmitter;
        this._globalEmitter = this.createEmitter();
    }
    /**
     * Genera una instancia de EventEmitter2
     * @param {*}  bind     Object to be the context to bind and trigger events
     * @returns {EventEmitter}
     */
    EventEmitterFactory.prototype.createEmitter = function (bind) {
        var eventEmitter = this._EventEmitter.instance();
        eventEmitter.activate(this._globalEmitter, bind);
        return eventEmitter;
    };
    EventEmitterFactory = __decorate([
        di_1.Service({
            name: "EventEmitterFactory",
            dependencies: [
                EventEmitter_1.EventEmitter
            ]
        })
    ], EventEmitterFactory);
    return EventEmitterFactory;
}());
exports.EventEmitterFactory = EventEmitterFactory;
//# sourceMappingURL=EventEmitterFactory.js.map