/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
export interface IPage{
    on():void;
    off():void;
}
export interface IPageOptions{
    name:string;
    template:string;
    controller?:string;
    resources?:Resource[]
}
@Core({
    name:"Page",
    instantiable:true,
    dependencies:[
        "EventEmitterFactory"
    ]
})
export class Page implements IPage{
    protected options:IPageOptions;
    protected eventEmitter:EventEmitter2;

    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    constructor(protected EventEmitterFactory){

    }

    /**
     * Configura la clase nada más instanciarla
     * @param options
     */
    public activate(options:IPageOptions){
        this.options=options;
    }
    public on(){

    }
    public off(){

    }

    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    public getName(){
        return this.options.name;
    }
}