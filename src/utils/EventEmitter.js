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
        define(["require", "exports", "../jquery", "../di"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var jquery_1 = require("../jquery");
    //Register EventEmitter in DI
    var di_1 = require("../di");
    var EventEmitter = (function () {
        function EventEmitter(_$) {
            this._$ = _$;
            this._namespace = ".eventEmitter" + new Date().getTime();
        }
        EventEmitter.prototype.activate = function (global, bind) {
            if (bind === void 0) { bind = {}; }
            this._$context = jquery_1.$(bind);
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
        return EventEmitter;
    }());
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
    exports.EventEmitter = EventEmitter;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9FdmVudEVtaXR0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi9kaVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIganF1ZXJ5XzEgPSByZXF1aXJlKFwiLi4vanF1ZXJ5XCIpO1xuICAgIC8vUmVnaXN0ZXIgRXZlbnRFbWl0dGVyIGluIERJXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcihfJCkge1xuICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgdGhpcy5fbmFtZXNwYWNlID0gXCIuZXZlbnRFbWl0dGVyXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKGdsb2JhbCwgYmluZCkge1xuICAgICAgICAgICAgaWYgKGJpbmQgPT09IHZvaWQgMCkgeyBiaW5kID0ge307IH1cbiAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0ID0ganF1ZXJ5XzEuJChiaW5kKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRW1pdHRlciA9IGdsb2JhbDtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgICAgICAgICAgdmFyIGV4dHJhUGFyYW1ldGVycyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBleHRyYVBhcmFtZXRlcnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fJGNvbnRleHQudHJpZ2dlckhhbmRsZXIuYXBwbHkodGhpcy5fJGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2F0dGFjaE5hbWVzcGFjZSA9IGZ1bmN0aW9uIChldmVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50cyA9IGV2ZW50cyArIFwiIFwiO1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5yZXBsYWNlKC9cXHMvZywgdGhpcy5fbmFtZXNwYWNlICsgXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQcOxYWRlIHVuIGhhbmRsZXIgcGFyYSB1biBldmVudG8uIEhhY2UgdXNvIGRlbCBzaXN0ZW1hIGRlIGV2ZW50b3MgZGUgSlF1ZXJ5LCBzZSBkaXNwb25lIGRlIHRvZGFzIHN1c1xuICAgICAgICAgKiBjYXJhY3RlcsOtc3RpY2FzLCBpbmNsdWlkbyBlbCB1c28gZGUgbmFtZXNwYWNlc1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICBldmVudHMgIEV2ZW50b3MgYSBsb3MgcXVlIGHDsWFkaXIgZWwgaGFuZGxlci4gU2UgcHVlZGVuIGHDsWFkaXIgdmFyaW9zIGV2ZW50b3NcbiAgICAgICAgICogc2VwYXJhZG9zIHBvclxuICAgICAgICAgKiBlc3BhY2lvc1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgICAgICAgICBkYXRhICAgIERhdG9zIGEgdHJhc2xhZGFyIGFsIGNhbGxiYWNrLiBTZSByZWN1cGVyYSBtZWRpYW50ZSBldmVudC5kYXRhXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgICAgIGhhbmRsZXIgRnVuY2nDs24gaGEgaW52b2NhciBhbCBlbWl0aXJzZSBlbCBldmVudG9cbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZnVuY3Rpb24gY2FsbGJhY2soZSl7XG4gICAgICAgICAqICAgICAgbGV0IGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAqICAgICAgICAgIHNvbWVWYXIgPSBkYXRhLnNvbWVWYXI7Ly9cImV4YW1wbGVcIlxuICAgICAgICAgKiAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAqIH1cbiAgICAgICAgICogZXZlbnRFbWl0dGVyLm9uKFwic29tZUV2ZW50XCIse3NvbWVWYXI6XCJleGFtcGxlXCJ9LGNhbGxiYWNrKTtcbiAgICAgICAgICogQHNlZSBodHRwOi8vYXBpLmpxdWVyeS5jb20vb24vXG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdmFyIHZhbGlkRXZlbnRzID0gdGhpcy5fYXR0YWNoTmFtZXNwYWNlKGV2ZW50cyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQub24odmFsaWRFdmVudHMsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQub24odmFsaWRFdmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbGltaW5hIGxvcyBoYW5kbGVycyBwYXJhIHVuIGV2ZW50by4gSGFjZSB1c28gZGVsIHNpc3RlbWEgZGUgZXZlbnRvcyBkZSBKUXVlcnksIHNlIGRpc3BvbmUgZGUgdG9kYXMgc3VzXG4gICAgICAgICAqIGNhcmFjdGVyw61zdGljYXMsIGluY2x1aWRvIGVsIHVzbyBkZSBuYW1lc3BhY2VzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgICAgIGV2ZW50cyAgRXZlbnRvcyBhIGVsaW1pbmFyLiBTZSBwdWVkZW4gYcOxYWRpciB2YXJpb3MgZXZlbnRvcyBzZXBhcmFkb3MgcG9yXG4gICAgICAgICAqIGVzcGFjaW9zXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgICAgIGhhbmRsZXIgRnVuY2nDs24gaGEgaW52b2NhciBhbCBlbWl0aXJzZSBlbCBldmVudG9cbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZXZlbnRFbWl0dGVyLm9mZihcInNvbWVFdmVudFwiKTtcbiAgICAgICAgICogQHNlZSBodHRwOi8vYXBpLmpxdWVyeS5jb20vb2ZmL1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRFdmVudHMgPSB0aGlzLl9hdHRhY2hOYW1lc3BhY2UoZXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0Lm9mZih2YWxpZEV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEHDsWFkZSB1biBoYW5kbGVyIHBhcmEgdW4gZXZlbnRvIHF1ZSBzZSBhdXRvIGVsaW1pbmEgYWwgbGFuemFyc2UgbGEgcHJpbWVyYSB2ZXouIEhhY2UgdXNvIGRlbCBzaXN0ZW1hIGRlXG4gICAgICAgICAqIGV2ZW50b3MgZGUgSlF1ZXJ5LCBzZSBkaXNwb25lIGRlIHRvZGFzIHN1c1xuICAgICAgICAgKiBjYXJhY3RlcsOtc3RpY2FzLCBpbmNsdWlkbyBlbCB1c28gZGUgbmFtZXNwYWNlc1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICBldmVudHMgIEV2ZW50b3MgYSBsb3MgcXVlIGHDsWFkaXIgZWwgaGFuZGxlci4gU2UgcHVlZGVuIGHDsWFkaXIgdmFyaW9zIGV2ZW50b3NcbiAgICAgICAgICogc2VwYXJhZG9zIHBvclxuICAgICAgICAgKiBlc3BhY2lvc1xuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgICAgICAgICBkYXRhICAgIERhdG9zIGEgdHJhc2xhZGFyIGFsIGNhbGxiYWNrLiBTZSByZWN1cGVyYSBtZWRpYW50ZSBldmVudC5kYXRhXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgICAgIGhhbmRsZXIgRnVuY2nDs24gaGEgaW52b2NhciBhbCBlbWl0aXJzZSBlbCBldmVudG9cbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZnVuY3Rpb24gY2FsbGJhY2soZSl7XG4gICAgICAgICAqICAgICAgbGV0IGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAqICAgICAgICAgIHNvbWVWYXIgPSBkYXRhLnNvbWVWYXI7Ly9cImV4YW1wbGVcIlxuICAgICAgICAgKiAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAqIH1cbiAgICAgICAgICogZXZlbnRFbWl0dGVyLm9uKFwic29tZUV2ZW50XCIse3NvbWVWYXI6XCJleGFtcGxlXCJ9LGNhbGxiYWNrKTtcbiAgICAgICAgICogQHNlZSBodHRwOi8vYXBpLmpxdWVyeS5jb20vb25lL1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQub25lKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5vbmUoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbEVtaXR0ZXIub2ZmKHRoaXMuX25hbWVzcGFjZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhIHVuIG9iamV0byBKUXVlcnlFdmVudCBwYXJhIHV0aWxpemFyc2UgY29uIEV2ZW50RW1pdHRlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgTm9tYnJlIGRlbCBldmVudG9cbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeUV2ZW50T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fJC5FdmVudChuYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KCkpO1xuICAgIEV2ZW50RW1pdHRlciA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJFdmVudEVtaXR0ZXJcIixcbiAgICAgICAgICAgIGluc3RhbnRpYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHB1YmxpYzogdHJ1ZSxcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLiRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBFdmVudEVtaXR0ZXIpO1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xufSk7XG4iXSwiZmlsZSI6InV0aWxzL0V2ZW50RW1pdHRlci5qcyJ9
