System.register(["../debug"], function (exports_1, context_1) {
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
    var debug_1, BaseError;
    return {
        setters: [
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }
        ],
        execute: function () {
            debug_1.Logger;
            BaseError = (function (_super) {
                __extends(BaseError, _super);
                function BaseError(name, message) {
                    var _this = _super.call(this, message) || this;
                    _this.name = name;
                    _this.message = message;
                    debug_1.Logger.error(name, message);
                    return _this;
                }
                return BaseError;
            }(Error));
            exports_1("BaseError", BaseError);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYXNlL0Jhc2VFcnJvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGVidWdcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkZWJ1Z18xLCBCYXNlRXJyb3I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRlYnVnXzFfMSkge1xuICAgICAgICAgICAgICAgIGRlYnVnXzEgPSBkZWJ1Z18xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnXzEuTG9nZ2VyO1xuICAgICAgICAgICAgQmFzZUVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoQmFzZUVycm9yLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEJhc2VFcnJvcihuYW1lLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdfMS5Mb2dnZXIuZXJyb3IobmFtZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhc2VFcnJvcjtcbiAgICAgICAgICAgIH0oRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkJhc2VFcnJvclwiLCBCYXNlRXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJiYXNlL0Jhc2VFcnJvci5qcyJ9
