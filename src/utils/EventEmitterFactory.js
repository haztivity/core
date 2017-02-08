System.register(["../di", "./EventEmitter"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, EventEmitter_1, EventEmitterFactory;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (EventEmitter_1_1) {
                EventEmitter_1 = EventEmitter_1_1;
            }
        ],
        execute: function () {
            EventEmitterFactory = (function () {
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
                return EventEmitterFactory;
            }());
            EventEmitterFactory = __decorate([
                di_1.Service({
                    name: "EventEmitterFactory",
                    dependencies: [
                        EventEmitter_1.EventEmitter
                    ]
                })
            ], EventEmitterFactory);
            exports_1("EventEmitterFactory", EventEmitterFactory);
        }
    };
});
//# sourceMappingURL=EventEmitterFactory.js.map