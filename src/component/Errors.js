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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIEJhc2VFcnJvcl8xLCBIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IsIEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3IsIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IsIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yLCBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IsIEhhenRpdml0eUludmFsaWRDb21wb25lbnRDb250cm9sbGVyRXJyb3I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKEJhc2VFcnJvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBCYXNlRXJyb3JfMSA9IEJhc2VFcnJvcl8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIGNvbXBvbmVudGUgaW52w6FsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvclwiLCBcIkludmFsaWQgY29tcG9uZW50XCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5Q29tcG9uZW50SW52YWxpZEVycm9yXCIsIEhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvcik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIHJlZ2lzdHJhciB1biBjb21wb25lbnRlIGludsOhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3JcIiwgXCJDb21wb25lbnQgJ1wiICsgY29tcG9uZW50ICsgXCInIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGFub3RoZXIgY29udHJvbGxlci5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvclwiLCBIYXp0aXZpdHlDb21wb25lbnRBbHJlYWR5UmVnaXN0ZXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuIGNvbXBvbmVudGUgaW52w6FsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbyBMSU5LXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3JcIiwgXCJJbnZhbGlkIGNvbXBvbmVudCBuYW1lICdcIiArIGNvbXBvbmVudCArIFwiJy4gUGxlYXNlIHVzZSBjYW1lbENhc2Ugbm9tZW5jbGF0dXJlLlwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlDb21wb25lbnROYW1lSW52YWxpZEVycm9yXCIsIEhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbmljaWFsaXphciB1biBjb21wb25lbnRlIHNpbiBpbmRpY2FyIGVsIG5vbWJyZSBkZWwgY29tcG9uZW50ZSBhIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3IoJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3JcIiwgXCJDb21wb25lbnQgbmFtZSBub3QgcHJvdmlkZXIgaW4gZGF0YS0qIGF0dHJpYnV0ZS4gXCIgKyAkZWxlbWVudCkgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yXCIsIEhhenRpdml0eUNvbXBvbmVudE5hbWVSZXF1aXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgaW5pY2lhbGl6YXIgdW4gY29tcG9uZW50ZSBubyByZWdpc3RyYWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvclwiLCBcIkF0dGVtcHQgdG8gaW5pdGlhbGl6ZSBcIiArIGNvbXBvbmVudCArIFwiIGJ1dCBpcyBub3QgcmVnaXN0ZXJlZFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5Q29tcG9uZW50Tm90UmVnaXN0ZXJlZEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvclwiLCBIYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBkZSBjb250cm9sYWRvciBpbnZhbGlkb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yXCIsIFwiSW52YWxpZCBjb250cm9sbGVyIGZvciBcIiArIGNvbXBvbmVudCArIFwiIGNvbXBvbmVudFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yXCIsIEhhenRpdml0eUludmFsaWRDb21wb25lbnRDb250cm9sbGVyRXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJjb21wb25lbnQvRXJyb3JzLmpzIn0=
