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
import { BaseError } from "../base/BaseError";
/**
 * Error al intentar obtener una dependencia no registrada
 */
var HaztivityDependencyNotRegisteredError = (function (_super) {
    __extends(HaztivityDependencyNotRegisteredError, _super);
    function HaztivityDependencyNotRegisteredError(dependency, target) {
        return _super.call(this, "HaztivityDependencyNotRegisteredError", target
            ? "could not inject " + dependency + " into " + target + " because is not registered"
            : dependency + " is not registered in the Injector.") || this;
    }
    return HaztivityDependencyNotRegisteredError;
}(BaseError));
export { HaztivityDependencyNotRegisteredError };
/**
 * Error al intentar registrar una dependencia ya registrada
 */
var HaztivityDependencyAlreadyRegistered = (function (_super) {
    __extends(HaztivityDependencyAlreadyRegistered, _super);
    function HaztivityDependencyAlreadyRegistered(dependency) {
        return _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered") || this;
    }
    return HaztivityDependencyAlreadyRegistered;
}(BaseError));
export { HaztivityDependencyAlreadyRegistered };
/**
 * Error al no indicarse un parámetro obligatorio
 */
var HaztivityDependencyOptionRequired = (function (_super) {
    __extends(HaztivityDependencyOptionRequired, _super);
    function HaztivityDependencyOptionRequired(parameterName) {
        return _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required") || this;
    }
    return HaztivityDependencyOptionRequired;
}(BaseError));
export { HaztivityDependencyOptionRequired };
/**
 * Error al definir una clase como dependencia de ella misma
 */
var HaztivityDependencyHasItsOwnAsDependency = (function (_super) {
    __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
    function HaztivityDependencyHasItsOwnAsDependency(dependency) {
        return _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency") || this;
    }
    return HaztivityDependencyHasItsOwnAsDependency;
}(BaseError));
export { HaztivityDependencyHasItsOwnAsDependency };
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
var HaztivityDependencyAccessDenied = (function (_super) {
    __extends(HaztivityDependencyAccessDenied, _super);
    function HaztivityDependencyAccessDenied(target, dependency) {
        return _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency) || this;
    }
    return HaztivityDependencyAccessDenied;
}(BaseError));
export { HaztivityDependencyAccessDenied };
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
var HaztivityDependencyNotValid = (function (_super) {
    __extends(HaztivityDependencyNotValid, _super);
    function HaztivityDependencyNotValid(target, dependencies) {
        return _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.") || this;
    }
    return HaztivityDependencyNotValid;
}(BaseError));
export { HaztivityDependencyNotValid };
//# sourceMappingURL=Errors.js.map