/// <reference types="jquery" />
import { EventEmitter, EventEmitterFactory, IEventHandler } from "../utils";
export declare abstract class ResourceController implements IEventHandler {
    protected _$: JQueryStatic;
    protected _EventEmitterFactory: EventEmitterFactory;
    static readonly NAMESPACE: string;
    static readonly ON_COMPLETED: string;
    protected _destroyed: boolean;
    protected _completed: boolean;
    protected _$element: JQuery;
    protected _eventEmitter: EventEmitter;
    protected _options: any;
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            $
     * @param {EventEmitterFactory}     EventEmitterFactory
     */
    constructor(_$: JQueryStatic, _EventEmitterFactory: EventEmitterFactory);
    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del recurso
     */
    activate($element: any): void;
    /**
     * Inicializa el componente
     * @param {*}   options             Opciones para el componente obtenidos principalmente a través de atributos data-
     * @param {*}   [config]            Parámetros para el controlador
     */
    abstract init(options: any, config?: any): any;
    /**
     * Obtiene la instancia del componente
     */
    abstract getInstance(): any;
    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    isDestroyed(): boolean;
    /**
     * Realiza la comprobación de objetivo completado
     * @returns {boolean}
     */
    isCompleted(): boolean;
    protected _markAsCompleted(): void;
    setOption(name: any, value: any): void;
    getOption(name: any): any;
    /**
     * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
     */
    destroy(): void;
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): ResourceController;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): ResourceController;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): ResourceController;
}
