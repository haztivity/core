System.register(["../debug"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var debug_1, BaseError;
    return {
        setters: [
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }
        ],
        execute: function () {
            debug_1.Logger;
            BaseError = (function (_super) {
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
            exports_1("BaseError", BaseError);
        }
    };
});
//# sourceMappingURL=BaseError.js.map