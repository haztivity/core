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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9FdmVudEVtaXR0ZXJGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4vRXZlbnRFbWl0dGVyXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgZGlfMSwgRXZlbnRFbWl0dGVyXzEsIEV2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKEV2ZW50RW1pdHRlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXJfMSA9IEV2ZW50RW1pdHRlcl8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEV2ZW50RW1pdHRlckZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEZhY3RvcmlhIGRlIEV2ZW50RW1pdHRlci4gUGVybWl0ZSBnZW5lcmFyIGluc3RhbmNpYXMgZGUgRXZlbnRFbWl0dGVyIHBhcmEgbWFuaXB1bGFyIGV2ZW50b3NcbiAgICAgICAgICAgICAgICAgKiBAcmVxdWlyZXMgX0V2ZW50RW1pdHRlclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlckZhY3RvcnkoX0V2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXIgPSBfRXZlbnRFbWl0dGVyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxFbWl0dGVyID0gdGhpcy5jcmVhdGVFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEdlbmVyYSB1bmEgaW5zdGFuY2lhIGRlIEV2ZW50RW1pdHRlcjJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0geyp9ICBiaW5kICAgICBPYmplY3QgdG8gYmUgdGhlIGNvbnRleHQgdG8gYmluZCBhbmQgdHJpZ2dlciBldmVudHNcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlckZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUVtaXR0ZXIgPSBmdW5jdGlvbiAoYmluZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyLmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5hY3RpdmF0ZSh0aGlzLl9nbG9iYWxFbWl0dGVyLCBiaW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50RW1pdHRlcjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIEV2ZW50RW1pdHRlckZhY3RvcnkgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLlNlcnZpY2Uoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkV2ZW50RW1pdHRlckZhY3RvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBFdmVudEVtaXR0ZXJGYWN0b3J5KTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkV2ZW50RW1pdHRlckZhY3RvcnlcIiwgRXZlbnRFbWl0dGVyRmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InV0aWxzL0V2ZW50RW1pdHRlckZhY3RvcnkuanMifQ==
