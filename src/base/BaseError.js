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
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var debug_1 = require("../debug");
debug_1.Logger;
var BaseError = (function (_super) {
    __extends(BaseError, _super);
    function BaseError(name, message) {
        var _this = _super.call(this, message) || this;
        _this.name = name;
        _this.message = message;
        debug_1.Logger.error(name, message);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map