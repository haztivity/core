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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBCYXNlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi9iYXNlL0Jhc2VFcnJvclwiKTtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gcmVjdXJzbyBpbnbDoWxpZG9cbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3JcIiwgXCJJbnZhbGlkIHJlc291cmNlXCIpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvciA9IEhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biByZWN1cnNvIGludsOhbGlkb1xuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IocmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yXCIsIFwiUmVzb3VyY2UgJ1wiICsgcmVzb3VyY2UgKyBcIicgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYW5vdGhlciBjb250cm9sbGVyLlwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3I7XG4gICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICBleHBvcnRzLkhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvciA9IEhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvcjtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gcmVjdXJzbyBpbnbDoWxpZG9cbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yKHJlc291cmNlKSB7XG4gICAgICAgICAgICAvL3RvZG8gTElOS1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yXCIsIFwiSW52YWxpZCBuYW1lICdcIiArIHJlc291cmNlICsgXCInLiBQbGVhc2UgdXNlIGNhbWVsQ2FzZSBub21lbmNsYXR1cmUuXCIpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yID0gSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIGludGVudGFyIGluaWNpYWxpemFyIHVuIHJlY3Vyc28gc2luIGluZGljYXIgZWwgbm9tYnJlIGRlbCByZWN1cnNvIGEgaW5pY2lhbGl6YXJcbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yKCRlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yXCIsIFwiUmVzb3VyY2UgbmFtZSBub3QgcHJvdmlkZXIgaW4gZGF0YS0qIGF0dHJpYnV0ZS4gXCIgKyAkZWxlbWVudCkgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvciA9IEhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3I7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gcmVjdXJzbyBubyByZWdpc3RyYWRvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eVJlc291cmNlTm90UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVJlc291cmNlTm90UmVnaXN0ZXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcihyZXNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3JcIiwgXCJBdHRlbXB0IHRvIGluaXRpYWxpemUgXCIgKyByZXNvdXJjZSArIFwiIGJ1dCBpcyBub3QgcmVnaXN0ZXJlZFwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IgPSBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICAvKipcbiAgICAgKiBFcnJvciBkZSBjb250cm9sYWRvciBpbnZhbGlkb1xuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IocmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvclwiLCBcIkludmFsaWQgY29udHJvbGxlciBmb3IgXCIgKyByZXNvdXJjZSArIFwiIHJlc291cmNlXCIpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yID0gSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yO1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL0Vycm9ycy5qcyJ9
