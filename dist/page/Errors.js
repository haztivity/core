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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al tratar de registrar una página existente
 */
var HaztivityPageAlreadyRegistered = /** @class */ (function (_super) {
    __extends(HaztivityPageAlreadyRegistered, _super);
    function HaztivityPageAlreadyRegistered(pageName) {
        return _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques") || this;
    }
    return HaztivityPageAlreadyRegistered;
}(BaseError_1.BaseError));
exports.HaztivityPageAlreadyRegistered = HaztivityPageAlreadyRegistered;
/**
 * Error al indicarse un nombre de página inválido
 */
var HaztivityPageNameInvalid = /** @class */ (function (_super) {
    __extends(HaztivityPageNameInvalid, _super);
    function HaztivityPageNameInvalid(pageName) {
        return _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]") || this;
    }
    return HaztivityPageNameInvalid;
}(BaseError_1.BaseError));
exports.HaztivityPageNameInvalid = HaztivityPageNameInvalid;
/**
 * Error al no generarse elemento en la página
 */
var HaztivityPageElementError = /** @class */ (function (_super) {
    __extends(HaztivityPageElementError, _super);
    function HaztivityPageElementError(pageName) {
        return _super.call(this, "HaztivityPageElementError", "The page '" + pageName + "' $element is invalid. The template could not be undefined") || this;
    }
    return HaztivityPageElementError;
}(BaseError_1.BaseError));
exports.HaztivityPageElementError = HaztivityPageElementError;
//# sourceMappingURL=Errors.js.map