/// <reference types="jquery" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { EventEmitter, EventEmitterFactory } from "../utils";
import { PageRegister, PageManager } from "../page";
import { Navigator } from "../navigator";
import { ResourceManager } from "../resource";
import { ComponentManager, ComponentInitializer } from "../component";
import { ComponentController } from "../component/ComponentController";
export interface ISco {
    on(): void;
    run(): void;
}
export interface IScoOptions {
    name: string;
    pages: PageRegister[];
    components?: ComponentController[];
}
export declare class ScoController implements ISco {
    protected _Navigator: Navigator;
    protected _PageManager: PageManager;
    protected _ResourceManager: ResourceManager;
    protected _EventEmitterFactory: EventEmitterFactory;
    protected _ComponentManager: ComponentManager;
    protected _ComponentInitializer: ComponentInitializer;
    static readonly CLASS_CONTEXT: string;
    static readonly CLASS_PAGES: string;
    protected _eventEmitter: EventEmitter;
    protected _options: IScoOptions;
    protected _$context: JQuery;
    protected _$pagesContainer: JQuery;
    constructor(_Navigator: Navigator, _PageManager: PageManager, _ResourceManager: ResourceManager, _EventEmitterFactory: EventEmitterFactory, _ComponentManager: ComponentManager, _ComponentInitializer: ComponentInitializer);
    activate(options: IScoOptions): ScoController;
    on(): ScoController;
    protected _init(): boolean;
    run(): ScoController;
}
