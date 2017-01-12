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
    public static readonly ON_CHANGE_PAGE_END = `${Navigator.NAMESPACE}:changend`;
    protected _$context: JQuery;
    protected _currentPage: PageImplementation;
    protected _currentPageIndex: number;
    protected _currentRenderProcess: JQueryDeferred;
    protected _eventEmitter: EventEmitter;
    protected _disabled: boolean;
    constructor(protected $:JQueryStatic,protected PageManager:PageManager, protected EventEmitterFactory:EventEmitterFactory){

    }
    public activate ($context:JQuery){
        this._$context = $context;
        this._eventEmitter = this.EventEmitterFactory.createEmitter();
    }
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryDeferred} Promesa que es resuelta al finalizarse el proceso completo de cambio de página
     */
    public goTo(index:number){
        if (this.isDisabled() !== true) {
            //get the page requested
            let newPage: PageImplementation = this.PageManager.getPage(index);
            //the page must be provided and different of the current page
            if (newPage) {
                if (newPage !== this._currentPage) {
                    //todo check if page is complete
                    let currentPage = this.getCurrentPage(),//get current page and index
                        currentPageIndex = this.getCurrentPageIndex(),
                        currentPageIs = currentPageIndex - index < 0 ? -1 : 1;//check the position of the old page relative to the new page
                    //check if resources are completed to go to the next page
                    if (currentPageIs === 1 || (currentPage == undefined || currentPage.getController().isCompleted())) {
                        if (this._currentRenderProcess && this._currentRenderProcess.state() === "pending") {
                            this._currentRenderProcess.reject();
                        }
                        this._currentRenderProcess = $.Deferred();
                        this._currentPage = newPage;//set new page as current
                        this._currentPageIndex = index;
                        let currentPageElement = currentPage ? currentPage.getController().getElement() : null, //get current element
                            newPageController = newPage.getController(),//create a controller for new page
                            newPageElement = newPageController.getElement(),//get the rendered element
                            newPageName = newPage.getPageName();//get name of new controller

                        //if the new page is before to the current page
                        if (currentPageIndex === -1) {
                            this._$context.prepend(newPageElement);
                        } else {//if the new page is after the current page
                            this._$context.append(newPageElement);
                        }
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //request animations
                        let showPromise = newPageController.show(currentPageElement, currentPageIs),
                            newPageData = {
                                index: index,
                                name: newPageName
                            },
                            currentPageData;
                        if (currentPage) {
                            currentPageData = {
                                index: currentPageIndex,
                                name: currentPage.getPageName()
                            }
                        }
                        //if the function returns a promise
                        if (typeof showPromise.then === "function") {
                            showPromise.then(
                                this._onPageShowEnd.bind(
                                    this,
                                    newPage,
                                    newPageData,
                                    currentPage,
                                    currentPageData,
                                    this._currentRenderProcess
                                )
                            );
                        } else {//otherwise, execute immediately
                            this._onPageShowEnd(
                                newPage,
                                newPageData,
                                currentPage,
                                currentPageData,
                                this._currentRenderProcess
                            );
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
        return this._disabled;
    }
    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    public setDisabled(disabled:boolean){
        if (this._disabled !== disabled) {
            this._disabled = disabled;
            if(disabled){
                this._eventEmitter.trigger(Navigator.ON_ENABLE);
            }else{
                this._eventEmitter.trigger(Navigator.ON_DISABLE);
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
        let numPages = this.PageManager.count(),
            currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex < numPages - 1) {
            return this.goTo(currentPageIndex + 1);
        }else{
            return false;
        }

    }

    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Devuelve una promsea si el proceso se inicia. False si está deshabilitado o no hay página anterior
     */
    public prev(){
        let currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex > 0) {
            return this.goTo(currentPageIndex - 1);
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
    protected _onPageShowEnd(newPage: PageImplementation, newPageData, oldPage: PageImplementation, oldPageData, defer) {
        if(oldPage) {
            let controller = oldPage.getController();
            oldPage.detach();
            controller.getElement().remove();
        }
        //trigger event in navigator
        this._eventEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        //trigger a global event that could be listened by anyone
        this._eventEmitter.globalEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
    }

    public getCurrentPageIndex() {
        return this._currentPageIndex;
    }

    public getCurrentPage() {
        return this._currentPage;
    }
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator {
        this._eventEmitter.on(events, data, handler);
        return this;
    }

    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator {
        this._eventEmitter.one(events, data, handler);
        return this;
    }

    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator {
        this._eventEmitter.off(events, handler);
        return this;
    }
}