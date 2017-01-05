/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter,EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {Page,PageManager} from "../page";
import {Navigator} from "../navigator";
import {HaztivityAppContextNotFound,HaztivityPagesContextNotFound} from "./Errors";
export interface ISco{
    on():void;
    run():void;
}
export interface IScoOptions{
    name:string;
    pages:Page[];
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
    public static readonly CLASS_CONTEXT="hz-container";
    public static readonly CLASS_PAGES="hz-pages-container";
    protected eventEmitter:EventEmitter;
    protected options:IScoOptions;
    protected $context:JQuery;
    protected $pagesContainer:JQuery;
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
    protected _init(){
        this.$context = $("[data-hz-app]");
        //context must exists
        if(this.$context.length > 0) {
            this.$context.addClass(ScoController.CLASS_CONTEXT);
            this.$pagesContainer = this.$context.find("[data-hz-pages]");
            //page contexts must exists
            if(this.$pagesContainer.length > 0) {
                return true;
            }else{
                throw new HaztivityPagesContextNotFound();
            }
        }else{
            throw new HaztivityAppContextNotFound();
        }
    }
    public run():ScoController{
        this._init();
        this.$pagesContainer.addClass(ScoController.CLASS_PAGES);
        this.Navigator.activate(this.$pagesContainer);
        //init components
        this.PageManager.addPages(this.options.pages);
        this.Navigator.goTo(0);
        return this;
    }
}