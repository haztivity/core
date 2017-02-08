System.register(["./di", "jquery"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            exports_1("$", jquery_1.default);
            di_1.Injector.getInstance().registerServiceInstance("$", jquery_1.default);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4vZGlcIiwgXCJqcXVlcnlcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiJFwiLCBqcXVlcnlfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGRpXzEuSW5qZWN0b3IuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlclNlcnZpY2VJbnN0YW5jZShcIiRcIiwganF1ZXJ5XzEuZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6ImpxdWVyeS5qcyJ9
