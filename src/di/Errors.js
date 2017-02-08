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
    var BaseError_1, HaztivityDependencyNotRegisteredError, HaztivityDependencyAlreadyRegistered, HaztivityDependencyOptionRequired, HaztivityDependencyHasItsOwnAsDependency, HaztivityDependencyAccessDenied, HaztivityDependencyNotValid;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al intentar obtener una dependencia no registrada
             */
            HaztivityDependencyNotRegisteredError = (function (_super) {
                __extends(HaztivityDependencyNotRegisteredError, _super);
                function HaztivityDependencyNotRegisteredError(dependency, target) {
                    return _super.call(this, "HaztivityDependencyNotRegisteredError", target
                        ? "could not inject " + dependency + " into " + target + " because is not registered"
                        : dependency + " is not registered in the Injector.") || this;
                }
                return HaztivityDependencyNotRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyNotRegisteredError", HaztivityDependencyNotRegisteredError);
            /**
             * Error al intentar registrar una dependencia ya registrada
             */
            HaztivityDependencyAlreadyRegistered = (function (_super) {
                __extends(HaztivityDependencyAlreadyRegistered, _super);
                function HaztivityDependencyAlreadyRegistered(dependency) {
                    return _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered") || this;
                }
                return HaztivityDependencyAlreadyRegistered;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyAlreadyRegistered", HaztivityDependencyAlreadyRegistered);
            /**
             * Error al no indicarse un parámetro obligatorio
             */
            HaztivityDependencyOptionRequired = (function (_super) {
                __extends(HaztivityDependencyOptionRequired, _super);
                function HaztivityDependencyOptionRequired(parameterName) {
                    return _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required") || this;
                }
                return HaztivityDependencyOptionRequired;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyOptionRequired", HaztivityDependencyOptionRequired);
            /**
             * Error al definir una clase como dependencia de ella misma
             */
            HaztivityDependencyHasItsOwnAsDependency = (function (_super) {
                __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
                function HaztivityDependencyHasItsOwnAsDependency(dependency) {
                    return _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency") || this;
                }
                return HaztivityDependencyHasItsOwnAsDependency;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyHasItsOwnAsDependency", HaztivityDependencyHasItsOwnAsDependency);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyAccessDenied = (function (_super) {
                __extends(HaztivityDependencyAccessDenied, _super);
                function HaztivityDependencyAccessDenied(target, dependency) {
                    return _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency) || this;
                }
                return HaztivityDependencyAccessDenied;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyAccessDenied", HaztivityDependencyAccessDenied);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyNotValid = (function (_super) {
                __extends(HaztivityDependencyNotValid, _super);
                function HaztivityDependencyNotValid(target, dependencies) {
                    return _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.") || this;
                }
                return HaztivityDependencyNotValid;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyNotValid", HaztivityDependencyNotValid);
        }
    };
});
//# sourceMappingURL=Errors.js.map