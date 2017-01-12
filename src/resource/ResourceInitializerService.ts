/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ResourceInitializer, IResourceInitializer} from "./ResourceInitializer";
import {Service} from "../di";
import {ResourceController} from "./ResourceController";
@Service(
    {
        name: "ResourceInitializerService",
        dependencies: [
            ResourceInitializer
        ]
    }
)
export class ResourceInitializerService implements IResourceInitializer {

    /**
     * Servicio del inicializador de recursos
     * @class
     * @param ResourceInitializer
     */
    constructor(ResourceInitializer: ResourceInitializer) {
        let publish = [
            "initialize",
            "initializeOne",
            "getResources",
            "getResourcesControllers"
        ];
        for (let method of publish) {
            this[method] = ResourceInitializer[method].bind(ResourceInitializer);
        }
    }

    public initialize($context: JQuery): ResourceController[] {
        return undefined;
    }

    public getResources($context: JQuery, initState?: number): JQuery {
        return undefined;
    }

    public getResourcesControllers($context): ResourceController[] {
        return undefined;
    }

    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    public initializeOne($element, config: any = {}) {
        return undefined;
    }
}