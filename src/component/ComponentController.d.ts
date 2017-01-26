/// <reference types="jquery" />
import { EventEmitter, EventEmitterFactory, IEventHandler } from "../utils";
export declare abstract class ComponentController implements IEventHandler {
    protected _$: JQueryStatic;
    protected _EventEmitterFactory: EventEmitterFactory;
    protected _destroyed: boolean;
    protected _$element: JQuery;
    protected _eventEmitter: EventEmitter;
    protected _options: any;
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            _$
     * @param {EventEmitterFactory}     _EventEmitterFactory
     */
    constructor(_$: JQueryStatic, _EventEmitterFactory: EventEmitterFactory);
    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del componente
     */
    activate($element: any): void;
    /**
     * Inicializa el componente
     * @param {*}   options             Opciones para el componente obtenidos principalmente a través de atributos data-
     * @param {*}   [config]            Parámetros para el controlador
     */
    abstract init(options: any, config?: any): any;
    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    isDestroyed(): boolean;
    /**
     * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
     */
    destroy(): void;
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ComponentController;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ComponentController;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): ComponentController;
}
