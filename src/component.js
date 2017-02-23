(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./component/ComponentController", "./component/ComponentManager", "./component/ComponentInitializer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var ComponentController_1 = require("./component/ComponentController");
    exports.ComponentController = ComponentController_1.ComponentController;
    var ComponentManager_1 = require("./component/ComponentManager");
    exports.ComponentManager = ComponentManager_1.ComponentManager;
    var ComponentInitializer_1 = require("./component/ComponentInitializer");
    exports.ComponentInitializer = ComponentInitializer_1.ComponentInitializer;
});
//# sourceMappingURL=component.js.map