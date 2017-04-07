"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("../../src/index");
var HzNavbarComponent = HzNavbarComponent_1 = (function (_super) {
    __extends(HzNavbarComponent, _super);
    function HzNavbarComponent(_$, _EventEmitterFactory, _Navigator, _PageManager) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._Navigator = _Navigator;
        _this._PageManager = _PageManager;
        return _this;
    }
    HzNavbarComponent.prototype.init = function (options) {
        this._$nextBtn = this._$element.find("[data-" + HzNavbarComponent_1.PREFIX + "-next]");
        this._$prevBtn = this._$element.find("[data-" + HzNavbarComponent_1.PREFIX + "-prev]");
        this._assignEvents();
    };
    HzNavbarComponent.prototype._assignEvents = function () {
        this._$nextBtn.on("click." + HzNavbarComponent_1.NAMESPACE, { instance: this }, this._onNextClick);
        this._$prevBtn.on("click." + HzNavbarComponent_1.NAMESPACE, { instance: this }, this._onPrevClick);
        this._Navigator.on(index_1.Navigator.ON_DISABLE, { instance: this }, this._onDisabled);
        this._Navigator.on(index_1.Navigator.ON_ENABLE, { instance: this }, this._onEnabled);
        this._Navigator.on(index_1.Navigator.ON_CHANGE_PAGE_START, { instance: this }, this._onPageChangeStart);
        this._Navigator.on(index_1.Navigator.ON_CHANGE_PAGE_END, { instance: this }, this._onPageChangeEnd);
    };
    HzNavbarComponent.prototype._onNextClick = function (e) {
        var instance = e.data.instance;
        instance._Navigator.next();
    };
    HzNavbarComponent.prototype._onPrevClick = function (e) {
        var instance = e.data.instance;
        instance._Navigator.prev();
    };
    HzNavbarComponent.prototype._onPageChangeStart = function (e, newPage, oldPage) {
        var instance = e.data.instance;
        if (oldPage) {
            var pageImplementation = instance._PageManager.getPage(oldPage.index), page = pageImplementation.getPage();
            page.off("." + HzNavbarComponent_1.NAMESPACE);
        }
        instance._$prevBtn.attr("disabled", "disabled");
        instance._$nextBtn.attr("disabled", "disabled");
    };
    HzNavbarComponent.prototype._onPageChangeEnd = function (e, newPage, oldPage) {
        var instance = e.data.instance;
        if (newPage.index === 0) {
            instance._$prevBtn.attr("disabled", "disabled");
            instance._$nextBtn.removeAttr("disabled");
        }
        else if (newPage.index === instance._PageManager.count() - 1) {
            instance._$nextBtn.attr("disabled", "disabled");
            instance._$prevBtn.removeAttr("disabled");
        }
        else {
            instance._$nextBtn.removeAttr("disabled");
            instance._$prevBtn.removeAttr("disabled");
        }
        var pageImplementation = instance._Navigator.getCurrentPage(), page = pageImplementation.getPage();
        if (!instance._$nextBtn.prop("disabled")) {
            if (pageImplementation.getController().isCompleted()) {
                instance._$nextBtn.removeAttr("disabled");
            }
            else {
                instance._$nextBtn.attr("disabled", "disabled");
            }
        }
        page.off("." + HzNavbarComponent_1.NAMESPACE).on(index_1.PageController.ON_COMPLETE_CHANGE + "." + HzNavbarComponent_1.NAMESPACE, { instance: instance }, instance._onPageCompleteChange);
    };
    HzNavbarComponent.prototype._onPageCompleteChange = function (e, completed) {
        if (completed) {
            var instance = e.data.instance;
            var pageImplementation = instance._Navigator.getCurrentPage(), page = pageImplementation.getPage();
            if (instance._PageManager.getPageIndex(page.getName()) !== instance._PageManager.count() - 1) {
                if (pageImplementation.getController().isCompleted()) {
                    instance._$nextBtn.removeAttr("disabled");
                }
                else {
                    instance._$nextBtn.attr("disabled", "disabled");
                }
            }
        }
    };
    HzNavbarComponent.prototype._onDisabled = function (e) {
        var instance = e.data.instance;
    };
    HzNavbarComponent.prototype._onEnabled = function (e) {
        var instance = e.data.instance;
    };
    HzNavbarComponent.prototype.enable = function () {
        this._Navigator.enable();
    };
    HzNavbarComponent.prototype.disable = function () {
        this._Navigator.disable();
    };
    return HzNavbarComponent;
}(index_1.ComponentController));
HzNavbarComponent.NAMESPACE = "hzNavbar";
HzNavbarComponent.PREFIX = "hz-navbar";
HzNavbarComponent = HzNavbarComponent_1 = __decorate([
    index_1.Component({
        name: "HzNavbar",
        dependencies: [
            index_1.$,
            index_1.EventEmitterFactory,
            index_1.Navigator,
            index_1.PageManager
        ]
    })
], HzNavbarComponent);
exports.HzNavbarComponent = HzNavbarComponent;
var HzNavbarComponent_1;
//# sourceMappingURL=Navbar.js.map