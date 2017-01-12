/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core, InjectorService} from "../di";
import {ComponentManager} from "./ComponentManager";
import {ComponentController} from "./ComponentController";
import {S} from "../utils"
import {DataOptions} from "../utils";
import {$} from "../jquery";
import {HaztivityComponentNameRequiredError,HaztivityComponentNotRegisteredError,HaztivityInvalidComponentControllerError} from "./Errors";
@Core(
    {
        name: "ComponentInitializer",
        dependencies: [
            $,
            ComponentManager,
            InjectorService,
            S,
            DataOptions
        ]
    }
)
export class ComponentInitializer {
    protected _prefix: string = "hz-component";
    protected _camelPrefix: string = this.S(this._prefix).camelize().s;
    protected _instanceDataName: string = `${this._camelPrefix}Instance`;

    /**
     * Inicializador de componentes.
     * @class
     * @param {JQueryStatic}                    $
     * @param {ComponentManager}                ComponentManager
     * @param {InjectorService}                 InjectorService
     * @param {String.JS}                       S
     * @param {DataOptions}                     DataOptions
     */
    constructor(protected $: JQueryStatic, protected ComponentManager: ComponentManager, protected InjectorService: InjectorService, protected S, protected DataOptions: DataOptions) {
    }

    /**
     * Inicializa todos los componentes en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
     */
    public initialize($context: JQuery): ComponentController[] {
        let $elements = this._findElementsInContext($context),
            results = [];
        for (let $element of $elements) {
            let result = this.initializeOne($($element));
            if (result != undefined) {
                results.push(result);
            }
        }
        return results;
    }

    /**
     * Inicializa un componente en un elemento en concreto. El elemento ha de tener un componente válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el componente
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del componente
     */
    public initializeOne($element, config: any = {}) {
        //get name
        let name = $element.data(this._prefix),
            result;
        if (!!name) {
            //check if exists
            if (!!this.ComponentManager.exists(name)) {
                //get from DI
                let controllerInstance: ComponentController = $element.data(this._instanceDataName);
                if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                    controllerInstance = this.InjectorService.get(name);
                    if (controllerInstance) {
                    //check if is already instanciated
                        //extract options
                        let options = this.DataOptions.getDataOptions($element, name);
                        options = $.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance = controllerInstance.activate($element);
                        $element.data(this._instanceDataName, controllerInstance);
                        //init controller
                        controllerInstance.init(options, config.data);
                    } else {
                        //warn
                    }
                    result = controllerInstance;
                } else {
                    throw new HaztivityInvalidComponentControllerError(name);
                }
            } else {
                throw new HaztivityComponentNotRegisteredError(name);
            }
        } else {
            throw new HaztivityComponentNameRequiredError($element);
        }
        return result;
    }

    /**
     * Obtiene los elementos DOM indicados como componentes
     * @param {JQuery}      $context            Contexto en el cual buscar los componentes
     * @param {number}      [initState=2]       Establece que componentes obtener. Se puede indicar:
     *                                          0   se obtienen los componentes sin inicializar
     *                                          1   se obtienen los componentes inicializados
     *                                          2   se obtienen los componentes sin inicializar e inicializados
     * @returns {JQuery}
     */
    public getComponents($context, initState = 2) {
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
     * Obtiene los controladores de componentes
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    public getComponentsControllers($context, recursive = true) {
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
        //check if context is also a component
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