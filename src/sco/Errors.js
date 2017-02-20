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
     * Error al no indicarse contexto para la aplicación
     */
    var HaztivityAppContextNotFound = (function (_super) {
        __extends(HaztivityAppContextNotFound, _super);
        function HaztivityAppContextNotFound() {
            return _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP") || this;
        }
        return HaztivityAppContextNotFound;
    }(BaseError_1.BaseError));
    exports.HaztivityAppContextNotFound = HaztivityAppContextNotFound;
    /**
     * Error al no indicarse contexto para las páginas
     */
    var HaztivityPagesContextNotFound = (function (_super) {
        __extends(HaztivityPagesContextNotFound, _super);
        function HaztivityPagesContextNotFound() {
            return _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP") || this;
        }
        return HaztivityPagesContextNotFound;
    }(BaseError_1.BaseError));
    exports.HaztivityPagesContextNotFound = HaztivityPagesContextNotFound;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vRXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9iYXNlL0Jhc2VFcnJvclwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgQmFzZUVycm9yXzEgPSByZXF1aXJlKFwiLi4vYmFzZS9CYXNlRXJyb3JcIik7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgbm8gaW5kaWNhcnNlIGNvbnRleHRvIHBhcmEgbGEgYXBsaWNhY2nDs25cbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5QXBwQ29udGV4dE5vdEZvdW5kXCIsIFwibm90IGNvbnRleHQgZm91bmQgZm9yIHRoZSBhcHBsaWNhdGlvbi4gUGxlYXNlIHZpc2l0IExJTksgVE8gSEVMUFwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlBcHBDb250ZXh0Tm90Rm91bmQ7XG4gICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICBleHBvcnRzLkhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCA9IEhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZDtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBubyBpbmRpY2Fyc2UgY29udGV4dG8gcGFyYSBsYXMgcMOhZ2luYXNcbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmRcIiwgXCJub3QgY29udGV4dCBmb3VuZCBmb3IgcGFnZXMuIFBsZWFzZSB2aXNpdCBMSU5LIFRPIEhFTFBcIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQ7XG4gICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICBleHBvcnRzLkhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kID0gSGF6dGl2aXR5UGFnZXNDb250ZXh0Tm90Rm91bmQ7XG59KTtcbiJdLCJmaWxlIjoic2NvL0Vycm9ycy5qcyJ9
