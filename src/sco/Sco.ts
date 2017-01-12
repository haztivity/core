/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter,EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {Page,PageManager} from "../page";
import {Navigator} from "../navigator";
import {HaztivityAppContextNotFound,HaztivityPagesContextNotFound} from "./Errors";
import {ResourceManager} from "../resource";
import {ComponentManager,ComponentInitializer} from "../component";
import {ComponentController} from "../component/ComponentController";
export interface ISco{
    on():void;
    run():void;
}
export interface IScoOptions{
    name:string;
    pages:Page[];
    components?:ComponentController[];
}
@Sco({
    name:"ScoController",
    dependencies:[
        Navigator,
        PageManager,
        ResourceManager,
        EventEmitterFactory,
        ComponentManager,
        ComponentInitializer
    ]
})
export class ScoController implements ISco{
    public static readonly CLASS_CONTEXT="hz-container";
    public static readonly CLASS_PAGES="hz-pages-container";
    protected eventEmitter:EventEmitter;
    protected options:IScoOptions;
    protected $context:JQuery;
    protected $pagesContainer:JQuery;
    constructor (protected Navigator:Navigator,
                 protected PageManager:PageManager,
                 protected ResourceManager:ResourceManager,
                 protected EventEmitterFactory:EventEmitterFactory,
                 protected ComponentManager:ComponentManager,
                 protected ComponentInitializer:ComponentInitializer){
        this.eventEmitter = EventEmitterFactory.createEmitter();
    }
    public activate(options:IScoOptions):ScoController{
        this.options = options;
        this.ComponentManager.addAll(this.options.components||[]);
        this.PageManager.addPages(this.options.pages);
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
        this.Navigator.activate(this.$pagesContainer);
        this.$pagesContainer.addClass(ScoController.CLASS_PAGES);
        this.ComponentInitializer.initialize(this.$context);
        //init components
        this.Navigator.goTo(0);
        return this;
    }
}