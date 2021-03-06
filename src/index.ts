/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
export {$} from "./jquery";
export {Logger} from "./devTools";
export {
    InjectorService,
    IInjectorService,
    IInjectorRegisterService,
    Service,
    IServiceParams,
    ServiceInstance,
    IServiceInstanceParams,
    Module,
    IModuleParams,
    Sco,
    IScoParams,
    Dependencies,
    Page,
    IPageParams,
    Resource,
    IResourceParams,
    Component,
    IComponentParams
} from "./di";
import {Injector} from "./di/Injector";
import {Logger} from "./devTools";
Injector.getInstance().registerServiceInstance("Logger",Logger);
export {EventEmitter, EventEmitterFactory,DataOptions,S} from "./utils";
export {
    ScoFactory,
    ISco,
    IScoOptions,
    ScoController
} from "./sco";
export {
    PageController,
    PageRegister,
    IPageOptions,
    PageFactory,
    PageManager,
    GenericPageController,
    PageImplementation
} from "./page";
export {
    ResourceInitializerService,
    ResourceController,
    ResourceManager,
    ResourceSequenceFactory,
    ResourceSequence
} from "./resource";
export {
    Navigator,
    INavigatorPageData,
    NavigationMode,
    NavigatorService
} from "./navigator";
export {
    ComponentController,
    ComponentManager,
    ComponentInitializer
} from "./component";
export {ScormService} from "./scorm";
export {haztivity} from "./global";
export {DevTools} from "./devTools/DevTools";
