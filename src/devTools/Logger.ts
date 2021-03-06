import * as loglevel from "loglevel";
//Create log
let log = loglevel.getLogger("haztivity-core");
//Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
let originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    let rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (name, ...messages) {
        messages.unshift(`[${methodName.toUpperCase()}] ${name} - `);
        rawMethod.apply(undefined, messages);
    };
};
log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
//Register in injector
export {log as Logger};
