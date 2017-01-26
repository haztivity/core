/// <reference types="jquery" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { InjectorService } from "../di";
import { IPageOptions } from "./PageRegister";
import { EventEmitter } from "../utils";
import { ResourceController, ResourceInitializerService } from "../resource";
export interface IPageControllerOptions extends IPageOptions {
    name: string;
    template: string;
}
export interface IPageStore {
    public?: any;
    private?: any;
}
export interface IPageState {
    completed: boolean;
    visited: boolean;
}
export declare abstract class PageController {
    _$: any;
    InjectorService: InjectorService;
    protected _ResourceInitializerService: ResourceInitializerService;
    static readonly NAMESPACE: string;
    static readonly ON_RENDERING: string;
    static readonly ON_RENDERED: string;
    static readonly ON_SHOW: string;
    static readonly ON_SHOWN: string;
    static readonly ON_COMPLETE_CHANGE: string;
    static readonly ON_DESTROY: string;
    static readonly CLASS_PAGE: string;
    $element: any;
    options: IPageOptions;
    eventEmitter: EventEmitter;
    state: IPageState;
    store: IPageStore;
    protected _resources: ResourceController[];
    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    _$                   Objeto JQuery
     * @param {InjectorService} InjectorService     Servicio del inyector
     * @see Injector.TYPES
     */
    constructor(_$: any, InjectorService: InjectorService, _ResourceInitializerService: ResourceInitializerService);
    /**
     * Configura la clase nada más instanciarla
     * @param {IPageControllerOptions}  options         Opciones para el controlador
     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    activate(options: IPageControllerOptions, eventEmitter: EventEmitter, state: IPageState, store: IPageStore): void;
    protected _getNumCompletedResources(): number;
    isCompleted(forceCheck?: boolean): boolean;
    render(): any;
    protected _render(template: any): JQuery;
    initializeResources(): ResourceController[];
    protected _onResourceCompleted(e: any): void;
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage                    Página anterior
     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
    /**
     * Invocado al finalizar el proceso de animación
     * @protected
     */
    protected _onShowEnd($oldPage: any, oldPageRelativePosition: any): void;
    /**
     * Realiza la animación correspondiente
     * @param {JQuery}              $oldPage                Página anterior.
     * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
     * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
     * @protected
     */
    protected _show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
    /**
     * Obtiene el DOM de la página
     * @returns {JQuery}
     */
    getElement(): JQuery;
    /**
     * Invocado al solicitarse la destruccion de la página
     */
    protected _destroy(): void;
}
