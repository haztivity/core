/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */

import * as jqDI from "./jquery";
jqDI;//Typescript doesn't import the module if isn't used
export {IInjectorService,
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
        IResourceParams} from "./di";
export {EventEmitter,EventEmitterFactory} from "./utils";
export {ScoFactory,ISco,IScoOptions,ScoController} from "./sco";
export {PageController,Page,IPageOptions,PageFactory} from "./page";
export {ResourceController} from "./resource";