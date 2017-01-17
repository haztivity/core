/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {Logger} from "../debug";
@Service(
    {
        name: "ScormService",
        dependencies: [
            Logger
        ]
    }
)
export class ScormService {
    public static readonly VERSIONS = {
        auto: "Auto",
        v12: "1.2",
        v2004: "2004"
    };

    protected _version: string;
    protected _API: any;

    protected constructor(protected Logger:LogLevel) {
        this._version = ScormService.VERSIONS.auto;
    }

    public setVersion(version) {
        let versions = ScormService.VERSIONS,
            keys = Object.keys(versions);
        for (let versionIndex = 0, keysLength = keys.length; versionIndex < keysLength; versionIndex++) {
            let currentKey = keys[versionIndex],
                currentVersion = versions[currentKey];
            if (currentVersion === version) {
                this._version = version;
                versionIndex = keysLength;
            }
        }
        this._version = this._version || versions.auto;
    }

    public getAPIVersion(): string {
        return this._version;
    }

    public doLMSInitialize(): boolean {
        return this.cmiBooleanToJs(this._getAPICall("LMSInitialize", "Initialize")(""));
    }

    public doLMSFinish(): boolean {
        return this.cmiBooleanToJs(this._getAPICall("LMSFinish", "Terminate")(""));
    }

    public doLMSGetValue(parameter): any {
        return this._getAPICall("LMSGetValue", "GetValue")(parameter);
    }

    public doLMSSetValue(parameter, value): boolean {
        return this.cmiBooleanToJs(this._getAPICall("LMSSetValue", "SetValue")(parameter, value));
    }

    public doLMSCommit(): boolean {
        return this.cmiBooleanToJs(this._getAPICall("LMSCommit", "Commit")(""));
    }

    public doLMSGetLastError(): any {
        return this._getAPICall("LMSGetLastError", "GetLastError")();
    }

    public doLMSGetErrorString(errorCode): any {
        return this._getAPICall("LMSGetErrorString", "GetErrorString")(errorCode.toString());
    }

    public doLMSGetDiagnostic(errorCode): any {
        return this._getAPICall("LMSGetDiagnostic", "GetDiagnostic")(errorCode.toString());
    }

    public LMSIsInitialized() {
        return this._API;
    }

    public ErrorHandler() {
        return this._getAPICall("LMSGetLastError", "GetLastError")();
    }

    public cmiBooleanToJs(value) {
        return (value === "1" || value === 1 || value === "true" || value === true);
    }

    public getAPIHandle() {

        let win = window;

        if (win.parent && win.parent != win) {
            this._findAPI(win.parent);
        }

        if (!this._API && win.top.opener) {
            this._findAPI(win.top.opener);
        } else if (!this._API) {
            Logger.warn("ScormService", "Unable to find API adapter");
        }
    }

    protected _findAPI(win) {

        let findAttempts = 0,
            findAttemptLimit = 500;
        for (findAttempts; findAttempts < findAttemptLimit; findAttempts++) {
            if (win.API && (this._version === ScormService.VERSIONS.v12 || this._version === ScormService.VERSIONS.auto)) {
                this._API = win.API;
                this._version = ScormService.VERSIONS.v12;
                findAttempts = findAttemptLimit;
            } else if (win.API_1484_11 && (this._version === ScormService.VERSIONS.v2004 || this._version === ScormService.VERSIONS.auto)) {
                this._API = win.API_1484_11;
                this._version = "2004";
                findAttempts = findAttemptLimit;
            } else if (win.parent && win.parent != win) {
                findAttempts++;
                win = win.parent;
            }
        }
    }

    protected _getAPICall(funcname12, funcname2004) {

        if (!this._API) {
            this.getAPIHandle();
            if (!this._API) {
                return (function () {
                    Logger.error("ScormService",
                                 `No API found, unable to execute ${this._version === ScormService.VERSIONS.v2004
                                     ? funcname2004
                                     : funcname12}`
                    );
                });
            }
        }

        switch (this._version) {
            case ScormService.VERSIONS.v2004:
                return function () {
                    return this._API[funcname2004].apply(this._API, arguments);
                };
            default:
                return function () {
                    return this._API[funcname12].apply(this._API, arguments);
                };
        }
    };
}
