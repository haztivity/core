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
            S,
            DataOptions
        ],
        public: true
    }
)
export class ResourceInitializer {
    protected _prefix: string = "hz-resource";
    protected _camelPrefix: string = this.S(this._prefix).camelize().s;
    protected _instanceDataName: string = `${this._camelPrefix}Instance`;

    constructor(protected $: JQueryStatic, protected ResourceManager: ResourceManager, protected InjectorService: InjectorService, protected S, protected DataOptions: DataOptions) {
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
        let name = $element.data(this._prefix),
            result;
        if (!!name) {
            //check if exists
            if (!!this.ResourceManager.exists(name)) {
                //get from DI
                let factory = this.InjectorService.get(name);
                if (factory) {
                    //check if is already instanciated
                    let controllerInstance: ResourceController = $element.data(this._instanceDataName);
                    if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                        //extract options
                        let options = this.DataOptions.getDataOptions($element, name);
                        options = $.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance = factory.instance();
                        controllerInstance.activate($element);
                        $element.data(this._instanceDataName, controllerInstance);
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
                    let $element = this.$($elements[elementIndex]);
                    if ($element.data(this._instanceDataName) == undefined) {
                        result.push($element);
                    }
                }
                break;
            case 1://only initialized
                for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    let $element = this.$($elements[elementIndex]);
                    if ($element.data(this._instanceDataName) != undefined) {
                        result.push($element);
                    }
                }
                break;

            default:
                for (let elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    let $element = this.$($elements[elementIndex]);
                    result.push($element);
                }
                break;
        }
        return $(result);
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
            let $element = this.$($elements[elementIndex]),
                controller = $element.data(this._instanceDataName);
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
            if ($context.is(`[${this._prefix}],[data-${this._prefix}]`)) {
                parents = $context.toArray();
            }
        } else {
            $context.each(
                (index, element) => {
                    let $element = $(element);
                    if ($element.is(`[${this._prefix}],[data-${this._prefix}]`)) {
                        parents.push($element);
                    }
                }
            );
        }
        $elements = parents.concat($context.find(`[${this._prefix}],[data-${this._prefix}]`).toArray());//get elements with the prefix
        return $($elements);
    }
}