System.register(["../di", "../jquery", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, utils_1, ResourceController, ResourceController_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            ResourceController = ResourceController_1 = (function () {
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
                }
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
                ResourceController.prototype._markAsCompleted = function () {
                    this._completed = true;
                    this._$element.addClass(ResourceController_1.CLASS_COMPLETED);
                    this._eventEmitter.trigger(ResourceController_1.ON_COMPLETED);
                };
                ResourceController.prototype.setOption = function (name, value) {
                    this._options[name] = value;
                };
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
                return ResourceController;
            }());
            ResourceController.NAMESPACE = "resourceController";
            ResourceController.ON_COMPLETED = ResourceController_1.NAMESPACE + ":completed";
            ResourceController.CLASS_UNCOMPLETED = "hz-resource--uncompleted";
            ResourceController.CLASS_COMPLETED = "hz-resource--completed";
            ResourceController = ResourceController_1 = __decorate([
                di_1.Dependencies({
                    dependencies: [
                        jquery_1.default,
                        utils_1.EventEmitterFactory
                    ]
                })
            ], ResourceController);
            exports_1("ResourceController", ResourceController);
        }
    };
});
//# sourceMappingURL=ResourceController.js.map