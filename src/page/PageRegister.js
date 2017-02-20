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
        define(["require", "exports", "../di", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var utils_1 = require("../utils");
    var PageRegister = PageRegister_1 = (function () {
        /**
         * Almacena la información de una página.
         * Tipo Core
         * @class
         * @param EventEmitterFactory
         */
        function PageRegister(_EventEmitterFactory) {
            this._EventEmitterFactory = _EventEmitterFactory;
        }
        PageRegister.prototype.getResources = function () {
            return this._options.resources;
        };
        /**
         * Configura la clase nada más instanciarla
         * @param options
         */
        PageRegister.prototype.activate = function (options) {
            this._options = options;
            this._eventEmitter = this._EventEmitterFactory.createEmitter();
        };
        PageRegister.prototype.on = function (events, data, handler) {
            this._eventEmitter.on(events + "." + PageRegister_1.NAMESPACE, data, handler);
            return this;
        };
        PageRegister.prototype.one = function (events, data, handler) {
            this._eventEmitter.one(events + "." + PageRegister_1.NAMESPACE, data, handler);
            return this;
        };
        PageRegister.prototype.off = function (events, handler) {
            this._eventEmitter.off(events + "." + PageRegister_1.NAMESPACE, handler);
            return this;
        };
        /**
         * Obtiene el nombre de la página
         * @returns {string}
         */
        PageRegister.prototype.getName = function () {
            return this._options.name;
        };
        return PageRegister;
    }());
    PageRegister.NAMESPACE = "page";
    PageRegister = PageRegister_1 = __decorate([
        di_1.Core({
            name: "PageRegister",
            instantiable: true,
            dependencies: [
                utils_1.EventEmitterFactory
            ]
        })
    ], PageRegister);
    exports.PageRegister = PageRegister;
    var PageRegister_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VSZWdpc3Rlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi4vdXRpbHNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIFBhZ2VSZWdpc3RlciA9IFBhZ2VSZWdpc3Rlcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbWFjZW5hIGxhIGluZm9ybWFjacOzbiBkZSB1bmEgcMOhZ2luYS5cbiAgICAgICAgICogVGlwbyBDb3JlXG4gICAgICAgICAqIEBjbGFzc1xuICAgICAgICAgKiBAcGFyYW0gRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gUGFnZVJlZ2lzdGVyKF9FdmVudEVtaXR0ZXJGYWN0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgUGFnZVJlZ2lzdGVyLnByb3RvdHlwZS5nZXRSZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5yZXNvdXJjZXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25maWd1cmEgbGEgY2xhc2UgbmFkYSBtw6FzIGluc3RhbmNpYXJsYVxuICAgICAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgUGFnZVJlZ2lzdGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICB9O1xuICAgICAgICBQYWdlUmVnaXN0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uKGV2ZW50cyArIFwiLlwiICsgUGFnZVJlZ2lzdGVyXzEuTkFNRVNQQUNFLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBQYWdlUmVnaXN0ZXIucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbmUoZXZlbnRzICsgXCIuXCIgKyBQYWdlUmVnaXN0ZXJfMS5OQU1FU1BBQ0UsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VSZWdpc3Rlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihldmVudHMgKyBcIi5cIiArIFBhZ2VSZWdpc3Rlcl8xLk5BTUVTUEFDRSwgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgZWwgbm9tYnJlIGRlIGxhIHDDoWdpbmFcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VSZWdpc3Rlci5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLm5hbWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQYWdlUmVnaXN0ZXI7XG4gICAgfSgpKTtcbiAgICBQYWdlUmVnaXN0ZXIuTkFNRVNQQUNFID0gXCJwYWdlXCI7XG4gICAgUGFnZVJlZ2lzdGVyID0gUGFnZVJlZ2lzdGVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgIG5hbWU6IFwiUGFnZVJlZ2lzdGVyXCIsXG4gICAgICAgICAgICBpbnN0YW50aWFibGU6IHRydWUsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBQYWdlUmVnaXN0ZXIpO1xuICAgIGV4cG9ydHMuUGFnZVJlZ2lzdGVyID0gUGFnZVJlZ2lzdGVyO1xuICAgIHZhciBQYWdlUmVnaXN0ZXJfMTtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL1BhZ2VSZWdpc3Rlci5qcyJ9
