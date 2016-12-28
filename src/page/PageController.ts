/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Inject,InjectorClass} from "../di";
import {BaseHaztivity} from "../base";
import {EventEmitterFactory} from "../utils";
export interface IPageControllerOptions{

}

export class PageController extends BaseHaztivity{
    protected $element:JQuery;
    protected $context:JQuery;
    protected ResourceManager;
    protected Injector:InjectorClass;
    protected Navigator;
    protected options:IPageControllerOptions;
    protected store;
    protected EventEmitterFactory:EventEmitterFactory;
    protected eventEmitter:EventEmitter2;
    constructor(...dependencies){
        super(...dependencies);
    }
    protected _config(options:IPageControllerOptions){

    }
    protected _init(){
        this.eventEmitter = this.EventEmitterFactory.instance();
    }
    public isCompleted(){
    }
    public render():JQuery{

    }
    protected _show($currentPage:JQuery,currentPagePosition:PagePosition):JQueryPromise{

    }
    protected _getStore(){
        return this.store;
    }
    public getData(){
        return this.store.public;
    }
}