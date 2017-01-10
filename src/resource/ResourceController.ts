/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Dependencies} from "../di";
import $ from "../jquery";
@Dependencies({
    dependencies:[
        $
    ]
})
export abstract class ResourceController{
    protected _destroyed:boolean=false;
    protected _completed:boolean=false;
    protected $element:JQuery;
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}    $
     */
    constructor(protected $:JQueryStatic){

    }

    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {*}       options         Parámetros para el componente
     */
    public activate($element){
        this.$element = $element;
    }
    /**
     * Inicializa el componente
     */
    public abstract init(options);

    /**
     * Obtiene la instancia del componente
     */
    public abstract getInstance();

    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    public isDestroyed():boolean{
        return this._destroyed;
    }
    /**
     * Realiza la comprobación de objetivo completado
     * @returns {boolean}
     */
    public isCompleted():boolean{
        return this._completed;
    }
    protected _markAsCompleted(){
        this._completed = true;
    }
    /**
     * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
     */
    public destroy(){
        this._destroyed = true;
    }
}