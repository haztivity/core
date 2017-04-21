"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            jquery_1.$,
            utils_1.EventEmitterFactory
        ]
    })
], ResourceController);
exports.ResourceController = ResourceController;
var ResourceController_1;
