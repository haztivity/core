var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "./EventEmitter"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var EventEmitter_1 = require("./EventEmitter");
    var EventEmitterFactory = (function () {
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
    exports.EventEmitterFactory = EventEmitterFactory;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9FdmVudEVtaXR0ZXJGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuL0V2ZW50RW1pdHRlclwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIik7XG4gICAgdmFyIEV2ZW50RW1pdHRlckZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRmFjdG9yaWEgZGUgRXZlbnRFbWl0dGVyLiBQZXJtaXRlIGdlbmVyYXIgaW5zdGFuY2lhcyBkZSBFdmVudEVtaXR0ZXIgcGFyYSBtYW5pcHVsYXIgZXZlbnRvc1xuICAgICAgICAgKiBAcmVxdWlyZXMgX0V2ZW50RW1pdHRlclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyRmFjdG9yeShfRXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXIgPSBfRXZlbnRFbWl0dGVyO1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFsRW1pdHRlciA9IHRoaXMuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmEgdW5hIGluc3RhbmNpYSBkZSBFdmVudEVtaXR0ZXIyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gIGJpbmQgICAgIE9iamVjdCB0byBiZSB0aGUgY29udGV4dCB0byBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50c1xuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRFbWl0dGVyRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlRW1pdHRlciA9IGZ1bmN0aW9uIChiaW5kKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyLmluc3RhbmNlKCk7XG4gICAgICAgICAgICBldmVudEVtaXR0ZXIuYWN0aXZhdGUodGhpcy5fZ2xvYmFsRW1pdHRlciwgYmluZCk7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRFbWl0dGVyO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICB9KCkpO1xuICAgIEV2ZW50RW1pdHRlckZhY3RvcnkgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5TZXJ2aWNlKHtcbiAgICAgICAgICAgIG5hbWU6IFwiRXZlbnRFbWl0dGVyRmFjdG9yeVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgRXZlbnRFbWl0dGVyRmFjdG9yeSk7XG4gICAgZXhwb3J0cy5FdmVudEVtaXR0ZXJGYWN0b3J5ID0gRXZlbnRFbWl0dGVyRmFjdG9yeTtcbn0pO1xuIl0sImZpbGUiOiJ1dGlscy9FdmVudEVtaXR0ZXJGYWN0b3J5LmpzIn0=
