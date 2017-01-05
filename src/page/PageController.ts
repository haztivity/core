/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Dependencies,InjectorService} from "../di";
import {$} from "../jquery";
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
@Dependencies({
    dependencies:[
        $,
        InjectorService
    ]
})
export abstract class PageController{
    public static readonly NAMESPACE="pageController";
    public static readonly ON_RENDERING=`${PageController.NAMESPACE}:rendering`;
    public static readonly ON_RENDERED=`${PageController.NAMESPACE}:rendered`;
    public static readonly ON_SHOW=`${PageController.NAMESPACE}:show`;
    public static readonly ON_SHOWN = `${PageController.NAMESPACE}:shown`;
    public static readonly ON_COMPLETE = `${PageController.NAMESPACE}:completed`;
    public static readonly ON_DESTROY = `${PageController.NAMESPACE}:destroy`;
    public static readonly CLASS_PAGE = "hz-page";
    public $element;
    public options:IPageOptions;
    public eventEmitter:EventEmitter;
    public state:IPageState;
    public store:IPageStore;

    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    $                   Objeto JQuery
     * @param {InjectorService} InjectorService     Servicio del inyector
     * @see Injector.TYPES
     */
    constructor(public $,public InjectorService:InjectorService){

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
        let event = this.eventEmitter.createEvent(PageController.ON_RENDERING),
            $element,
            //allow to user to custom render the template
            result = this.eventEmitter.trigger(event,[this.options.template,this]);
        //if a result is provided, ignore the default render function
        if(result instanceof this.$){
            $element = result;
        }else{
            $element = this._render(this.options.template);
        }
        $element.addClass(`${PageController.CLASS_PAGE} ${PageController.CLASS_PAGE}-${this.options.name}`);
        this.$element = $element;
        return $element;
    }
    protected _render(template){
        let $element = $(template);
        return $element;
    }

    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage                    Página anterior
     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    public show($oldPage,oldPageRelativePosition):JQueryPromise{
        let promise,
            deferred = $.Deferred(),
            event = this.eventEmitter.createEvent(PageController.ON_SHOW),
            result = this.eventEmitter.trigger(event, [this.$element,$oldPage,oldPageRelativePosition,this]);
        if(!event.isDefaultPrevented()){
            //if the user doesn't prevent default
            this._show($oldPage,oldPageRelativePosition).then(()=>{
                if(typeof result === "function") {
                    //call the event's function
                    result(deferred);
                }else{//if any function is provided by the event
                    deferred.resolve();
                }
            });
        }else{
            //if is default prevented, check if the user returns a function
            if(typeof result === "function") {
                result(deferred);//call the event's function
            }else{
                //if not, return a resolved promise
                deferred.resolve();
            }
        }
        return deferred.promise();
    }
    protected _show($oldPage,oldPageRelativePosition):JQueryPromise{
        let defer = $.Deferred();
        defer.resolve();
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
        this.eventEmitter.trigger(PageController.ON_DESTROY,[this.$element,this]);
    }
}