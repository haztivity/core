/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {Logger} from "../devTools";
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
    public escapeSuspendData = false;
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
    public escapeJSONString(str){
        return str.replace(/({"|"}|\["|"\]|":"?|"?,"?)/g,(match)=>match.replace(/"/g,'\"'));
    }
    public unescapeJSONString(str){
        return str.replace(/({'|'}|\['|'\]|':'?|'?,'?)/g,(match)=>match.replace(/'/g,'"'));
    }
    public getTotalTimeAsMillis() {
        const raw = this.doLMSGetValue("cmi.core.total_time");
        const parsed= this.parseScormTimeToMillis(raw);
        return parsed;
    }
    public setSessionTimeAsMillis(millis){
        const parsed = this.parseMillisToScormTime(millis);
        return this.doLMSSetValue( "cmi.core.session_time", parsed);
    }
    public parseMillisToScormTime(timeInMillis) {
        let hours:any = Math.floor(timeInMillis / (1000 * 60 * 60) % 24),
            minutes:any = Math.floor(timeInMillis / (1000 * 60) % 60),
            seconds:any = Math.floor(timeInMillis / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':'+ minutes + ':' + seconds;
    }
    public parseScormTimeToMillis(scoTime) {
        const times = scoTime.split(":");
        return (parseInt(times[0])*3600000)+(parseInt(times[1])*60000)+(parseInt(times[2])*1000);
    }
    public setSuspendData(data,commit=true):boolean{
        let result = false;
        if(this.LMSIsInitialized()){
            try{
                let parsed = JSON.stringify(data);
                //replace " with '
                if(this.escapeSuspendData){
                    parsed = this.escapeJSONString(parsed);
                }
                this.doLMSSetValue(`cmi.suspend_data`, parsed);
                if(commit) {
                    this.doLMSCommit();
                }
                result = true;
            }catch(e){
                console.error("[ScormService] Failed setting suspend data:",e.message);
            }
        }
        return result;
    }
    public getSuspendData(){
        let result;
        if(this.LMSIsInitialized()){
            let data = this.doLMSGetValue(`cmi.suspend_data`);
            if(!!data){
                if(this.escapeSuspendData){
                    data = this.unescapeJSONString(data);
                }
                try {
                    result = JSON.parse(data);
                } catch (e) {
                    result = {};
                    console.error("[ScormService] Failed getting suspend data:",e.message);
                }
            }else{
                result = {};
            }
        }else{
            result = {};
        }
        return result;
    }
    public getAPIVersion(): string {
        return this._version;
    }

    public doLMSInitialize(): boolean {
        this.getAPIHandle();
        if (!this._API?.Initialized) {
            const result = this.cmiBooleanToJs(this._getAPICall("LMSInitialize", "Initialize")(""));
            if (this._version == ScormService.VERSIONS.v12) {
                this._API.Initialized = result;
            }
            return result;
        } else {
            return false;
        }
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
        return this._API.Initialized;
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
                this._API.Initialized = false;
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
                return (()=>{
                    Logger.error("ScormService",
                                 `No API found, unable to execute ${this.getAPIVersion() === ScormService.VERSIONS.v2004
                                     ? funcname2004
                                     : funcname12}`
                    );
                });
            }
        }

        switch (this._version) {
            case ScormService.VERSIONS.v2004:
                return ()=> {
                    return this._API[funcname2004].apply(this._API, arguments);
                };
            default:
                return ()=> {
                    return this._API[funcname12].apply(this._API, arguments);
                };
        }
    };
}
