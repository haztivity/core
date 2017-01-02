/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */

import * as jqDI from "./jqueryDI";
jqDI;//Typescript doesn't import the module if isn't used
export {Core,ICoreParams,Service,IServiceParams,ServiceInstance,IServiceInstanceParams,Module,IModuleParams} from "./di";
export {ICreateEventEmitterOptions} from "./utils";
export {ScoFactory,ISco,IScoConfig,ScoController} from "./sco";