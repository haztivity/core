/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {$} from "../jquery";
import {S} from "./String";
@Service(
    {
        name: "DataOptions",
        dependencies: [
            $,
            S
        ]
    }
)
export class DataOptions {
    constructor(protected _$, protected _S: S) {

    }

    public static readonly EXTRACT_DATA_MODE = {
        underscore: "underscore",
        hypen: "hypen",
        camel: "camel"
    };

    public getDataOptions(element: JQuery, prefix: string, optPrefix = "opt", mode?: string) {
        //extract data-_attributes with jquery data
        let $element = this._$(element),
            params = $element.data(), parsedParams = {};
        optPrefix = S(optPrefix + "-" + prefix).camelize().s;
        mode = mode || $element.data("paramsMode");
        //each param: data-prefix-my-param is prefixMyParam
        for (let key in params) {
            //find prefix
            if (key.search(optPrefix) !== -1) {
                //remove prefix: prefixMyParam to myParam
                let parsedKey: string = key.replace(optPrefix, "");
                //some components require different nomenclatures
                switch (mode) {
                    case DataOptions.EXTRACT_DATA_MODE.underscore:
                        //myParam to my_param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        break;
                    case DataOptions.EXTRACT_DATA_MODE.hypen:
                        //myParam to my-param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        break;
                    default://camel
                        //myParam
                        parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                        break;
                }
                let parsed = params[key];
                //try to parse to JSON
                try {
                    parsed = JSON.parse(parsed);
                } catch (e) {
                }
                parsedParams[parsedKey] = parsed;
            }
        }
        return parsedParams;
    }
}