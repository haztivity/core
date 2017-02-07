/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {PageRegister, IPageOptions} from "./PageRegister";
import {PageController, IPageState, IPageStore} from "./PageController";
import {InjectorService} from "../di";
import {$} from "../jquery";
import {ResourceManager, ResourceController} from "../resource";

@Core(
    {
        name: "PageImplementation",
        dependencies: [
            $,
            ResourceManager,
            InjectorService
        ],
        instantiable: true
    }
)
export class PageImplementation {
    protected store: IPageStore = {
        public: {},
        private: {}
    };
    protected _state: IPageState = {completed: false, visited: false};
    protected _page: PageRegister;
    protected _controllerFactory: any;
    protected _currentController: PageController;
    protected _resources: ResourceController[];

    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    constructor(protected _$,protected _ResourceManager, protected _Injector: InjectorService) {
    }

    /**
     * Configura la clase nada más instanciarla
     * @param {PageRegister}    page    Página registrada en el PageManager.
     */
    activate(page: PageRegister) {
        this._resources = page.getResources();
        this._page = page;
    }

    /**
     * Obtiene el PageRegister asociado
     * @returns {PageRegister}
     */
    public getPage():PageRegister {
        return this._page;
    }

    /**
     * Obtiene el estado actual
     * @returns {IPageState}
     */
    public getState():IPageState{
        return this._state;
    }

    /**
     * Actualiza el estado
     * @param {IPageState}  state       Estado a establecer
     */
    public setState(state:IPageState){
        this._state = state;
    }
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    public getPageName() {
        return this._page.getName();
    }

    /**
     * Obtiene una instancia del controlador.
     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
     * @returns {PageController}
     * @see PageController
     */
    public getController(): PageController {
        if (!this._currentController) {
            let pageOptions = this._page._options;
            if (!this._controllerFactory) {
                this._controllerFactory = this._Injector.get(pageOptions.controller);
            }
            let controller: PageController = this._controllerFactory.instance();
            controller.activate(pageOptions, this._page._eventEmitter, this._state, this.store);
            this._currentController = controller;
        }
        return this._currentController;
    }
    public render(){
        if(this._currentController && !this._currentController.getElement()){
            return this._currentController.render();
        }
    }
    public postRender(){
        if(this._currentController) {
            this._currentController._postRender();
        }
    }
    public getElement(){
        if(this._currentController) {
            return this._currentController.getElement();
        }
    }
    /**
     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
     */
    public detach() {
        this._currentController._destroy();
        this._currentController = null;
    }

    /**
     * Desecha la instancia del controlador actual
     */
    public stop() {
        this._currentController = null;
        return this;
    }
}