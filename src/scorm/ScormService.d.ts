/// <reference types="loglevel" />
export declare class ScormService {
    protected Logger: LogLevel;
    static readonly VERSIONS: {
        auto: string;
        v12: string;
        v2004: string;
    };
    protected _version: string;
    protected _API: any;
    protected constructor(Logger: LogLevel);
    setVersion(version: any): void;
    getAPIVersion(): string;
    doLMSInitialize(): boolean;
    doLMSFinish(): boolean;
    doLMSGetValue(parameter: any): any;
    doLMSSetValue(parameter: any, value: any): boolean;
    doLMSCommit(): boolean;
    doLMSGetLastError(): any;
    doLMSGetErrorString(errorCode: any): any;
    doLMSGetDiagnostic(errorCode: any): any;
    LMSIsInitialized(): any;
    ErrorHandler(): void;
    cmiBooleanToJs(value: any): boolean;
    getAPIHandle(): void;
    protected _findAPI(win: any): void;
    protected _getAPICall(funcname12: any, funcname2004: any): () => void;
}
