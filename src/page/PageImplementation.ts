/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {Page,IPageOptions} from "./Page";
import {PageController,IPageState,IPageStore} from "./PageController";
import * as Bottle from "../../jspm_packages/npm/bottlejs@1.5.0/dist/bottle";
import {IInjectorService} from "../di";

@Core({
    name:"PageImplementation",
    dependencies:[
        "Injector"
    ],
    instantiable:true
})
export class PageImplementation{
    protected store:IPageStore;
    protected state:IPageState;
    protected page:Page;
    protected controllerFactory:any;
    protected currentController:PageController;

    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    constructor(protected Injector:IInjectorService){
    }

    /**
     * Configura la clase nada más instanciarla
     * @param {Page}    page    Página registrada en el PageManager.
     */
    activate(page:Page){
        this.store = {};
        this.state = {};
        this.page = page;
        $(document.body).append(this.render());
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
    public getController(){
        if(!this.currentController) {
            let pageOptions = this.page.options;
            if (!this.controllerFactory) {
                this.controllerFactory = this.Injector.get(pageOptions.controller);
            }
            let controller: PageController = this.controllerFactory.instance();
            controller.activate(pageOptions, this.state, this.store);
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
     * Desecha la instancia del controlador actual
     */
    public stop(){
        this.currentController = null;
        return this;
    }
}