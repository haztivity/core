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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBCYXNlRXJyb3JfMSwgSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yLCBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yLCBIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yLCBIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvciwgSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yLCBIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChCYXNlRXJyb3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgQmFzZUVycm9yXzEgPSBCYXNlRXJyb3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biBjb21wb25lbnRlIGludsOhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3JcIiwgXCJJbnZhbGlkIGNvbXBvbmVudFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvclwiLCBIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW4gY29tcG9uZW50ZSBpbnbDoWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvcihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yXCIsIFwiQ29tcG9uZW50ICdcIiArIGNvbXBvbmVudCArIFwiJyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhbm90aGVyIGNvbnRyb2xsZXIuXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3JcIiwgSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biBjb21wb25lbnRlIGludsOhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG8gTElOS1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yXCIsIFwiSW52YWxpZCBjb21wb25lbnQgbmFtZSAnXCIgKyBjb21wb25lbnQgKyBcIicuIFBsZWFzZSB1c2UgY2FtZWxDYXNlIG5vbWVuY2xhdHVyZS5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvclwiLCBIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gY29tcG9uZW50ZSBzaW4gaW5kaWNhciBlbCBub21icmUgZGVsIGNvbXBvbmVudGUgYSBpbmljaWFsaXphclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yXCIsIFwiQ29tcG9uZW50IG5hbWUgbm90IHByb3ZpZGVyIGluIGRhdGEtKiBhdHRyaWJ1dGUuIFwiICsgJGVsZW1lbnQpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvclwiLCBIYXp0aXZpdHlDb21wb25lbnROYW1lUmVxdWlyZWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIGluaWNpYWxpemFyIHVuIGNvbXBvbmVudGUgbm8gcmVnaXN0cmFkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3JcIiwgXCJBdHRlbXB0IHRvIGluaXRpYWxpemUgXCIgKyBjb21wb25lbnQgKyBcIiBidXQgaXMgbm90IHJlZ2lzdGVyZWRcIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3JcIiwgSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgZGUgY29udHJvbGFkb3IgaW52YWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUludmFsaWRDb21wb25lbnRDb250cm9sbGVyRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvcihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvclwiLCBcIkludmFsaWQgY29udHJvbGxlciBmb3IgXCIgKyBjb21wb25lbnQgKyBcIiBjb21wb25lbnRcIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUludmFsaWRDb21wb25lbnRDb250cm9sbGVyRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvclwiLCBIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoiY29tcG9uZW50L0Vycm9ycy5qcyJ9
