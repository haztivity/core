System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var BaseError_1, HaztivityComponentInvalidError, HaztivityComponentAlreadyRegisteredError, HaztivityComponentNameInvalidError, HaztivityComponentNameRequiredError, HaztivityComponentNotRegisteredError, HaztivityInvalidComponentControllerError;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentInvalidError = (function (_super) {
                __extends(HaztivityComponentInvalidError, _super);
                function HaztivityComponentInvalidError() {
                    return _super.call(this, "HaztivityComponentInvalidError", "Invalid component") || this;
                }
                return HaztivityComponentInvalidError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityComponentInvalidError", HaztivityComponentInvalidError);
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentAlreadyRegisteredError = (function (_super) {
                __extends(HaztivityComponentAlreadyRegisteredError, _super);
                function HaztivityComponentAlreadyRegisteredError(component) {
                    return _super.call(this, "HaztivityComponentInvalidError", "Component '" + component + "' already registered with another controller.") || this;
                }
                return HaztivityComponentAlreadyRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityComponentAlreadyRegisteredError", HaztivityComponentAlreadyRegisteredError);
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentNameInvalidError = (function (_super) {
                __extends(HaztivityComponentNameInvalidError, _super);
                function HaztivityComponentNameInvalidError(component) {
                    //todo LINK
                    return _super.call(this, "HaztivityComponentNameInvalidError", "Invalid component name '" + component + "'. Please use camelCase nomenclature.") || this;
                }
                return HaztivityComponentNameInvalidError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityComponentNameInvalidError", HaztivityComponentNameInvalidError);
            /**
             * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
             */
            HaztivityComponentNameRequiredError = (function (_super) {
                __extends(HaztivityComponentNameRequiredError, _super);
                function HaztivityComponentNameRequiredError($element) {
                    return _super.call(this, "HaztivityComponentNameRequiredError", "Component name not provider in data-* attribute. " + $element) || this;
                }
                return HaztivityComponentNameRequiredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityComponentNameRequiredError", HaztivityComponentNameRequiredError);
            /**
             * Error al intentar inicializar un componente no registrado
             */
            HaztivityComponentNotRegisteredError = (function (_super) {
                __extends(HaztivityComponentNotRegisteredError, _super);
                function HaztivityComponentNotRegisteredError(component) {
                    return _super.call(this, "HaztivityComponentNotRegisteredError", "Attempt to initialize " + component + " but is not registered") || this;
                }
                return HaztivityComponentNotRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityComponentNotRegisteredError", HaztivityComponentNotRegisteredError);
            /**
             * Error de controlador invalido
             */
            HaztivityInvalidComponentControllerError = (function (_super) {
                __extends(HaztivityInvalidComponentControllerError, _super);
                function HaztivityInvalidComponentControllerError(component) {
                    return _super.call(this, "HaztivityInvalidComponentControllerError", "Invalid controller for " + component + " component") || this;
                }
                return HaztivityInvalidComponentControllerError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityInvalidComponentControllerError", HaztivityInvalidComponentControllerError);
        }
    };
});
//# sourceMappingURL=Errors.js.map