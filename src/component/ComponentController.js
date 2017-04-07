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
//# sourceMappingURL=ComponentController.js.map