System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIEJhc2VFcnJvcl8xLCBIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvciwgSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yLCBIYXp0aXZpdHlSZXNvdXJjZU5hbWVJbnZhbGlkRXJyb3IsIEhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3IsIEhhenRpdml0eVJlc291cmNlTm90UmVnaXN0ZXJlZEVycm9yLCBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKEJhc2VFcnJvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBCYXNlRXJyb3JfMSA9IEJhc2VFcnJvcl8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIHJlY3Vyc28gaW52w6FsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yXCIsIFwiSW52YWxpZCByZXNvdXJjZVwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3JcIiwgSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gcmVjdXJzbyBpbnbDoWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvcihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlSZXNvdXJjZUludmFsaWRFcnJvclwiLCBcIlJlc291cmNlICdcIiArIHJlc291cmNlICsgXCInIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGFub3RoZXIgY29udHJvbGxlci5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlSZXNvdXJjZUFscmVhZHlSZWdpc3RlcmVkRXJyb3JcIiwgSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIHJlY3Vyc28gaW52w6FsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlSZXNvdXJjZU5hbWVJbnZhbGlkRXJyb3IocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvIExJTktcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yXCIsIFwiSW52YWxpZCBuYW1lICdcIiArIHJlc291cmNlICsgXCInLiBQbGVhc2UgdXNlIGNhbWVsQ2FzZSBub21lbmNsYXR1cmUuXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlSZXNvdXJjZU5hbWVJbnZhbGlkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yXCIsIEhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIGluaWNpYWxpemFyIHVuIHJlY3Vyc28gc2luIGluZGljYXIgZWwgbm9tYnJlIGRlbCByZWN1cnNvIGEgaW5pY2lhbGl6YXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvcigkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yXCIsIFwiUmVzb3VyY2UgbmFtZSBub3QgcHJvdmlkZXIgaW4gZGF0YS0qIGF0dHJpYnV0ZS4gXCIgKyAkZWxlbWVudCkgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvclwiLCBIYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gcmVjdXJzbyBubyByZWdpc3RyYWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVJlc291cmNlTm90UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3JcIiwgXCJBdHRlbXB0IHRvIGluaXRpYWxpemUgXCIgKyByZXNvdXJjZSArIFwiIGJ1dCBpcyBub3QgcmVnaXN0ZXJlZFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3JcIiwgSGF6dGl2aXR5UmVzb3VyY2VOb3RSZWdpc3RlcmVkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBkZSBjb250cm9sYWRvciBpbnZhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvclwiLCBcIkludmFsaWQgY29udHJvbGxlciBmb3IgXCIgKyByZXNvdXJjZSArIFwiIHJlc291cmNlXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yXCIsIEhhenRpdml0eUludmFsaWRSZXNvdXJjZUNvbnRyb2xsZXJFcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL0Vycm9ycy5qcyJ9
