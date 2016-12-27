import * as core from 'core-js/shim';
core;
import {Injector} from "./Injector";
import * as defaultConfig from "./haztivity.config.json!json";
import $ from "jquery";

let resultConfig;
//merge default config with provided config
if(typeof config != "undefined"){
    resultConfig = $.extend(true,defaultConfig,config);
}else{
    resultConfig = defaultConfig;
}
//Register config to be injectable
Injector.constant("config",resultConfig);
//Export core
export * from "./Injector";
export * from "./utils/Logger";
