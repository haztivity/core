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
var di_1 = require("../di");
var Logger_1 = require("./Logger");
var navigator_1 = require("../navigator");
var EventEmitterFactory_1 = require("../utils/EventEmitterFactory");
var PageManager_1 = require("../page/PageManager");
var DevTools = (function () {
    /**
     * Tools for development
     */
    function DevTools(_logger, _navigator, _pageManager, _eventEmitterFactory) {
        this._logger = _logger;
        this._navigator = _navigator;
        this._pageManager = _pageManager;
        this._eventEmitterFactory = _eventEmitterFactory;
        this._isEnabled = false;
    }
    /**
     * Enables development mode.
     */
    DevTools.prototype.enable = function () {
        if (!this.isEnabled()) {
            this._isEnabled = true;
            this._navigator.enableDev();
            this._currentLoggerLevel = this._logger.getLevel();
            this._logger.setLevel(this._logger.levels.TRACE);
            this._logger.warn("DevTools", "Development mode enabled. Log level set to TRACE");
        }
    };
    /**
     * Disables development mode
     */
    DevTools.prototype.disable = function () {
        if (this.isEnabled()) {
            this._isEnabled = false;
            this._navigator.disableDev();
            this._logger.setLevel(this._currentLoggerLevel);
            this._currentLoggerLevel = null;
            this._logger.warn("DevTools", "Development mode disabled. Log level restored");
        }
    };
    /**
     * Return if the development mode is enabled
     * @returns {boolean}
     */
    DevTools.prototype.isEnabled = function () {
        return this._isEnabled;
    };
    /**
     * Force to go to a specific page
     * @param index
     */
    DevTools.prototype.goToPage = function (index) {
        if (this.isEnabled()) {
            this._navigator.goTo(index);
        }
    };
    /**
     * Force to go to a specific page by name
     * @param name
     */
    DevTools.prototype.goToPageByName = function (name) {
        if (this.isEnabled()) {
            var pageIndex = this._pageManager.getPageIndex(name);
            this._navigator.goTo(pageIndex);
        }
    };
    /**
     * Force to go to the next page
     * @returns {string}
     */
    DevTools.prototype.goToNextPage = function () {
        if (this.isEnabled()) {
            return this._navigator.next();
        }
    };
    /**
     * Force to go to the prev page
     * @returns {string}
     */
    DevTools.prototype.goToPrevPage = function () {
        if (this.isEnabled()) {
            return this._navigator.prev();
        }
    };
    /**
     * Get the name of the current page
     * @returns {string}
     */
    DevTools.prototype.getCurrentPageName = function () {
        if (this.isEnabled()) {
            return this._navigator.getCurrentPage().getPageName();
        }
    };
    /**
     * Create an event emitter
     */
    DevTools.prototype.createEventEmitter = function () {
        if (this.isEnabled()) {
            return this._eventEmitterFactory.create();
        }
    };
    DevTools = __decorate([
        di_1.Module({
            name: "DevTools",
            dependencies: [
                Logger_1.Logger,
                navigator_1.Navigator,
                PageManager_1.PageManager,
                EventEmitterFactory_1.EventEmitterFactory
            ]
        })
    ], DevTools);
    return DevTools;
}());
exports.DevTools = DevTools;
//# sourceMappingURL=DevTools.js.map