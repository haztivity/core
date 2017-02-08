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
//# sourceMappingURL=jquery.js.map