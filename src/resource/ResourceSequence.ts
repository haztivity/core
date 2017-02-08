/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {$} from "../jquery";
import {EventEmitter,EventEmitterFactory,IEventHandler} from "../utils";
import {ResourceController} from "./ResourceController";
import {ResourceInitializer} from "./ResourceInitializer";
@Core(
    {
        name: "ResourceSequence",
        dependencies:[
            $,
            EventEmitterFactory
        ],
        instantiable:true,
        public:true
    }
)
export class ResourceSequence implements IEventHandler {
    public static readonly NAMESPACE = "resourceSequence";
    public static readonly ON_COMPLETED = `${ResourceSequence.NAMESPACE}:completed`;
    public static readonly ON_RESOURCE_STATE_CHANGE = `${ResourceSequence.NAMESPACE}:resourcestatechange`;
    public static readonly STATES = {
        waiting: 0,
        running: 1,
        completed: 2
    };
    public static readonly CLASS_WAITING = "hz-resource-sequence--waiting";
    public static readonly CLASS_RUNNING = "hz-resource-sequence--current";
    public static readonly CLASS_COMPLETED = "hz-resource-sequence--completed";
    public static readonly ATTR_SEQUENCE = "data-hz-resource-sequence";
    protected _$: JQueryStatic;
    protected _EventEmitterFactory: EventEmitterFactory;
    protected _eventEmitter: EventEmitter;
    protected _completeDeferred;
    protected _state;
    protected _items: ResourceController[] | ResourceSequence[]=[];
    protected _itemsPromises: JQueryPromise<ResourceController[] | ResourceSequence[]>[]=[];
    protected _currentItemIndex;
    protected _currentItem:ResourceController|ResourceSequence;
    protected _locked;
    protected _id;
    constructor(_$, _EventEmitterFactory) {
        this._$ = _$;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
        this._state = ResourceSequence.STATES.waiting;
        this._completeDeferred = this._$.Deferred();
        this._locked = false;
    }

    /**
     * Activa la secuencia
     * @param {JQuery | ResourceController[] | ResourceSequence[]}  items       Conjunto de items a incluir en la secuencia.
     * @param {String}                                              [id]        Id a asignar a la secuencia
     */
    public activate(items: ResourceController[] | ResourceSequence[] | JQuery,id?) {
        this._id = id != undefined ? id : new Date().getTime();
        this._addItems(items);
    }
    protected _addItems(items){
        for (let itemIndex = 0, itemsLength = items.length; itemIndex < itemsLength; itemIndex++) {
            let currentItem:ResourceController|ResourceSequence= items[itemIndex];
            this._addItem(currentItem);
        }
    }
    protected _addItem(item){
        if(item instanceof Element){
            this._addItem(this._$(item).data(ResourceInitializer.PREFIX_INSTANCE));
        }else {
            if (item) {
                //if is a resource, add a class to indicate state and an attr to indicate the secuence
                if (item instanceof ResourceController) {
                    item.disable();
                    this._setResourceState(item, ResourceSequence.STATES.waiting);
                    (<ResourceController>item).getElement().attr(ResourceSequence.ATTR_SEQUENCE, this._id);
                }
                //lock item to prevent manual interaction
                (<any>item)._lock();
                this._itemsPromises.push(item.getCompletePromise());
                this._items.push(item);
            }
        }
    }
    /**
     * Actualiza el estado de un recurso. Comprueba si el item es una instancia de ResourceController
     * @param {*}       item    Elemento a comprobar y actualizar
     * @param {number}  state   Estado a establecer
     * @private
     */
    protected _setResourceState(item,state){
        if(item instanceof ResourceController){
            let $element = (<ResourceController>item).getElement();
            $element.removeClass(`${ResourceSequence.CLASS_RUNNING} ${ResourceSequence.CLASS_COMPLETED} ${ResourceSequence.CLASS_WAITING}`);
            switch(state){
                case ResourceSequence.STATES.completed:
                    $element.addClass(ResourceSequence.CLASS_COMPLETED);
                    break;
                case ResourceSequence.STATES.running:
                    $element.addClass(ResourceSequence.CLASS_RUNNING);
                    break;
                case ResourceSequence.STATES.waiting:
                    $element.addClass(ResourceSequence.CLASS_WAITING);
                    break;
            }
            (<any>item)._eventEmitter.trigger(ResourceSequence.ON_RESOURCE_STATE_CHANGE,[item,state]);
            this._eventEmitter.trigger(ResourceSequence.ON_RESOURCE_STATE_CHANGE,[item,state]);
        }
    }

    /**
     * Invocado al completarse un item. Avanza la secuencia
     * @private
     */
    protected _onItemComplete() {
        this._setResourceState(this._currentItem,ResourceSequence.STATES.completed);
        this._next();
    }

    /**
     * Avanza la secuencia.
     * @private
     */
    protected _next(){
        if(this.isRunning()) {
            if (this._currentItemIndex < this._items.length) {
                let item = this._items[this._currentItemIndex],
                    promise;
                this._currentItem = item;
                this._currentItemIndex++;
                (<any>item)._unlock();
                //if item is a sequence, unlock it to run
                if (item instanceof ResourceSequence) {
                    (<ResourceSequence>item).run();
                }else{
                    this._setResourceState(item, ResourceSequence.STATES.running);
                    item.enable();
                }
                promise = item.getCompletePromise();
                promise.then(this._onItemComplete.bind(this));
            } else {
                this._markAsComplete();
            }
        }
    }

    /**
     * Indica si la secuencia está en ejecución
     * @returns {boolean}
     */
    public isRunning(){
        return this._state == ResourceSequence.STATES.running;
    }

    /**
     * Indica si la secuencia está bloqueada
     * @returns {any}
     */
    public isLocked(){
        return this._locked;
    }

    /**
     * Bloquea la secuencia impidiendo que sea ejecutada
     * @returns {ResourceSequence}
     * @private
     */
    protected _lock():ResourceSequence{
        this._locked = true;
        return this;
    }

    /**
     * Desbloquea la secuencia
     * @returns {ResourceSequence}
     * @private
     */
    protected _unlock():ResourceSequence{
        this._locked = false;
        return this;
    }

    /**
     * Ejecuta la secuencia si no está bloqueada
     * @returns {JQueryPromise<T>}
     */
    public run(): JQueryPromise<ResourceController[] | ResourceSequence[]> {
        if(!this.isLocked()) {
            this._state = ResourceSequence.STATES.running;
            this._currentItemIndex = 0;
            this._next();
            return this.getCompletePromise();
        }
    }

    /**
     * Indica si la secuencia está completa
     * @returns {boolean}
     */
    public isCompleted() {
        return this._state == ResourceSequence.STATES.completed;
    }

    /**
     * Marca la secuencia como completada
     * @private
     */
    protected _markAsComplete() {
        if (!this.isCompleted()) {
            this._state = ResourceSequence.STATES.completed;
            this._completeDeferred.resolve(this._items);
            this._eventEmitter.trigger(ResourceSequence.ON_COMPLETED, [this._items]);
        }
    }

    /**
     * Devuelve la promesa de la sequencia. La promesa se resuelve al completarse
     * @returns {JQueryPromise<T>}
     */
    public getCompletePromise() {
        return this._completeDeferred.promise();
    }

    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ResourceSequence {
        this._eventEmitter.on(events, data, handler);
        return this;
    };

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ResourceSequence {
        this._eventEmitter.one(events, data, handler);
        return this;
    };

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): ResourceSequence {
        this._eventEmitter.off(events, handler);
        return this;
    };
}