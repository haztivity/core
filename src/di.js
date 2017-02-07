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
//# sourceMappingURL=di.js.map