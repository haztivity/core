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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../base/BaseError"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgQmFzZUVycm9yXzEgPSByZXF1aXJlKFwiLi4vYmFzZS9CYXNlRXJyb3JcIik7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIGNvbXBvbmVudGUgaW52w6FsaWRvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvclwiLCBcIkludmFsaWQgY29tcG9uZW50XCIpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yID0gSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biBjb21wb25lbnRlIGludsOhbGlkb1xuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3IoY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3JcIiwgXCJDb21wb25lbnQgJ1wiICsgY29tcG9uZW50ICsgXCInIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGFub3RoZXIgY29udHJvbGxlci5cIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvciA9IEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3I7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIGNvbXBvbmVudGUgaW52w6FsaWRvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvcihjb21wb25lbnQpIHtcbiAgICAgICAgICAgIC8vdG9kbyBMSU5LXG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yXCIsIFwiSW52YWxpZCBjb21wb25lbnQgbmFtZSAnXCIgKyBjb21wb25lbnQgKyBcIicuIFBsZWFzZSB1c2UgY2FtZWxDYXNlIG5vbWVuY2xhdHVyZS5cIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvciA9IEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3I7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gY29tcG9uZW50ZSBzaW4gaW5kaWNhciBlbCBub21icmUgZGVsIGNvbXBvbmVudGUgYSBpbmljaWFsaXphclxuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3IoJGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yXCIsIFwiQ29tcG9uZW50IG5hbWUgbm90IHByb3ZpZGVyIGluIGRhdGEtKiBhdHRyaWJ1dGUuIFwiICsgJGVsZW1lbnQpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvciA9IEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIGludGVudGFyIGluaWNpYWxpemFyIHVuIGNvbXBvbmVudGUgbm8gcmVnaXN0cmFkb1xuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IoY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3JcIiwgXCJBdHRlbXB0IHRvIGluaXRpYWxpemUgXCIgKyBjb21wb25lbnQgKyBcIiBidXQgaXMgbm90IHJlZ2lzdGVyZWRcIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IgPSBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3I7XG4gICAgLyoqXG4gICAgICogRXJyb3IgZGUgY29udHJvbGFkb3IgaW52YWxpZG9cbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvclwiLCBcIkludmFsaWQgY29udHJvbGxlciBmb3IgXCIgKyBjb21wb25lbnQgKyBcIiBjb21wb25lbnRcIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvciA9IEhhenRpdml0eUludmFsaWRDb21wb25lbnRDb250cm9sbGVyRXJyb3I7XG59KTtcbiJdLCJmaWxlIjoiY29tcG9uZW50L0Vycm9ycy5qcyJ9
