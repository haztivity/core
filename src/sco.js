System.register(["./sco/Errors", "./sco/Sco", "./sco/ScoFactory"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "ScoController": true,
        "ScoFactory": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (Errors_1_1) {
                exportStar_1(Errors_1_1);
            },
            function (Sco_1_1) {
                exports_1({
                    "ScoController": Sco_1_1["ScoController"]
                });
            },
            function (ScoFactory_1_1) {
                exports_1({
                    "ScoFactory": ScoFactory_1_1["ScoFactory"]
                });
            }
        ],
        execute: function () {
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28uanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4vc2NvL0Vycm9yc1wiLCBcIi4vc2NvL1Njb1wiLCBcIi4vc2NvL1Njb0ZhY3RvcnlcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBleHBvcnRlZE5hbWVzXzEgPSB7XG4gICAgICAgIFwiU2NvQ29udHJvbGxlclwiOiB0cnVlLFxuICAgICAgICBcIlNjb0ZhY3RvcnlcIjogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXhwb3J0U3Rhcl8xKG0pIHtcbiAgICAgICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgbiBpbiBtKSB7XG4gICAgICAgICAgICBpZiAobiAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydGVkTmFtZXNfMS5oYXNPd25Qcm9wZXJ0eShuKSlcbiAgICAgICAgICAgICAgICBleHBvcnRzW25dID0gbVtuXTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzXzEoZXhwb3J0cyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChFcnJvcnNfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0U3Rhcl8xKEVycm9yc18xXzEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChTY29fMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJTY29Db250cm9sbGVyXCI6IFNjb18xXzFbXCJTY29Db250cm9sbGVyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKFNjb0ZhY3RvcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJTY29GYWN0b3J5XCI6IFNjb0ZhY3RvcnlfMV8xW1wiU2NvRmFjdG9yeVwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InNjby5qcyJ9
