(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./navigator/Navigator", "./navigator/NavigatorService"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var Navigator_1 = require("./navigator/Navigator");
    exports.Navigator = Navigator_1.Navigator;
    var NavigatorService_1 = require("./navigator/NavigatorService");
    exports.NavigatorService = NavigatorService_1.NavigatorService;
});
//# sourceMappingURL=navigator.js.map