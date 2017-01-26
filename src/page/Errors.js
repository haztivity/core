System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var BaseError_1, HaztivityPageAlreadyRegistered, HaztivityPageNameInvalid, HaztivityPageElementError;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al tratar de registrar una página existente
             */
            HaztivityPageAlreadyRegistered = (function (_super) {
                __extends(HaztivityPageAlreadyRegistered, _super);
                function HaztivityPageAlreadyRegistered(pageName) {
                    return _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques") || this;
                }
                return HaztivityPageAlreadyRegistered;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageAlreadyRegistered", HaztivityPageAlreadyRegistered);
            /**
             * Error al indicarse un nombre de página inválido
             */
            HaztivityPageNameInvalid = (function (_super) {
                __extends(HaztivityPageNameInvalid, _super);
                function HaztivityPageNameInvalid(pageName) {
                    return _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]") || this;
                }
                return HaztivityPageNameInvalid;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageNameInvalid", HaztivityPageNameInvalid);
            /**
             * Error al no generarse elemento en la página
             */
            HaztivityPageElementError = (function (_super) {
                __extends(HaztivityPageElementError, _super);
                function HaztivityPageElementError(pageName) {
                    return _super.call(this, "HaztivityPageElementError", "The page '" + pageName + "' $element is invalid. The template could be undefined") || this;
                }
                return HaztivityPageElementError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityPageElementError", HaztivityPageElementError);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0Vycm9ycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vYmFzZS9CYXNlRXJyb3JcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgQmFzZUVycm9yXzEsIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCwgSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkLCBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChCYXNlRXJyb3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgQmFzZUVycm9yXzEgPSBCYXNlRXJyb3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIHRyYXRhciBkZSByZWdpc3RyYXIgdW5hIHDDoWdpbmEgZXhpc3RlbnRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQocGFnZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkXCIsIFwiJ1wiICsgcGFnZU5hbWUgKyBcIicgYWxyZWFkeSBleGlzdHMuIFBhZ2VzIG11c3QgYmUgdW5pcXVlc1wiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZFwiLCBIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbmRpY2Fyc2UgdW4gbm9tYnJlIGRlIHDDoWdpbmEgaW52w6FsaWRvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlQYWdlTmFtZUludmFsaWQocGFnZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkXCIsIFwiVGhlIG5hbWUgJ1wiICsgcGFnZU5hbWUgKyBcIicgaXMgaW52YWxpZC4gT25seSBhbGxvd2VkIFthLXpBLVowLTlfLV1cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlQYWdlTmFtZUludmFsaWRcIiwgSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgbm8gZ2VuZXJhcnNlIGVsZW1lbnRvIGVuIGxhIHDDoWdpbmFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvcihwYWdlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yXCIsIFwiVGhlIHBhZ2UgJ1wiICsgcGFnZU5hbWUgKyBcIicgJGVsZW1lbnQgaXMgaW52YWxpZC4gVGhlIHRlbXBsYXRlIGNvdWxkIGJlIHVuZGVmaW5lZFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yXCIsIEhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL0Vycm9ycy5qcyJ9
