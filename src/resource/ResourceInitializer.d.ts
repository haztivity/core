/// <reference types="jquery" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { InjectorService } from "../di";
import { ResourceManager } from "./ResourceManager";
import { ResourceController } from "./ResourceController";
import { DataOptions } from "../utils";
export interface IResourceInitializer {
    initialize($context: JQuery): ResourceController[];
    getResources($context: JQuery, initState?: number): JQuery;
    getResourcesControllers($context: any): ResourceController[];
    initializeOne($element: any, config: any): ResourceController;
}
export declare class ResourceInitializer {
    protected _$: JQueryStatic;
    protected _ResourceManager: ResourceManager;
    protected _InjectorService: InjectorService;
    protected _S: any;
    protected _DataOptions: DataOptions;
    protected _prefix: string;
    protected _camelPrefix: string;
    protected _instanceDataName: string;
    constructor(_$: JQueryStatic, _ResourceManager: ResourceManager, _InjectorService: InjectorService, _S: any, _DataOptions: DataOptions);
    /**
     * Inicializa todos los recursos en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
     */
    initialize($context: JQuery): ResourceController[];
    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    initializeOne($element: any, config?: any): any;
    /**
     * Obtiene los elementos DOM indicados como recursos
     * @param {JQuery}      $context            Contexto en el cual buscar los recursos
     * @param {number}      [initState=2]       Establece que recursos obtener. Se puede indicar:
     *                                          0   se obtienen los recursos sin inicializar
     *                                          1   se obtienen los recursos inicializados
     *                                          2   se obtienen los recursos sin inicializar e inicializados
     * @returns {JQuery}
     */
    getResources($context: any, initState?: number): JQuery;
    /**
     * Obtiene los controladores de recursos
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    getResourcesControllers($context: any, recursive?: boolean): any[];
    protected _findElementsInContext($context: JQuery): JQuery;
}
