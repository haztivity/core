/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Page as PageDecorator} from "../di";
import {IPageOptions} from "./Page";
export interface IPageControllerOptions extends IPageOptions{
    eventEmitter:EventEmitter2;
}
export interface IPageStore{

}
export interface IPageState{

}
@PageDecorator({
    name:"PageController",
    dependencies:[
        "$"
    ]
})
export class PageController{
    protected $element;
    protected options:IPageOptions;
    protected eventEmitter:EventEmitter2;
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
     * @param {IPageControllerOptions}  options     Opciones para el controlador
     * @param {IPageState}              state       Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store       Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    public activate(options:IPageControllerOptions,state:IPageState,store:IPageStore){
        this.options = options;
        this.state = state;
        this.store = store;
        this.eventEmitter = options.eventEmitter;
    }
    public render(){
        return this._renderTemplate();
    }
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage    Página anterior
     * @param {number}          oldPageIs   Posición relativa de la página desactivada en relación con la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    public show($oldPage,oldPageIs):JQueryPromise{
        let defer = $.Deferred();
        if($oldPage){
            $oldPage.hide(400).then(()=>{
                this.$element.show(400).then(()=>{
                    defer.resolve();
                });
            });
        }
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
     * Renderiza la template
     * @returns {JQuery}
     * @private
     */
    protected _renderTemplate():JQuery{
        this.$element = this.$(this.options.template);
        return this.$element;
    }
}