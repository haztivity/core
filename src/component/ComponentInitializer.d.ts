/// <reference types="jquery" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { InjectorService } from "../di";
import { ComponentManager } from "./ComponentManager";
import { ComponentController } from "./ComponentController";
import { DataOptions } from "../utils";
export declare class ComponentInitializer {
    protected _$: JQueryStatic;
    protected _ComponentManager: ComponentManager;
    protected _InjectorService: InjectorService;
    protected _S: any;
    protected _DataOptions: DataOptions;
    protected _prefix: string;
    protected _camelPrefix: string;
    protected _instanceDataName: string;
    /**
     * Inicializador de componentes.
     * @class
     * @param {JQueryStatic}                    _$
     * @param {ComponentManager}                _ComponentManager
     * @param {InjectorService}                 _InjectorService
     * @param {String.JS}                       _S
     * @param {DataOptions}                     _DataOptions
     */
    constructor(_$: JQueryStatic, _ComponentManager: ComponentManager, _InjectorService: InjectorService, _S: any, _DataOptions: DataOptions);
    /**
     * Inicializa todos los componentes en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
     */
    initialize($context: JQuery): ComponentController[];
    /**
     * Inicializa un componente en un elemento en concreto. El elemento ha de tener un componente válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el componente
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del componente
     */
    initializeOne($element: any, config?: any): any;
    /**
     * Obtiene los elementos DOM indicados como componentes
     * @param {JQuery}      $context            Contexto en el cual buscar los componentes
     * @param {number}      [initState=2]       Establece que componentes obtener. Se puede indicar:
     *                                          0   se obtienen los componentes sin inicializar
     *                                          1   se obtienen los componentes inicializados
     *                                          2   se obtienen los componentes sin inicializar e inicializados
     * @returns {JQuery}
     */
    getComponents($context: any, initState?: number): JQuery;
    /**
     * Obtiene los controladores de componentes
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    getComponentsControllers($context: any, recursive?: boolean): any[];
    protected _findElementsInContext($context: JQuery): JQuery;
}
