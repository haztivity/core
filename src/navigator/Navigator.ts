/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$ as jquery} from "../jqueryDI";
import {Core} from "../di";
import {PageManager,PageImplementation,PageController} from "../page";
import {EventEmitter, EventEmitterFactory} from "../utils";
@Core({
    name:"Navigator",
    public:true,
    dependencies:[
        jquery,
        PageManager,
        EventEmitterFactory
    ]
})
export class Navigator{
    public static readonly NAMESPACE="navigator";
    public static readonly ON_RENDER_PAGE=`${Navigator.NAMESPACE}:render`;
    protected $context:JQuery;
    protected currentPage:PageImplementation;
    protected currentRenderProcess:JQueryDeferred;
    protected eventEmitter:EventEmitter;
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
        if(this.currentRenderProcess && this.currentRenderProcess.state() === "pending"){
            this.currentRenderProcess.reject();
        }
        this.currentRenderProcess = $.Deferred();
        //get the page requested
        let newPage:PageImplementation = this.PageManager.getPage(index);
        //the page must be provided and different of the current page
        if(newPage){
            if(newPage !== this.currentPage) {
                //todo check if page is complete
                let currentPageElement = this.currentPage ? this.currentPage.getController().getElement() : null,
                    currentPageIndex = this.currentPage ? this.PageManager.getPageIndex(this.currentPage.getPageName()) : null,
                    newPageController = newPage.getController(),
                    newPageElement = newPageController.render(),
                    newPageName = newPage.getPageName(),
                    currentPageIs = index - currentPageIndex < 0 ? -1 : 1;
                //if the new page is before to the current page
                if (currentPageIndex === -1) {
                    this.$context.prepend(newPageElement);
                } else {//if the new page is after the current page
                    this.$context.append(newPageElement);
                }
                this.eventEmitter.trigger(Navigator.ON_RENDER_PAGE, newPageName);
                //trigger a global event that could be listened by anyone
                this.eventEmitter.globalEmitter.trigger(Navigator.ON_RENDER_PAGE, newPageName);
                let showPromise = newPageController.show(currentPageElement, currentPageIs);
                //if the function returns a promise
                if (typeof showPromise.then === "function") {
                    newPageController.show(currentPageElement, currentPageIs).then(this._onPageShowEnd.bind(this, newPage, this.currentRenderProcess));
                } else {//otherwise, execute immediately
                    this._onPageShowEnd(newPage, this.currentRenderProcess);
                }
            }else{
                this.currentRenderProcess.reject();
                return this.currentRenderProcess;
            }
        }else{
            //todo throw
        }
    }
    protected _onPageShowEnd(newPage:PageImplementation,defer){
        if(this.currentPage) {
            this.currentPage.detach().getElement().remove();
        }
        this.currentPage = newPage;
    }

}