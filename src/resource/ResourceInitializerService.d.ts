/// <reference types="jquery" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { ResourceInitializer, IResourceInitializer } from "./ResourceInitializer";
import { ResourceController } from "./ResourceController";
export declare class ResourceInitializerService implements IResourceInitializer {
    /**
     * Servicio del inicializador de recursos
     * @class
     * @param ResourceInitializer
     */
    constructor(ResourceInitializer: ResourceInitializer);
    initialize($context: JQuery): ResourceController[];
    getResources($context: JQuery, initState?: number): JQuery;
    getResourcesControllers($context: any): ResourceController[];
    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    initializeOne($element: any, config?: any): any;
}
