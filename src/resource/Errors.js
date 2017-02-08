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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgQmFzZUVycm9yXzEsIEhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yLCBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IsIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvciwgSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvciwgSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IsIEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoQmFzZUVycm9yXzFfMSkge1xuICAgICAgICAgICAgICAgIEJhc2VFcnJvcl8xID0gQmFzZUVycm9yXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gcmVjdXJzbyBpbnbDoWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3JcIiwgXCJJbnZhbGlkIHJlc291cmNlXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvclwiLCBIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biByZWN1cnNvIGludsOhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yXCIsIFwiUmVzb3VyY2UgJ1wiICsgcmVzb3VyY2UgKyBcIicgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYW5vdGhlciBjb250cm9sbGVyLlwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvclwiLCBIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gcmVjdXJzbyBpbnbDoWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvcihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG8gTElOS1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlSZXNvdXJjZU5hbWVJbnZhbGlkRXJyb3JcIiwgXCJJbnZhbGlkIG5hbWUgJ1wiICsgcmVzb3VyY2UgKyBcIicuIFBsZWFzZSB1c2UgY2FtZWxDYXNlIG5vbWVuY2xhdHVyZS5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlSZXNvdXJjZU5hbWVJbnZhbGlkRXJyb3JcIiwgSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gcmVjdXJzbyBzaW4gaW5kaWNhciBlbCBub21icmUgZGVsIHJlY3Vyc28gYSBpbmljaWFsaXphclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3JcIiwgXCJSZXNvdXJjZSBuYW1lIG5vdCBwcm92aWRlciBpbiBkYXRhLSogYXR0cmlidXRlLiBcIiArICRlbGVtZW50KSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yXCIsIEhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbmljaWFsaXphciB1biByZWN1cnNvIG5vIHJlZ2lzdHJhZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvclwiLCBcIkF0dGVtcHQgdG8gaW5pdGlhbGl6ZSBcIiArIHJlc291cmNlICsgXCIgYnV0IGlzIG5vdCByZWdpc3RlcmVkXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvclwiLCBIYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGRlIGNvbnRyb2xhZG9yIGludmFsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yXCIsIFwiSW52YWxpZCBjb250cm9sbGVyIGZvciBcIiArIHJlc291cmNlICsgXCIgcmVzb3VyY2VcIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3JcIiwgSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicmVzb3VyY2UvRXJyb3JzLmpzIn0=
