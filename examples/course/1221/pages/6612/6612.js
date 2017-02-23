(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../../src/index", "../../../../resources/hzButton/hzButton", "./6612.html!text"], factory);
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
    var template = require("./6612.html!text");
    var page = index_1.PageFactory.createPage({
        name: "6612",
        resources: [
            hzButton_1.HzButton
        ],
        template: template,
        autoSequence: false
    });
    exports.page6612 = page;
    page.on(index_1.GenericPageController.ON_RENDERING, null, function (eventObject, template, pageController) {
        console.log(pageController.options.name + " rendering");
    });
    page.on(index_1.GenericPageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " rendered");
        var groups = $page.find(".group");
        groups.hide();
        groups.first().show();
        var sequences = [];
        var _loop_1 = function (groupIndex, groupsLength) {
            var $item = $(groups[groupIndex]);
            var sequence = pageController.createResourceSequence($item.find("[data-hz-resource]"));
            sequence.getCompletePromise().then(function () {
                var index = groups.index($item);
                if (index < groups.length - 1) {
                    $(groups.get(index + 1)).show();
                }
            });
            sequences.push(sequence);
        };
        for (var groupIndex = 0, groupsLength = groups.length; groupIndex < groupsLength; groupIndex++) {
            _loop_1(groupIndex, groupsLength);
        }
        pageController.createResourceSequence(sequences).run().then(function () {
            console.log("All sequences completed");
        });
    });
    page.on(index_1.GenericPageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show start");
    });
    page.on(index_1.GenericPageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show end");
    });
});
//# sourceMappingURL=6612.js.map