(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./sco/Errors", "./sco/Sco", "./sco/ScoFactory"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    __export(require("./sco/Errors"));
    var Sco_1 = require("./sco/Sco");
    exports.ScoController = Sco_1.ScoController;
    var ScoFactory_1 = require("./sco/ScoFactory");
    exports.ScoFactory = ScoFactory_1.ScoFactory;
});
//# sourceMappingURL=sco.js.map