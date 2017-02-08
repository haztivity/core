System.register(["../di", "../jquery", "../utils", "./ResourceController", "./ResourceInitializer"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, utils_1, ResourceController_1, ResourceInitializer_1, ResourceSequence, ResourceSequence_1;
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
            },
            function (ResourceController_1_1) {
                ResourceController_1 = ResourceController_1_1;
            },
            function (ResourceInitializer_1_1) {
                ResourceInitializer_1 = ResourceInitializer_1_1;
            }
        ],
        execute: function () {
            ResourceSequence = ResourceSequence_1 = (function () {
                function ResourceSequence(_$, _EventEmitterFactory) {
                    this._items = [];
                    this._itemsPromises = [];
                    this._$ = _$;
                    this._EventEmitterFactory = _EventEmitterFactory;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter();
                    this._state = ResourceSequence_1.STATES.waiting;
                    this._completeDeferred = this._$.Deferred();
                    this._locked = false;
                }
                /**
                 * Activa la secuencia
                 * @param {JQuery | ResourceController[] | ResourceSequence[]}  items       Conjunto de items a incluir en la secuencia.
                 * @param {String}                                              [id]        Id a asignar a la secuencia
                 */
                ResourceSequence.prototype.activate = function (items, id) {
                    this._id = id != undefined ? id : new Date().getTime();
                    this._addItems(items);
                };
                ResourceSequence.prototype._addItems = function (items) {
                    for (var itemIndex = 0, itemsLength = items.length; itemIndex < itemsLength; itemIndex++) {
                        var currentItem = items[itemIndex];
                        this._addItem(currentItem);
                    }
                };
                ResourceSequence.prototype._addItem = function (item) {
                    if (item instanceof Element) {
                        this._addItem(this._$(item).data(ResourceInitializer_1.ResourceInitializer.PREFIX_INSTANCE));
                    }
                    else {
                        if (item) {
                            //if is a resource, add a class to indicate state and an attr to indicate the secuence
                            if (item instanceof ResourceController_1.ResourceController) {
                                item.disable();
                                this._setResourceState(item, ResourceSequence_1.STATES.waiting);
                                item.getElement().attr(ResourceSequence_1.ATTR_SEQUENCE, this._id);
                            }
                            //lock item to prevent manual interaction
                            item._lock();
                            this._itemsPromises.push(item.getCompletePromise());
                            this._items.push(item);
                        }
                    }
                };
                /**
                 * Actualiza el estado de un recurso. Comprueba si el item es una instancia de ResourceController
                 * @param {*}       item    Elemento a comprobar y actualizar
                 * @param {number}  state   Estado a establecer
                 * @private
                 */
                ResourceSequence.prototype._setResourceState = function (item, state) {
                    if (item instanceof ResourceController_1.ResourceController) {
                        var $element = item.getElement();
                        $element.removeClass(ResourceSequence_1.CLASS_RUNNING + " " + ResourceSequence_1.CLASS_COMPLETED + " " + ResourceSequence_1.CLASS_WAITING);
                        switch (state) {
                            case ResourceSequence_1.STATES.completed:
                                $element.addClass(ResourceSequence_1.CLASS_COMPLETED);
                                break;
                            case ResourceSequence_1.STATES.running:
                                $element.addClass(ResourceSequence_1.CLASS_RUNNING);
                                break;
                            case ResourceSequence_1.STATES.waiting:
                                $element.addClass(ResourceSequence_1.CLASS_WAITING);
                                break;
                        }
                    }
                };
                /**
                 * Invocado al completarse un item. Avanza la secuencia
                 * @private
                 */
                ResourceSequence.prototype._onItemComplete = function () {
                    this._setResourceState(this._currentItem, ResourceSequence_1.STATES.completed);
                    this._next();
                };
                /**
                 * Avanza la secuencia.
                 * @private
                 */
                ResourceSequence.prototype._next = function () {
                    if (this.isRunning()) {
                        if (this._currentItemIndex < this._items.length) {
                            var item = this._items[this._currentItemIndex], promise = void 0;
                            this._currentItem = item;
                            this._currentItemIndex++;
                            item._unlock();
                            //if item is a sequence, unlock it to run
                            if (item instanceof ResourceSequence_1) {
                                item.run();
                            }
                            else {
                                this._setResourceState(item, ResourceSequence_1.STATES.running);
                                item.enable();
                            }
                            promise = item.getCompletePromise();
                            promise.then(this._onItemComplete.bind(this));
                        }
                        else {
                            this._markAsComplete();
                        }
                    }
                };
                /**
                 * Indica si la secuencia está en ejecución
                 * @returns {boolean}
                 */
                ResourceSequence.prototype.isRunning = function () {
                    return this._state == ResourceSequence_1.STATES.running;
                };
                /**
                 * Indica si la secuencia está bloqueada
                 * @returns {any}
                 */
                ResourceSequence.prototype.isLocked = function () {
                    return this._locked;
                };
                /**
                 * Bloquea la secuencia impidiendo que sea ejecutada
                 * @returns {ResourceSequence}
                 * @private
                 */
                ResourceSequence.prototype._lock = function () {
                    this._locked = true;
                    return this;
                };
                /**
                 * Desbloquea la secuencia
                 * @returns {ResourceSequence}
                 * @private
                 */
                ResourceSequence.prototype._unlock = function () {
                    this._locked = false;
                    return this;
                };
                /**
                 * Ejecuta la secuencia si no está bloqueada
                 * @returns {JQueryPromise<T>}
                 */
                ResourceSequence.prototype.run = function () {
                    if (!this.isLocked()) {
                        this._state = ResourceSequence_1.STATES.running;
                        this._currentItemIndex = 0;
                        this._next();
                        return this.getCompletePromise();
                    }
                };
                /**
                 * Indica si la secuencia está completa
                 * @returns {boolean}
                 */
                ResourceSequence.prototype.isCompleted = function () {
                    return this._state == ResourceSequence_1.STATES.completed;
                };
                /**
                 * Marca la secuencia como completada
                 * @private
                 */
                ResourceSequence.prototype._markAsComplete = function () {
                    if (!this.isCompleted()) {
                        this._state = ResourceSequence_1.STATES.completed;
                        this._completeDeferred.resolve(this._items);
                        this._eventEmitter.trigger(ResourceSequence_1.ON_COMPLETED, [this._items]);
                    }
                };
                /**
                 * Devuelve la promesa de la sequencia. La promesa se resuelve al completarse
                 * @returns {JQueryPromise<T>}
                 */
                ResourceSequence.prototype.getCompletePromise = function () {
                    return this._completeDeferred.promise();
                };
                ResourceSequence.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events, data, handler);
                    return this;
                };
                ;
                ResourceSequence.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events, data, handler);
                    return this;
                };
                ;
                ResourceSequence.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events, handler);
                    return this;
                };
                ;
                return ResourceSequence;
            }());
            ResourceSequence.NAMESPACE = "resourceSequence";
            ResourceSequence.ON_COMPLETED = ResourceSequence_1.NAMESPACE + ":completed";
            ResourceSequence.STATES = {
                waiting: 0,
                running: 1,
                completed: 2
            };
            ResourceSequence.CLASS_WAITING = "hz-resource-sequence--waiting";
            ResourceSequence.CLASS_RUNNING = "hz-resource-sequence--current";
            ResourceSequence.CLASS_COMPLETED = "hz-resource-sequence--completed";
            ResourceSequence.ATTR_SEQUENCE = "data-hz-resource-sequence";
            ResourceSequence = ResourceSequence_1 = __decorate([
                di_1.Core({
                    name: "ResourceSequence",
                    dependencies: [
                        jquery_1.$,
                        utils_1.EventEmitterFactory
                    ],
                    instantiable: true,
                    public: true
                })
            ], ResourceSequence);
            exports_1("ResourceSequence", ResourceSequence);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4uL2pxdWVyeVwiLCBcIi4uL3V0aWxzXCIsIFwiLi9SZXNvdXJjZUNvbnRyb2xsZXJcIiwgXCIuL1Jlc291cmNlSW5pdGlhbGl6ZXJcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgdXRpbHNfMSwgUmVzb3VyY2VDb250cm9sbGVyXzEsIFJlc291cmNlSW5pdGlhbGl6ZXJfMSwgUmVzb3VyY2VTZXF1ZW5jZSwgUmVzb3VyY2VTZXF1ZW5jZV8xO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAganF1ZXJ5XzEgPSBqcXVlcnlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICh1dGlsc18xXzEpIHtcbiAgICAgICAgICAgICAgICB1dGlsc18xID0gdXRpbHNfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChSZXNvdXJjZUNvbnRyb2xsZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VDb250cm9sbGVyXzEgPSBSZXNvdXJjZUNvbnRyb2xsZXJfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChSZXNvdXJjZUluaXRpYWxpemVyXzFfMSkge1xuICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXJfMSA9IFJlc291cmNlSW5pdGlhbGl6ZXJfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlID0gUmVzb3VyY2VTZXF1ZW5jZV8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBSZXNvdXJjZVNlcXVlbmNlKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc1Byb21pc2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeSA9IF9FdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIgPSB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5LmNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLndhaXRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlRGVmZXJyZWQgPSB0aGlzLl8kLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBY3RpdmEgbGEgc2VjdWVuY2lhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnkgfCBSZXNvdXJjZUNvbnRyb2xsZXJbXSB8IFJlc291cmNlU2VxdWVuY2VbXX0gIGl0ZW1zICAgICAgIENvbmp1bnRvIGRlIGl0ZW1zIGEgaW5jbHVpciBlbiBsYSBzZWN1ZW5jaWEuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF0gICAgICAgIElkIGEgYXNpZ25hciBhIGxhIHNlY3VlbmNpYVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKGl0ZW1zLCBpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IGlkICE9IHVuZGVmaW5lZCA/IGlkIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZEl0ZW1zKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLl9hZGRJdGVtcyA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpdGVtSW5kZXggPSAwLCBpdGVtc0xlbmd0aCA9IGl0ZW1zLmxlbmd0aDsgaXRlbUluZGV4IDwgaXRlbXNMZW5ndGg7IGl0ZW1JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSBpdGVtc1tpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkSXRlbShjdXJyZW50SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLl9hZGRJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRJdGVtKHRoaXMuXyQoaXRlbSkuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUmVzb3VyY2VJbml0aWFsaXplci5QUkVGSVhfSU5TVEFOQ0UpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBpcyBhIHJlc291cmNlLCBhZGQgYSBjbGFzcyB0byBpbmRpY2F0ZSBzdGF0ZSBhbmQgYW4gYXR0ciB0byBpbmRpY2F0ZSB0aGUgc2VjdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFJlc291cmNlQ29udHJvbGxlcl8xLlJlc291cmNlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UmVzb3VyY2VTdGF0ZShpdGVtLCBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLndhaXRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldEVsZW1lbnQoKS5hdHRyKFJlc291cmNlU2VxdWVuY2VfMS5BVFRSX1NFUVVFTkNFLCB0aGlzLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9jayBpdGVtIHRvIHByZXZlbnQgbWFudWFsIGludGVyYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5fbG9jaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zUHJvbWlzZXMucHVzaChpdGVtLmdldENvbXBsZXRlUHJvbWlzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBY3R1YWxpemEgZWwgZXN0YWRvIGRlIHVuIHJlY3Vyc28uIENvbXBydWViYSBzaSBlbCBpdGVtIGVzIHVuYSBpbnN0YW5jaWEgZGUgUmVzb3VyY2VDb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBpdGVtICAgIEVsZW1lbnRvIGEgY29tcHJvYmFyIHkgYWN0dWFsaXphclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgc3RhdGUgICBFc3RhZG8gYSBlc3RhYmxlY2VyXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5fc2V0UmVzb3VyY2VTdGF0ZSA9IGZ1bmN0aW9uIChpdGVtLCBzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFJlc291cmNlQ29udHJvbGxlcl8xLlJlc291cmNlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gaXRlbS5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcyhSZXNvdXJjZVNlcXVlbmNlXzEuQ0xBU1NfUlVOTklORyArIFwiIFwiICsgUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX0NPTVBMRVRFRCArIFwiIFwiICsgUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1dBSVRJTkcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5jb21wbGV0ZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKFJlc291cmNlU2VxdWVuY2VfMS5DTEFTU19DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJlc291cmNlU2VxdWVuY2VfMS5TVEFURVMucnVubmluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1JVTk5JTkcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJlc291cmNlU2VxdWVuY2VfMS5TVEFURVMud2FpdGluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1dBSVRJTkcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW52b2NhZG8gYWwgY29tcGxldGFyc2UgdW4gaXRlbS4gQXZhbnphIGxhIHNlY3VlbmNpYVxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX29uSXRlbUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRSZXNvdXJjZVN0YXRlKHRoaXMuX2N1cnJlbnRJdGVtLCBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLmNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHQoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEF2YW56YSBsYSBzZWN1ZW5jaWEuXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SXRlbUluZGV4IDwgdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9pdGVtc1t0aGlzLl9jdXJyZW50SXRlbUluZGV4XSwgcHJvbWlzZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEl0ZW1JbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uX3VubG9jaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBhIHNlcXVlbmNlLCB1bmxvY2sgaXQgdG8gcnVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBSZXNvdXJjZVNlcXVlbmNlXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ydW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFJlc291cmNlU3RhdGUoaXRlbSwgUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IGl0ZW0uZ2V0Q29tcGxldGVQcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMuX29uSXRlbUNvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFya0FzQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIGxhIHNlY3VlbmNpYSBlc3TDoSBlbiBlamVjdWNpw7NuXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuaXNSdW5uaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIGxhIHNlY3VlbmNpYSBlc3TDoSBibG9xdWVhZGFcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLmlzTG9ja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9ja2VkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQmxvcXVlYSBsYSBzZWN1ZW5jaWEgaW1waWRpZW5kbyBxdWUgc2VhIGVqZWN1dGFkYVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZVNlcXVlbmNlfVxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX2xvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzYmxvcXVlYSBsYSBzZWN1ZW5jaWFcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7UmVzb3VyY2VTZXF1ZW5jZX1cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLl91bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEVqZWN1dGEgbGEgc2VjdWVuY2lhIHNpIG5vIGVzdMOhIGJsb3F1ZWFkYVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPFQ+fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEl0ZW1JbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wbGV0ZVByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5kaWNhIHNpIGxhIHNlY3VlbmNpYSBlc3TDoSBjb21wbGV0YVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLmlzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5jb21wbGV0ZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBNYXJjYSBsYSBzZWN1ZW5jaWEgY29tbyBjb21wbGV0YWRhXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5fbWFya0FzQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFJlc291cmNlU2VxdWVuY2VfMS5TVEFURVMuY29tcGxldGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcGxldGVEZWZlcnJlZC5yZXNvbHZlKHRoaXMuX2l0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci50cmlnZ2VyKFJlc291cmNlU2VxdWVuY2VfMS5PTl9DT01QTEVURUQsIFt0aGlzLl9pdGVtc10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZXZ1ZWx2ZSBsYSBwcm9tZXNhIGRlIGxhIHNlcXVlbmNpYS4gTGEgcHJvbWVzYSBzZSByZXN1ZWx2ZSBhbCBjb21wbGV0YXJzZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPFQ+fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLmdldENvbXBsZXRlUHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlRGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbmUoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZVNlcXVlbmNlO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UuTkFNRVNQQUNFID0gXCJyZXNvdXJjZVNlcXVlbmNlXCI7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLk9OX0NPTVBMRVRFRCA9IFJlc291cmNlU2VxdWVuY2VfMS5OQU1FU1BBQ0UgKyBcIjpjb21wbGV0ZWRcIjtcbiAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2UuU1RBVEVTID0ge1xuICAgICAgICAgICAgICAgIHdhaXRpbmc6IDAsXG4gICAgICAgICAgICAgICAgcnVubmluZzogMSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IDJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLkNMQVNTX1dBSVRJTkcgPSBcImh6LXJlc291cmNlLXNlcXVlbmNlLS13YWl0aW5nXCI7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLkNMQVNTX1JVTk5JTkcgPSBcImh6LXJlc291cmNlLXNlcXVlbmNlLS1jdXJyZW50XCI7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLkNMQVNTX0NPTVBMRVRFRCA9IFwiaHotcmVzb3VyY2Utc2VxdWVuY2UtLWNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5BVFRSX1NFUVVFTkNFID0gXCJkYXRhLWh6LXJlc291cmNlLXNlcXVlbmNlXCI7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlID0gUmVzb3VyY2VTZXF1ZW5jZV8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZVNlcXVlbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBSZXNvdXJjZVNlcXVlbmNlKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlJlc291cmNlU2VxdWVuY2VcIiwgUmVzb3VyY2VTZXF1ZW5jZSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlU2VxdWVuY2UuanMifQ==
