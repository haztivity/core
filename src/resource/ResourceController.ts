/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Dependencies} from "../di";
import $ from "../jquery";
import {EventEmitter, EventEmitterFactory, IEventHandler} from "../utils";
@Dependencies(
    {
        dependencies: [
            $,
            EventEmitterFactory
        ]
    }
)
export abstract class ResourceController implements IEventHandler {
    public static readonly NAMESPACE = "resourceController";
    public static readonly ON_COMPLETED = `${ResourceController.NAMESPACE}:completed`;
    protected static readonly CLASS_UNCOMPLETED = "hz-resource--uncompleted";
    public static readonly CLASS_COMPLETED = "hz-resource--completed";
    protected _destroyed: boolean = false;
    protected _completed: boolean = false;
    protected _$element: JQuery;
    protected _eventEmitter: EventEmitter;
    protected _options: any = {};
    protected _completeDeferred = this._$.Deferred();
    protected _disabled = false;
    protected _locked = false;
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            _$
     * @param {EventEmitterFactory}     _EventEmitterFactory
     */
    constructor(protected _$: JQueryStatic, protected _EventEmitterFactory: EventEmitterFactory) {
    }
    /**
     * Marca el recurso como completado
     * @private
     */
    protected _markAsCompleted() {
        if(!this.isCompleted()) {
            this._completed = true;
            this._$element.removeClass(ResourceController.CLASS_UNCOMPLETED);
            this._$element.addClass(ResourceController.CLASS_COMPLETED);
            this._completeDeferred.resolve(this);
            this._eventEmitter.trigger(ResourceController.ON_COMPLETED);
        }
    }

    /**
     * Bloquea el recurso impidiendo realizar ciertas acciones
     * @private
     */
    protected _lock(){
        this._locked = true;
    }

    /**
     * Desbloquea el recurso
     * @private
     */
    protected _unlock(){
        this._locked = false;
    }

    /**
     * Indica si el recurso está bloqueado
     * @returns {any}
     */
    public isLocked(){
        return this._locked;
    }

    /**
     * Indica si el recurso está deshabilitado
     * @returns {any}
     */
    public isDisabled(){
        return this._disabled;
    }
    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del recurso
     */
    public activate($element) {
        this._$element = $element;
        this._$element.addClass(ResourceController.CLASS_UNCOMPLETED);
        this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
    }

    /**
     * Deshabilita el recurso si no está bloquead
     * return {boolean} True si se ha realizado la operación
     */
    public disable(){
        if(!this.isLocked()) {
            this._disabled = true;
            return true;
        }
        return false;
    }

    /**
     * Habilita el recurso si no está bloquead
     * return {boolean} True si se ha realizado la operación
     */
    public enable(){
        if(!this.isLocked()) {
            this._disabled = false;
            return true;
        }
        return false;
    }
    /**
     * Inicializa el componente
     * @param {*}   options             Opciones para el componente obtenidos principalmente a través de atributos data-
     * @param {*}   [config]            Parámetros para el controlador
     */
    public abstract init(options, config?);

    /**
     * Obtiene la instancia del componente
     */
    public abstract getInstance();

    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    public isDestroyed(): boolean {
        return this._destroyed;
    }

    /**
     * Realiza la comprobación de objetivo completado
     * @returns {boolean}
     */
    public isCompleted(): boolean {
        return this._completed;
    }



    /**
     * Obtiene una opción del recurso
     * @param name
     * @returns {any}
     */
    public getOption(name) {
        return this._options[name];
    }

    /**
     * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
     */
    public destroy() {
        this._destroyed = true;
    }

    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ResourceController {
        this._eventEmitter.on(events, data, handler);
        return this;
    };

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ResourceController {
        this._eventEmitter.one(events, data, handler);
        return this;
    };

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): ResourceController {
        this._eventEmitter.off(events, handler);
        return this;
    };

    /**
     * Devuelve la promesa del recurso. La promesa se resuelve al completarse
     * @returns {JQueryPromise<T>}
     */
    public getCompletePromise(){
        return this._completeDeferred.promise();
    }

    /**
     * Devuelve el elemento del recurso
     * @returns {JQuery}
     */
    public getElement(){
        return this._$element;
    }
}