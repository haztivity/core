/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector,Injectable,InjectorClass} from "../di";
import {EventEmitterFactory,IEventEmitterFactoryCreate} from "../utils"
export interface IScoOptions{

}
EventEmitterFactory;
@Injectable({
    dependencies:[
        "Injector",
        "EventEmitterFactory"
    ]
})
export class Sco {
    public static EVENTS = {
        "navigator:lastPage":"",
        "sco:end":"sco:end"
    };
    protected PageManager;
    protected Injector:InjectorClass;
    protected Navigator;
    protected ComponentManager;
    protected eventHandler;
    protected EventEmitterFactory:EventEmitterFactory;
    protected options: IScoOptions;
    constructor(...dependencies){
        debugger;
    }
    protected setOptions(options){
        this.options = options;
    }
    protected init(){

    }
    public run(){

    }
    public on(){

    }
}