/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {IPage,Page,PageManager} from "../page";
EventEmitterFactory;
export interface ISco{
    on():void;
    run():void;
}
export interface IScoOptions{
    name:string;
    pages:Page[]|IPage[];
    components:Component[];
}
@Sco({
    name:"ScoController",
    dependencies:[
        "PageManager",
        "EventEmitterFactory"
    ]
})
export class ScoController implements ISco{
    protected eventEmitter:EventEmitter2;
    protected options:IScoOptions;
    constructor (protected PageManager:PageManager,protected EventEmitterFactory:EventEmitterFactory){
        this.eventEmitter = EventEmitterFactory.createEmitter();
    }
    public activate(options:IScoOptions):ScoController{
        this.options = options;
        return this;
    }
    public on():ScoController{
        return this;
    }
    public run():ScoController{
        this.PageManager.addPages(this.options.pages);
        return this;
    }
}