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
        define(["require", "exports", "../di", "../jquery", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var jquery_1 = require("../jquery");
    var utils_1 = require("../utils");
    var ComponentController = (function () {
        /**
         * Controlador base para los recursos
         * @param {JQueryStatic}            _$
         * @param {EventEmitterFactory}     _EventEmitterFactory
         */
        function ComponentController(_$, _EventEmitterFactory) {
            this._$ = _$;
            this._EventEmitterFactory = _EventEmitterFactory;
            this._destroyed = false;
            this._options = {};
        }
        /**
         * Invocado al obtenerse el factory del DI para establecer las opciones
         * @param {JQuery}  $element        Elemento del componente
         */
        ComponentController.prototype.activate = function ($element) {
            this._$element = $element;
            this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
        };
        /**
         * Indica si se ha invocado al método destroy
         * @returns {boolean}
         */
        ComponentController.prototype.isDestroyed = function () {
            return this._destroyed;
        };
        /**
         * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
         */
        ComponentController.prototype.destroy = function () {
            this._destroyed = true;
        };
        ComponentController.prototype.on = function (events, data, handler) {
            this._eventEmitter.on(events, data, handler);
            return this;
        };
        ;
        ComponentController.prototype.one = function (events, data, handler) {
            this._eventEmitter.one(events, data, handler);
            return this;
        };
        ;
        ComponentController.prototype.off = function (events, handler) {
            this._eventEmitter.off(events, handler);
            return this;
        };
        ;
        return ComponentController;
    }());
    ComponentController = __decorate([
        di_1.Dependencies({
            dependencies: [
                jquery_1.default,
                utils_1.EventEmitterFactory
            ]
        })
    ], ComponentController);
    exports.ComponentController = ComponentController;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50Q29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi4vdXRpbHNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIGpxdWVyeV8xID0gcmVxdWlyZShcIi4uL2pxdWVyeVwiKTtcbiAgICB2YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbiAgICB2YXIgQ29tcG9uZW50Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250cm9sYWRvciBiYXNlIHBhcmEgbG9zIHJlY3Vyc29zXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5U3RhdGljfSAgICAgICAgICAgIF8kXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyRmFjdG9yeX0gICAgIF9FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBDb21wb25lbnRDb250cm9sbGVyKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeSA9IF9FdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9jYWRvIGFsIG9idGVuZXJzZSBlbCBmYWN0b3J5IGRlbCBESSBwYXJhIGVzdGFibGVjZXIgbGFzIG9wY2lvbmVzXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgJGVsZW1lbnQgICAgICAgIEVsZW1lbnRvIGRlbCBjb21wb25lbnRlXG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcih0aGlzLl8kZWxlbWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2Egc2kgc2UgaGEgaW52b2NhZG8gYWwgbcOpdG9kbyBkZXN0cm95XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUuaXNEZXN0cm95ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVzdHJ1eWUgZWwgY29tcG9uZW50ZS4gU2UgaGEgZGUgZXh0ZW5kZXIgZW4gY2FkYSBjb21wb25lbnRlIGNvbiBsYXMgYWNjaW9uZXMgcGVydGluZW50ZXNcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uZShldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihldmVudHMsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudENvbnRyb2xsZXI7XG4gICAgfSgpKTtcbiAgICBDb21wb25lbnRDb250cm9sbGVyID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuRGVwZW5kZW5jaWVzKHtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgQ29tcG9uZW50Q29udHJvbGxlcik7XG4gICAgZXhwb3J0cy5Db21wb25lbnRDb250cm9sbGVyID0gQ29tcG9uZW50Q29udHJvbGxlcjtcbn0pO1xuIl0sImZpbGUiOiJjb21wb25lbnQvQ29tcG9uZW50Q29udHJvbGxlci5qcyJ9
