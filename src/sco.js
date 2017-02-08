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
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
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
//# sourceMappingURL=sco.js.map