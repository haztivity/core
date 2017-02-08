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
    var BaseError_1, HaztivityResourceInvalidError, HaztivityResourceAlreadyRegisteredError, HaztivityResourceNameInvalidError, HaztivityResourceNameRequiredError, HaztivityResourceNotRegisteredError, HaztivityInvalidResourceControllerError;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceInvalidError = (function (_super) {
                __extends(HaztivityResourceInvalidError, _super);
                function HaztivityResourceInvalidError() {
                    return _super.call(this, "HaztivityResourceInvalidError", "Invalid resource") || this;
                }
                return HaztivityResourceInvalidError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityResourceInvalidError", HaztivityResourceInvalidError);
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceAlreadyRegisteredError = (function (_super) {
                __extends(HaztivityResourceAlreadyRegisteredError, _super);
                function HaztivityResourceAlreadyRegisteredError(resource) {
                    return _super.call(this, "HaztivityResourceInvalidError", "Resource '" + resource + "' already registered with another controller.") || this;
                }
                return HaztivityResourceAlreadyRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityResourceAlreadyRegisteredError", HaztivityResourceAlreadyRegisteredError);
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceNameInvalidError = (function (_super) {
                __extends(HaztivityResourceNameInvalidError, _super);
                function HaztivityResourceNameInvalidError(resource) {
                    //todo LINK
                    return _super.call(this, "HaztivityResourceNameInvalidError", "Invalid name '" + resource + "'. Please use camelCase nomenclature.") || this;
                }
                return HaztivityResourceNameInvalidError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityResourceNameInvalidError", HaztivityResourceNameInvalidError);
            /**
             * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
             */
            HaztivityResourceNameRequiredError = (function (_super) {
                __extends(HaztivityResourceNameRequiredError, _super);
                function HaztivityResourceNameRequiredError($element) {
                    return _super.call(this, "HaztivityResourceNameRequiredError", "Resource name not provider in data-* attribute. " + $element) || this;
                }
                return HaztivityResourceNameRequiredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityResourceNameRequiredError", HaztivityResourceNameRequiredError);
            /**
             * Error al intentar inicializar un recurso no registrado
             */
            HaztivityResourceNotRegisteredError = (function (_super) {
                __extends(HaztivityResourceNotRegisteredError, _super);
                function HaztivityResourceNotRegisteredError(resource) {
                    return _super.call(this, "HaztivityResourceNotRegisteredError", "Attempt to initialize " + resource + " but is not registered") || this;
                }
                return HaztivityResourceNotRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityResourceNotRegisteredError", HaztivityResourceNotRegisteredError);
            /**
             * Error de controlador invalido
             */
            HaztivityInvalidResourceControllerError = (function (_super) {
                __extends(HaztivityInvalidResourceControllerError, _super);
                function HaztivityInvalidResourceControllerError(resource) {
                    return _super.call(this, "HaztivityInvalidResourceControllerError", "Invalid controller for " + resource + " resource") || this;
                }
                return HaztivityInvalidResourceControllerError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityInvalidResourceControllerError", HaztivityInvalidResourceControllerError);
        }
    };
});
//# sourceMappingURL=Errors.js.map