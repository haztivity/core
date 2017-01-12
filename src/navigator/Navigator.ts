/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$ as jquery} from "../jquery";
import {Core} from "../di";
import {PageManager,PageImplementation,PageController} from "../page";
import {EventEmitter, EventEmitterFactory,IEventHandler} from "../utils";
@Core({
    name:"Navigator",
    public:true,
    dependencies:[
        jquery,
        PageManager,
        EventEmitterFactory
    ]
})
export class Navigator implements IEventHandler{

    public static readonly NAMESPACE="navigator";
    public static readonly ON_DRAW_PAGE=`${Navigator.NAMESPACE}:draw`;
    public static readonly ON_DISABLE=`${Navigator.NAMESPACE}:disable`;
    public static readonly ON_ENABLE=`${Navigator.NAMESPACE}:enable`;
    protected $context:JQuery;
    protected currentPage:PageImplementation;
    protected currentPageIndex:number;
    protected currentRenderProcess:JQueryDeferred;
    protected eventEmitter:EventEmitter;
    protected disabled:boolean;
    constructor(protected $:JQueryStatic,protected PageManager:PageManager, protected EventEmitterFactory:EventEmitterFactory){

    }
    public activate ($context:JQuery){
        this.$context = $context;
        this.eventEmitter = this.EventEmitterFactory.createEmitter();
    }
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryDeferred} Promesa que es resuelta al finalizarse el proceso completo de cambio de página
     */
    public goTo(index:number){
        if(this.disabled !== true) {
            //get the page requested
            let newPage: PageImplementation = this.PageManager.getPage(index);
            //the page must be provided and different of the current page
            if (newPage) {
                if (newPage !== this.currentPage) {
                    //todo check if page is complete
                    let currentPage = this.currentPage,//get current page and index
                        currentPageIndex = this.currentPageIndex,
                        currentPageIs = currentPageIndex - index < 0 ? -1 : 1;//check the position of the old page relative to the new page
                    //check if resources are completed to go to the next page
                    if (currentPageIs === 1 && (currentPage == undefined || currentPage.getController().isCompleted())) {
                        if (this.currentRenderProcess && this.currentRenderProcess.state() === "pending") {
                            this.currentRenderProcess.reject();
                        }
                        this.currentRenderProcess = $.Deferred();
                        this.currentPage = newPage;//set new page as current
                        this.currentPageIndex = index;
                        let currentPageElement = currentPage ? currentPage.getController().getElement() : null, //get current element
                            newPageController = newPage.getController(),//create a controller for new page
                            newPageElement = newPageController.getElement(),//get the rendered element
                            newPageName = newPage.getPageName();//get name of new controller

                        //if the new page is before to the current page
                        if (currentPageIndex === -1) {
                            this.$context.prepend(newPageElement);
                        } else {//if the new page is after the current page
                            this.$context.append(newPageElement);
                        }
                        //trigger event in navigator
                        this.eventEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //trigger a global event that could be listened by anyone
                        this.eventEmitter.globalEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //request animations
                        let showPromise = newPageController.show(currentPageElement, currentPageIs);
                        //if the function returns a promise
                        if (typeof showPromise.then === "function") {
                            showPromise.then(this._onPageShowEnd.bind(this, newPage, currentPage, this.currentRenderProcess));
                        } else {//otherwise, execute immediately
                            this._onPageShowEnd(newPage, currentPage, this.currentRenderProcess);
                        }
                    }
                }
            } else {
                //todo throw
            }
        }
        return false;
    }

    /**
     * Devuelve el estado actual de deshabilitado
     * @returns {boolean}
     */
    public isDisabled(){
        return this.disabled;
    }
    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    public setDisabled(disabled:boolean){
        if(this.disabled !== disabled) {
            this.disabled = disabled;
            if(disabled){
                this.eventEmitter.trigger(Navigator.ON_ENABLE);
            }else{
                this.eventEmitter.trigger(Navigator.ON_DISABLE);
            }
        }
    }
    /**
     * Habilita la navegación
     */
    public enable(){
        this.setDisabled(false);
    }
    /**
     * Deshabilita la navegación
     */
    public disable(){
        this.setDisabled(true);
    }
    /**
     * Retrocede a la página posterior si existe.
     * @returns {JQueryPromise|boolean} Devuelve una promsea si el proceso se inicia. False si está deshabilitado o no hay página posterior
     */
    public next(){
        let numPages = this.PageManager.count();
        if(this.currentPageIndex < numPages-1){
            return this.goTo(this.currentPageIndex+1);
        }else{
            return false;
        }

    }

    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Devuelve una promsea si el proceso se inicia. False si está deshabilitado o no hay página anterior
     */
    public prev(){
        let numPages = this.PageManager.count();
        if(this.currentPageIndex > 0){
            return this.goTo(this.currentPageIndex-1);
        }else{
            return false;
        }

    }

    /**
     * Invocado al finalizarse la animación del cambio de página
     * @param newPage
     * @param oldPage
     * @param defer
     * @private
     */
    protected _onPageShowEnd(newPage:PageImplementation,oldPage:PageImplementation,defer){
        if(oldPage) {
            let controller = oldPage.getController();
            oldPage.detach();
            controller.getElement().remove();
        }
    }
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator {
        this.eventEmitter.on(events,data,handler);
        return this;
    }

    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator {
        this.eventEmitter.one(events,data,handler);
        return this;
    }

    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator {
        this.eventEmitter.off(events,handler);
        return this;
    }
}