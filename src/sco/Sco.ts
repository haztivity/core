/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter, EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {PageRegister, PageManager} from "../page";
import {Navigator} from "../navigator";
import {HaztivityAppContextNotFound, HaztivityPagesContextNotFound} from "./Errors";
import {ResourceManager} from "../resource";
import {ComponentManager, ComponentInitializer} from "../component";
import {ComponentController} from "../component/ComponentController";
import {$} from "../jquery";
import {INavigatorPageData} from "../navigator/Navigator";
import {PageController} from "../page/PageController";
import {ScormService} from "../scorm/ScormService";
export interface ISco {
    on(): void;
    run(): void;
}
export interface IScoOptions {
    name: string;
    template:string;
    pages: PageRegister[];
    components?: ComponentController[];
}
@Sco(
    {
        name: "ScoController",
        dependencies: [
            Navigator,
            PageManager,
            ResourceManager,
            EventEmitterFactory,
            ComponentManager,
            ComponentInitializer,
            $,
            ScormService
        ]
    }
)
export class ScoController implements ISco {
    public static readonly CLASS_CONTEXT = "hz-container";
    public static readonly CLASS_PAGES = "hz-pages-container";
    protected _eventEmitter: EventEmitter;
    protected _options: IScoOptions;
    protected _$context: JQuery;
    protected _$pagesContainer: JQuery;
    constructor(protected _Navigator: Navigator,
                protected _PageManager: PageManager,
                protected _ResourceManager: ResourceManager,
                protected _EventEmitterFactory: EventEmitterFactory,
                protected _ComponentManager: ComponentManager,
                protected _ComponentInitializer: ComponentInitializer,
                protected _$: JQueryStatic,
                protected _scormService:ScormService) {
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }

    public activate(options: IScoOptions): ScoController {
        this._options = options;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        this._restorePagesState();
        return this;
    }

    public on(): ScoController {
        return this;
    }

    protected _init() {
        this._$context = this._$("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.prepend(this._options.template);
            this._$context.addClass(ScoController.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            this._eventEmitter.globalEmitter.on(PageController.ON_COMPLETE_CHANGE,{instance:this},this._onPageStateChange);
            this._eventEmitter.globalEmitter.on(PageController.ON_SHOWN,{instance:this},this._onPageShown);
            //page contexts must exists
            if (this._$pagesContainer.length > 0) {
                return true;
            } else {
                throw new HaztivityPagesContextNotFound();
            }
        } else {
            throw new HaztivityAppContextNotFound();
        }
    }
    protected _onPageShown(e,$page, $oldPage, oldPageRelativePosition, pageController:PageController){
        let instance = e.data.instance;
        if(instance._scormService.LMSIsInitialized()){
            instance._scormService.doLMSSetValue(`cmi.core.lesson_location`,pageController.options.name);
            instance._scormService.doLMSCommit();
        }
    }
    protected _restorePagesState(){
        this._scormService.doLMSInitialize();
        if(this._scormService.LMSIsInitialized()) {
            let count = this._scormService.doLMSGetValue("cmi.objectives._count"),
                lessonStatus = this._scormService.doLMSGetValue("cmi.core.lesson_status");
            if(lessonStatus == "not attempted"){
                this._scormService.doLMSSetValue("cmi.core.lesson_status","incomplete");
                this._scormService.doLMSCommit();
            }
            if (count != undefined) {
                for (let currentCount = 0; currentCount < count; currentCount++) {
                    let currentKey = `cmi.objectives.${currentCount}`,
                        id = this._scormService.doLMSGetValue(currentKey + ".id"),
                        page = this._PageManager.getPageByName(id);
                    if (page != undefined) {
                        let scormState = this._scormService.doLMSGetValue(currentKey + ".status"),
                            scormScore = parseFloat(this._scormService.doLMSGetValue(currentKey + ".score.raw")),
                            pageState = page.getState();
                        pageState.completed = scormState == "completed";
                        pageState.score = !isNaN(scormScore) ? scormScore : null;
                        page.setState(pageState);
                    }
                }
            }
        }
    }
    protected _onPageStateChange(e,result,$page,pageController:PageController){
        let instance:ScoController = e.data.instance;
        let total = instance._PageManager.count(),
            completed = instance._PageManager.getCompleted();
        if(instance._scormService.LMSIsInitialized()) {
            let count = parseInt(instance._scormService.doLMSGetValue("cmi.objectives._count")),
                key = `cmi.objectives.${count}`;
            instance._scormService.doLMSSetValue(`${key}.id`, pageController.options.name);
            instance._scormService.doLMSSetValue(`${key}.status`, "completed");
            if(pageController.state.score != undefined) {
                instance._scormService.doLMSSetValue(`${key}.score.raw`, pageController.state.score);
            }

            if (completed.length == total) {
                let score = 0.0,
                    hasScore =0;
                for (let pageIndex = 0, completedLength = completed.length; pageIndex < completedLength; pageIndex++) {
                    let page = instance._PageManager.getPage(<number>completed[pageIndex]),
                        pageScore = page.getState().score;
                    if (pageScore != undefined) {
                        hasScore++;
                        score += pageScore;
                    }
                }
                instance._scormService.doLMSSetValue("cmi.core.score.raw", (score*100)/(hasScore*100));
                instance._scormService.doLMSSetValue("cmi.core.lesson_status", "completed");
            }
            instance._scormService.doLMSCommit();
        }
    }
    public run(): ScoController {
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        this._Navigator.goTo(0);
        return this;
    }
}