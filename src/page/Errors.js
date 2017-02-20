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
     * Error al tratar de registrar una página existente
     */
    var HaztivityPageAlreadyRegistered = (function (_super) {
        __extends(HaztivityPageAlreadyRegistered, _super);
        function HaztivityPageAlreadyRegistered(pageName) {
            return _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques") || this;
        }
        return HaztivityPageAlreadyRegistered;
    }(BaseError_1.BaseError));
    exports.HaztivityPageAlreadyRegistered = HaztivityPageAlreadyRegistered;
    /**
     * Error al indicarse un nombre de página inválido
     */
    var HaztivityPageNameInvalid = (function (_super) {
        __extends(HaztivityPageNameInvalid, _super);
        function HaztivityPageNameInvalid(pageName) {
            return _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]") || this;
        }
        return HaztivityPageNameInvalid;
    }(BaseError_1.BaseError));
    exports.HaztivityPageNameInvalid = HaztivityPageNameInvalid;
    /**
     * Error al no generarse elemento en la página
     */
    var HaztivityPageElementError = (function (_super) {
        __extends(HaztivityPageElementError, _super);
        function HaztivityPageElementError(pageName) {
            return _super.call(this, "HaztivityPageElementError", "The page '" + pageName + "' $element is invalid. The template could be undefined") || this;
        }
        return HaztivityPageElementError;
    }(BaseError_1.BaseError));
    exports.HaztivityPageElementError = HaztivityPageElementError;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0Vycm9ycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vYmFzZS9CYXNlRXJyb3JcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIEJhc2VFcnJvcl8xID0gcmVxdWlyZShcIi4uL2Jhc2UvQmFzZUVycm9yXCIpO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIHRyYXRhciBkZSByZWdpc3RyYXIgdW5hIHDDoWdpbmEgZXhpc3RlbnRlXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZChwYWdlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkXCIsIFwiJ1wiICsgcGFnZU5hbWUgKyBcIicgYWxyZWFkeSBleGlzdHMuIFBhZ2VzIG11c3QgYmUgdW5pcXVlc1wiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQ7XG4gICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICBleHBvcnRzLkhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCA9IEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZDtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbmRpY2Fyc2UgdW4gbm9tYnJlIGRlIHDDoWdpbmEgaW52w6FsaWRvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlQYWdlTmFtZUludmFsaWQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZChwYWdlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkXCIsIFwiVGhlIG5hbWUgJ1wiICsgcGFnZU5hbWUgKyBcIicgaXMgaW52YWxpZC4gT25seSBhbGxvd2VkIFthLXpBLVowLTlfLV1cIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlQYWdlTmFtZUludmFsaWQgPSBIYXp0aXZpdHlQYWdlTmFtZUludmFsaWQ7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgbm8gZ2VuZXJhcnNlIGVsZW1lbnRvIGVuIGxhIHDDoWdpbmFcbiAgICAgKi9cbiAgICB2YXIgSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yKHBhZ2VOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yXCIsIFwiVGhlIHBhZ2UgJ1wiICsgcGFnZU5hbWUgKyBcIicgJGVsZW1lbnQgaXMgaW52YWxpZC4gVGhlIHRlbXBsYXRlIGNvdWxkIGJlIHVuZGVmaW5lZFwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yID0gSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvcjtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL0Vycm9ycy5qcyJ9
