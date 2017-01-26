System.register(["./di/Injector", "./di/decorators"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "Injector": true,
        "TYPES": true,
        "InjectorRegisterService": true,
        "InjectorService": true
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
            function (Injector_1_1) {
                exports_1({
                    "Injector": Injector_1_1["Injector"],
                    "TYPES": Injector_1_1["TYPES"],
                    "InjectorRegisterService": Injector_1_1["InjectorRegisterService"],
                    "InjectorService": Injector_1_1["InjectorService"]
                });
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            }
        ],
        execute: function () {
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9kaS9JbmplY3RvclwiLCBcIi4vZGkvZGVjb3JhdG9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGV4cG9ydGVkTmFtZXNfMSA9IHtcbiAgICAgICAgXCJJbmplY3RvclwiOiB0cnVlLFxuICAgICAgICBcIlRZUEVTXCI6IHRydWUsXG4gICAgICAgIFwiSW5qZWN0b3JSZWdpc3RlclNlcnZpY2VcIjogdHJ1ZSxcbiAgICAgICAgXCJJbmplY3RvclNlcnZpY2VcIjogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXhwb3J0U3Rhcl8xKG0pIHtcbiAgICAgICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgbiBpbiBtKSB7XG4gICAgICAgICAgICBpZiAobiAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydGVkTmFtZXNfMS5oYXNPd25Qcm9wZXJ0eShuKSlcbiAgICAgICAgICAgICAgICBleHBvcnRzW25dID0gbVtuXTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzXzEoZXhwb3J0cyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChJbmplY3Rvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIkluamVjdG9yXCI6IEluamVjdG9yXzFfMVtcIkluamVjdG9yXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlRZUEVTXCI6IEluamVjdG9yXzFfMVtcIlRZUEVTXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlXCI6IEluamVjdG9yXzFfMVtcIkluamVjdG9yUmVnaXN0ZXJTZXJ2aWNlXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkluamVjdG9yU2VydmljZVwiOiBJbmplY3Rvcl8xXzFbXCJJbmplY3RvclNlcnZpY2VcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGVjb3JhdG9yc18xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRTdGFyXzEoZGVjb3JhdG9yc18xXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6ImRpLmpzIn0=
