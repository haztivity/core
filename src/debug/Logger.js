(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "loglevel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var loglevel = require("loglevel");
    //Create log
    var log = loglevel.getLogger("haztivity-core");
    exports.Logger = log;
    //Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
    var originalFactory = log.methodFactory;
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
});
//# sourceMappingURL=Logger.js.map