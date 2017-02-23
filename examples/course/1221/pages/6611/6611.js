(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../../src/index", "../../../../resources/hzButton/hzButton", "./6611.html!text"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("../../../../../src/index");
    var hzButton_1 = require("../../../../resources/hzButton/hzButton");
    var template = require("./6611.html!text");
    var page = index_1.PageFactory.createPage({
        name: "6611",
        resources: [
            hzButton_1.HzButton
        ],
        template: template
    });
    exports.page6611 = page;
    page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
        console.log(pageController.options.name + " rendering");
    });
    page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " rendered");
        if (pageController.isCompleted()) {
        }
    });
    page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show start");
    });
    page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show end");
    });
    page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
        console.log(pageController.options.name + " complete change");
    });
    page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " destroy");
    });
});
//# sourceMappingURL=6611.js.map