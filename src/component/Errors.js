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
var BaseError_1 = require("../base/BaseError");
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentInvalidError = (function (_super) {
    __extends(HaztivityComponentInvalidError, _super);
    function HaztivityComponentInvalidError() {
        return _super.call(this, "HaztivityComponentInvalidError", "Invalid component") || this;
    }
    return HaztivityComponentInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityComponentInvalidError = HaztivityComponentInvalidError;
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentAlreadyRegisteredError = (function (_super) {
    __extends(HaztivityComponentAlreadyRegisteredError, _super);
    function HaztivityComponentAlreadyRegisteredError(component) {
        return _super.call(this, "HaztivityComponentInvalidError", "Component '" + component + "' already registered with another controller.") || this;
    }
    return HaztivityComponentAlreadyRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentAlreadyRegisteredError = HaztivityComponentAlreadyRegisteredError;
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentNameInvalidError = (function (_super) {
    __extends(HaztivityComponentNameInvalidError, _super);
    function HaztivityComponentNameInvalidError(component) {
        //todo LINK
        return _super.call(this, "HaztivityComponentNameInvalidError", "Invalid component name '" + component + "'. Please use camelCase nomenclature.") || this;
    }
    return HaztivityComponentNameInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNameInvalidError = HaztivityComponentNameInvalidError;
/**
 * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
 */
var HaztivityComponentNameRequiredError = (function (_super) {
    __extends(HaztivityComponentNameRequiredError, _super);
    function HaztivityComponentNameRequiredError($element) {
        return _super.call(this, "HaztivityComponentNameRequiredError", "Component name not provider in data-* attribute. " + $element) || this;
    }
    return HaztivityComponentNameRequiredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNameRequiredError = HaztivityComponentNameRequiredError;
/**
 * Error al intentar inicializar un componente no registrado
 */
var HaztivityComponentNotRegisteredError = (function (_super) {
    __extends(HaztivityComponentNotRegisteredError, _super);
    function HaztivityComponentNotRegisteredError(component) {
        return _super.call(this, "HaztivityComponentNotRegisteredError", "Attempt to initialize " + component + " but is not registered") || this;
    }
    return HaztivityComponentNotRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNotRegisteredError = HaztivityComponentNotRegisteredError;
/**
 * Error de controlador invalido
 */
var HaztivityInvalidComponentControllerError = (function (_super) {
    __extends(HaztivityInvalidComponentControllerError, _super);
    function HaztivityInvalidComponentControllerError(component) {
        return _super.call(this, "HaztivityInvalidComponentControllerError", "Invalid controller for " + component + " component") || this;
    }
    return HaztivityInvalidComponentControllerError;
}(BaseError_1.BaseError));
exports.HaztivityInvalidComponentControllerError = HaztivityInvalidComponentControllerError;
//# sourceMappingURL=Errors.js.map