System.register(["../jquery", "../di"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var jquery_1, di_1, EventEmitter;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }
        ],
        execute: function () {
            EventEmitter = (function () {
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
            exports_1("EventEmitter", EventEmitter);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9FdmVudEVtaXR0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2pxdWVyeVwiLCBcIi4uL2RpXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIganF1ZXJ5XzEsIGRpXzEsIEV2ZW50RW1pdHRlcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoXyQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYW1lc3BhY2UgPSBcIi5ldmVudEVtaXR0ZXJcIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKGdsb2JhbCwgYmluZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmluZCA9PT0gdm9pZCAwKSB7IGJpbmQgPSB7fTsgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dCA9IGpxdWVyeV8xLiQoYmluZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRW1pdHRlciA9IGdsb2JhbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dHJhUGFyYW1ldGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFQYXJhbWV0ZXJzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl8kY29udGV4dC50cmlnZ2VySGFuZGxlci5hcHBseSh0aGlzLl8kY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2F0dGFjaE5hbWVzcGFjZSA9IGZ1bmN0aW9uIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzID0gZXZlbnRzICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMucmVwbGFjZSgvXFxzL2csIHRoaXMuX25hbWVzcGFjZSArIFwiIFwiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEHDsWFkZSB1biBoYW5kbGVyIHBhcmEgdW4gZXZlbnRvLiBIYWNlIHVzbyBkZWwgc2lzdGVtYSBkZSBldmVudG9zIGRlIEpRdWVyeSwgc2UgZGlzcG9uZSBkZSB0b2RhcyBzdXNcbiAgICAgICAgICAgICAgICAgKiBjYXJhY3RlcsOtc3RpY2FzLCBpbmNsdWlkbyBlbCB1c28gZGUgbmFtZXNwYWNlc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgICAgIGV2ZW50cyAgRXZlbnRvcyBhIGxvcyBxdWUgYcOxYWRpciBlbCBoYW5kbGVyLiBTZSBwdWVkZW4gYcOxYWRpciB2YXJpb3MgZXZlbnRvc1xuICAgICAgICAgICAgICAgICAqIHNlcGFyYWRvcyBwb3JcbiAgICAgICAgICAgICAgICAgKiBlc3BhY2lvc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgICAgICAgIGRhdGEgICAgRGF0b3MgYSB0cmFzbGFkYXIgYWwgY2FsbGJhY2suIFNlIHJlY3VwZXJhIG1lZGlhbnRlIGV2ZW50LmRhdGFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgICAgICAgICBoYW5kbGVyIEZ1bmNpw7NuIGhhIGludm9jYXIgYWwgZW1pdGlyc2UgZWwgZXZlbnRvXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAgICAgICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgICAgICAgICAqIGZ1bmN0aW9uIGNhbGxiYWNrKGUpe1xuICAgICAgICAgICAgICAgICAqICAgICAgbGV0IGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAgICAgICAgICogICAgICAgICAgc29tZVZhciA9IGRhdGEuc29tZVZhcjsvL1wiZXhhbXBsZVwiXG4gICAgICAgICAgICAgICAgICogICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICAgICAgKiBldmVudEVtaXR0ZXIub24oXCJzb21lRXZlbnRcIix7c29tZVZhcjpcImV4YW1wbGVcIn0sY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cDovL2FwaS5qcXVlcnkuY29tL29uL1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZEV2ZW50cyA9IHRoaXMuX2F0dGFjaE5hbWVzcGFjZShldmVudHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5vbih2YWxpZEV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5vbih2YWxpZEV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBFbGltaW5hIGxvcyBoYW5kbGVycyBwYXJhIHVuIGV2ZW50by4gSGFjZSB1c28gZGVsIHNpc3RlbWEgZGUgZXZlbnRvcyBkZSBKUXVlcnksIHNlIGRpc3BvbmUgZGUgdG9kYXMgc3VzXG4gICAgICAgICAgICAgICAgICogY2FyYWN0ZXLDrXN0aWNhcywgaW5jbHVpZG8gZWwgdXNvIGRlIG5hbWVzcGFjZXNcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICBldmVudHMgIEV2ZW50b3MgYSBlbGltaW5hci4gU2UgcHVlZGVuIGHDsWFkaXIgdmFyaW9zIGV2ZW50b3Mgc2VwYXJhZG9zIHBvclxuICAgICAgICAgICAgICAgICAqIGVzcGFjaW9zXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgICAgICAgICAgaGFuZGxlciBGdW5jacOzbiBoYSBpbnZvY2FyIGFsIGVtaXRpcnNlIGVsIGV2ZW50b1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gICAgICAgICAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICAgICAgICAgKiBldmVudEVtaXR0ZXIub2ZmKFwic29tZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cDovL2FwaS5qcXVlcnkuY29tL29mZi9cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkRXZlbnRzID0gdGhpcy5fYXR0YWNoTmFtZXNwYWNlKGV2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0Lm9mZih2YWxpZEV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuIGhhbmRsZXIgcGFyYSB1biBldmVudG8gcXVlIHNlIGF1dG8gZWxpbWluYSBhbCBsYW56YXJzZSBsYSBwcmltZXJhIHZlei4gSGFjZSB1c28gZGVsIHNpc3RlbWEgZGVcbiAgICAgICAgICAgICAgICAgKiBldmVudG9zIGRlIEpRdWVyeSwgc2UgZGlzcG9uZSBkZSB0b2RhcyBzdXNcbiAgICAgICAgICAgICAgICAgKiBjYXJhY3RlcsOtc3RpY2FzLCBpbmNsdWlkbyBlbCB1c28gZGUgbmFtZXNwYWNlc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgICAgIGV2ZW50cyAgRXZlbnRvcyBhIGxvcyBxdWUgYcOxYWRpciBlbCBoYW5kbGVyLiBTZSBwdWVkZW4gYcOxYWRpciB2YXJpb3MgZXZlbnRvc1xuICAgICAgICAgICAgICAgICAqIHNlcGFyYWRvcyBwb3JcbiAgICAgICAgICAgICAgICAgKiBlc3BhY2lvc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgICAgICAgIGRhdGEgICAgRGF0b3MgYSB0cmFzbGFkYXIgYWwgY2FsbGJhY2suIFNlIHJlY3VwZXJhIG1lZGlhbnRlIGV2ZW50LmRhdGFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgICAgICAgICBoYW5kbGVyIEZ1bmNpw7NuIGhhIGludm9jYXIgYWwgZW1pdGlyc2UgZWwgZXZlbnRvXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAgICAgICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgICAgICAgICAqIGZ1bmN0aW9uIGNhbGxiYWNrKGUpe1xuICAgICAgICAgICAgICAgICAqICAgICAgbGV0IGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAgICAgICAgICogICAgICAgICAgc29tZVZhciA9IGRhdGEuc29tZVZhcjsvL1wiZXhhbXBsZVwiXG4gICAgICAgICAgICAgICAgICogICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICAgICAgKiBldmVudEVtaXR0ZXIub24oXCJzb21lRXZlbnRcIix7c29tZVZhcjpcImV4YW1wbGVcIn0sY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cDovL2FwaS5qcXVlcnkuY29tL29uZS9cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQub25lKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5vbmUoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxFbWl0dGVyLm9mZih0aGlzLl9uYW1lc3BhY2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ3JlYSB1biBvYmpldG8gSlF1ZXJ5RXZlbnQgcGFyYSB1dGlsaXphcnNlIGNvbiBFdmVudEVtaXR0ZXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgTm9tYnJlIGRlbCBldmVudG9cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5RXZlbnRPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl8kLkV2ZW50KG5hbWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBFdmVudEVtaXR0ZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkV2ZW50RW1pdHRlclwiLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBqcXVlcnlfMS4kXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgRXZlbnRFbWl0dGVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkV2ZW50RW1pdHRlclwiLCBFdmVudEVtaXR0ZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJ1dGlscy9FdmVudEVtaXR0ZXIuanMifQ==
