"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("../../../../../src/index");
var hzButton_1 = require("../../../../resources/hzButton/hzButton");
var template = require("./page.html!text");
require("./page.css!");
exports.page = index_1.PageFactory.createPage({
    name: "6611",
    resources: [
        hzButton_1.HzButton
    ],
    template: template
});
exports.page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
    console.log(pageController.options.name + " rendering");
});
exports.page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " rendered");
});
exports.page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show start");
});
exports.page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show end");
});
exports.page.on(index_1.PageController.ON_RESOURCE_COMPLETED, null, function (eventObject, $page, pageController, resource) {
    console.log(pageController.options.name + " resource completed");
});
exports.page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
    console.log(pageController.options.name + " complete change");
});
exports.page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " destroy");
});
//# sourceMappingURL=page.js.map