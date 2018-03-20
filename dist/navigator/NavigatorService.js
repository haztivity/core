"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var Navigator_1 = require("./Navigator");
var NavigatorService = /** @class */ (function () {
    function NavigatorService(_Navigator) {
        var publish = [
            "goTo",
            "isDisabled",
            "setDisabled",
            "enable",
            "disable",
            "next",
            "prev",
            "getCurrentPageData",
            "on",
            "one",
            "off",
            "getProgressPercentage"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = _Navigator[method].bind(_Navigator);
        }
    }
    NavigatorService.prototype.goTo = function (index) {
        return undefined;
    };
    NavigatorService.prototype.isDisabled = function () {
        return undefined;
    };
    NavigatorService.prototype.setDisabled = function (disabled) {
    };
    NavigatorService.prototype.enable = function () {
    };
    NavigatorService.prototype.disable = function () {
    };
    NavigatorService.prototype.next = function () {
        return undefined;
    };
    NavigatorService.prototype.prev = function () {
        return undefined;
    };
    NavigatorService.prototype.getCurrentPageData = function () {
        return undefined;
    };
    NavigatorService.prototype.getProgressPercentage = function () {
        return undefined;
    };
    /**
     * @see EventEmitter#on
     */
    NavigatorService.prototype.on = function (events, data, handler) {
        return undefined;
    };
    NavigatorService.prototype.one = function (events, data, handler) {
        return undefined;
    };
    NavigatorService.prototype.off = function (events, handler) {
        return undefined;
    };
    NavigatorService.ON_DRAW_PAGE = Navigator_1.Navigator.ON_DRAW_PAGE;
    NavigatorService.ON_DISABLE = Navigator_1.Navigator.ON_DISABLE;
    NavigatorService.ON_ENABLE = Navigator_1.Navigator.ON_ENABLE;
    NavigatorService.ON_CHANGE_PAGE_END = Navigator_1.Navigator.ON_CHANGE_PAGE_END;
    NavigatorService.ON_CHANGE_PAGE_START = Navigator_1.Navigator.ON_CHANGE_PAGE_START;
    NavigatorService = __decorate([
        di_1.Service({
            name: "NavigatorService",
            dependencies: [
                Navigator_1.Navigator
            ]
        })
    ], NavigatorService);
    return NavigatorService;
}());
exports.NavigatorService = NavigatorService;
//# sourceMappingURL=NavigatorService.js.map