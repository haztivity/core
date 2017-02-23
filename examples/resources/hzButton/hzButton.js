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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("../../../src/index");
    var HzButton = (function (_super) {
        __extends(HzButton, _super);
        function HzButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzButton.prototype.init = function (options, config) {
            this._options = options;
            this._$element.text(this._options.content);
            this._$element.one("click", { instance: this }, this._onClick);
        };
        HzButton.prototype._onClick = function (e) {
            var instance = e.data.instance;
            instance.disable();
            instance._markAsCompleted();
        };
        HzButton.prototype.disable = function () {
            if (_super.prototype.disable.call(this)) {
                this._$element.attr("disabled", "disabled");
            }
        };
        HzButton.prototype.enable = function () {
            if (_super.prototype.enable.call(this)) {
                this._$element.removeAttr("disabled");
            }
        };
        HzButton.prototype.getInstance = function () {
            return this;
        };
        return HzButton;
    }(index_1.ResourceController));
    HzButton = __decorate([
        index_1.Resource({
            name: "hzButton",
            dependencies: [
                index_1.$,
                index_1.EventEmitterFactory
            ]
        })
    ], HzButton);
    exports.HzButton = HzButton;
});
//# sourceMappingURL=hzButton.js.map