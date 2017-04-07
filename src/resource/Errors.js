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
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceInvalidError = (function (_super) {
    __extends(HaztivityResourceInvalidError, _super);
    function HaztivityResourceInvalidError() {
        return _super.call(this, "HaztivityResourceInvalidError", "Invalid resource") || this;
    }
    return HaztivityResourceInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityResourceInvalidError = HaztivityResourceInvalidError;
/**
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceAlreadyRegisteredError = (function (_super) {
    __extends(HaztivityResourceAlreadyRegisteredError, _super);
    function HaztivityResourceAlreadyRegisteredError(resource) {
        return _super.call(this, "HaztivityResourceInvalidError", "Resource '" + resource + "' already registered with another controller.") || this;
    }
    return HaztivityResourceAlreadyRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceAlreadyRegisteredError = HaztivityResourceAlreadyRegisteredError;
/**
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceNameInvalidError = (function (_super) {
    __extends(HaztivityResourceNameInvalidError, _super);
    function HaztivityResourceNameInvalidError(resource) {
        //todo LINK
        return _super.call(this, "HaztivityResourceNameInvalidError", "Invalid name '" + resource + "'. Please use camelCase nomenclature.") || this;
    }
    return HaztivityResourceNameInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNameInvalidError = HaztivityResourceNameInvalidError;
/**
 * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
 */
var HaztivityResourceNameRequiredError = (function (_super) {
    __extends(HaztivityResourceNameRequiredError, _super);
    function HaztivityResourceNameRequiredError($element) {
        return _super.call(this, "HaztivityResourceNameRequiredError", "Resource name not provider in data-* attribute. " + $element) || this;
    }
    return HaztivityResourceNameRequiredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNameRequiredError = HaztivityResourceNameRequiredError;
/**
 * Error al intentar inicializar un recurso no registrado
 */
var HaztivityResourceNotRegisteredError = (function (_super) {
    __extends(HaztivityResourceNotRegisteredError, _super);
    function HaztivityResourceNotRegisteredError(resource) {
        return _super.call(this, "HaztivityResourceNotRegisteredError", "Attempt to initialize " + resource + " but is not registered") || this;
    }
    return HaztivityResourceNotRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNotRegisteredError = HaztivityResourceNotRegisteredError;
/**
 * Error de controlador invalido
 */
var HaztivityInvalidResourceControllerError = (function (_super) {
    __extends(HaztivityInvalidResourceControllerError, _super);
    function HaztivityInvalidResourceControllerError(resource) {
        return _super.call(this, "HaztivityInvalidResourceControllerError", "Invalid controller for " + resource + " resource") || this;
    }
    return HaztivityInvalidResourceControllerError;
}(BaseError_1.BaseError));
exports.HaztivityInvalidResourceControllerError = HaztivityInvalidResourceControllerError;
//# sourceMappingURL=Errors.js.map