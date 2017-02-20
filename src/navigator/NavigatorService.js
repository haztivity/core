var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "./Navigator"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var Navigator_1 = require("./Navigator");
    var NavigatorService = (function () {
        function NavigatorService(_Navigator) {
            var publish = [
                "goTo",
                "isDisabled",
                "setDisabled",
                "enable",
                "disable",
                "next",
                "prev",
                "getCurrentPageData",
                "on",
                "one",
                "off"
            ];
            for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
                var method = publish_1[_i];
                this[method] = _Navigator[method].bind(_Navigator);
            }
        }
        NavigatorService.prototype.goTo = function (index) {
            return undefined;
        };
        NavigatorService.prototype.isDisabled = function () {
            return undefined;
        };
        NavigatorService.prototype.setDisabled = function (disabled) {
        };
        NavigatorService.prototype.enable = function () {
        };
        NavigatorService.prototype.disable = function () {
        };
        NavigatorService.prototype.next = function () {
            return undefined;
        };
        NavigatorService.prototype.prev = function () {
            return undefined;
        };
        NavigatorService.prototype.getCurrentPageData = function () {
            return undefined;
        };
        /**
         * @see EventEmitter#on
         */
        NavigatorService.prototype.on = function (events, data, handler) {
            return undefined;
        };
        NavigatorService.prototype.one = function (events, data, handler) {
            return undefined;
        };
        NavigatorService.prototype.off = function (events, handler) {
            return undefined;
        };
        return NavigatorService;
    }());
    NavigatorService.ON_DRAW_PAGE = Navigator_1.Navigator.ON_DRAW_PAGE;
    NavigatorService.ON_DISABLE = Navigator_1.Navigator.ON_DISABLE;
    NavigatorService.ON_ENABLE = Navigator_1.Navigator.ON_ENABLE;
    NavigatorService.ON_CHANGE_PAGE_END = Navigator_1.Navigator.ON_CHANGE_PAGE_END;
    NavigatorService.ON_CHANGE_PAGE_START = Navigator_1.Navigator.ON_CHANGE_PAGE_START;
    NavigatorService = __decorate([
        di_1.Service({
            name: "NavigatorService",
            dependencies: [
                Navigator_1.Navigator
            ]
        })
    ], NavigatorService);
    exports.NavigatorService = NavigatorService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYXZpZ2F0b3IvTmF2aWdhdG9yU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi9OYXZpZ2F0b3JcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIE5hdmlnYXRvcl8xID0gcmVxdWlyZShcIi4vTmF2aWdhdG9yXCIpO1xuICAgIHZhciBOYXZpZ2F0b3JTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTmF2aWdhdG9yU2VydmljZShfTmF2aWdhdG9yKSB7XG4gICAgICAgICAgICB2YXIgcHVibGlzaCA9IFtcbiAgICAgICAgICAgICAgICBcImdvVG9cIixcbiAgICAgICAgICAgICAgICBcImlzRGlzYWJsZWRcIixcbiAgICAgICAgICAgICAgICBcInNldERpc2FibGVkXCIsXG4gICAgICAgICAgICAgICAgXCJlbmFibGVcIixcbiAgICAgICAgICAgICAgICBcImRpc2FibGVcIixcbiAgICAgICAgICAgICAgICBcIm5leHRcIixcbiAgICAgICAgICAgICAgICBcInByZXZcIixcbiAgICAgICAgICAgICAgICBcImdldEN1cnJlbnRQYWdlRGF0YVwiLFxuICAgICAgICAgICAgICAgIFwib25cIixcbiAgICAgICAgICAgICAgICBcIm9uZVwiLFxuICAgICAgICAgICAgICAgIFwib2ZmXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHB1Ymxpc2hfMSA9IHB1Ymxpc2g7IF9pIDwgcHVibGlzaF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBwdWJsaXNoXzFbX2ldO1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXSA9IF9OYXZpZ2F0b3JbbWV0aG9kXS5iaW5kKF9OYXZpZ2F0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmdvVG8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmlzRGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5zZXREaXNhYmxlZCA9IGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICB9O1xuICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgTmF2aWdhdG9yU2VydmljZS5wcm90b3R5cGUuZ2V0Q3VycmVudFBhZ2VEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzZWUgRXZlbnRFbWl0dGVyI29uXG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBOYXZpZ2F0b3JTZXJ2aWNlO1xuICAgIH0oKSk7XG4gICAgTmF2aWdhdG9yU2VydmljZS5PTl9EUkFXX1BBR0UgPSBOYXZpZ2F0b3JfMS5OYXZpZ2F0b3IuT05fRFJBV19QQUdFO1xuICAgIE5hdmlnYXRvclNlcnZpY2UuT05fRElTQUJMRSA9IE5hdmlnYXRvcl8xLk5hdmlnYXRvci5PTl9ESVNBQkxFO1xuICAgIE5hdmlnYXRvclNlcnZpY2UuT05fRU5BQkxFID0gTmF2aWdhdG9yXzEuTmF2aWdhdG9yLk9OX0VOQUJMRTtcbiAgICBOYXZpZ2F0b3JTZXJ2aWNlLk9OX0NIQU5HRV9QQUdFX0VORCA9IE5hdmlnYXRvcl8xLk5hdmlnYXRvci5PTl9DSEFOR0VfUEFHRV9FTkQ7XG4gICAgTmF2aWdhdG9yU2VydmljZS5PTl9DSEFOR0VfUEFHRV9TVEFSVCA9IE5hdmlnYXRvcl8xLk5hdmlnYXRvci5PTl9DSEFOR0VfUEFHRV9TVEFSVDtcbiAgICBOYXZpZ2F0b3JTZXJ2aWNlID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuU2VydmljZSh7XG4gICAgICAgICAgICBuYW1lOiBcIk5hdmlnYXRvclNlcnZpY2VcIixcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvcl8xLk5hdmlnYXRvclxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIF0sIE5hdmlnYXRvclNlcnZpY2UpO1xuICAgIGV4cG9ydHMuTmF2aWdhdG9yU2VydmljZSA9IE5hdmlnYXRvclNlcnZpY2U7XG59KTtcbiJdLCJmaWxlIjoibmF2aWdhdG9yL05hdmlnYXRvclNlcnZpY2UuanMifQ==
