"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var devTools_1 = require("../devTools");
var ScormService = /** @class */ (function () {
    function ScormService(Logger) {
        this.Logger = Logger;
        this._version = ScormService_1.VERSIONS.auto;
    }
    ScormService_1 = ScormService;
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
            devTools_1.Logger.warn("ScormService", "Unable to find API adapter");
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
                    devTools_1.Logger.error("ScormService", "No API found, unable to execute " + (_this.getAPIVersion() === ScormService_1.VERSIONS.v2004
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
    ScormService.VERSIONS = {
        auto: "Auto",
        v12: "1.2",
        v2004: "2004"
    };
    ScormService = ScormService_1 = __decorate([
        di_1.Service({
            name: "ScormService",
            dependencies: [
                devTools_1.Logger
            ]
        })
    ], ScormService);
    return ScormService;
    var ScormService_1;
}());
exports.ScormService = ScormService;
//# sourceMappingURL=ScormService.js.map