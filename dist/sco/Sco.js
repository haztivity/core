"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var utils_1 = require("../utils");
var di_1 = require("../di");
var page_1 = require("../page");
var navigator_1 = require("../navigator");
var Errors_1 = require("./Errors");
var resource_1 = require("../resource");
var component_1 = require("../component");
var jquery_1 = require("../jquery");
var PageController_1 = require("../page/PageController");
var ScormService_1 = require("../scorm/ScormService");
var ScoController = /** @class */ (function () {
    function ScoController(_Navigator, _PageManager, _ResourceManager, _EventEmitterFactory, _ComponentManager, _ComponentInitializer, _$, _scormService) {
        this._Navigator = _Navigator;
        this._PageManager = _PageManager;
        this._ResourceManager = _ResourceManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._ComponentManager = _ComponentManager;
        this._ComponentInitializer = _ComponentInitializer;
        this._$ = _$;
        this._scormService = _scormService;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }
    ScoController_1 = ScoController;
    ScoController.prototype.activate = function (options) {
        this._options = options;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        this._restorePagesState();
        return this;
    };
    ScoController.prototype.on = function () {
        this._eventEmitter.globalEmitter.on.apply(this, arguments);
        return this;
    };
    ScoController.prototype._init = function () {
        this._$context = this._$("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.prepend(this._options.template);
            this._$context.addClass(ScoController_1.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            this._$exit = this._$context.find("[data-hz-on-exit]");
            this._$exit.detach();
            this._eventEmitter.globalEmitter.on(PageController_1.PageController.ON_COMPLETE_CHANGE, { instance: this }, this._onPageStateChange);
            this._eventEmitter.globalEmitter.on(PageController_1.PageController.ON_SHOWN, { instance: this }, this._onPageShown);
            this._scormService.doLMSInitialize();
            //page contexts must exists
            if (this._$pagesContainer.length > 0) {
                return true;
            }
            else {
                throw new Errors_1.HaztivityPagesContextNotFound();
            }
        }
        else {
            throw new Errors_1.HaztivityAppContextNotFound();
        }
    };
    ScoController.prototype._onPageShown = function (e, $page, $oldPage, oldPageRelativePosition, pageController) {
        var instance = e.data.instance;
        if (instance._scormService.LMSIsInitialized()) {
            instance._scormService.doLMSSetValue("cmi.core.lesson_location", pageController.options.name);
            instance._scormService.doLMSCommit();
        }
    };
    ScoController.prototype._getCurrentPage = function () {
        var result = null;
        if (this._scormService.LMSIsInitialized()) {
            var page = this._scormService.doLMSGetValue("cmi.core.lesson_location");
            if (!!page) {
                result = page;
            }
        }
        return result;
    };
    ScoController.prototype._restorePagesState = function () {
        if (this._scormService.LMSIsInitialized()) {
            var count = this._scormService.doLMSGetValue("cmi.objectives._count"), lessonStatus = this._scormService.doLMSGetValue("cmi.core.lesson_status");
            if (lessonStatus == "not attempted") {
                this._scormService.doLMSSetValue("cmi.core.lesson_status", "incomplete");
                this._scormService.doLMSCommit();
            }
            if (count != undefined) {
                for (var currentCount = 0; currentCount < count; currentCount++) {
                    var currentKey = "cmi.objectives." + currentCount, id = this._scormService.doLMSGetValue(currentKey + ".id"), page = this._PageManager.getPageByName(id);
                    if (page != undefined) {
                        var scormState = this._scormService.doLMSGetValue(currentKey + ".status"), scormScore = parseFloat(this._scormService.doLMSGetValue(currentKey + ".score.raw")), pageState = page.getState();
                        pageState.completed = scormState == "completed";
                        pageState.score = !isNaN(scormScore) ? scormScore : null;
                        pageState.visited = true;
                        page.setState(pageState);
                    }
                }
            }
        }
    };
    ScoController.prototype._getSuspendData = function () {
        var result;
        if (this._scormService.LMSIsInitialized()) {
            var data = this._scormService.doLMSGetValue("cmi.suspend_data");
            if (!!data) {
                try {
                    result = JSON.parse(data);
                }
                catch (e) {
                    result = {};
                    console.error("[ScoController] Failed getting suspend data:", e.message);
                }
            }
            else {
                result = {};
            }
        }
        return result;
    };
    ScoController.prototype._setSuspendData = function (data, commit) {
        if (commit === void 0) { commit = true; }
        var result = false;
        if (this._scormService.LMSIsInitialized()) {
            try {
                var parsed = JSON.stringify(data);
                this._scormService.doLMSSetValue("cmi.suspend_data", parsed);
                if (commit) {
                    this._scormService.doLMSCommit();
                }
                result = true;
            }
            catch (e) {
                console.error("[ScoController] Failed setting suspend data:", e.message);
            }
        }
        return result;
    };
    ScoController.prototype._onPageStateChange = function (e, result, $page, pageController) {
        var instance = e.data.instance;
        var total = instance._PageManager.count(), completed = instance._PageManager.getCompleted();
        if (instance._scormService.LMSIsInitialized()) {
            var count = parseInt(instance._scormService.doLMSGetValue("cmi.objectives._count")), key = "cmi.objectives." + count, progress = instance._Navigator.getProgressPercentage();
            instance._scormService.doLMSSetValue(key + ".id", pageController.options.name);
            instance._scormService.doLMSSetValue(key + ".status", "completed");
            if (pageController.state.score != undefined) {
                instance._scormService.doLMSSetValue(key + ".score.raw", pageController.state.score);
            }
            if (instance._options.progressAsScore) {
                instance._scormService.doLMSSetValue("cmi.core.score.raw", progress);
            }
            try {
                var suspendData = instance._getSuspendData();
                suspendData["%progress"] = progress;
                instance._setSuspendData(suspendData, false);
            }
            catch (e) {
                console.error("[ScoController] Fail updating suspend data", e.message);
            }
            if (completed.length == total) {
                var score = 0.0, hasScore = 0;
                for (var pageIndex = 0, completedLength = completed.length; pageIndex < completedLength; pageIndex++) {
                    var page = instance._PageManager.getPage(completed[pageIndex]), pageScore = page.getState().score;
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
    };
    ScoController.prototype.exit = function () {
        this._eventEmitter.globalEmitter.trigger(ScoController_1.ON_BEFORE_EXIT);
        if (this._scormService.LMSIsInitialized()) {
            // enviamos un exit
            this._scormService.doLMSSetValue("cmi.core.exit", "");
            //los tiempos
            var sessionTime = this.getSessionTime();
            this._scormService.doLMSSetValue("cmi.core.session_time", sessionTime);
            this._scormService.doLMSCommit();
            this._scormService.doLMSFinish();
        }
        this._$context.empty();
        if (this._$exit && this._$exit.length > 0) {
            this._$context.append(this._$exit);
        }
        else if (this._options.exitMessage) {
            this._$context.text(this._options.exitMessage);
        }
        this._eventEmitter.globalEmitter.trigger(ScoController_1.ON_EXIT);
    };
    ScoController.prototype.getSessionTime = function () {
        var now = Date.now(), sessionTime = now - this._dateStart.getTime();
        var hours = Math.floor(sessionTime / (1000 * 60 * 60) % 60), minutes = Math.floor(sessionTime / (1000 * 60) % 60), seconds = Math.floor(sessionTime / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    };
    ScoController.prototype.run = function () {
        this._dateStart = new Date();
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController_1.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        var currentPage = this._getCurrentPage();
        if (!!currentPage) {
            var pageIndex = this._PageManager.getPageIndex(currentPage);
            pageIndex = pageIndex != -1 ? pageIndex : 0;
            this._Navigator.goTo(pageIndex);
        }
        else {
            this._Navigator.goTo(0);
        }
        return this;
    };
    ScoController.NAMESPACE = "sco";
    ScoController.CLASS_CONTEXT = "hz-container";
    ScoController.CLASS_PAGES = "hz-pages-container";
    ScoController.ON_EXIT = ScoController_1.NAMESPACE + ":exit";
    ScoController.ON_BEFORE_EXIT = ScoController_1.NAMESPACE + ":beforeexit";
    ScoController = ScoController_1 = __decorate([
        di_1.Sco({
            name: "ScoController",
            dependencies: [
                navigator_1.Navigator,
                page_1.PageManager,
                resource_1.ResourceManager,
                utils_1.EventEmitterFactory,
                component_1.ComponentManager,
                component_1.ComponentInitializer,
                jquery_1.$,
                ScormService_1.ScormService
            ]
        })
    ], ScoController);
    return ScoController;
    var ScoController_1;
}());
exports.ScoController = ScoController;
//# sourceMappingURL=Sco.js.map