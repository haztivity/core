/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$ as jquery} from "../jquery";
import {Core} from "../di";
import {PageManager, PageImplementation, PageController,IPageState} from "../page";
import {EventEmitter, EventEmitterFactory, IEventHandler} from "../utils";
export interface INavigatorPageData{
    index:number;
    name:string;
    state:IPageState;
}
export interface INavigatorService{
    goTo(index: number):JQueryPromise<INavigatorPageData>|boolean;
    isDisabled():boolean;
    setDisabled(disabled: boolean):void;
    enable():void;
    disable():void;
    next():JQueryPromise<INavigatorPageData>|boolean;
    prev():JQueryPromise<INavigatorPageData>|boolean;
    getCurrentPageData():INavigatorPageData;
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
}
@Core(
    {
        name: "Navigator",
        public: true,
        dependencies: [
            jquery,
            PageManager,
            EventEmitterFactory
        ]
    }
)
export class Navigator implements IEventHandler, INavigatorService {

    public static readonly NAMESPACE = "navigator";
    public static readonly ON_DRAW_PAGE = `${Navigator.NAMESPACE}:draw`;
    public static readonly ON_DISABLE = `${Navigator.NAMESPACE}:disable`;
    public static readonly ON_ENABLE = `${Navigator.NAMESPACE}:enable`;
    public static readonly ON_CHANGE_PAGE_END = `${Navigator.NAMESPACE}:changeend`;
    public static readonly ON_CHANGE_PAGE_START = `${Navigator.NAMESPACE}:changestart`;
    protected static readonly ATTR_TRANSITION_TO = "data-hz-navigator-transition-to";
    protected static readonly ATTR_CURRENT = "data-hz-navigator-page";
    protected _$context: JQuery;
    protected _currentPage: PageImplementation;
    protected _currentPageIndex: number;
    protected _currentRenderProcess: JQueryDeferred<INavigatorPageData>;
    protected _eventEmitter: EventEmitter;
    protected _disabled: boolean;
    protected _development=false;
    /**
     * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
     * @param {JQueryStatic}                _$
     * @param {PageManager}                 _PageManager
     * @param {EventEmitterFactory}         _EventEmitterFactory
     */
    constructor(protected _$: JQueryStatic, protected _PageManager: PageManager, protected _EventEmitterFactory: EventEmitterFactory) {

    }
    public getProgressPercentage(){
        return (this._PageManager.getCompleted().length * 100) / this._PageManager.count();
    }
    public activate($context: JQuery) {
        this._$context = $context;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }
    public enableDev(){
        this._development = true;
    }
    public disableDev(){
        this._development = false;
    }
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    public goTo(index: number):JQueryPromise<INavigatorPageData>|boolean {
        if (this.isDisabled() !== true) {
            //get the page requested
            let newPage: PageImplementation = this._PageManager.getPage(index);
            //the page must be provided and different of the current page
            if (newPage) {
                if (newPage !== this._currentPage) {
                    let currentPage = this.getCurrentPage(),//get current page and index
                        currentPageIndex = this.getCurrentPageIndex(),
                        currentPageIs = currentPageIndex - index < 0
                            ? -1
                            : 1;//check the position of the old page relative to the new page
                    //check if resources are completed to go to the next page
                    if (this._development === true || (currentPageIs === 1 || (currentPage == undefined || currentPage.getController().isCompleted()))) {
                        if (this._currentRenderProcess && this._currentRenderProcess.state() === "pending") {
                            this._currentRenderProcess.reject();
                        }
                        this._currentRenderProcess = this._$.Deferred();
                        this._currentPage = newPage;//set new page as current
                        this._currentPageIndex = index;
                        let newPageName = newPage.getPageName(),//get name of new controller
                            newPageData:INavigatorPageData = {
                                index: index,
                                name: newPageName,
                                state:newPage.getState()
                            },
                            currentPageData:INavigatorPageData;
                        if (currentPage) {
                            currentPageData = {
                                index: currentPageIndex,
                                name: currentPage.getPageName(),
                                state:currentPage.getState()
                            }
                        }
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator.ON_CHANGE_PAGE_START, newPageData,currentPageData);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator.ON_CHANGE_PAGE_START, newPageData,currentPageData);
                        let currentPageElement = currentPage
                                ? currentPage.getController().getElement()
                                : null, //get current element
                            newPageController = newPage.getController(),//create a controller for new page
                            newPageElement = newPage.render();//get the rendered element
                        //if the new page is before to the current page
                        if (currentPageIndex === -1) {
                            this._$context.prepend(newPageElement);
                        } else {//if the new page is after the current page
                            this._$context.append(newPageElement);
                        }
                        //initialize resources and trigger rendered event
                        newPage.postRender();
                        this._$context.removeAttr(Navigator.ATTR_CURRENT);
                        this._$context.attr(Navigator.ATTR_TRANSITION_TO,newPageName);
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                        //request animations
                        let showPromise = newPageController.show(currentPageElement, currentPageIs);

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
                    return this._currentRenderProcess;
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
    public isDisabled() {
        return this._disabled;
    }

    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    public setDisabled(disabled: boolean) {
        if (this._disabled !== disabled) {
            this._disabled = disabled;
            if (disabled) {
                this._eventEmitter.trigger(Navigator.ON_ENABLE);
            } else {
                this._eventEmitter.trigger(Navigator.ON_DISABLE);
            }
        }
    }

    /**
     * Habilita la navegación
     */
    public enable() {
        this.setDisabled(false);
    }

    /**
     * Deshabilita la navegación
     */
    public disable() {
        this.setDisabled(true);
    }

    /**
     * Retrocede a la página posterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    public next() {
        let numPages = this._PageManager.count(),
            currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex < numPages - 1) {
            return this.goTo(currentPageIndex + 1);
        } else {
            return false;
        }

    }

    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    public prev() {
        let currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex > 0) {
            return this.goTo(currentPageIndex - 1);
        } else {
            return false;
        }

    }

    /**
     * Invocado al finalizarse la animación del cambio de página
     * @param {PageImplementation}      newPage     Página activada
     * @param {INavigatorPageData}      newPageData Datos de la página activada
     * @param {PageImplementation}      oldPage     Página desactivada
     * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
     * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
     * @private
     */
    protected _onPageShowEnd(newPage: PageImplementation, newPageData:INavigatorPageData, oldPage: PageImplementation, oldPageData:INavigatorPageData, defer) {
        if (oldPage) {
            let controller = oldPage.getController();
            oldPage.detach();
            controller.getElement().remove();
        }
        this._$context.removeAttr(Navigator.ATTR_TRANSITION_TO);
        this._$context.attr(Navigator.ATTR_CURRENT,newPageData.name);
        if(newPage.isCompleted()){
            this.enable();
        }
        //trigger event in navigator
        this._eventEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        //trigger a global event that could be listened by anyone
        this._eventEmitter.globalEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        defer.resolve(newPageData,oldPageData);
    }

    /**
     * Obtiene el índice de la página actual
     * @returns {number}
     */
    public getCurrentPageIndex() {
        return this._currentPageIndex;
    }

    /**
     * Obtiene la implementación de página actual
     * @returns {PageImplementation}
     */
    public getCurrentPage() {
        return this._currentPage;
    }
    /**
     * Devuelve los datos de la página actual
     * @returns {INavigatorPageData}
     */
    public getCurrentPageData():INavigatorPageData{
        return {
            index:this._currentPageIndex,
            name:this._currentPage.getPageName(),
            state:this._currentPage.getState()
        };
    }

    /**
     * @see EventEmitter#on
     * @returns {Navigator}
     */
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator {
        this._eventEmitter.on(events, data, handler);
        return this;
    }
    /**
     * @see EventEmitter#one
     * @returns {Navigator}
     */
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator {
        this._eventEmitter.one(events, data, handler);
        return this;
    }
    /**
     * @see EventEmitter#off
     * @returns {Navigator}
     */
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator {
        this._eventEmitter.off(events, handler);
        return this;
    }
}
