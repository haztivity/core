"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("../../../../../src/index");
var hzButton_1 = require("../../../../resources/hzButton/hzButton");
var page_html_text_1 = require("./page.html!text");
exports.page = index_1.PageFactory.createPage({
    name: "6612",
    resources: [
        hzButton_1.HzButton
    ],
    template: page_html_text_1.default,
    autoSequence: false //disable the auto creation of sequences
});
exports.page.on(index_1.GenericPageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
    var groups = $page.find(".group");
    groups.hide();
    groups.first().show();
    var sequences = [];
    var _loop_1 = function (groupIndex, groupsLength) {
        var $item = $(groups[groupIndex]);
        //create a sequence
        var sequence = pageController.createResourceSequence($item.find("[data-hz-resource]"));
        //when the senquence is completed, show the next group
        sequence.getCompletePromise().then(function () {
            var index = groups.index($item);
            if (index < groups.length - 1) {
                $(groups.get(index + 1)).show();
            }
        });
        sequences.push(sequence);
    };
    //look for groups, each group will be a sequence
    for (var groupIndex = 0, groupsLength = groups.length; groupIndex < groupsLength; groupIndex++) {
        _loop_1(groupIndex, groupsLength);
    }
    //Create a sequence of sequences
    pageController.createResourceSequence(sequences).run().then(function () {
        console.log("All sequences completed");
    });
});
//# sourceMappingURL=page.js.map