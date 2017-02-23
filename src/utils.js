/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils/EventEmitterFactory", "./utils/EventEmitter", "./utils/String", "./utils/DataOptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @module
     * @description
     * El módulo "utils" contiene utilidades para el desarrollo
     */
    var EventEmitterFactory_1 = require("./utils/EventEmitterFactory");
    exports.EventEmitterFactory = EventEmitterFactory_1.EventEmitterFactory;
    var EventEmitter_1 = require("./utils/EventEmitter");
    exports.EventEmitter = EventEmitter_1.EventEmitter;
    var String_1 = require("./utils/String");
    exports.S = String_1.S;
    var DataOptions_1 = require("./utils/DataOptions");
    exports.DataOptions = DataOptions_1.DataOptions;
});
//# sourceMappingURL=utils.js.map