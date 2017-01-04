/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Page as PageDecorator} from "../di";
import {$} from "../jqueryDI";
import {IPageOptions} from "./Page";
import {EventEmitter} from "../utils";
export interface IPageControllerOptions extends IPageOptions{
    name:string;
    template:string;
}
export interface IPageStore{

}
export interface IPageState{

}
@PageDecorator({
    name:"PageController",
    dependencies:[
        $
    ]
})
export class PageController{
    public static readonly NAMESPACE="pageController";
    public static readonly ON_RENDERING=`${PageController.NAMESPACE}:rendering`;
    public static readonly ON_RENDERED=`${PageController.NAMESPACE}:rendered`;
    public static readonly ON_SHOW=`${PageController.NAMESPACE}:show`;
    public static readonly ON_SHOWN = `${PageController.NAMESPACE}:shown`;
    public static readonly ON_COMPLETE = `${PageController.NAMESPACE}:completed`;
    protected $element;
    protected options:IPageOptions;
    protected eventEmitter:EventEmitter;
    protected state:IPageState;
    protected store:IPageStore;

    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    $   Objeto JQuery
     * @see Injector.TYPES
     */
    constructor(protected $){

    }

    /**
     * Configura la clase nada más instanciarla
     * @param {IPageControllerOptions}  options         Opciones para el controlador
     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    public activate(options:IPageControllerOptions,eventEmitter:EventEmitter,state:IPageState,store:IPageStore){
        this.options = options;
        this.state = state;
        this.store = store;
        this.eventEmitter = eventEmitter;
    }
    public render(){
        let $element = this.$(this.options.template),
            //allow to user to change the object returned
            result = this.eventEmitter.trigger(PageController.ON_RENDERING,[$element,this]);
        if(result instanceof this.$){
            $element = result;
        }
        this.$element = $element;
        return $element;
    }
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage    Página anterior
     * @param {number}          oldPageIs   Posición relativa de la página desactivada en relación con la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    public show($oldPage,oldPageIs):JQueryPromise{
        let defer = $.Deferred();

        return defer.promise();
    }
    /**
     * Obtiene el DOM de la página
     * @returns {JQuery}
     */
    public getElement():JQuery{
        return this.$element;
    }

    /**
     * Invocado al solicitarse la destruccion de la página
     */
    protected _destroy(){

    }
}