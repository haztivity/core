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
    constructor(protected EventEmitterFactory){

    }
    public activate(options:IPageOptions){

    }
    public on(){

    }
    public off(){

    }
}