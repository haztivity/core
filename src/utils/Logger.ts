import * as loglevel from "loglevel";
import {Injector} from "../Injector";
//Create log
let log = loglevel.getLogger("haztivity-core");
//Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
let originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    let rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (name,...messages) {
        messages.unshift(`[${methodName.toUpperCase()}] ${name} - `);
        rawMethod.apply(undefined,messages);
    };
};
log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
//Register in injector
Injector.factory("Logger",(container)=>{
    //Get config and apply log config
    let config = container.config;
    if(config.log && config.log.level){
        log.setLevel(log.levels[config.log.level]);
    }
    return log;
});
export default log;