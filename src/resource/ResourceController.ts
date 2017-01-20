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
    protected _destroyed: boolean = false;
    protected _completed: boolean = false;
    protected _$element: JQuery;
    protected _eventEmitter: EventEmitter;
    protected _options: any = {};

    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            $
     * @param {EventEmitterFactory}     EventEmitterFactory
     */
    constructor(protected _$: JQueryStatic, protected _EventEmitterFactory: EventEmitterFactory) {
    }

    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del recurso
     */
    public activate($element) {
        this._$element = $element;
        this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
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

    protected _markAsCompleted() {
        this._completed = true;
        this._eventEmitter.trigger(ResourceController.ON_COMPLETED)
    }

    public setOption(name, value) {
        this._options[name] = value;
    }

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
}