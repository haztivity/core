/// <reference types="jquery" />
import { S } from "./String";
export declare class DataOptions {
    protected _$: any;
    protected _S: S;
    constructor(_$: any, _S: S);
    static readonly EXTRACT_DATA_MODE: {
        underscore: string;
        hypen: string;
        camel: string;
    };
    getDataOptions(element: JQuery, prefix: string, optPrefix?: string, mode?: string): {};
}
