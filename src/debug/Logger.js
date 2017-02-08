System.register(["loglevel"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var loglevel, log, originalFactory;
    return {
        setters: [
            function (loglevel_1) {
                loglevel = loglevel_1;
            }
        ],
        execute: function () {
            //Create log
            log = loglevel.getLogger("haztivity-core");
            exports_1("Logger", log);
            //Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
            originalFactory = log.methodFactory;
            log.methodFactory = function (methodName, logLevel, loggerName) {
                var rawMethod = originalFactory(methodName, logLevel, loggerName);
                return function (name) {
                    var messages = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        messages[_i - 1] = arguments[_i];
                    }
                    messages.unshift("[" + methodName.toUpperCase() + "] " + name + " - ");
                    rawMethod.apply(undefined, messages);
                };
            };
            log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
        }
    };
});
//# sourceMappingURL=Logger.js.map