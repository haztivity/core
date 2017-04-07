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
var jquery_1 = require("../jquery");
var String_1 = require("./String");
var DataOptions = DataOptions_1 = (function () {
    function DataOptions(_$, _S) {
        this._$ = _$;
        this._S = _S;
    }
    DataOptions.prototype.getDataOptions = function (element, prefix, optPrefix, mode) {
        if (optPrefix === void 0) { optPrefix = "opt"; }
        //extract data-_attributes with jquery data
        var $element = this._$(element), params = $element.data(), parsedParams = {};
        optPrefix = String_1.S(optPrefix + "-" + prefix).camelize().s;
        mode = mode || $element.data("paramsMode");
        //each param: data-prefix-my-param is prefixMyParam
        for (var key in params) {
            //find prefix
            if (key.search(optPrefix) !== -1) {
                //remove prefix: prefixMyParam to myParam
                var parsedKey = key.replace(optPrefix, "");
                //some components require different nomenclatures
                switch (mode) {
                    case DataOptions_1.EXTRACT_DATA_MODE.underscore:
                        //myParam to my_param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        break;
                    case DataOptions_1.EXTRACT_DATA_MODE.hypen:
                        //myParam to my-param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        break;
                    default:
                        //myParam
                        parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                        break;
                }
                var parsed = params[key];
                //try to parse to JSON
                try {
                    parsed = JSON.parse(parsed);
                }
                catch (e) {
                }
                parsedParams[parsedKey] = parsed;
            }
        }
        return parsedParams;
    };
    return DataOptions;
}());
DataOptions.EXTRACT_DATA_MODE = {
    underscore: "underscore",
    hypen: "hypen",
    camel: "camel"
};
DataOptions = DataOptions_1 = __decorate([
    di_1.Service({
        name: "DataOptions",
        dependencies: [
            jquery_1.$,
            String_1.S
        ]
    })
], DataOptions);
exports.DataOptions = DataOptions;
var DataOptions_1;
//# sourceMappingURL=DataOptions.js.map