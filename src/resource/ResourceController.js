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
                 * @param {JQueryStatic}            $
                 * @param {EventEmitterFactory}     EventEmitterFactory
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi4vdXRpbHNcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgdXRpbHNfMSwgUmVzb3VyY2VDb250cm9sbGVyLCBSZXNvdXJjZUNvbnRyb2xsZXJfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyID0gUmVzb3VyY2VDb250cm9sbGVyXzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENvbnRyb2xhZG9yIGJhc2UgcGFyYSBsb3MgcmVjdXJzb3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICAkXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJGYWN0b3J5fSAgICAgRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFJlc291cmNlQ29udHJvbGxlcihfJCwgX0V2ZW50RW1pdHRlckZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnZvY2FkbyBhbCBvYnRlbmVyc2UgZWwgZmFjdG9yeSBkZWwgREkgcGFyYSBlc3RhYmxlY2VyIGxhcyBvcGNpb25lc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgJGVsZW1lbnQgICAgICAgIEVsZW1lbnRvIGRlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIgPSB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5LmNyZWF0ZUVtaXR0ZXIodGhpcy5fJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIHNlIGhhIGludm9jYWRvIGFsIG3DqXRvZG8gZGVzdHJveVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuaXNEZXN0cm95ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZXN0cm95ZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZWFsaXphIGxhIGNvbXByb2JhY2nDs24gZGUgb2JqZXRpdm8gY29tcGxldGFkb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5wcm90b3R5cGUuaXNDb21wbGV0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLl9tYXJrQXNDb21wbGV0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci50cmlnZ2VyKFJlc291cmNlQ29udHJvbGxlcl8xLk9OX0NPTVBMRVRFRCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zW25hbWVdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzdHJ1eWUgZWwgY29tcG9uZW50ZS4gU2UgaGEgZGUgZXh0ZW5kZXIgZW4gY2FkYSByZWN1cnNvIGNvbiBsYXMgYWNjaW9uZXMgcGVydGluZW50ZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24oZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbmUoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vZmYoZXZlbnRzLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlQ29udHJvbGxlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBSZXNvdXJjZUNvbnRyb2xsZXIuTkFNRVNQQUNFID0gXCJyZXNvdXJjZUNvbnRyb2xsZXJcIjtcbiAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlci5PTl9DT01QTEVURUQgPSBSZXNvdXJjZUNvbnRyb2xsZXJfMS5OQU1FU1BBQ0UgKyBcIjpjb21wbGV0ZWRcIjtcbiAgICAgICAgICAgIFJlc291cmNlQ29udHJvbGxlciA9IFJlc291cmNlQ29udHJvbGxlcl8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5EZXBlbmRlbmNpZXMoe1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBSZXNvdXJjZUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiUmVzb3VyY2VDb250cm9sbGVyXCIsIFJlc291cmNlQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlQ29udHJvbGxlci5qcyJ9
