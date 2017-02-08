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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIEJhc2VFcnJvcl8xLCBIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQsIEhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChCYXNlRXJyb3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgQmFzZUVycm9yXzEgPSBCYXNlRXJyb3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIG5vIGluZGljYXJzZSBjb250ZXh0byBwYXJhIGxhIGFwbGljYWNpw7NuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZFwiLCBcIm5vdCBjb250ZXh0IGZvdW5kIGZvciB0aGUgYXBwbGljYXRpb24uIFBsZWFzZSB2aXNpdCBMSU5LIFRPIEhFTFBcIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmRcIiwgSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgbm8gaW5kaWNhcnNlIGNvbnRleHRvIHBhcmEgbGFzIHDDoWdpbmFzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kXCIsIFwibm90IGNvbnRleHQgZm91bmQgZm9yIHBhZ2VzLiBQbGVhc2UgdmlzaXQgTElOSyBUTyBIRUxQXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZFwiLCBIYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZCk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InNjby9FcnJvcnMuanMifQ==
