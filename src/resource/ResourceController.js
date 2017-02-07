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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi4vdXRpbHNcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgdXRpbHNfMSwgUmVzb3VyY2VDb250cm9sbGVyLCBSZXNvdXJjZUNvbnRyb2xsZXJfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyID0gUmVzb3VyY2VDb250cm9sbGVyXzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENvbnRyb2xhZG9yIGJhc2UgcGFyYSBsb3MgcmVjdXJzb3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICBfJFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyRmFjdG9yeX0gICAgIF9FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VDb250cm9sbGVyKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkgPSBfRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEludm9jYWRvIGFsIG9idGVuZXJzZSBlbCBmYWN0b3J5IGRlbCBESSBwYXJhIGVzdGFibGVjZXIgbGFzIG9wY2lvbmVzXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkZWxlbWVudCAgICAgICAgRWxlbWVudG8gZGVsIHJlY3Vyc29cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LmFkZENsYXNzKFJlc291cmNlQ29udHJvbGxlcl8xLkNMQVNTX1VOQ09NUExFVEVEKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeS5jcmVhdGVFbWl0dGVyKHRoaXMuXyRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluZGljYSBzaSBzZSBoYSBpbnZvY2FkbyBhbCBtw6l0b2RvIGRlc3Ryb3lcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzRGVzdHJveWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVhbGl6YSBsYSBjb21wcm9iYWNpw7NuIGRlIG9iamV0aXZvIGNvbXBsZXRhZG9cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5fbWFya0FzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyhSZXNvdXJjZUNvbnRyb2xsZXJfMS5DTEFTU19DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihSZXNvdXJjZUNvbnRyb2xsZXJfMS5PTl9DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5zZXRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9uc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5nZXRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9uc1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlc3RydXllIGVsIGNvbXBvbmVudGUuIFNlIGhhIGRlIGV4dGVuZGVyIGVuIGNhZGEgcmVjdXJzbyBjb24gbGFzIGFjY2lvbmVzIHBlcnRpbmVudGVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub25lKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUNvbnRyb2xsZXI7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLk5BTUVTUEFDRSA9IFwicmVzb3VyY2VDb250cm9sbGVyXCI7XG4gICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIuT05fQ09NUExFVEVEID0gUmVzb3VyY2VDb250cm9sbGVyXzEuTkFNRVNQQUNFICsgXCI6Y29tcGxldGVkXCI7XG4gICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIuQ0xBU1NfVU5DT01QTEVURUQgPSBcImh6LXJlc291cmNlLS11bmNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLkNMQVNTX0NPTVBMRVRFRCA9IFwiaHotcmVzb3VyY2UtLWNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyID0gUmVzb3VyY2VDb250cm9sbGVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkRlcGVuZGVuY2llcyh7XG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFJlc291cmNlQ29udHJvbGxlcik7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJSZXNvdXJjZUNvbnRyb2xsZXJcIiwgUmVzb3VyY2VDb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicmVzb3VyY2UvUmVzb3VyY2VDb250cm9sbGVyLmpzIn0=
