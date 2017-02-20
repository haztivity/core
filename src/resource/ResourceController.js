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
    var ResourceController = ResourceController_1 = (function () {
        /**
         * Controlador base para los recursos
         * @param {JQueryStatic}            _$
         * @param {EventEmitterFactory}     _EventEmitterFactory
         */
        function ResourceController(_$, _EventEmitterFactory) {
            this._$ = _$;
            this._EventEmitterFactory = _EventEmitterFactory;
            this._destroyed = false;
            this._completed = false;
            this._options = {};
            this._completeDeferred = this._$.Deferred();
            this._disabled = false;
            this._locked = false;
        }
        /**
         * Marca el recurso como completado
         * @private
         */
        ResourceController.prototype._markAsCompleted = function () {
            if (!this.isCompleted()) {
                this._completed = true;
                this._$element.removeClass(ResourceController_1.CLASS_UNCOMPLETED);
                this._$element.addClass(ResourceController_1.CLASS_COMPLETED);
                this._completeDeferred.resolve(this);
                this._eventEmitter.trigger(ResourceController_1.ON_COMPLETED);
            }
        };
        /**
         * Bloquea el recurso impidiendo realizar ciertas acciones
         * @private
         */
        ResourceController.prototype._lock = function () {
            this._locked = true;
        };
        /**
         * Desbloquea el recurso
         * @private
         */
        ResourceController.prototype._unlock = function () {
            this._locked = false;
        };
        /**
         * Indica si el recurso está bloqueado
         * @returns {any}
         */
        ResourceController.prototype.isLocked = function () {
            return this._locked;
        };
        /**
         * Indica si el recurso está deshabilitado
         * @returns {any}
         */
        ResourceController.prototype.isDisabled = function () {
            return this._disabled;
        };
        /**
         * Invocado al obtenerse el factory del DI para establecer las opciones
         * @param {JQuery}  $element        Elemento del recurso
         */
        ResourceController.prototype.activate = function ($element) {
            this._$element = $element;
            this._$element.addClass(ResourceController_1.CLASS_UNCOMPLETED);
            this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
        };
        /**
         * Deshabilita el recurso si no está bloquead
         * return {boolean} True si se ha realizado la operación
         */
        ResourceController.prototype.disable = function () {
            if (!this.isLocked()) {
                this._disabled = true;
                this._$element.addClass(ResourceController_1.CLASS_DISABLED);
                return true;
            }
            return false;
        };
        /**
         * Habilita el recurso si no está bloquead
         * return {boolean} True si se ha realizado la operación
         */
        ResourceController.prototype.enable = function () {
            if (!this.isLocked()) {
                this._disabled = false;
                this._$element.removeClass(ResourceController_1.CLASS_DISABLED);
                return true;
            }
            return false;
        };
        /**
         * Indica si se ha invocado al método destroy
         * @returns {boolean}
         */
        ResourceController.prototype.isDestroyed = function () {
            return this._destroyed;
        };
        /**
         * Realiza la comprobación de objetivo completado
         * @returns {boolean}
         */
        ResourceController.prototype.isCompleted = function () {
            return this._completed;
        };
        /**
         * Obtiene una opción del recurso
         * @param name
         * @returns {any}
         */
        ResourceController.prototype.getOption = function (name) {
            return this._options[name];
        };
        /**
         * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
         */
        ResourceController.prototype.destroy = function () {
            this._destroyed = true;
        };
        ResourceController.prototype.on = function (events, data, handler) {
            this._eventEmitter.on(events, data, handler);
            return this;
        };
        ;
        ResourceController.prototype.one = function (events, data, handler) {
            this._eventEmitter.one(events, data, handler);
            return this;
        };
        ;
        ResourceController.prototype.off = function (events, handler) {
            this._eventEmitter.off(events, handler);
            return this;
        };
        ;
        /**
         * Devuelve la promesa del recurso. La promesa se resuelve al completarse
         * @returns {JQueryPromise<T>}
         */
        ResourceController.prototype.getCompletePromise = function () {
            return this._completeDeferred.promise();
        };
        /**
         * Devuelve el elemento del recurso
         * @returns {JQuery}
         */
        ResourceController.prototype.getElement = function () {
            return this._$element;
        };
        return ResourceController;
    }());
    ResourceController.NAMESPACE = "resourceController";
    ResourceController.ON_COMPLETED = ResourceController_1.NAMESPACE + ":completed";
    ResourceController.CLASS_UNCOMPLETED = "hz-resource--uncompleted";
    ResourceController.CLASS_COMPLETED = "hz-resource--completed";
    ResourceController.CLASS_DISABLED = "hz-resource--disabled";
    ResourceController = ResourceController_1 = __decorate([
        di_1.Dependencies({
            dependencies: [
                jquery_1.default,
                utils_1.EventEmitterFactory
            ]
        })
    ], ResourceController);
    exports.ResourceController = ResourceController;
    var ResourceController_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9kaVwiLCBcIi4uL2pxdWVyeVwiLCBcIi4uL3V0aWxzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBqcXVlcnlfMSA9IHJlcXVpcmUoXCIuLi9qcXVlcnlcIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIFJlc291cmNlQ29udHJvbGxlciA9IFJlc291cmNlQ29udHJvbGxlcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRyb2xhZG9yIGJhc2UgcGFyYSBsb3MgcmVjdXJzb3NcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnlTdGF0aWN9ICAgICAgICAgICAgXyRcbiAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJGYWN0b3J5fSAgICAgX0V2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlQ29udHJvbGxlcihfJCwgX0V2ZW50RW1pdHRlckZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkgPSBfRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZURlZmVycmVkID0gdGhpcy5fJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXJjYSBlbCByZWN1cnNvIGNvbW8gY29tcGxldGFkb1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5fbWFya0FzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29tcGxldGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LnJlbW92ZUNsYXNzKFJlc291cmNlQ29udHJvbGxlcl8xLkNMQVNTX1VOQ09NUExFVEVEKTtcbiAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyhSZXNvdXJjZUNvbnRyb2xsZXJfMS5DTEFTU19DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlRGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihSZXNvdXJjZUNvbnRyb2xsZXJfMS5PTl9DT01QTEVURUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQmxvcXVlYSBlbCByZWN1cnNvIGltcGlkaWVuZG8gcmVhbGl6YXIgY2llcnRhcyBhY2Npb25lc1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5fbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXNibG9xdWVhIGVsIHJlY3Vyc29cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuX3VubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhIHNpIGVsIHJlY3Vyc28gZXN0w6EgYmxvcXVlYWRvXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTG9ja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2tlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYSBzaSBlbCByZWN1cnNvIGVzdMOhIGRlc2hhYmlsaXRhZG9cbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuaXNEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9jYWRvIGFsIG9idGVuZXJzZSBlbCBmYWN0b3J5IGRlbCBESSBwYXJhIGVzdGFibGVjZXIgbGFzIG9wY2lvbmVzXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgJGVsZW1lbnQgICAgICAgIEVsZW1lbnRvIGRlbCByZWN1cnNvXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQuYWRkQ2xhc3MoUmVzb3VyY2VDb250cm9sbGVyXzEuQ0xBU1NfVU5DT01QTEVURUQpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeS5jcmVhdGVFbWl0dGVyKHRoaXMuXyRlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc2hhYmlsaXRhIGVsIHJlY3Vyc28gc2kgbm8gZXN0w6EgYmxvcXVlYWRcbiAgICAgICAgICogcmV0dXJuIHtib29sZWFufSBUcnVlIHNpIHNlIGhhIHJlYWxpemFkbyBsYSBvcGVyYWNpw7NuXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyhSZXNvdXJjZUNvbnRyb2xsZXJfMS5DTEFTU19ESVNBQkxFRCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYWJpbGl0YSBlbCByZWN1cnNvIHNpIG5vIGVzdMOhIGJsb3F1ZWFkXG4gICAgICAgICAqIHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBzaSBzZSBoYSByZWFsaXphZG8gbGEgb3BlcmFjacOzblxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQucmVtb3ZlQ2xhc3MoUmVzb3VyY2VDb250cm9sbGVyXzEuQ0xBU1NfRElTQUJMRUQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhIHNpIHNlIGhhIGludm9jYWRvIGFsIG3DqXRvZG8gZGVzdHJveVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuaXNEZXN0cm95ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVhbGl6YSBsYSBjb21wcm9iYWNpw7NuIGRlIG9iamV0aXZvIGNvbXBsZXRhZG9cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgdW5hIG9wY2nDs24gZGVsIHJlY3Vyc29cbiAgICAgICAgICogQHBhcmFtIG5hbWVcbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0T3B0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zW25hbWVdO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVzdHJ1eWUgZWwgY29tcG9uZW50ZS4gU2UgaGEgZGUgZXh0ZW5kZXIgZW4gY2FkYSByZWN1cnNvIGNvbiBsYXMgYWNjaW9uZXMgcGVydGluZW50ZXNcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24oZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uZShldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV2dWVsdmUgbGEgcHJvbWVzYSBkZWwgcmVjdXJzby4gTGEgcHJvbWVzYSBzZSByZXN1ZWx2ZSBhbCBjb21wbGV0YXJzZVxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxUPn1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Q29tcGxldGVQcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlRGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV2dWVsdmUgZWwgZWxlbWVudG8gZGVsIHJlY3Vyc29cbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeX1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8kZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFJlc291cmNlQ29udHJvbGxlcjtcbiAgICB9KCkpO1xuICAgIFJlc291cmNlQ29udHJvbGxlci5OQU1FU1BBQ0UgPSBcInJlc291cmNlQ29udHJvbGxlclwiO1xuICAgIFJlc291cmNlQ29udHJvbGxlci5PTl9DT01QTEVURUQgPSBSZXNvdXJjZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjpjb21wbGV0ZWRcIjtcbiAgICBSZXNvdXJjZUNvbnRyb2xsZXIuQ0xBU1NfVU5DT01QTEVURUQgPSBcImh6LXJlc291cmNlLS11bmNvbXBsZXRlZFwiO1xuICAgIFJlc291cmNlQ29udHJvbGxlci5DTEFTU19DT01QTEVURUQgPSBcImh6LXJlc291cmNlLS1jb21wbGV0ZWRcIjtcbiAgICBSZXNvdXJjZUNvbnRyb2xsZXIuQ0xBU1NfRElTQUJMRUQgPSBcImh6LXJlc291cmNlLS1kaXNhYmxlZFwiO1xuICAgIFJlc291cmNlQ29udHJvbGxlciA9IFJlc291cmNlQ29udHJvbGxlcl8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuRGVwZW5kZW5jaWVzKHtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgUmVzb3VyY2VDb250cm9sbGVyKTtcbiAgICBleHBvcnRzLlJlc291cmNlQ29udHJvbGxlciA9IFJlc291cmNlQ29udHJvbGxlcjtcbiAgICB2YXIgUmVzb3VyY2VDb250cm9sbGVyXzE7XG59KTtcbiJdLCJmaWxlIjoicmVzb3VyY2UvUmVzb3VyY2VDb250cm9sbGVyLmpzIn0=
