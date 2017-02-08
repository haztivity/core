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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZWJ1Zy9Mb2dnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcImxvZ2xldmVsXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgbG9nbGV2ZWwsIGxvZywgb3JpZ2luYWxGYWN0b3J5O1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChsb2dsZXZlbF8xKSB7XG4gICAgICAgICAgICAgICAgbG9nbGV2ZWwgPSBsb2dsZXZlbF8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL0NyZWF0ZSBsb2dcbiAgICAgICAgICAgIGxvZyA9IGxvZ2xldmVsLmdldExvZ2dlcihcImhhenRpdml0eS1jb3JlXCIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiTG9nZ2VyXCIsIGxvZyk7XG4gICAgICAgICAgICAvL0xvZyBwbHVnaW4uIFByZXBlbmQgW01FVEhPRF9OQU1FXSBDT05URVhUIC0gbWVzc2FnZXNcbiAgICAgICAgICAgIG9yaWdpbmFsRmFjdG9yeSA9IGxvZy5tZXRob2RGYWN0b3J5O1xuICAgICAgICAgICAgbG9nLm1ldGhvZEZhY3RvcnkgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgbG9nTGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmF3TWV0aG9kID0gb3JpZ2luYWxGYWN0b3J5KG1ldGhvZE5hbWUsIGxvZ0xldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy51bnNoaWZ0KFwiW1wiICsgbWV0aG9kTmFtZS50b1VwcGVyQ2FzZSgpICsgXCJdIFwiICsgbmFtZSArIFwiIC0gXCIpO1xuICAgICAgICAgICAgICAgICAgICByYXdNZXRob2QuYXBwbHkodW5kZWZpbmVkLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsb2cuc2V0TGV2ZWwobG9nLmdldExldmVsKCkpOyAvLyBCZSBzdXJlIHRvIGNhbGwgc2V0TGV2ZWwgbWV0aG9kIGluIG9yZGVyIHRvIGFwcGx5IHBsdWdpblxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJkZWJ1Zy9Mb2dnZXIuanMifQ==
