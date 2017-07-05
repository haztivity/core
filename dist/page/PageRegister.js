"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var utils_1 = require("../utils");
var PageRegister = (function () {
    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    function PageRegister(_EventEmitterFactory) {
        this._EventEmitterFactory = _EventEmitterFactory;
    }
    PageRegister_1 = PageRegister;
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
    return PageRegister;
    var PageRegister_1;
}());
exports.PageRegister = PageRegister;
//# sourceMappingURL=PageRegister.js.map