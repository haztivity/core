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
//# sourceMappingURL=String.js.map