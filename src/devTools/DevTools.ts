/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Module} from "../di";
import {Logger} from "./Logger";
import {Navigator} from "../navigator";
import {EventEmitterFactory} from "../utils/EventEmitterFactory";
import {EventEmitter} from "../utils/EventEmitter";
import {PageManager} from "../page/PageManager";
@Module(
    {
        name:"DevTools",
        dependencies:[
            Logger,
            Navigator,
            PageManager,
            EventEmitterFactory
        ]
    }
)
export class DevTools {
    protected _isEnabled=false;
    protected _currentLoggerLevel:number;
    /**
     * Tools for development
     */
    constructor(protected _logger, protected _navigator:Navigator, protected _pageManager:PageManager, protected _eventEmitterFactory){
        
    }

    /**
     * Enables development mode.
     */
    public enable(){
        if(!this.isEnabled()) {
            this._isEnabled = true;
            this._navigator.enableDev();
            this._currentLoggerLevel = this._logger.getLevel();
            this._logger.setLevel(this._logger.levels.TRACE);
            this._logger.warn("DevTools", "Development mode enabled. Log level set to TRACE");
        }
    }

    /**
     * Disables development mode
     */
    public disable(){
        if(this.isEnabled()) {
            this._isEnabled = false;
            this._navigator.disableDev();
            this._logger.setLevel(this._currentLoggerLevel);
            this._currentLoggerLevel = null;
            this._logger.warn("DevTools", "Development mode disabled. Log level restored");
        }
    }

    /**
     * Return if the development mode is enabled
     * @returns {boolean}
     */
    public isEnabled(){
        return this._isEnabled;
    }

    /**
     * Force to go to a specific page
     * @param index
     */
    public goToPage(index){
        if(this.isEnabled()) {
            this._navigator.goTo(index);
        }
    }
    /**
     * Force to go to a specific page by name
     * @param name
     */
    public goToPageByName(name){
        if(this.isEnabled()) {
            let pageIndex = this._pageManager.getPageIndex(name);
            this._navigator.goTo(pageIndex);
        }
    }
    /**
     * Force to go to the next page
     * @returns {string}
     */
    public goToNextPage(){
        if(this.isEnabled()){
            return this._navigator.next();
        }
    }
    /**
     * Force to go to the prev page
     * @returns {string}
     */
    public goToPrevPage(){
        if(this.isEnabled()){
            return this._navigator.prev();
        }
    }
    /**
     * Get the name of the current page
     * @returns {string}
     */
    public getCurrentPageName(){
        if(this.isEnabled()){
            return this._navigator.getCurrentPage().getPageName();
        }
    }

    /**
     * Create an event emitter
     */
    public createEventEmitter():EventEmitter{
        if(this.isEnabled()) {
            return this._eventEmitterFactory.create();
        }
    }
}
