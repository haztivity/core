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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi4vdXRpbHNcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgdXRpbHNfMSwgUmVzb3VyY2VDb250cm9sbGVyLCBSZXNvdXJjZUNvbnRyb2xsZXJfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyID0gUmVzb3VyY2VDb250cm9sbGVyXzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENvbnRyb2xhZG9yIGJhc2UgcGFyYSBsb3MgcmVjdXJzb3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICBfJFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyRmFjdG9yeX0gICAgIF9FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VDb250cm9sbGVyKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkgPSBfRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlRGVmZXJyZWQgPSB0aGlzLl8kLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBNYXJjYSBlbCByZWN1cnNvIGNvbW8gY29tcGxldGFkb1xuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5fbWFya0FzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LnJlbW92ZUNsYXNzKFJlc291cmNlQ29udHJvbGxlcl8xLkNMQVNTX1VOQ09NUExFVEVEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LmFkZENsYXNzKFJlc291cmNlQ29udHJvbGxlcl8xLkNMQVNTX0NPTVBMRVRFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wbGV0ZURlZmVycmVkLnJlc29sdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihSZXNvdXJjZUNvbnRyb2xsZXJfMS5PTl9DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBCbG9xdWVhIGVsIHJlY3Vyc28gaW1waWRpZW5kbyByZWFsaXphciBjaWVydGFzIGFjY2lvbmVzXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLl9sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzYmxvcXVlYSBlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLl91bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIGVsIHJlY3Vyc28gZXN0w6EgYmxvcXVlYWRvXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTG9ja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9ja2VkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIGVsIHJlY3Vyc28gZXN0w6EgZGVzaGFiaWxpdGFkb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnZvY2FkbyBhbCBvYnRlbmVyc2UgZWwgZmFjdG9yeSBkZWwgREkgcGFyYSBlc3RhYmxlY2VyIGxhcyBvcGNpb25lc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgJGVsZW1lbnQgICAgICAgIEVsZW1lbnRvIGRlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyhSZXNvdXJjZUNvbnRyb2xsZXJfMS5DTEFTU19VTkNPTVBMRVRFRCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcih0aGlzLl8kZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZXNoYWJpbGl0YSBlbCByZWN1cnNvIHNpIG5vIGVzdMOhIGJsb3F1ZWFkXG4gICAgICAgICAgICAgICAgICogcmV0dXJuIHtib29sZWFufSBUcnVlIHNpIHNlIGhhIHJlYWxpemFkbyBsYSBvcGVyYWNpw7NuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSGFiaWxpdGEgZWwgcmVjdXJzbyBzaSBubyBlc3TDoSBibG9xdWVhZFxuICAgICAgICAgICAgICAgICAqIHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBzaSBzZSBoYSByZWFsaXphZG8gbGEgb3BlcmFjacOzblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluZGljYSBzaSBzZSBoYSBpbnZvY2FkbyBhbCBtw6l0b2RvIGRlc3Ryb3lcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzRGVzdHJveWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVhbGl6YSBsYSBjb21wcm9iYWNpw7NuIGRlIG9iamV0aXZvIGNvbXBsZXRhZG9cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSB1bmEgb3BjacOzbiBkZWwgcmVjdXJzb1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zW25hbWVdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzdHJ1eWUgZWwgY29tcG9uZW50ZS4gU2UgaGEgZGUgZXh0ZW5kZXIgZW4gY2FkYSByZWN1cnNvIGNvbiBsYXMgYWNjaW9uZXMgcGVydGluZW50ZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24oZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbmUoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vZmYoZXZlbnRzLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGV2dWVsdmUgbGEgcHJvbWVzYSBkZWwgcmVjdXJzby4gTGEgcHJvbWVzYSBzZSByZXN1ZWx2ZSBhbCBjb21wbGV0YXJzZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPFQ+fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Q29tcGxldGVQcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGVEZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZXZ1ZWx2ZSBlbCBlbGVtZW50byBkZWwgcmVjdXJzb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnl9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VDb250cm9sbGVyO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5OQU1FU1BBQ0UgPSBcInJlc291cmNlQ29udHJvbGxlclwiO1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLk9OX0NPTVBMRVRFRCA9IFJlc291cmNlQ29udHJvbGxlcl8xLk5BTUVTUEFDRSArIFwiOmNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLkNMQVNTX1VOQ09NUExFVEVEID0gXCJoei1yZXNvdXJjZS0tdW5jb21wbGV0ZWRcIjtcbiAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5DTEFTU19DT01QTEVURUQgPSBcImh6LXJlc291cmNlLS1jb21wbGV0ZWRcIjtcbiAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlciA9IFJlc291cmNlQ29udHJvbGxlcl8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5EZXBlbmRlbmNpZXMoe1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBSZXNvdXJjZUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiUmVzb3VyY2VDb250cm9sbGVyXCIsIFJlc291cmNlQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlQ29udHJvbGxlci5qcyJ9
