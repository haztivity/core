System.register(["../di", "./Navigator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, Navigator_1, NavigatorService;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (Navigator_1_1) {
                Navigator_1 = Navigator_1_1;
            }
        ],
        execute: function () {
            NavigatorService = (function () {
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
            exports_1("NavigatorService", NavigatorService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYXZpZ2F0b3IvTmF2aWdhdG9yU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuL05hdmlnYXRvclwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIE5hdmlnYXRvcl8xLCBOYXZpZ2F0b3JTZXJ2aWNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChOYXZpZ2F0b3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yXzEgPSBOYXZpZ2F0b3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBOYXZpZ2F0b3JTZXJ2aWNlKF9OYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHB1Ymxpc2ggPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImdvVG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNEaXNhYmxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXREaXNhYmxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzYWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZ2V0Q3VycmVudFBhZ2VEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHB1Ymxpc2hfMSA9IHB1Ymxpc2g7IF9pIDwgcHVibGlzaF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHB1Ymxpc2hfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0gPSBfTmF2aWdhdG9yW21ldGhvZF0uYmluZChfTmF2aWdhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5nb1RvID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yU2VydmljZS5wcm90b3R5cGUuc2V0RGlzYWJsZWQgPSBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yU2VydmljZS5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UucHJvdG90eXBlLmdldEN1cnJlbnRQYWdlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBzZWUgRXZlbnRFbWl0dGVyI29uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yU2VydmljZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnRzLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF2aWdhdG9yU2VydmljZTtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLk9OX0RSQVdfUEFHRSA9IE5hdmlnYXRvcl8xLk5hdmlnYXRvci5PTl9EUkFXX1BBR0U7XG4gICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlLk9OX0RJU0FCTEUgPSBOYXZpZ2F0b3JfMS5OYXZpZ2F0b3IuT05fRElTQUJMRTtcbiAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UuT05fRU5BQkxFID0gTmF2aWdhdG9yXzEuTmF2aWdhdG9yLk9OX0VOQUJMRTtcbiAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UuT05fQ0hBTkdFX1BBR0VfRU5EID0gTmF2aWdhdG9yXzEuTmF2aWdhdG9yLk9OX0NIQU5HRV9QQUdFX0VORDtcbiAgICAgICAgICAgIE5hdmlnYXRvclNlcnZpY2UuT05fQ0hBTkdFX1BBR0VfU1RBUlQgPSBOYXZpZ2F0b3JfMS5OYXZpZ2F0b3IuT05fQ0hBTkdFX1BBR0VfU1RBUlQ7XG4gICAgICAgICAgICBOYXZpZ2F0b3JTZXJ2aWNlID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5TZXJ2aWNlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOYXZpZ2F0b3JTZXJ2aWNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgTmF2aWdhdG9yXzEuTmF2aWdhdG9yXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgTmF2aWdhdG9yU2VydmljZSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJOYXZpZ2F0b3JTZXJ2aWNlXCIsIE5hdmlnYXRvclNlcnZpY2UpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJuYXZpZ2F0b3IvTmF2aWdhdG9yU2VydmljZS5qcyJ9
