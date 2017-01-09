/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core,InjectorService} from "../di";
import {ResourceManager} from "./ResourceManager";
import {ResourceController} from "./ResourceController";
import {S} from "../string";
export interface IResourceInitializer{
    initialize($context:JQuery):void;
}
@Core({
    name:"ResourceInitializer",
    dependencies:[
        ResourceManager,
        InjectorService,
        S
    ]
})
export class ResourceInitializer{
    protected prefix:string="hz-resource";
    protected camelPrefix:string = this.S(this.prefix).camelize().s;
    constructor(protected ResourceManager:ResourceManager, protected InjectorService:InjectorService, protected S){
    }

    /**
     * Inicializa todos los recursos en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
     */
    public initialize($context:JQuery){
        let $elements = this._findElementsInContext($context);
        for (let $element of $elements) {
            this._initializeOne($element);
        }
    }

    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element    Elemento en el que inicializar el recurso
     * @private
     */
    protected _initializeOne($element){
        //get name
        let name = $element.data(this.prefix);
        if(!!name) {
            //check if exists
            if (!!this.ResourceManager.exists(name)) {
                //get from DI
                let factory = this.InjectorService.get(name);
                if (factory) {
                    //check if is already instanciated
                    let controllerInstance: ResourceController = $element.data(`${this.camelPrefix}Instance`);
                    if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                        //extract options
                        let options = $element.getDataOptions();
                        //get controller instance
                        controllerInstance = factory.instance();
                        $element.data(`${this.camelPrefix}Instance`, controllerInstance);
                        //init controller
                        controllerInstance.init(options);
                    } else {
                        //warn
                    }
                } else {
                    alert("ERROR");
                }
            } else {
                alert("ERROR");
            }
        }else{
            alert("ERROR");
        }
    }
    protected _findElementsInContext($context:JQuery):JQuery{
        let $elements = $context.find(`[${this.prefix}],[data-${this.prefix}]`);//get elements with the prefix
        return $elements;
    }
}