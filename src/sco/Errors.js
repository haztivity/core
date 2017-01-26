System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var BaseError_1, HaztivityAppContextNotFound, HaztivityPagesContextNotFound;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al no indicarse contexto para la aplicación
             */
            HaztivityAppContextNotFound = (function (_super) {
                __extends(HaztivityAppContextNotFound, _super);
                function HaztivityAppContextNotFound() {
                    return _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP") || this;
                }
                return HaztivityAppContextNotFound;
            }(BaseError_1.BaseError));
            exports_1("HaztivityAppContextNotFound", HaztivityAppContextNotFound);
            /**
             * Error al no indicarse contexto para las páginas
             */
            HaztivityPagesContextNotFound = (function (_super) {
                __extends(HaztivityPagesContextNotFound, _super);
                function HaztivityPagesContextNotFound() {
                    return _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP") || this;
                }
                return HaztivityPagesContextNotFound;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPagesContextNotFound", HaztivityPagesContextNotFound);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBCYXNlRXJyb3JfMSwgSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kLCBIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZDtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoQmFzZUVycm9yXzFfMSkge1xuICAgICAgICAgICAgICAgIEJhc2VFcnJvcl8xID0gQmFzZUVycm9yXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBubyBpbmRpY2Fyc2UgY29udGV4dG8gcGFyYSBsYSBhcGxpY2FjacOzblxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmRcIiwgXCJub3QgY29udGV4dCBmb3VuZCBmb3IgdGhlIGFwcGxpY2F0aW9uLiBQbGVhc2UgdmlzaXQgTElOSyBUTyBIRUxQXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQ7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kXCIsIEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIG5vIGluZGljYXJzZSBjb250ZXh0byBwYXJhIGxhcyBww6FnaW5hc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZFwiLCBcIm5vdCBjb250ZXh0IGZvdW5kIGZvciBwYWdlcy4gUGxlYXNlIHZpc2l0IExJTksgVE8gSEVMUFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQ7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmRcIiwgSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJzY28vRXJyb3JzLmpzIn0=
