/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {Page,IPageOptions} from "./Page";
import {PageController,IPageState,IPageStore} from "./PageController";
import {InjectorService} from "../di";
import {ResourceManager,ResourceController} from "../resource";

@Core({
    name:"PageImplementation",
    dependencies:[
        ResourceManager,
        InjectorService
    ],
    instantiable:true
})
export class PageImplementation{
    protected store:IPageStore;
    protected state:IPageState;
    protected page:Page;
    protected controllerFactory:any;
    protected currentController:PageController;
    protected resources:ResourceController[];
    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    constructor(protected ResourceManager, protected Injector:InjectorService){
    }

    /**
     * Configura la clase nada más instanciarla
     * @param {Page}    page    Página registrada en el PageManager.
     */
    activate(page:Page){
        this.store = {
            public:{},
            private:{}
        };
        this.state = {};
        this.resources = page.getResources();
        this.page = page;
    }

    /**
     * Obtiene el Page asociado
     * @returns {Page}
     */
    public getPage(){
        return this.page;
    }

    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    public getPageName(){
        return this.page.getName();
    }

    /**
     * Obtiene una instancia del controlador.
     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
     * @returns {PageController}
     * @see PageController
     */
    public getController(){
        if(!this.currentController) {
            let pageOptions = this.page.options;
            if (!this.controllerFactory) {
                this.controllerFactory = this.Injector.get(pageOptions.controller);
            }
            let controller: PageController = this.controllerFactory.instance();
            controller.activate(pageOptions, this.page.eventEmitter, this.state, this.store);
            this.currentController = controller;
        }
        return this.currentController;
    }
    public render(){
        return this.getController().render();
    }
    public show(oldPage,oldPageIs):JQueryPromise{
        let oldPageElement = oldPage != undefined? oldPage.getController().getElement() : null;
        return this.getController().show(oldPageElement,oldPageIs);
    }

    /**
     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
     */
    public detach(){
        this.currentController._destroy();
        this.currentController = null;
    }
    /**
     * Desecha la instancia del controlador actual
     */
    public stop(){
        this.currentController = null;
        return this;
    }
}