System.register(["./jquery", "./debug", "./di", "./di/Injector", "./utils", "./sco", "./page", "./resource", "./navigator", "./component", "./scorm"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Injector_1, debug_1;
    var exportedNames_1 = {
        "Logger": true,
        "InjectorService": true,
        "Service": true,
        "ServiceInstance": true,
        "Module": true,
        "Sco": true,
        "Dependencies": true,
        "Page": true,
        "Resource": true,
        "Component": true,
        "EventEmitter": true,
        "EventEmitterFactory": true,
        "DataOptions": true,
        "S": true,
        "ScoFactory": true,
        "ScoController": true,
        "PageController": true,
        "PageRegister": true,
        "PageFactory": true,
        "PageManager": true,
        "ResourceInitializerService": true,
        "ResourceController": true,
        "ResourceManager": true,
        "Navigator": true,
        "NavigatorService": true,
        "ComponentController": true,
        "ComponentManager": true,
        "ComponentInitializer": true,
        "ScormService": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (jquery_1_1) {
                exportStar_1(jquery_1_1);
            },
            function (debug_2_1) {
                exports_1({
                    "Logger": debug_2_1["Logger"]
                });
                debug_1 = debug_2_1;
            },
            function (di_1_1) {
                exports_1({
                    "InjectorService": di_1_1["InjectorService"],
                    "Service": di_1_1["Service"],
                    "ServiceInstance": di_1_1["ServiceInstance"],
                    "Module": di_1_1["Module"],
                    "Sco": di_1_1["Sco"],
                    "Dependencies": di_1_1["Dependencies"],
                    "Page": di_1_1["Page"],
                    "Resource": di_1_1["Resource"],
                    "Component": di_1_1["Component"]
                });
            },
            function (Injector_1_1) {
                Injector_1 = Injector_1_1;
            },
            function (utils_1_1) {
                exports_1({
                    "EventEmitter": utils_1_1["EventEmitter"],
                    "EventEmitterFactory": utils_1_1["EventEmitterFactory"],
                    "DataOptions": utils_1_1["DataOptions"],
                    "S": utils_1_1["S"]
                });
            },
            function (sco_1_1) {
                exports_1({
                    "ScoFactory": sco_1_1["ScoFactory"],
                    "ScoController": sco_1_1["ScoController"]
                });
            },
            function (page_1_1) {
                exports_1({
                    "PageController": page_1_1["PageController"],
                    "PageRegister": page_1_1["PageRegister"],
                    "PageFactory": page_1_1["PageFactory"],
                    "PageManager": page_1_1["PageManager"]
                });
            },
            function (resource_1_1) {
                exports_1({
                    "ResourceInitializerService": resource_1_1["ResourceInitializerService"],
                    "ResourceController": resource_1_1["ResourceController"],
                    "ResourceManager": resource_1_1["ResourceManager"]
                });
            },
            function (navigator_1_1) {
                exports_1({
                    "Navigator": navigator_1_1["Navigator"],
                    "NavigatorService": navigator_1_1["NavigatorService"]
                });
            },
            function (component_1_1) {
                exports_1({
                    "ComponentController": component_1_1["ComponentController"],
                    "ComponentManager": component_1_1["ComponentManager"],
                    "ComponentInitializer": component_1_1["ComponentInitializer"]
                });
            },
            function (scorm_1_1) {
                exports_1({
                    "ScormService": scorm_1_1["ScormService"]
                });
            }
        ],
        execute: function () {
            Injector_1.Injector.getInstance().registerServiceInstance("Logger", debug_1.Logger);
        }
    };
});
//# sourceMappingURL=index.js.map