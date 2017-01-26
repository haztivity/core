/// <reference types="jquery" />
import { PageManager, PageImplementation } from "../page";
import { EventEmitter, EventEmitterFactory, IEventHandler } from "../utils";
export interface INavigatorPageData {
    index: number;
    name: string;
}
export interface INavigatorService {
    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    isDisabled(): boolean;
    setDisabled(disabled: boolean): void;
    enable(): void;
    disable(): void;
    next(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    prev(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    getCurrentPageData(): INavigatorPageData;
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
}
export declare class Navigator implements IEventHandler, INavigatorService {
    protected _$: JQueryStatic;
    protected _PageManager: PageManager;
    protected _EventEmitterFactory: EventEmitterFactory;
    static readonly NAMESPACE: string;
    static readonly ON_DRAW_PAGE: string;
    static readonly ON_DISABLE: string;
    static readonly ON_ENABLE: string;
    static readonly ON_CHANGE_PAGE_END: string;
    static readonly ON_CHANGE_PAGE_START: string;
    protected static readonly ATTR_TRANSITION_TO: string;
    protected static readonly ATTR_CURRENT: string;
    protected _$context: JQuery;
    protected _currentPage: PageImplementation;
    protected _currentPageIndex: number;
    protected _currentRenderProcess: JQueryDeferred<INavigatorPageData, INavigatorPageData>;
    protected _eventEmitter: EventEmitter;
    protected _disabled: boolean;
    /**
     * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
     * @param {JQueryStatic}                _$
     * @param {PageManager}                 _PageManager
     * @param {EventEmitterFactory}         _EventEmitterFactory
     */
    constructor(_$: JQueryStatic, _PageManager: PageManager, _EventEmitterFactory: EventEmitterFactory);
    activate($context: JQuery): void;
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    /**
     * Devuelve un array con los índices de las páginas que hayan sido visitadas
     * @returns {Number[]}
     */
    getVisitedPages(): Number[];
    /**
     * Devuelve el estado actual de deshabilitado
     * @returns {boolean}
     */
    isDisabled(): boolean;
    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    setDisabled(disabled: boolean): void;
    /**
     * Habilita la navegación
     */
    enable(): void;
    /**
     * Deshabilita la navegación
     */
    disable(): void;
    /**
     * Retrocede a la página posterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    next(): any;
    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    prev(): any;
    /**
     * Invocado al finalizarse la animación del cambio de página
     * @param {PageImplementation}      newPage     Página activada
     * @param {INavigatorPageData}      newPageData Datos de la página activada
     * @param {PageImplementation}      oldPage     Página desactivada
     * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
     * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
     * @private
     */
    protected _onPageShowEnd(newPage: PageImplementation, newPageData: INavigatorPageData, oldPage: PageImplementation, oldPageData: INavigatorPageData, defer: any): void;
    /**
     * Obtiene el índice de la página actual
     * @returns {number}
     */
    getCurrentPageIndex(): number;
    /**
     * Obtiene la implementación de página actual
     * @returns {PageImplementation}
     */
    getCurrentPage(): PageImplementation;
    /**
     * Devuelve los datos de la página actual
     * @returns {INavigatorPageData}
     */
    getCurrentPageData(): INavigatorPageData;
    /**
     * @see EventEmitter#on
     * @returns {Navigator}
     */
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
    /**
     * @see EventEmitter#one
     * @returns {Navigator}
     */
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
    /**
     * @see EventEmitter#off
     * @returns {Navigator}
     */
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
}
