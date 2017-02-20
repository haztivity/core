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
        define(["require", "exports", "../di", "../debug"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var debug_1 = require("../debug");
    var ScormService = ScormService_1 = (function () {
        function ScormService(Logger) {
            this.Logger = Logger;
            this._version = ScormService_1.VERSIONS.auto;
        }
        ScormService.prototype.setVersion = function (version) {
            var versions = ScormService_1.VERSIONS, keys = Object.keys(versions);
            for (var versionIndex = 0, keysLength = keys.length; versionIndex < keysLength; versionIndex++) {
                var currentKey = keys[versionIndex], currentVersion = versions[currentKey];
                if (currentVersion === version) {
                    this._version = version;
                    versionIndex = keysLength;
                }
            }
            this._version = this._version || versions.auto;
        };
        ScormService.prototype.getAPIVersion = function () {
            return this._version;
        };
        ScormService.prototype.doLMSInitialize = function () {
            return this.cmiBooleanToJs(this._getAPICall("LMSInitialize", "Initialize")(""));
        };
        ScormService.prototype.doLMSFinish = function () {
            return this.cmiBooleanToJs(this._getAPICall("LMSFinish", "Terminate")(""));
        };
        ScormService.prototype.doLMSGetValue = function (parameter) {
            return this._getAPICall("LMSGetValue", "GetValue")(parameter);
        };
        ScormService.prototype.doLMSSetValue = function (parameter, value) {
            return this.cmiBooleanToJs(this._getAPICall("LMSSetValue", "SetValue")(parameter, value));
        };
        ScormService.prototype.doLMSCommit = function () {
            return this.cmiBooleanToJs(this._getAPICall("LMSCommit", "Commit")(""));
        };
        ScormService.prototype.doLMSGetLastError = function () {
            return this._getAPICall("LMSGetLastError", "GetLastError")();
        };
        ScormService.prototype.doLMSGetErrorString = function (errorCode) {
            return this._getAPICall("LMSGetErrorString", "GetErrorString")(errorCode.toString());
        };
        ScormService.prototype.doLMSGetDiagnostic = function (errorCode) {
            return this._getAPICall("LMSGetDiagnostic", "GetDiagnostic")(errorCode.toString());
        };
        ScormService.prototype.LMSIsInitialized = function () {
            return this._API;
        };
        ScormService.prototype.ErrorHandler = function () {
            return this._getAPICall("LMSGetLastError", "GetLastError")();
        };
        ScormService.prototype.cmiBooleanToJs = function (value) {
            return (value === "1" || value === 1 || value === "true" || value === true);
        };
        ScormService.prototype.getAPIHandle = function () {
            var win = window;
            if (win.parent && win.parent != win) {
                this._findAPI(win.parent);
            }
            if (!this._API && win.top.opener) {
                this._findAPI(win.top.opener);
            }
            else if (!this._API) {
                debug_1.Logger.warn("ScormService", "Unable to find API adapter");
            }
        };
        ScormService.prototype._findAPI = function (win) {
            var findAttempts = 0, findAttemptLimit = 500;
            for (findAttempts; findAttempts < findAttemptLimit; findAttempts++) {
                if (win.API && (this._version === ScormService_1.VERSIONS.v12 || this._version === ScormService_1.VERSIONS.auto)) {
                    this._API = win.API;
                    this._version = ScormService_1.VERSIONS.v12;
                    findAttempts = findAttemptLimit;
                }
                else if (win.API_1484_11 && (this._version === ScormService_1.VERSIONS.v2004 || this._version === ScormService_1.VERSIONS.auto)) {
                    this._API = win.API_1484_11;
                    this._version = "2004";
                    findAttempts = findAttemptLimit;
                }
                else if (win.parent && win.parent != win) {
                    findAttempts++;
                    win = win.parent;
                }
            }
        };
        ScormService.prototype._getAPICall = function (funcname12, funcname2004) {
            var _this = this;
            if (!this._API) {
                this.getAPIHandle();
                if (!this._API) {
                    return (function () {
                        debug_1.Logger.error("ScormService", "No API found, unable to execute " + (_this.getAPIVersion() === ScormService_1.VERSIONS.v2004
                            ? funcname2004
                            : funcname12));
                    });
                }
            }
            switch (this._version) {
                case ScormService_1.VERSIONS.v2004:
                    return function () {
                        return _this._API[funcname2004].apply(_this._API, arguments);
                    };
                default:
                    return function () {
                        return _this._API[funcname12].apply(_this._API, arguments);
                    };
            }
        };
        ;
        return ScormService;
    }());
    ScormService.VERSIONS = {
        auto: "Auto",
        v12: "1.2",
        v2004: "2004"
    };
    ScormService = ScormService_1 = __decorate([
        di_1.Service({
            name: "ScormService",
            dependencies: [
                debug_1.Logger
            ]
        })
    ], ScormService);
    exports.ScormService = ScormService;
    var ScormService_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY29ybS9TY29ybVNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9kaVwiLCBcIi4uL2RlYnVnXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBkZWJ1Z18xID0gcmVxdWlyZShcIi4uL2RlYnVnXCIpO1xuICAgIHZhciBTY29ybVNlcnZpY2UgPSBTY29ybVNlcnZpY2VfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFNjb3JtU2VydmljZShMb2dnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuTG9nZ2VyID0gTG9nZ2VyO1xuICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLmF1dG87XG4gICAgICAgIH1cbiAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5zZXRWZXJzaW9uID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgIHZhciB2ZXJzaW9ucyA9IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLCBrZXlzID0gT2JqZWN0LmtleXModmVyc2lvbnMpO1xuICAgICAgICAgICAgZm9yICh2YXIgdmVyc2lvbkluZGV4ID0gMCwga2V5c0xlbmd0aCA9IGtleXMubGVuZ3RoOyB2ZXJzaW9uSW5kZXggPCBrZXlzTGVuZ3RoOyB2ZXJzaW9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5c1t2ZXJzaW9uSW5kZXhdLCBjdXJyZW50VmVyc2lvbiA9IHZlcnNpb25zW2N1cnJlbnRLZXldO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmVyc2lvbiA9PT0gdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbkluZGV4ID0ga2V5c0xlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gdGhpcy5fdmVyc2lvbiB8fCB2ZXJzaW9ucy5hdXRvO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmdldEFQSVZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICAgICAgfTtcbiAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5kb0xNU0luaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbWlCb29sZWFuVG9Kcyh0aGlzLl9nZXRBUElDYWxsKFwiTE1TSW5pdGlhbGl6ZVwiLCBcIkluaXRpYWxpemVcIikoXCJcIikpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TRmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY21pQm9vbGVhblRvSnModGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0ZpbmlzaFwiLCBcIlRlcm1pbmF0ZVwiKShcIlwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNHZXRWYWx1ZSA9IGZ1bmN0aW9uIChwYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBUElDYWxsKFwiTE1TR2V0VmFsdWVcIiwgXCJHZXRWYWx1ZVwiKShwYXJhbWV0ZXIpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TU2V0VmFsdWUgPSBmdW5jdGlvbiAocGFyYW1ldGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY21pQm9vbGVhblRvSnModGhpcy5fZ2V0QVBJQ2FsbChcIkxNU1NldFZhbHVlXCIsIFwiU2V0VmFsdWVcIikocGFyYW1ldGVyLCB2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TQ29tbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY21pQm9vbGVhblRvSnModGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0NvbW1pdFwiLCBcIkNvbW1pdFwiKShcIlwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNHZXRMYXN0RXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0dldExhc3RFcnJvclwiLCBcIkdldExhc3RFcnJvclwiKSgpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TR2V0RXJyb3JTdHJpbmcgPSBmdW5jdGlvbiAoZXJyb3JDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0dldEVycm9yU3RyaW5nXCIsIFwiR2V0RXJyb3JTdHJpbmdcIikoZXJyb3JDb2RlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TR2V0RGlhZ25vc3RpYyA9IGZ1bmN0aW9uIChlcnJvckNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBUElDYWxsKFwiTE1TR2V0RGlhZ25vc3RpY1wiLCBcIkdldERpYWdub3N0aWNcIikoZXJyb3JDb2RlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLkxNU0lzSW5pdGlhbGl6ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQVBJO1xuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLkVycm9ySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBUElDYWxsKFwiTE1TR2V0TGFzdEVycm9yXCIsIFwiR2V0TGFzdEVycm9yXCIpKCk7XG4gICAgICAgIH07XG4gICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuY21pQm9vbGVhblRvSnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IFwiMVwiIHx8IHZhbHVlID09PSAxIHx8IHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZ2V0QVBJSGFuZGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdpbiA9IHdpbmRvdztcbiAgICAgICAgICAgIGlmICh3aW4ucGFyZW50ICYmIHdpbi5wYXJlbnQgIT0gd2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZEFQSSh3aW4ucGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fQVBJICYmIHdpbi50b3Aub3BlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZEFQSSh3aW4udG9wLm9wZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5fQVBJKSB7XG4gICAgICAgICAgICAgICAgZGVidWdfMS5Mb2dnZXIud2FybihcIlNjb3JtU2VydmljZVwiLCBcIlVuYWJsZSB0byBmaW5kIEFQSSBhZGFwdGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLl9maW5kQVBJID0gZnVuY3Rpb24gKHdpbikge1xuICAgICAgICAgICAgdmFyIGZpbmRBdHRlbXB0cyA9IDAsIGZpbmRBdHRlbXB0TGltaXQgPSA1MDA7XG4gICAgICAgICAgICBmb3IgKGZpbmRBdHRlbXB0czsgZmluZEF0dGVtcHRzIDwgZmluZEF0dGVtcHRMaW1pdDsgZmluZEF0dGVtcHRzKyspIHtcbiAgICAgICAgICAgICAgICBpZiAod2luLkFQSSAmJiAodGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMudjEyIHx8IHRoaXMuX3ZlcnNpb24gPT09IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLmF1dG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0FQSSA9IHdpbi5BUEk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnNpb24gPSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MTI7XG4gICAgICAgICAgICAgICAgICAgIGZpbmRBdHRlbXB0cyA9IGZpbmRBdHRlbXB0TGltaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpbi5BUElfMTQ4NF8xMSAmJiAodGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMudjIwMDQgfHwgdGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMuYXV0bykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fQVBJID0gd2luLkFQSV8xNDg0XzExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gXCIyMDA0XCI7XG4gICAgICAgICAgICAgICAgICAgIGZpbmRBdHRlbXB0cyA9IGZpbmRBdHRlbXB0TGltaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpbi5wYXJlbnQgJiYgd2luLnBhcmVudCAhPSB3aW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZEF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgIHdpbiA9IHdpbi5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLl9nZXRBUElDYWxsID0gZnVuY3Rpb24gKGZ1bmNuYW1lMTIsIGZ1bmNuYW1lMjAwNCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmICghdGhpcy5fQVBJKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBUElIYW5kbGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX0FQSSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnXzEuTG9nZ2VyLmVycm9yKFwiU2Nvcm1TZXJ2aWNlXCIsIFwiTm8gQVBJIGZvdW5kLCB1bmFibGUgdG8gZXhlY3V0ZSBcIiArIChfdGhpcy5nZXRBUElWZXJzaW9uKCkgPT09IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLnYyMDA0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmdW5jbmFtZTIwMDRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZ1bmNuYW1lMTIpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl92ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MjAwNDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fQVBJW2Z1bmNuYW1lMjAwNF0uYXBwbHkoX3RoaXMuX0FQSSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9BUElbZnVuY25hbWUxMl0uYXBwbHkoX3RoaXMuX0FQSSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gU2Nvcm1TZXJ2aWNlO1xuICAgIH0oKSk7XG4gICAgU2Nvcm1TZXJ2aWNlLlZFUlNJT05TID0ge1xuICAgICAgICBhdXRvOiBcIkF1dG9cIixcbiAgICAgICAgdjEyOiBcIjEuMlwiLFxuICAgICAgICB2MjAwNDogXCIyMDA0XCJcbiAgICB9O1xuICAgIFNjb3JtU2VydmljZSA9IFNjb3JtU2VydmljZV8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuU2VydmljZSh7XG4gICAgICAgICAgICBuYW1lOiBcIlNjb3JtU2VydmljZVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgZGVidWdfMS5Mb2dnZXJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBTY29ybVNlcnZpY2UpO1xuICAgIGV4cG9ydHMuU2Nvcm1TZXJ2aWNlID0gU2Nvcm1TZXJ2aWNlO1xuICAgIHZhciBTY29ybVNlcnZpY2VfMTtcbn0pO1xuIl0sImZpbGUiOiJzY29ybS9TY29ybVNlcnZpY2UuanMifQ==
