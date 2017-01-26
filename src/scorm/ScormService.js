System.register(["../di", "../debug"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, debug_1, ScormService, ScormService_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }
        ],
        execute: function () {
            ScormService = ScormService_1 = (function () {
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
            exports_1("ScormService", ScormService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY29ybS9TY29ybVNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi4vZGVidWdcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBkZWJ1Z18xLCBTY29ybVNlcnZpY2UsIFNjb3JtU2VydmljZV8xO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkZWJ1Z18xXzEpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z18xID0gZGVidWdfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTY29ybVNlcnZpY2UgPSBTY29ybVNlcnZpY2VfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2Nvcm1TZXJ2aWNlKExvZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkxvZ2dlciA9IExvZ2dlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLmF1dG87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuc2V0VmVyc2lvbiA9IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9ucyA9IFNjb3JtU2VydmljZV8xLlZFUlNJT05TLCBrZXlzID0gT2JqZWN0LmtleXModmVyc2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB2ZXJzaW9uSW5kZXggPSAwLCBrZXlzTGVuZ3RoID0ga2V5cy5sZW5ndGg7IHZlcnNpb25JbmRleCA8IGtleXNMZW5ndGg7IHZlcnNpb25JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXNbdmVyc2lvbkluZGV4XSwgY3VycmVudFZlcnNpb24gPSB2ZXJzaW9uc1tjdXJyZW50S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmVyc2lvbiA9PT0gdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb25JbmRleCA9IGtleXNMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHRoaXMuX3ZlcnNpb24gfHwgdmVyc2lvbnMuYXV0bztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZ2V0QVBJVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTY29ybVNlcnZpY2UucHJvdG90eXBlLmRvTE1TSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY21pQm9vbGVhblRvSnModGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0luaXRpYWxpemVcIiwgXCJJbml0aWFsaXplXCIpKFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNGaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNtaUJvb2xlYW5Ub0pzKHRoaXMuX2dldEFQSUNhbGwoXCJMTVNGaW5pc2hcIiwgXCJUZXJtaW5hdGVcIikoXCJcIikpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5kb0xNU0dldFZhbHVlID0gZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0dldFZhbHVlXCIsIFwiR2V0VmFsdWVcIikocGFyYW1ldGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNTZXRWYWx1ZSA9IGZ1bmN0aW9uIChwYXJhbWV0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNtaUJvb2xlYW5Ub0pzKHRoaXMuX2dldEFQSUNhbGwoXCJMTVNTZXRWYWx1ZVwiLCBcIlNldFZhbHVlXCIpKHBhcmFtZXRlciwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNDb21taXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNtaUJvb2xlYW5Ub0pzKHRoaXMuX2dldEFQSUNhbGwoXCJMTVNDb21taXRcIiwgXCJDb21taXRcIikoXCJcIikpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5kb0xNU0dldExhc3RFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUNhbGwoXCJMTVNHZXRMYXN0RXJyb3JcIiwgXCJHZXRMYXN0RXJyb3JcIikoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNHZXRFcnJvclN0cmluZyA9IGZ1bmN0aW9uIChlcnJvckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUNhbGwoXCJMTVNHZXRFcnJvclN0cmluZ1wiLCBcIkdldEVycm9yU3RyaW5nXCIpKGVycm9yQ29kZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuZG9MTVNHZXREaWFnbm9zdGljID0gZnVuY3Rpb24gKGVycm9yQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0dldERpYWdub3N0aWNcIiwgXCJHZXREaWFnbm9zdGljXCIpKGVycm9yQ29kZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuTE1TSXNJbml0aWFsaXplZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FQSTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuRXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJQ2FsbChcIkxNU0dldExhc3RFcnJvclwiLCBcIkdldExhc3RFcnJvclwiKSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5jbWlCb29sZWFuVG9KcyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBcIjFcIiB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5nZXRBUElIYW5kbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW4gPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW4ucGFyZW50ICYmIHdpbi5wYXJlbnQgIT0gd2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kQVBJKHdpbi5wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fQVBJICYmIHdpbi50b3Aub3BlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kQVBJKHdpbi50b3Aub3BlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5fQVBJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z18xLkxvZ2dlci53YXJuKFwiU2Nvcm1TZXJ2aWNlXCIsIFwiVW5hYmxlIHRvIGZpbmQgQVBJIGFkYXB0ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb3JtU2VydmljZS5wcm90b3R5cGUuX2ZpbmRBUEkgPSBmdW5jdGlvbiAod2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5kQXR0ZW1wdHMgPSAwLCBmaW5kQXR0ZW1wdExpbWl0ID0gNTAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGZpbmRBdHRlbXB0czsgZmluZEF0dGVtcHRzIDwgZmluZEF0dGVtcHRMaW1pdDsgZmluZEF0dGVtcHRzKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW4uQVBJICYmICh0aGlzLl92ZXJzaW9uID09PSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MTIgfHwgdGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMuYXV0bykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9BUEkgPSB3aW4uQVBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnNpb24gPSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZEF0dGVtcHRzID0gZmluZEF0dGVtcHRMaW1pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpbi5BUElfMTQ4NF8xMSAmJiAodGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMudjIwMDQgfHwgdGhpcy5fdmVyc2lvbiA9PT0gU2Nvcm1TZXJ2aWNlXzEuVkVSU0lPTlMuYXV0bykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9BUEkgPSB3aW4uQVBJXzE0ODRfMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IFwiMjAwNFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmRBdHRlbXB0cyA9IGZpbmRBdHRlbXB0TGltaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh3aW4ucGFyZW50ICYmIHdpbi5wYXJlbnQgIT0gd2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZEF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luID0gd2luLnBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU2Nvcm1TZXJ2aWNlLnByb3RvdHlwZS5fZ2V0QVBJQ2FsbCA9IGZ1bmN0aW9uIChmdW5jbmFtZTEyLCBmdW5jbmFtZTIwMDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9BUEkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QVBJSGFuZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX0FQSSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z18xLkxvZ2dlci5lcnJvcihcIlNjb3JtU2VydmljZVwiLCBcIk5vIEFQSSBmb3VuZCwgdW5hYmxlIHRvIGV4ZWN1dGUgXCIgKyAoX3RoaXMuZ2V0QVBJVmVyc2lvbigpID09PSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MjAwNFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmdW5jbmFtZTIwMDRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZnVuY25hbWUxMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTY29ybVNlcnZpY2VfMS5WRVJTSU9OUy52MjAwNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX0FQSVtmdW5jbmFtZTIwMDRdLmFwcGx5KF90aGlzLl9BUEksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9BUElbZnVuY25hbWUxMl0uYXBwbHkoX3RoaXMuX0FQSSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNjb3JtU2VydmljZTtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBTY29ybVNlcnZpY2UuVkVSU0lPTlMgPSB7XG4gICAgICAgICAgICAgICAgYXV0bzogXCJBdXRvXCIsXG4gICAgICAgICAgICAgICAgdjEyOiBcIjEuMlwiLFxuICAgICAgICAgICAgICAgIHYyMDA0OiBcIjIwMDRcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFNjb3JtU2VydmljZSA9IFNjb3JtU2VydmljZV8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5TZXJ2aWNlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTY29ybVNlcnZpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z18xLkxvZ2dlclxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFNjb3JtU2VydmljZSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJTY29ybVNlcnZpY2VcIiwgU2Nvcm1TZXJ2aWNlKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoic2Nvcm0vU2Nvcm1TZXJ2aWNlLmpzIn0=
