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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZWJ1Zy9Mb2dnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJsb2dsZXZlbFwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgbG9nbGV2ZWwgPSByZXF1aXJlKFwibG9nbGV2ZWxcIik7XG4gICAgLy9DcmVhdGUgbG9nXG4gICAgdmFyIGxvZyA9IGxvZ2xldmVsLmdldExvZ2dlcihcImhhenRpdml0eS1jb3JlXCIpO1xuICAgIGV4cG9ydHMuTG9nZ2VyID0gbG9nO1xuICAgIC8vTG9nIHBsdWdpbi4gUHJlcGVuZCBbTUVUSE9EX05BTUVdIENPTlRFWFQgLSBtZXNzYWdlc1xuICAgIHZhciBvcmlnaW5hbEZhY3RvcnkgPSBsb2cubWV0aG9kRmFjdG9yeTtcbiAgICBsb2cubWV0aG9kRmFjdG9yeSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBsb2dMZXZlbCwgbG9nZ2VyTmFtZSkge1xuICAgICAgICB2YXIgcmF3TWV0aG9kID0gb3JpZ2luYWxGYWN0b3J5KG1ldGhvZE5hbWUsIGxvZ0xldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlcy51bnNoaWZ0KFwiW1wiICsgbWV0aG9kTmFtZS50b1VwcGVyQ2FzZSgpICsgXCJdIFwiICsgbmFtZSArIFwiIC0gXCIpO1xuICAgICAgICAgICAgcmF3TWV0aG9kLmFwcGx5KHVuZGVmaW5lZCwgbWVzc2FnZXMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgbG9nLnNldExldmVsKGxvZy5nZXRMZXZlbCgpKTsgLy8gQmUgc3VyZSB0byBjYWxsIHNldExldmVsIG1ldGhvZCBpbiBvcmRlciB0byBhcHBseSBwbHVnaW5cbn0pO1xuIl0sImZpbGUiOiJkZWJ1Zy9Mb2dnZXIuanMifQ==
