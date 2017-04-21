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
