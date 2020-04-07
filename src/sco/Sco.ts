/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter, EventEmitterFactory} from "../utils";
import {Sco,InjectorService} from "../di";
import {PageRegister, PageManager} from "../page";
import {Navigator} from "../navigator";
import {HaztivityAppContextNotFound, HaztivityPagesContextNotFound} from "./Errors";
import {ResourceManager} from "../resource";
import {ComponentManager, ComponentInitializer} from "../component";
import {ComponentController} from "../component/ComponentController";
import {$} from "../jquery";
import {
    INavigatorPageData,
    NavigationMode
} from "../navigator/Navigator";
import {PageController} from "../page/PageController";
import {ScormService} from "../scorm/ScormService";
import {NavigatorService} from "../";
import {
    DeserializeMultiplePagesData,
    DeserializePageData,
    GetPagesCountFromDeserialized,
    ScormPageData,
    SerializeMultiplePagesData
} from "../scorm/ScormPageData";

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
    averagePagesScoreAsScore?:boolean;
    useSuspendDataForPagesState?:boolean;
    totalPagesScoreAsScore?:boolean;
    cutOffMark?:number;
    escapeSuspendData?:boolean;
    navigationMode?: NavigationMode;
    canRun?(
        $:JQueryStatic,
        $context: JQuery,
        ScormService: ScormService,
        PageManager: PageManager,
        ResourceManager: ResourceManager,
        ComponentManager: ComponentManager,
        InjectorService: InjectorService
    ): boolean | JQuery.Promise<boolean>;
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
            ScormService,
            InjectorService
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
                protected _scormService:ScormService,
                protected _InjectorService:InjectorService) {
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }

    public activate(options: IScoOptions): ScoController {
        this._Navigator.setMode(options.navigationMode);
        this._scormService.escapeSuspendData = options.escapeSuspendData;
        this._options = options;
        this._scormService.doLMSInitialize();
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
            instance._scormService.doLMSSetValue(`cmi.location`,pageController.options.name);
            instance._scormService.doLMSCommit();
        }
    }
    protected _getCurrentPage(){
        let result = null;
        if(this._scormService.LMSIsInitialized()) {
            let page = this._scormService.doLMSGetValue(`cmi.location`);
            if(!!page){
                result = page;
            }
        }
        return result;
    }
    protected _getPagesCount() {
        if (!this._options.useSuspendDataForPagesState) {
            return this._scormService.doLMSGetValue("cmi.objectives._count");
        } else {
            let suspendData = this._scormService.getSuspendData();
            let rawPages = suspendData["%pages"] || "";
            return GetPagesCountFromDeserialized(rawPages);
        }
    }
    protected _getPageId(index) {
        if (!this._options.useSuspendDataForPagesState) {
            const currentKey = `cmi.objectives.${index}`;
            return this._scormService.doLMSGetValue(currentKey + ".id")
        } else {
            const pageData = this._getPageData(index);
            return pageData ? pageData.id : null;
        }
    }
    protected _setPageData(data: ScormPageData, commit = true) {
        if (!this._options.useSuspendDataForPagesState) {
            const currentKey = `cmi.objectives.${data.index}`;
            this._scormService.doLMSSetValue(currentKey + ".id", data.id);
            this._scormService.doLMSSetValue(currentKey + ".completion_status", data.status);
            if (data.status == "completed"){
                this._scormService.doLMSSetValue(currentKey + ".success_status ", "passed");
            } else {
                this._scormService.doLMSSetValue(currentKey + ".success_status ", "unknown");
            }
            if (data.score != null) {
                this._scormService.doLMSSetValue(currentKey + ".score.raw", data.score);
            }
        } else {
            let suspendData = this._scormService.getSuspendData();
            let rawPages: string = suspendData["%pages"] || "";
            let pages: ScormPageData[] = DeserializeMultiplePagesData(rawPages);
            let currentPageIndex = pages.findIndex(p => p.id == data.id);
            if (currentPageIndex != -1) {
                pages[currentPageIndex] = data;
            } else {
                pages.push(data);
            }
            suspendData["%pages"] = SerializeMultiplePagesData(pages);
            this._scormService.setSuspendData(suspendData,false);
        }
        if (commit) {
            this._scormService.doLMSCommit();
        }
    }
    protected _getPagesData(): ScormPageData[] {
        return
    }
    protected _getPageData(indexOrId) :ScormPageData {
        let pageIndex = indexOrId;
        let pageId = null;
        let result: ScormPageData = null;
        const pageIsId = (typeof indexOrId).toLowerCase() == "string";
        if (!this._options.useSuspendDataForPagesState) {
            if (pageIsId) {
                pageIndex = this._getPageIndex(indexOrId);
                pageId = indexOrId;
            } else {
                pageId = this._getPageId(indexOrId);
                pageIndex = indexOrId;
            }
            if (pageIndex != undefined) {
                const currentKey = `cmi.objectives.${pageIndex}`;
                const status = this._scormService.doLMSGetValue(currentKey + ".completion_status");
                const score = this._scormService.doLMSGetValue(currentKey + ".score.raw");
                result = {
                    id: pageId,
                    index: pageIndex,
                    status: status,
                    score: !isNaN(score) ? score : null
                }
            }
        } else {
            const suspendData = this._scormService.getSuspendData();
            const rawPages = suspendData["%pages"] || "";
            const pages = DeserializeMultiplePagesData(rawPages);
            if (pageIsId) {
                result = pages.find(p => p.id == indexOrId)
            } else {
                result = pages.find(p => p.index == indexOrId);
            }
        }
        return result;
    }
    protected _getPageIndex(pageId: string){
        let result = null;
        if(this._scormService.LMSIsInitialized()) {
            let count = this._getPagesCount()
            if (count != undefined) {
                for (let currentCount = 0; currentCount < count; currentCount++) {
                    const page = this._getPageData(currentCount);
                    if(page.id == pageId){
                        result = currentCount;
                        currentCount = count;
                    }
                }
            }
        }
        return result;
    }
    protected _restorePagesState(){
        if(this._scormService.LMSIsInitialized()) {
            let count = this._getPagesCount(),
                lessonStatus = (this._scormService.doLMSGetValue("cmi.completion_status") || "").toLowerCase();
            if(lessonStatus == "not attempted" || lessonStatus == "unknown" || !lessonStatus){
                this._scormService.doLMSSetValue("cmi.completion_status","incomplete");
                this._scormService.doLMSSetValue("cmi.score.raw",0);
                this._scormService.doLMSSetValue("cmi.success_status","unknown");
                this._scormService.doLMSCommit();
                this._totalTime = 0;
            }
            if (count != undefined) {
                let time = this._scormService.getTotalTimeAsMillis();
                let suspendDataTime = (this._scormService.getSuspendData()["%time"]||"");
                suspendDataTime =  this._scormService.parseScormTimeToMillis(suspendDataTime);
                this._totalTime = suspendDataTime > time ? suspendDataTime : time;
                for (let currentCount = 0; currentCount < count; currentCount++) {
                        const pageData = this._getPageData(currentCount);
                        if (pageData != null) {
                            const page = this._PageManager.getPageByName(pageData.id)
                            const pageState = page.getState();
                            pageState.completed = pageData.status == "completed";
                            pageState.score = pageData.score;
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
            let pageData: ScormPageData = instance._getPageData(pageController.options.name),
                progress = instance._Navigator.getProgressPercentage();
            if(pageData == null) {
                pageData = {
                    id: pageController.options.name,
                    index: instance._getPagesCount(),
                    score: null,
                    status: "incomplete"
                }
            }
            pageData.score = pageController.state.score;
            pageData.status = "completed";
            instance._setPageData(pageData, false);
            if(instance._options.progressAsScore){
                instance._scormService.doLMSSetValue("cmi.score.raw",progress);
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
                if(instance._options.averagePagesScoreAsScore) {
                    let score = 0.0,
                        hasScore = 0;
                    for (let pageIndex = 0, completedLength = completed.length; pageIndex < completedLength; pageIndex++) {
                        let page = instance._PageManager.getPage(<number>completed[pageIndex]),
                            pageScore = page.getState().score;
                        if (pageScore != undefined) {
                            hasScore++;
                            score += pageScore;
                        }
                    }
                    let finalScore = (score * 100) / (hasScore * 100);
                    instance._scormService.doLMSSetValue("cmi.score.raw", finalScore);
                    instance._scormService.doLMSSetValue("cmi.completion_status", "completed");
                    if(instance._options.cutOffMark){
                        if(finalScore >= instance._options.cutOffMark){
                            instance._scormService.doLMSSetValue("cmi.success_status", "passed");
                        }else{
                            instance._scormService.doLMSSetValue("cmi.success_status", "failed");
                        }
                    }else{
                        instance._scormService.doLMSSetValue("cmi.success_status", "passed");
                    }

                } else if (instance._options.totalPagesScoreAsScore){
                    let score = 0.0;
                    for (let pageIndex = 0, completedLength = completed.length; pageIndex < completedLength; pageIndex++) {
                        let page = instance._PageManager.getPage(<number>completed[pageIndex]),
                            pageScore = page.getState().score;
                        if (pageScore != undefined) {
                            score += pageScore;
                        }
                    }
                    instance._scormService.doLMSSetValue("cmi.score.raw", score);
                    instance._scormService.doLMSSetValue("cmi.completion_status", "completed");
                    if(instance._options.cutOffMark){
                        if(score >= instance._options.cutOffMark){
                            instance._scormService.doLMSSetValue("cmi.success_status", "passed");
                        }else{
                            instance._scormService.doLMSSetValue("cmi.success_status", "failed");
                        }
                    }else{
                        instance._scormService.doLMSSetValue("cmi.success_status", "passed");
                    }
                } else{
                    instance._scormService.doLMSSetValue("cmi.completion_status", "completed");
                    instance._scormService.doLMSSetValue("cmi.success_status", "passed");
                }
            }
            instance._scormService.doLMSCommit();
        }
    }
    public exit(){
        window.onbeforeunload = null;
        this._eventEmitter.globalEmitter.trigger(ScoController.ON_BEFORE_EXIT);
        if(this._scormService.LMSIsInitialized()){
            // enviamos un exit
            this._scormService.doLMSSetValue("cmi.exit","normal");
            // se obtiene tiempo total de todas las sesiones de suspend data
            this._saveTotalTime(false);
            const totalTimeSD = this.getTotalTime(false);
            // se obtiene tiempo total de scorm
            const totalTimeSC = this._scormService.getTotalTimeAsMillis();
            // se obtiene tiempo de la sesión actual
            let sessionTime: string | number = this.getSessionTime();
            // se guarda el que mayor sume
            if ((totalTimeSD+sessionTime) > (totalTimeSC+sessionTime)){
                // se compensan los tiempos
                sessionTime = (totalTimeSD - totalTimeSC) + sessionTime;
            }
            this._scormService.setSessionTimeAsMillis(sessionTime);
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
        return this._scormService.parseMillisToScormTime(totalTime);
    }

    public run(): ScoController {
        this._dateStart = new Date();
        window.onbeforeunload = () => {
            this.exit();
        };
        this._$context = this._$("[data-hz-app]");
        if (this._$context.length > 0) {
            let continueRun: boolean | JQuery | JQuery.Promise<boolean> | JQuery.Promise<JQuery>;
            let canRunPromise;
            if ((typeof this._options.canRun).toLowerCase() == "function") {
                continueRun = this._options.canRun(
                    this._$,
                    this._$context,
                    this._scormService,
                    this._PageManager,
                    this._ResourceManager,
                    this._ComponentManager,
                    this._InjectorService
                );
            } else {
                continueRun = true;
            }
            if ((typeof (<any>continueRun).then).toLowerCase() != "function"){
                canRunPromise = $.Deferred().resolve(continueRun).promise();
            } else {
                canRunPromise = continueRun;
            }
            canRunPromise.then((result) => {
                if (result === true) {
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
                    } else {
                        this._Navigator.goTo(0);
                    }
                }
            });
        }  else {
            throw new HaztivityAppContextNotFound();
        }
        return this;
    }
}
