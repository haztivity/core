"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
 * Error al no indicarse contexto para la aplicación
 */
var HaztivityAppContextNotFound = /** @class */ (function (_super) {
    __extends(HaztivityAppContextNotFound, _super);
    function HaztivityAppContextNotFound() {
        return _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP") || this;
    }
    return HaztivityAppContextNotFound;
}(BaseError_1.BaseError));
exports.HaztivityAppContextNotFound = HaztivityAppContextNotFound;
/**
 * Error al no indicarse contexto para las páginas
 */
var HaztivityPagesContextNotFound = /** @class */ (function (_super) {
    __extends(HaztivityPagesContextNotFound, _super);
    function HaztivityPagesContextNotFound() {
        return _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP") || this;
    }
    return HaztivityPagesContextNotFound;
}(BaseError_1.BaseError));
exports.HaztivityPagesContextNotFound = HaztivityPagesContextNotFound;
//# sourceMappingURL=Errors.js.map