import * as loglevel from "loglevel";
import {Injector} from "../di";
declare let loglevel:any;
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
Injector.getInstance().constant("Logger",log);
export {log as Logger};
