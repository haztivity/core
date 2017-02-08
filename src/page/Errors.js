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
    var BaseError_1, HaztivityPageAlreadyRegistered, HaztivityPageNameInvalid, HaztivityPageElementError;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al tratar de registrar una página existente
             */
            HaztivityPageAlreadyRegistered = (function (_super) {
                __extends(HaztivityPageAlreadyRegistered, _super);
                function HaztivityPageAlreadyRegistered(pageName) {
                    return _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques") || this;
                }
                return HaztivityPageAlreadyRegistered;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageAlreadyRegistered", HaztivityPageAlreadyRegistered);
            /**
             * Error al indicarse un nombre de página inválido
             */
            HaztivityPageNameInvalid = (function (_super) {
                __extends(HaztivityPageNameInvalid, _super);
                function HaztivityPageNameInvalid(pageName) {
                    return _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]") || this;
                }
                return HaztivityPageNameInvalid;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageNameInvalid", HaztivityPageNameInvalid);
            /**
             * Error al no generarse elemento en la página
             */
            HaztivityPageElementError = (function (_super) {
                __extends(HaztivityPageElementError, _super);
                function HaztivityPageElementError(pageName) {
                    return _super.call(this, "HaztivityPageElementError", "The page '" + pageName + "' $element is invalid. The template could be undefined") || this;
                }
                return HaztivityPageElementError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageElementError", HaztivityPageElementError);
        }
    };
});
//# sourceMappingURL=Errors.js.map