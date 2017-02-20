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
        define(["require", "exports", "../di", "../jquery", "./String"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9EYXRhT3B0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi9TdHJpbmdcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIGpxdWVyeV8xID0gcmVxdWlyZShcIi4uL2pxdWVyeVwiKTtcbiAgICB2YXIgU3RyaW5nXzEgPSByZXF1aXJlKFwiLi9TdHJpbmdcIik7XG4gICAgdmFyIERhdGFPcHRpb25zID0gRGF0YU9wdGlvbnNfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIERhdGFPcHRpb25zKF8kLCBfUykge1xuICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgdGhpcy5fUyA9IF9TO1xuICAgICAgICB9XG4gICAgICAgIERhdGFPcHRpb25zLnByb3RvdHlwZS5nZXREYXRhT3B0aW9ucyA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcmVmaXgsIG9wdFByZWZpeCwgbW9kZSkge1xuICAgICAgICAgICAgaWYgKG9wdFByZWZpeCA9PT0gdm9pZCAwKSB7IG9wdFByZWZpeCA9IFwib3B0XCI7IH1cbiAgICAgICAgICAgIC8vZXh0cmFjdCBkYXRhLV9hdHRyaWJ1dGVzIHdpdGgganF1ZXJ5IGRhdGFcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IHRoaXMuXyQoZWxlbWVudCksIHBhcmFtcyA9ICRlbGVtZW50LmRhdGEoKSwgcGFyc2VkUGFyYW1zID0ge307XG4gICAgICAgICAgICBvcHRQcmVmaXggPSBTdHJpbmdfMS5TKG9wdFByZWZpeCArIFwiLVwiICsgcHJlZml4KS5jYW1lbGl6ZSgpLnM7XG4gICAgICAgICAgICBtb2RlID0gbW9kZSB8fCAkZWxlbWVudC5kYXRhKFwicGFyYW1zTW9kZVwiKTtcbiAgICAgICAgICAgIC8vZWFjaCBwYXJhbTogZGF0YS1wcmVmaXgtbXktcGFyYW0gaXMgcHJlZml4TXlQYXJhbVxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIC8vZmluZCBwcmVmaXhcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnNlYXJjaChvcHRQcmVmaXgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmVmaXg6IHByZWZpeE15UGFyYW0gdG8gbXlQYXJhbVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2Uob3B0UHJlZml4LCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zb21lIGNvbXBvbmVudHMgcmVxdWlyZSBkaWZmZXJlbnQgbm9tZW5jbGF0dXJlc1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGF0YU9wdGlvbnNfMS5FWFRSQUNUX0RBVEFfTU9ERS51bmRlcnNjb3JlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbXlQYXJhbSB0byBteV9wYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IHBhcnNlZEtleS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDFfJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRhT3B0aW9uc18xLkVYVFJBQ1RfREFUQV9NT0RFLmh5cGVuOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbXlQYXJhbSB0byBteS1wYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IHBhcnNlZEtleS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL215UGFyYW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBwYXJzZWRLZXkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkuY29uY2F0KHBhcnNlZEtleS5zdWJzdHJpbmcoMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy90cnkgdG8gcGFyc2UgdG8gSlNPTlxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShwYXJzZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkUGFyYW1zW3BhcnNlZEtleV0gPSBwYXJzZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFBhcmFtcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERhdGFPcHRpb25zO1xuICAgIH0oKSk7XG4gICAgRGF0YU9wdGlvbnMuRVhUUkFDVF9EQVRBX01PREUgPSB7XG4gICAgICAgIHVuZGVyc2NvcmU6IFwidW5kZXJzY29yZVwiLFxuICAgICAgICBoeXBlbjogXCJoeXBlblwiLFxuICAgICAgICBjYW1lbDogXCJjYW1lbFwiXG4gICAgfTtcbiAgICBEYXRhT3B0aW9ucyA9IERhdGFPcHRpb25zXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5TZXJ2aWNlKHtcbiAgICAgICAgICAgIG5hbWU6IFwiRGF0YU9wdGlvbnNcIixcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgU3RyaW5nXzEuU1xuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIF0sIERhdGFPcHRpb25zKTtcbiAgICBleHBvcnRzLkRhdGFPcHRpb25zID0gRGF0YU9wdGlvbnM7XG4gICAgdmFyIERhdGFPcHRpb25zXzE7XG59KTtcbiJdLCJmaWxlIjoidXRpbHMvRGF0YU9wdGlvbnMuanMifQ==
