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
        define(["require", "exports", "../di", "../jquery", "../utils", "./ResourceController", "./ResourceInitializer"], factory);
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
    var ResourceController_1 = require("./ResourceController");
    var ResourceInitializer_1 = require("./ResourceInitializer");
    var ResourceSequence = ResourceSequence_1 = (function () {
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
                item._eventEmitter.trigger(ResourceSequence_1.ON_RESOURCE_STATE_CHANGE, [item, state]);
                this._eventEmitter.trigger(ResourceSequence_1.ON_RESOURCE_STATE_CHANGE, [item, state]);
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
    ResourceSequence.ON_RESOURCE_STATE_CHANGE = ResourceSequence_1.NAMESPACE + ":resourcestatechange";
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
    exports.ResourceSequence = ResourceSequence;
    var ResourceSequence_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi91dGlsc1wiLCBcIi4vUmVzb3VyY2VDb250cm9sbGVyXCIsIFwiLi9SZXNvdXJjZUluaXRpYWxpemVyXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBqcXVlcnlfMSA9IHJlcXVpcmUoXCIuLi9qcXVlcnlcIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIFJlc291cmNlQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vUmVzb3VyY2VDb250cm9sbGVyXCIpO1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyXzEgPSByZXF1aXJlKFwiLi9SZXNvdXJjZUluaXRpYWxpemVyXCIpO1xuICAgIHZhciBSZXNvdXJjZVNlcXVlbmNlID0gUmVzb3VyY2VTZXF1ZW5jZV8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VTZXF1ZW5jZShfJCwgX0V2ZW50RW1pdHRlckZhY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLl9pdGVtc1Byb21pc2VzID0gW107XG4gICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIgPSB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5LmNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy53YWl0aW5nO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGVEZWZlcnJlZCA9IHRoaXMuXyQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBY3RpdmEgbGEgc2VjdWVuY2lhXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5IHwgUmVzb3VyY2VDb250cm9sbGVyW10gfCBSZXNvdXJjZVNlcXVlbmNlW119ICBpdGVtcyAgICAgICBDb25qdW50byBkZSBpdGVtcyBhIGluY2x1aXIgZW4gbGEgc2VjdWVuY2lhLlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXSAgICAgICAgSWQgYSBhc2lnbmFyIGEgbGEgc2VjdWVuY2lhXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChpdGVtcywgaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lkID0gaWQgIT0gdW5kZWZpbmVkID8gaWQgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEl0ZW1zKGl0ZW1zKTtcbiAgICAgICAgfTtcbiAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX2FkZEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtSW5kZXggPSAwLCBpdGVtc0xlbmd0aCA9IGl0ZW1zLmxlbmd0aDsgaXRlbUluZGV4IDwgaXRlbXNMZW5ndGg7IGl0ZW1JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gaXRlbXNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRJdGVtKGN1cnJlbnRJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX2FkZEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkSXRlbSh0aGlzLl8kKGl0ZW0pLmRhdGEoUmVzb3VyY2VJbml0aWFsaXplcl8xLlJlc291cmNlSW5pdGlhbGl6ZXIuUFJFRklYX0lOU1RBTkNFKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGlzIGEgcmVzb3VyY2UsIGFkZCBhIGNsYXNzIHRvIGluZGljYXRlIHN0YXRlIGFuZCBhbiBhdHRyIHRvIGluZGljYXRlIHRoZSBzZWN1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFJlc291cmNlQ29udHJvbGxlcl8xLlJlc291cmNlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRSZXNvdXJjZVN0YXRlKGl0ZW0sIFJlc291cmNlU2VxdWVuY2VfMS5TVEFURVMud2FpdGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldEVsZW1lbnQoKS5hdHRyKFJlc291cmNlU2VxdWVuY2VfMS5BVFRSX1NFUVVFTkNFLCB0aGlzLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9sb2NrIGl0ZW0gdG8gcHJldmVudCBtYW51YWwgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5fbG9jaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc1Byb21pc2VzLnB1c2goaXRlbS5nZXRDb21wbGV0ZVByb21pc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWN0dWFsaXphIGVsIGVzdGFkbyBkZSB1biByZWN1cnNvLiBDb21wcnVlYmEgc2kgZWwgaXRlbSBlcyB1bmEgaW5zdGFuY2lhIGRlIFJlc291cmNlQ29udHJvbGxlclxuICAgICAgICAgKiBAcGFyYW0geyp9ICAgICAgIGl0ZW0gICAgRWxlbWVudG8gYSBjb21wcm9iYXIgeSBhY3R1YWxpemFyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgc3RhdGUgICBFc3RhZG8gYSBlc3RhYmxlY2VyXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5fc2V0UmVzb3VyY2VTdGF0ZSA9IGZ1bmN0aW9uIChpdGVtLCBzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBSZXNvdXJjZUNvbnRyb2xsZXJfMS5SZXNvdXJjZUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSBpdGVtLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcyhSZXNvdXJjZVNlcXVlbmNlXzEuQ0xBU1NfUlVOTklORyArIFwiIFwiICsgUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX0NPTVBMRVRFRCArIFwiIFwiICsgUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1dBSVRJTkcpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLmNvbXBsZXRlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKFJlc291cmNlU2VxdWVuY2VfMS5DTEFTU19DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1JVTk5JTkcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy53YWl0aW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoUmVzb3VyY2VTZXF1ZW5jZV8xLkNMQVNTX1dBSVRJTkcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uX2V2ZW50RW1pdHRlci50cmlnZ2VyKFJlc291cmNlU2VxdWVuY2VfMS5PTl9SRVNPVVJDRV9TVEFURV9DSEFOR0UsIFtpdGVtLCBzdGF0ZV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci50cmlnZ2VyKFJlc291cmNlU2VxdWVuY2VfMS5PTl9SRVNPVVJDRV9TVEFURV9DSEFOR0UsIFtpdGVtLCBzdGF0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2NhZG8gYWwgY29tcGxldGFyc2UgdW4gaXRlbS4gQXZhbnphIGxhIHNlY3VlbmNpYVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX29uSXRlbUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0UmVzb3VyY2VTdGF0ZSh0aGlzLl9jdXJyZW50SXRlbSwgUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5jb21wbGV0ZWQpO1xuICAgICAgICAgICAgdGhpcy5fbmV4dCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQXZhbnphIGxhIHNlY3VlbmNpYS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEl0ZW1JbmRleCA8IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2l0ZW1zW3RoaXMuX2N1cnJlbnRJdGVtSW5kZXhdLCBwcm9taXNlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5fdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBhIHNlcXVlbmNlLCB1bmxvY2sgaXQgdG8gcnVuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUmVzb3VyY2VTZXF1ZW5jZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJ1bigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UmVzb3VyY2VTdGF0ZShpdGVtLCBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLnJ1bm5pbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gaXRlbS5nZXRDb21wbGV0ZVByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMuX29uSXRlbUNvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFya0FzQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2Egc2kgbGEgc2VjdWVuY2lhIGVzdMOhIGVuIGVqZWN1Y2nDs25cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhIHNpIGxhIHNlY3VlbmNpYSBlc3TDoSBibG9xdWVhZGFcbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLmlzTG9ja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2tlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJsb3F1ZWEgbGEgc2VjdWVuY2lhIGltcGlkaWVuZG8gcXVlIHNlYSBlamVjdXRhZGFcbiAgICAgICAgICogQHJldHVybnMge1Jlc291cmNlU2VxdWVuY2V9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5fbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc2Jsb3F1ZWEgbGEgc2VjdWVuY2lhXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZVNlcXVlbmNlfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZS5wcm90b3R5cGUuX3VubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFamVjdXRhIGxhIHNlY3VlbmNpYSBzaSBubyBlc3TDoSBibG9xdWVhZGFcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8VD59XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gUmVzb3VyY2VTZXF1ZW5jZV8xLlNUQVRFUy5ydW5uaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wbGV0ZVByb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYSBzaSBsYSBzZWN1ZW5jaWEgZXN0w6EgY29tcGxldGFcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5pc0NvbXBsZXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA9PSBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLmNvbXBsZXRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcmNhIGxhIHNlY3VlbmNpYSBjb21vIGNvbXBsZXRhZGFcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLl9tYXJrQXNDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBSZXNvdXJjZVNlcXVlbmNlXzEuU1RBVEVTLmNvbXBsZXRlZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wbGV0ZURlZmVycmVkLnJlc29sdmUodGhpcy5faXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci50cmlnZ2VyKFJlc291cmNlU2VxdWVuY2VfMS5PTl9DT01QTEVURUQsIFt0aGlzLl9pdGVtc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV2dWVsdmUgbGEgcHJvbWVzYSBkZSBsYSBzZXF1ZW5jaWEuIExhIHByb21lc2Egc2UgcmVzdWVsdmUgYWwgY29tcGxldGFyc2VcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8VD59XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5nZXRDb21wbGV0ZVByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGVEZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIFJlc291cmNlU2VxdWVuY2UucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub25lKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmKGV2ZW50cywgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VTZXF1ZW5jZTtcbiAgICB9KCkpO1xuICAgIFJlc291cmNlU2VxdWVuY2UuTkFNRVNQQUNFID0gXCJyZXNvdXJjZVNlcXVlbmNlXCI7XG4gICAgUmVzb3VyY2VTZXF1ZW5jZS5PTl9DT01QTEVURUQgPSBSZXNvdXJjZVNlcXVlbmNlXzEuTkFNRVNQQUNFICsgXCI6Y29tcGxldGVkXCI7XG4gICAgUmVzb3VyY2VTZXF1ZW5jZS5PTl9SRVNPVVJDRV9TVEFURV9DSEFOR0UgPSBSZXNvdXJjZVNlcXVlbmNlXzEuTkFNRVNQQUNFICsgXCI6cmVzb3VyY2VzdGF0ZWNoYW5nZVwiO1xuICAgIFJlc291cmNlU2VxdWVuY2UuU1RBVEVTID0ge1xuICAgICAgICB3YWl0aW5nOiAwLFxuICAgICAgICBydW5uaW5nOiAxLFxuICAgICAgICBjb21wbGV0ZWQ6IDJcbiAgICB9O1xuICAgIFJlc291cmNlU2VxdWVuY2UuQ0xBU1NfV0FJVElORyA9IFwiaHotcmVzb3VyY2Utc2VxdWVuY2UtLXdhaXRpbmdcIjtcbiAgICBSZXNvdXJjZVNlcXVlbmNlLkNMQVNTX1JVTk5JTkcgPSBcImh6LXJlc291cmNlLXNlcXVlbmNlLS1jdXJyZW50XCI7XG4gICAgUmVzb3VyY2VTZXF1ZW5jZS5DTEFTU19DT01QTEVURUQgPSBcImh6LXJlc291cmNlLXNlcXVlbmNlLS1jb21wbGV0ZWRcIjtcbiAgICBSZXNvdXJjZVNlcXVlbmNlLkFUVFJfU0VRVUVOQ0UgPSBcImRhdGEtaHotcmVzb3VyY2Utc2VxdWVuY2VcIjtcbiAgICBSZXNvdXJjZVNlcXVlbmNlID0gUmVzb3VyY2VTZXF1ZW5jZV8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlU2VxdWVuY2VcIixcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5zdGFudGlhYmxlOiB0cnVlLFxuICAgICAgICAgICAgcHVibGljOiB0cnVlXG4gICAgICAgIH0pXG4gICAgXSwgUmVzb3VyY2VTZXF1ZW5jZSk7XG4gICAgZXhwb3J0cy5SZXNvdXJjZVNlcXVlbmNlID0gUmVzb3VyY2VTZXF1ZW5jZTtcbiAgICB2YXIgUmVzb3VyY2VTZXF1ZW5jZV8xO1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlU2VxdWVuY2UuanMifQ==
