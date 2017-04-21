/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core, InjectorService} from "../di";
import {ResourceManager} from "./ResourceManager";
import {ResourceController} from "./ResourceController";
import {S} from "../utils"
import {DataOptions} from "../utils";
import {$} from "../jquery";
import {
    HaztivityResourceNameRequiredError,
    HaztivityResourceNotRegisteredError,
    HaztivityInvalidResourceControllerError
} from "./Errors";
export interface IResourceInitializer {
    initialize($context: JQuery): ResourceController[];
    getResources($context: JQuery, initState?: number): JQuery;
    getResourcesControllers($context): ResourceController[]
    initializeOne($element, config): ResourceController;
}
@Core(
    {
        name: "ResourceInitializer",
        dependencies: [
            $,
            ResourceManager,
            InjectorService,
            DataOptions
        ],
        public: true
    }
)
export class ResourceInitializer {
    public static readonly PREFIX = "hz-resource";
    public static readonly CAMEL_PREFIX = "hzResource";
    public static readonly PREFIX_INSTANCE = "hzResourceInstance";

    constructor(protected _$: JQueryStatic, protected _ResourceManager: ResourceManager, protected _InjectorService: InjectorService, protected _DataOptions: DataOptions) {
    }

    /**
     * Inicializa todos los recursos en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
     */
    public initialize($context: JQuery): ResourceController[] {
        let $elements = this._findElementsInContext($context),
            results = [];
        for (let element of <any>$elements) {
            let result = this.initializeOne($(element));
            if (result != undefined) {
                results.push(result);
            }
        }
        return results;
    }

    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    public initializeOne($element, config: any = {}) {
        //get name
        let name = $element.data(ResourceInitializer.CAMEL_PREFIX),
            result;
        if (!!name) {
            //check if exists
            if (!!this._ResourceManager.exists(name)) {
                //get from DI
                let factory = this._InjectorService.get(name);
                if (factory) {
                    //check if is already instanciated
                    let controllerInstance: ResourceController = $element.data(ResourceInitializer.PREFIX_INSTANCE);
                    if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                        //extract options
                        let options = this._DataOptions.getDataOptions($element, name);
                        options = this._$.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance = factory.instance();
                        controllerInstance.activate($element);
                        $element.data(ResourceInitializer.PREFIX_INSTANCE, controllerInstance);
                        //init controller
                        controllerInstance.init(options, config.data);
                    } else {
                        //warn
                    }
                    result = controllerInstance;
                } else {
                    throw new HaztivityInvalidResourceControllerError(name);
                }
            } else {
                throw new HaztivityResourceNotRegisteredError(name);
            }
        } else {
            throw new HaztivityResourceNameRequiredError($element);
        }
        return result;
    }

    /**
     * Obtiene los elementos DOM indicados como recursos
     * @param {JQuery}      $context            Contexto en el cual buscar los recursos
     * @param {number}      [initState=2]       Establece que recursos obtener. Se puede indicar:
     *                                          0   se obtienen los recursos sin inicializar
     *                                          1   se obtienen los recursos inicializados
     *                                          2   se obtienen los recursos sin inicializar e inicializados
     * @returns {JQuery}
     */
    public getResources($context, initState = 2) {
        let result = [],
            $elements = this._findElementsInContext($context);
        switch (initState) {
            case 0://only without init
                for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    let $element = this._$($elements[elementIndex]);
                    if ($element.data(ResourceInitializer.PREFIX_INSTANCE) == undefined) {
                        result.push($element);
                    }
                }
                break;
            case 1://only initialized
                for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    let $element = this._$($elements[elementIndex]);
                    if ($element.data(ResourceInitializer.PREFIX_INSTANCE) != undefined) {
                        result.push($element);
                    }
                }
                break;

            default:
                for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    let $element = this._$($elements[elementIndex]);
                    result.push($element);
                }
                break;
        }
        return this._$(result);
    }

    /**
     * Obtiene los controladores de recursos
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    public getResourcesControllers($context, recursive = true) {
        let result = [],
            $elements = recursive === true
                ? this._findElementsInContext($context)
                : $context;
        for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
            let $element = this._$($elements[elementIndex]),
                controller = $element.data(ResourceInitializer.PREFIX_INSTANCE);
            if (controller != undefined) {
                result.push(controller);
            }
        }
        return result;
    }

    protected _findElementsInContext($context: JQuery): JQuery {
        let $elements,
            parents = [];
        //check if context is also a resource
        if ($context.length === 1) {
            if ($context.is(`[${ResourceInitializer.PREFIX}],[data-${ResourceInitializer.PREFIX}]`)) {
                parents = $context.toArray();
            }
        } else {
            $context.each(
                (index, element) => {
                    let $element = this._$(element);
                    if ($element.is(`[${ResourceInitializer.PREFIX}],[data-${ResourceInitializer.PREFIX}]`)) {
                        parents.push($element);
                    }
                }
            );
        }
        $elements = parents.concat($context.find(`[${ResourceInitializer.PREFIX}],[data-${ResourceInitializer.PREFIX}]`).toArray());//get elements with the prefix
        return this._$($elements);
    }
}