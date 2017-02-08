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
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9kaS9JbmplY3RvclwiLCBcIi4vZGkvZGVjb3JhdG9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGV4cG9ydGVkTmFtZXNfMSA9IHtcbiAgICAgICAgXCJJbmplY3RvclwiOiB0cnVlLFxuICAgICAgICBcIlRZUEVTXCI6IHRydWUsXG4gICAgICAgIFwiSW5qZWN0b3JSZWdpc3RlclNlcnZpY2VcIjogdHJ1ZSxcbiAgICAgICAgXCJJbmplY3RvclNlcnZpY2VcIjogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXhwb3J0U3Rhcl8xKG0pIHtcbiAgICAgICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgbiBpbiBtKSB7XG4gICAgICAgICAgICBpZiAobiAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydGVkTmFtZXNfMS5oYXNPd25Qcm9wZXJ0eShuKSkgZXhwb3J0c1tuXSA9IG1bbl07XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0c18xKGV4cG9ydHMpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoSW5qZWN0b3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJJbmplY3RvclwiOiBJbmplY3Rvcl8xXzFbXCJJbmplY3RvclwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJUWVBFU1wiOiBJbmplY3Rvcl8xXzFbXCJUWVBFU1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJJbmplY3RvclJlZ2lzdGVyU2VydmljZVwiOiBJbmplY3Rvcl8xXzFbXCJJbmplY3RvclJlZ2lzdGVyU2VydmljZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJJbmplY3RvclNlcnZpY2VcIjogSW5qZWN0b3JfMV8xW1wiSW5qZWN0b3JTZXJ2aWNlXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRlY29yYXRvcnNfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0U3Rhcl8xKGRlY29yYXRvcnNfMV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJkaS5qcyJ9
