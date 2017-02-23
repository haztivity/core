(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./page/PageRegister", "./page/PageController", "./page/GenericPageController", "./page/PageFactory", "./page/PageImplementation", "./page/PageManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var PageRegister_1 = require("./page/PageRegister");
    exports.PageRegister = PageRegister_1.PageRegister;
    var PageController_1 = require("./page/PageController");
    exports.PageController = PageController_1.PageController;
    var GenericPageController_1 = require("./page/GenericPageController");
    exports.GenericPageController = GenericPageController_1.GenericPageController;
    var PageFactory_1 = require("./page/PageFactory");
    exports.PageFactory = PageFactory_1.PageFactory;
    var PageImplementation_1 = require("./page/PageImplementation");
    exports.PageImplementation = PageImplementation_1.PageImplementation;
    var PageManager_1 = require("./page/PageManager");
    exports.PageManager = PageManager_1.PageManager;
});
//# sourceMappingURL=page.js.map