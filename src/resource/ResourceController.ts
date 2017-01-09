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
    public activate(options){

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
     * Realiza la comprobación de objetivo completado
     * @returns {boolean}
     */
    public isCompleted():boolean{
        return true;
    }
}