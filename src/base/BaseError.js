System.register(["../debug"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYXNlL0Jhc2VFcnJvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGVidWdcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgZGVidWdfMSwgQmFzZUVycm9yO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkZWJ1Z18xXzEpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z18xID0gZGVidWdfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1Z18xLkxvZ2dlcjtcbiAgICAgICAgICAgIEJhc2VFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEJhc2VFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBCYXNlRXJyb3IobmFtZSwgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnXzEuTG9nZ2VyLmVycm9yKG5hbWUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBCYXNlRXJyb3I7XG4gICAgICAgICAgICB9KEVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJCYXNlRXJyb3JcIiwgQmFzZUVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoiYmFzZS9CYXNlRXJyb3IuanMifQ==
