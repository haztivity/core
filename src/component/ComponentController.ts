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
export abstract class ComponentController implements IEventHandler {
    protected _destroyed: boolean = false;
    protected _$element: JQuery;
    protected _eventEmitter: EventEmitter;
    protected _options: any = {};

    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            _$
     * @param {EventEmitterFactory}     _EventEmitterFactory
     */
    constructor(protected _$: JQueryStatic, protected _EventEmitterFactory: EventEmitterFactory) {
    }

    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del componente
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
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    public isDestroyed(): boolean {
        return this._destroyed;
    }

    /**
     * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
     */
    public destroy() {
        this._destroyed = true;
    }

    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ComponentController {
        this._eventEmitter.on(events, data, handler);
        return this;
    };

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ComponentController {
        this._eventEmitter.one(events, data, handler);
        return this;
    };

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): ComponentController {
        this._eventEmitter.off(events, handler);
        return this;
    };
}