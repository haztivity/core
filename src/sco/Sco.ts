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
    //factory:(args,dependencies)=>{
    //    //args[0] == options
    //    return new Sco(args[0],...dependencies);
    //}
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
    protected eventEmitter:EventEmitter2;
    protected EventEmitterFactory:EventEmitterFactory;
    protected options: IScoOptions;
    protected _init(){
        this.eventEmitter=this.EventEmitterFactory.instance();
    }
    protected _config(options){
        this.options = options;
    }
    public run(){
    }
    public on(){

    }
}