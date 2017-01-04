/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter,EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {IPage,Page,PageManager} from "../page";
import {Navigator} from "../navigator";
export interface ISco{
    on():void;
    run():void;
}
export interface IScoOptions{
    name:string;
    pages:Page[]|IPage[];
}
@Sco({
    name:"ScoController",
    dependencies:[
        Navigator,
        PageManager,
        EventEmitterFactory
    ]
})
export class ScoController implements ISco{
    protected eventEmitter:EventEmitter;
    protected options:IScoOptions;
    protected $context:JQuery;
    constructor (protected Navigator:Navigator,protected PageManager:PageManager,protected EventEmitterFactory:EventEmitterFactory){
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
        this.$context = $("[data-hz-pages]");
        this.Navigator.activate(this.$context);
        //init components
        this.PageManager.addPages(this.options.pages);
        this.Navigator.goTo(0);
        return this;
    }
}