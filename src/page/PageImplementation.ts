/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseHaztivity} from "../base";
import {IPageControllerOptions, PageController} from "./PageController";
import {Page} from "./Page";
import {EventEmitterFactory} from "../utils";
import {Injectable} from "../di";
export interface IPageState{
    visited:boolean;
    completed:boolean;
}
export interface IPageStore{
    privateData:any;
    publicData:any;
}
@Injectable({
    name:"PageImplementation",
    dependencies:[],
    instantiable:true
})
export class PageImplementation extends BaseHaztivity{
    protected name:string;
    protected store:IPageStore;
    protected state:IPageState;
    protected options:IPageControllerOptions;
    protected page:Page;
    protected controllerInstance:PageController;
    protected eventEmitter:EventEmitter2;
    protected _config(page:Page){
        this.name = page.name;
        this.page = page;
        this.options = page.options;
        this.eventEmitter = this.page.eventEmitter;
    }
    protected _init(){
        this.store = {
            privateData:{},
            publicData:{}
        };
        this.state = {
            visited:false,
            completed:false
        };
    }
    protected _trigger(){

    }
    public on(){

    }
    public off(){

    }
}