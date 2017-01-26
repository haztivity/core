import { PageRegister } from "./PageRegister";
import { PageController, IPageState, IPageStore } from "./PageController";
import { InjectorService } from "../di";
import { ResourceController } from "../resource";
export declare class PageImplementation {
    protected _ResourceManager: any;
    protected _Injector: InjectorService;
    protected store: IPageStore;
    protected _state: IPageState;
    protected _page: PageRegister;
    protected _controllerFactory: any;
    protected _currentController: PageController;
    protected _resources: ResourceController[];
    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    constructor(_ResourceManager: any, _Injector: InjectorService);
    /**
     * Configura la clase nada más instanciarla
     * @param {PageRegister}    page    Página registrada en el PageManager.
     */
    activate(page: PageRegister): void;
    /**
     * Obtiene el PageRegister asociado
     * @returns {PageRegister}
     */
    getPage(): PageRegister;
    /**
     * Obtiene el estado actual
     * @returns {IPageState}
     */
    getState(): IPageState;
    /**
     * Actualiza el estado
     * @param {IPageState}  state       Estado a establecer
     */
    setState(state: IPageState): void;
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    getPageName(): string;
    /**
     * Obtiene una instancia del controlador.
     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
     * @returns {PageController}
     * @see PageController
     */
    getController(): PageController;
    /**
     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
     */
    detach(): void;
    /**
     * Desecha la instancia del controlador actual
     */
    stop(): this;
}
