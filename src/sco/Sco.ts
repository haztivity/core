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
import {NavigatorService} from "../";
export interface ISco {
    on(): void;
    run(): void;
    exit():void;
}
export interface IScoOptions {
    name: string;
    template:string;
    pages: PageRegister[];
    components?: ComponentController[];
    exitMessage?:string;
    progressAsScore?:boolean;
    autoSaveTime?:number;
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
    public static readonly NAMESPACE = "sco";
    public static readonly CLASS_CONTEXT = "hz-container";
    public static readonly CLASS_PAGES = "hz-pages-container";
    public static readonly ON_EXIT = `${ScoController.NAMESPACE}:exit`;
    public static readonly ON_BEFORE_EXIT = `${ScoController.NAMESPACE}:beforeexit`;
    protected _eventEmitter: EventEmitter;
    protected _options: IScoOptions;
    protected _$context: JQuery;
    protected _$pagesContainer: JQuery;
    protected _$exit:JQuery;
    protected _dateStart:Date;
    protected _totalTime:number;
    protected _intervalTotalTime;
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
        this._scormService.doLMSInitialize();
        this._options = options;
        this._options.autoSaveTime = this._options.autoSaveTime || 10;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        this._restorePagesState();
        return this;
    }

    public on(): ScoController {
        this._eventEmitter.globalEmitter.on.apply(this,arguments);
        return this;
    }

    protected _init() {
        this._$context = this._$("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.prepend(this._options.template);
            this._$context.addClass(ScoController.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            this._$exit = this._$context.find("[data-hz-on-exit]");
            this._$exit.detach();
            this._eventEmitter.globalEmitter.on(PageController.ON_COMPLETE_CHANGE,{instance:this},this._onPageStateChange);
            this._eventEmitter.globalEmitter.on(PageController.ON_SHOWN,{instance:this},this._onPageShown);

            this._startAutoSaveTotalTime();
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
    protected _stopAutoSaveTotalTime(){
        if(this._intervalTotalTime){
            clearInterval(this._intervalTotalTime);
        }
    }
    protected _startAutoSaveTotalTime(){
        this._stopAutoSaveTotalTime();
        let that = this;
        this._intervalTotalTime = setInterval(function(){
            that._saveTotalTime();
        },this._options.autoSaveTime * 60000);
    }
    protected _saveTotalTime(commit=true,suspendData?){
        if(!suspendData) {
            suspendData = this._scormService.getSuspendData();
        }
        suspendData["%time"] = this.getTotalTimeFormatted(true);
        this._scormService.setSuspendData(suspendData,commit);
    }
    protected _onPageShown(e,$page, $oldPage, oldPageRelativePosition, pageController:PageController){
        let instance = e.data.instance;
        if(instance._scormService.LMSIsInitialized()){
            instance._scormService.doLMSSetValue(`cmi.core.lesson_location`,pageController.options.name);
            instance._scormService.doLMSCommit();
        }
    }
    protected _getCurrentPage(){
        let result = null;
        if(this._scormService.LMSIsInitialized()) {
            let page = this._scormService.doLMSGetValue(`cmi.core.lesson_location`);
            if(!!page){
                result = page;
            }
        }
        return result;
    }
    protected _restorePagesState(){
        if(this._scormService.LMSIsInitialized()) {
            let count = this._scormService.doLMSGetValue("cmi.objectives._count"),
                lessonStatus = this._scormService.doLMSGetValue("cmi.core.lesson_status");
            if(lessonStatus == "not attempted"){
                this._scormService.doLMSSetValue("cmi.core.lesson_status","incomplete");
                this._scormService.doLMSCommit();
                this._totalTime = 0;
            }else{
                let totalTime = this._scormService.doLMSGetValue("cmi.core.total_time"),
                    times = totalTime.split(":");
                let time = (parseInt(times[0])*3600000)+(parseInt(times[1])*60000)+(parseInt(times[2])*1000);
                let suspendDataTime = (this._scormService.getSuspendData()["%time"]||"").split(":");
                suspendDataTime =  (parseInt(suspendDataTime[0])*3600000)+(parseInt(suspendDataTime[1])*60000)+(parseInt(suspendDataTime[2])*1000);
                this._totalTime = suspendDataTime > time ? suspendDataTime : time;
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
                        pageState.visited = true;
                        page.setState(pageState);
                    }
                }
            }
        }else{
            this._totalTime = 0;
        }
    }
    protected _onPageStateChange(e,result,$page,pageController:PageController){
        let instance:ScoController = e.data.instance;
        let total = instance._PageManager.count(),
            completed = instance._PageManager.getCompleted();
        if(instance._scormService.LMSIsInitialized()) {
            let count = parseInt(instance._scormService.doLMSGetValue("cmi.objectives._count")),
                key = `cmi.objectives.${count}`,
                progress = instance._Navigator.getProgressPercentage();
            instance._scormService.doLMSSetValue(`${key}.id`, pageController.options.name);
            instance._scormService.doLMSSetValue(`${key}.status`, "completed");
            if(pageController.state.score != undefined) {
                instance._scormService.doLMSSetValue(`${key}.score.raw`, pageController.state.score);
            }
            if(instance._options.progressAsScore){
                instance._scormService.doLMSSetValue("cmi.core.score.raw",progress);
            }
            try{
                let suspendData = instance._scormService.getSuspendData();
                suspendData["%progress"] = progress;
                instance._saveTotalTime(false,suspendData);
                instance._scormService.setSuspendData(suspendData,false);
            }catch(e){
                console.error("[ScoController] Fail updating suspend data",e.message);
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
                //instance._scormService.doLMSSetValue("cmi.core.score.raw", (score*100)/(hasScore*100));
                instance._scormService.doLMSSetValue("cmi.core.lesson_status", "completed");
            }
            instance._scormService.doLMSCommit();
        }
    }
    public exit(){
        this._eventEmitter.globalEmitter.trigger(ScoController.ON_BEFORE_EXIT);
        if(this._scormService.LMSIsInitialized()){
            // enviamos un exit
            this._scormService.doLMSSetValue("cmi.core.exit","");
            //los tiempos
            const sessionTime = this.getSessionTimeFormatted();
            this._scormService.doLMSSetValue( "cmi.core.session_time", sessionTime );
            this._saveTotalTime(false);
            this._stopAutoSaveTotalTime();
            this._scormService.doLMSCommit();
            this._scormService.doLMSFinish();
        }
        this._$context.empty();
        if(this._$exit && this._$exit.length > 0){
            this._$context.append(this._$exit);
        }else if(this._options.exitMessage){
            this._$context.text(this._options.exitMessage);
        }
        this._eventEmitter.globalEmitter.trigger(ScoController.ON_EXIT);
    }
    public getDateStart():Date{
        return new Date(this._dateStart.getTime());
    }
    public getSessionTime():number{
        const now = Date.now(),
            sessionTime = now - this.getDateStart().getTime();
        return sessionTime;
    }
    public getTotalTime(includeSession:boolean = true):number{
        return (this._totalTime || 0) + (includeSession ? this.getSessionTime() || 0 : 0);
    }
    public getTotalTimeFormatted(includeSession:boolean = true):string{
        const totalTime = this.getTotalTime(includeSession);
        let hours:any = Math.floor(totalTime / (1000 * 60 * 60) % 60),
            minutes:any = Math.floor(totalTime / (1000 * 60) % 60),
            seconds:any = Math.floor(totalTime / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':'+ minutes + ':' + seconds;
    }
    public getSessionTimeFormatted(){
        const sessionTime = this.getSessionTime();
        let hours:any = Math.floor(sessionTime / (1000 * 60 * 60) % 60),
            minutes:any = Math.floor(sessionTime / (1000 * 60) % 60),
            seconds:any = Math.floor(sessionTime / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':'+ minutes + ':' + seconds;
    }
    public run(): ScoController {
        this._dateStart = new Date();
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        const currentPage = this._getCurrentPage();
        if (!!currentPage) {
            var pageIndex = this._PageManager.getPageIndex(currentPage);
            pageIndex = pageIndex != -1 ? pageIndex : 0;
            this._Navigator.goTo(pageIndex);
        }else {
            this._Navigator.goTo(0);
        }
        return this;
    }
}