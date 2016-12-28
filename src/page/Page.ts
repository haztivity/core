/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseHaztivity} from "../base";
import {Injectable} from "../di";
import {IPageControllerOptions} from "./PageController";
import {EventEmitterFactory} from "../utils";
export interface IPageOptions{

}
@Injectable({
    name:"Page",
    dependencies:[
        "EventEmitterFactory"
    ],
    instantiable:true
})
export class Page extends BaseHaztivity{
    protected eventEmitter:EventEmitter2;
    protected EventEmitterFactory:EventEmitterFactory;
    protected options:IPageOptions;
    protected _init(){
        this.eventEmitter = this.EventEmitterFactory.instance();
    }
    protected _config(options:IPageOptions){
        this.options = options;
    }
    public on(){

    }
    public off(){

    }
}