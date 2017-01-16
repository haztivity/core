/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Dependencies, InjectorService} from "../di";
import {$} from "../jquery";
import {IPageOptions} from "./Page";
import {EventEmitter} from "../utils";
import {ResourceController, ResourceInitializerService} from "../resource";
export interface IPageControllerOptions extends IPageOptions {
    name: string;
    template: string;
}
export interface IPageStore {
    public?:any;
    private?:any;
}
export interface  IPageState {
    completed:boolean;
    visited:boolean;
}
@Dependencies(
    {
        dependencies: [
            $,
            InjectorService,
            ResourceInitializerService
        ]
    }
)
export abstract class PageController {
    public static readonly NAMESPACE = "pageController";
    public static readonly ON_RENDERING = `${PageController.NAMESPACE}:rendering`;
    public static readonly ON_RENDERED = `${PageController.NAMESPACE}:rendered`;
    public static readonly ON_SHOW = `${PageController.NAMESPACE}:show`;
    public static readonly ON_SHOWN = `${PageController.NAMESPACE}:shown`;
    public static readonly ON_COMPLETE_CHANGE = `${PageController.NAMESPACE}:completechange`;
    public static readonly ON_DESTROY = `${PageController.NAMESPACE}:destroy`;
    public static readonly CLASS_PAGE = "hz-page";
    public $element;
    public options: IPageOptions;
    public eventEmitter: EventEmitter;
    public state: IPageState;
    public store: IPageStore;
    protected resources: ResourceController[] = [];

    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    $                   Objeto JQuery
     * @param {InjectorService} InjectorService     Servicio del inyector
     * @see Injector.TYPES
     */
    constructor(public $, public InjectorService: InjectorService, protected ResourceInitializerService: ResourceInitializerService) {

    }

    /**
     * Configura la clase nada más instanciarla
     * @param {IPageControllerOptions}  options         Opciones para el controlador
     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    public activate(options: IPageControllerOptions, eventEmitter: EventEmitter, state: IPageState, store: IPageStore) {
        this.options = options;
        this.state = state;
        this.store = store;
        this.state.visited = true;
        this.eventEmitter = eventEmitter;
    }
    protected _getNumCompletedResources(){
        let completed = 0;
        for (let resource of this.resources) {
            completed += resource.isCompleted()
                ? 1
                : 0;
        }
        return completed
    }
    public isCompleted(forceCheck?:boolean) {
        let result = this.state.completed,
            current = this.state.completed;
        if(forceCheck || this.state.completed != true){
            result = this._getNumCompletedResources() === this.resources.length;
            //if the state changes, trigger event
            this.state.completed = result;
            if(current !== result){
                this.eventEmitter.trigger(PageController.ON_COMPLETE_CHANGE,[result,this.$element,this]);
            }
        }
        return result;
    }

    public render() {
        let event = this.eventEmitter.createEvent(PageController.ON_RENDERING),
            $element,
            //allow to user to custom render the template
            result = this.eventEmitter.trigger(event, [this.options.template, this]);
        //if a result is provided, ignore the default render function
        if (result instanceof this.$) {
            $element = result;
        } else {
            $element = this._render(this.options.template);
        }
        $element.addClass(`${PageController.CLASS_PAGE} ${PageController.CLASS_PAGE}-${this.options.name}`);
        this.$element = $element;
        return $element;
    }

    protected _render(template) {
        let $element = $(template);
        return $element;
    }

    public initializeResources() {
        this.resources = this.ResourceInitializerService.initialize(this.$element);
        for (let resource of this.resources) {
            resource.on(ResourceController.ON_COMPLETED,{instance:this},this._onResourceCompleted);
        }
        return this.resources;
    }
    protected _onResourceCompleted(e){
        let instance:PageController = e.data.instance;
        instance.isCompleted(true);
    }
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage                    Página anterior
     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    public show($oldPage, oldPageRelativePosition): JQueryPromise<null> {
        let deferred = $.Deferred(),
            promise = deferred.promise(),
            event = this.eventEmitter.createEvent(PageController.ON_SHOW),
            result = this.eventEmitter.trigger(event, [this.$element, $oldPage, oldPageRelativePosition, this]);
        if (!event.isDefaultPrevented()) {
            //if the user doesn't prevent default
            this._show($oldPage, oldPageRelativePosition).then(
                () => {
                    if (typeof result === "function") {
                        //call the event's function
                        result(deferred);
                    } else {//if any function is provided by the event
                        deferred.resolve();
                    }
                }
            );
        } else {
            //if is default prevented, check if the user returns a function
            if (typeof result === "function") {
                result(deferred);//call the event's function
            } else {
                //if not, return a resolved promise
                deferred.resolve();
            }
        }
        promise.then(this._onShowEnd.bind(this, $oldPage, oldPageRelativePosition));
        return promise;
    }

    /**
     * Invocado al finalizar el proceso de animación
     * @protected
     */
    protected _onShowEnd($oldPage, oldPageRelativePosition) {
        this.eventEmitter.trigger(PageController.ON_SHOWN, [this.$element, $oldPage, oldPageRelativePosition, this]);
    }

    /**
     * Realiza la animación correspondiente
     * @param {JQuery}              $oldPage                Página anterior.
     * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
     * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
     * @protected
     */
    protected _show($oldPage, oldPageRelativePosition): JQueryPromise<null> {
        let defer = $.Deferred();
        defer.resolve();
        return defer.promise();
    }

    /**
     * Obtiene el DOM de la página
     * @returns {JQuery}
     */
    public getElement(): JQuery {
        return this.$element;
    }

    /**
     * Invocado al solicitarse la destruccion de la página
     */
    protected _destroy() {
        this.eventEmitter.trigger(PageController.ON_DESTROY, [this.$element, this]);
    }
}