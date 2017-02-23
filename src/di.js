(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./di/Injector", "./di/decorators"], factory);
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
    var Injector_1 = require("./di/Injector");
    exports.Injector = Injector_1.Injector;
    exports.TYPES = Injector_1.TYPES;
    exports.InjectorRegisterService = Injector_1.InjectorRegisterService;
    exports.InjectorService = Injector_1.InjectorService;
    __export(require("./di/decorators"));
});
//# sourceMappingURL=di.js.map