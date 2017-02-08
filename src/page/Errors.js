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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0Vycm9ycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vYmFzZS9CYXNlRXJyb3JcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBCYXNlRXJyb3JfMSwgSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkLCBIYXp0aXZpdHlQYWdlTmFtZUludmFsaWQsIEhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKEJhc2VFcnJvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBCYXNlRXJyb3JfMSA9IEJhc2VFcnJvcl8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgdHJhdGFyIGRlIHJlZ2lzdHJhciB1bmEgcMOhZ2luYSBleGlzdGVudGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZChwYWdlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWRcIiwgXCInXCIgKyBwYWdlTmFtZSArIFwiJyBhbHJlYWR5IGV4aXN0cy4gUGFnZXMgbXVzdCBiZSB1bmlxdWVzXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQ7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkXCIsIEhhenRpdml0eVBhZ2VBbHJlYWR5UmVnaXN0ZXJlZCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGluZGljYXJzZSB1biBub21icmUgZGUgcMOhZ2luYSBpbnbDoWxpZG9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eVBhZ2VOYW1lSW52YWxpZChwYWdlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlQYWdlTmFtZUludmFsaWRcIiwgXCJUaGUgbmFtZSAnXCIgKyBwYWdlTmFtZSArIFwiJyBpcyBpbnZhbGlkLiBPbmx5IGFsbG93ZWQgW2EtekEtWjAtOV8tXVwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5UGFnZU5hbWVJbnZhbGlkO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eVBhZ2VOYW1lSW52YWxpZFwiLCBIYXp0aXZpdHlQYWdlTmFtZUludmFsaWQpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBubyBnZW5lcmFyc2UgZWxlbWVudG8gZW4gbGEgcMOhZ2luYVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yKHBhZ2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3JcIiwgXCJUaGUgcGFnZSAnXCIgKyBwYWdlTmFtZSArIFwiJyAkZWxlbWVudCBpcyBpbnZhbGlkLiBUaGUgdGVtcGxhdGUgY291bGQgYmUgdW5kZWZpbmVkXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlQYWdlRWxlbWVudEVycm9yO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eVBhZ2VFbGVtZW50RXJyb3JcIiwgSGF6dGl2aXR5UGFnZUVsZW1lbnRFcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvRXJyb3JzLmpzIn0=
