System.register(["../base/BaseError"], function (exports_1, context_1) {
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
    var BaseError_1, HaztivityAppContextNotFound, HaztivityPagesContextNotFound;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al no indicarse contexto para la aplicación
             */
            HaztivityAppContextNotFound = (function (_super) {
                __extends(HaztivityAppContextNotFound, _super);
                function HaztivityAppContextNotFound() {
                    return _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP") || this;
                }
                return HaztivityAppContextNotFound;
            }(BaseError_1.BaseError));
            exports_1("HaztivityAppContextNotFound", HaztivityAppContextNotFound);
            /**
             * Error al no indicarse contexto para las páginas
             */
            HaztivityPagesContextNotFound = (function (_super) {
                __extends(HaztivityPagesContextNotFound, _super);
                function HaztivityPagesContextNotFound() {
                    return _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP") || this;
                }
                return HaztivityPagesContextNotFound;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPagesContextNotFound", HaztivityPagesContextNotFound);
        }
    };
});
//# sourceMappingURL=Errors.js.map