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
        return this.currentController;
    }
    /**
     * Si hay controlador instanciado lo devuelve. En caso contrario genera una instancia nueva
     * @param {PageImplementation}      oldPage     Página desactivada
     * @param {number}                  oldPageIs   Posición relativa de la página desactivada en relación con la actual
     * @returns {PageController}
     */
    public run(oldPage:PageImplementation,oldPageIs){
        if(!this.currentController) {
            if (!this.controllerFactory) {
                this.controllerFactory = this.Injector.get(this.page.options.name);
            }
            let controller: PageController = this.controllerFactory.instance();
            controller.activate(this.page.options, this.state, this.store);
            let oldPageElement = oldPage != undefined? oldPage.getController().getElement() : null;
            controller.show(oldPageElement,oldPageIs);
            this.currentController = controller;
        }
        return this.currentController;
    }

    /**
     * Desecha la instancia del controlador actual
     */
    public stop(){
        this.currentController = null;
        return this;
    }
}