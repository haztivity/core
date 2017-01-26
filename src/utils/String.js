System.register(["../libs/String", "../di"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var String_1, di_1;
    return {
        setters: [
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }
        ],
        execute: function () {
            exports_1("S", String_1.S);
            di_1.Injector.getInstance().registerServiceInstance("S", String_1.S);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9TdHJpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2xpYnMvU3RyaW5nXCIsIFwiLi4vZGlcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBTdHJpbmdfMSwgZGlfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoU3RyaW5nXzFfMSkge1xuICAgICAgICAgICAgICAgIFN0cmluZ18xID0gU3RyaW5nXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiU1wiLCBTdHJpbmdfMS5TKTtcbiAgICAgICAgICAgIGRpXzEuSW5qZWN0b3IuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlclNlcnZpY2VJbnN0YW5jZShcIlNcIiwgU3RyaW5nXzEuUyk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InV0aWxzL1N0cmluZy5qcyJ9
