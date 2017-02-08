System.register(["../di", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, utils_1, PageRegister, PageRegister_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            PageRegister = PageRegister_1 = (function () {
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
            exports_1("PageRegister", PageRegister);
        }
    };
});
//# sourceMappingURL=PageRegister.js.map