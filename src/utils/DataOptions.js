System.register(["../di", "../jquery", "./String"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, String_1, DataOptions, DataOptions_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
            DataOptions = DataOptions_1 = (function () {
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
            exports_1("DataOptions", DataOptions);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9EYXRhT3B0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL1N0cmluZ1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIGpxdWVyeV8xLCBTdHJpbmdfMSwgRGF0YU9wdGlvbnMsIERhdGFPcHRpb25zXzE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGpxdWVyeV8xXzEpIHtcbiAgICAgICAgICAgICAgICBqcXVlcnlfMSA9IGpxdWVyeV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKFN0cmluZ18xXzEpIHtcbiAgICAgICAgICAgICAgICBTdHJpbmdfMSA9IFN0cmluZ18xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIERhdGFPcHRpb25zID0gRGF0YU9wdGlvbnNfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gRGF0YU9wdGlvbnMoXyQsIF9TKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUyA9IF9TO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBEYXRhT3B0aW9ucy5wcm90b3R5cGUuZ2V0RGF0YU9wdGlvbnMgPSBmdW5jdGlvbiAoZWxlbWVudCwgcHJlZml4LCBvcHRQcmVmaXgsIG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdFByZWZpeCA9PT0gdm9pZCAwKSB7IG9wdFByZWZpeCA9IFwib3B0XCI7IH1cbiAgICAgICAgICAgICAgICAgICAgLy9leHRyYWN0IGRhdGEtX2F0dHJpYnV0ZXMgd2l0aCBqcXVlcnkgZGF0YVxuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKGVsZW1lbnQpLCBwYXJhbXMgPSAkZWxlbWVudC5kYXRhKCksIHBhcnNlZFBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBvcHRQcmVmaXggPSBTdHJpbmdfMS5TKG9wdFByZWZpeCArIFwiLVwiICsgcHJlZml4KS5jYW1lbGl6ZSgpLnM7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSBtb2RlIHx8ICRlbGVtZW50LmRhdGEoXCJwYXJhbXNNb2RlXCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2VhY2ggcGFyYW06IGRhdGEtcHJlZml4LW15LXBhcmFtIGlzIHByZWZpeE15UGFyYW1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9maW5kIHByZWZpeFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5zZWFyY2gob3B0UHJlZml4KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmVmaXg6IHByZWZpeE15UGFyYW0gdG8gbXlQYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShvcHRQcmVmaXgsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc29tZSBjb21wb25lbnRzIHJlcXVpcmUgZGlmZmVyZW50IG5vbWVuY2xhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRhT3B0aW9uc18xLkVYVFJBQ1RfREFUQV9NT0RFLnVuZGVyc2NvcmU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL215UGFyYW0gdG8gbXlfcGFyYW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IHBhcnNlZEtleS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDFfJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGF0YU9wdGlvbnNfMS5FWFRSQUNUX0RBVEFfTU9ERS5oeXBlbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbXlQYXJhbSB0byBteS1wYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0gcGFyc2VkS2V5LnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbXlQYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0gcGFyc2VkS2V5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpLmNvbmNhdChwYXJzZWRLZXkuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gcGFyYW1zW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90cnkgdG8gcGFyc2UgdG8gSlNPTlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocGFyc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUGFyYW1zW3BhcnNlZEtleV0gPSBwYXJzZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFBhcmFtcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhT3B0aW9ucztcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBEYXRhT3B0aW9ucy5FWFRSQUNUX0RBVEFfTU9ERSA9IHtcbiAgICAgICAgICAgICAgICB1bmRlcnNjb3JlOiBcInVuZGVyc2NvcmVcIixcbiAgICAgICAgICAgICAgICBoeXBlbjogXCJoeXBlblwiLFxuICAgICAgICAgICAgICAgIGNhbWVsOiBcImNhbWVsXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBEYXRhT3B0aW9ucyA9IERhdGFPcHRpb25zXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLlNlcnZpY2Uoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRhdGFPcHRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZ18xLlNcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBEYXRhT3B0aW9ucyk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJEYXRhT3B0aW9uc1wiLCBEYXRhT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InV0aWxzL0RhdGFPcHRpb25zLmpzIn0=
