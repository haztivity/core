/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseHaztivity} from "../base";
import {Injector,Inject,InjectorClass} from "../di";
import {EventEmitterFactory,IEventEmitterFactoryCreate} from "../utils"
export interface IScoOptions{

}
@Inject({
    dependencies:[
        "EventEmitterFactory"
    ]
})
export class Sco extends BaseHaztivity{
    public static EVENTS = {
        "navigator:lastPage":"",
        "sco:end":"sco:end"
    };
    protected PageManager;
    protected Injector:InjectorClass;
    protected Navigator;
    protected ComponentManager;
    protected eventHandler:EventEmitter2;
    protected EventEmitterFactory:EventEmitterFactory;
    protected options: IScoOptions;
    constructor(...dependencies){
        super(...dependencies);
    }
    protected setOptions(options){
        this.options = options;
    }
    protected init(){
        this.eventHandler=this.EventEmitterFactory.create();
    }
    public run(){

    }
    public on(){

    }
}