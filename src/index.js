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
                    "DataOptions": utils_1_1["DataOptions"]
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9qcXVlcnlcIiwgXCIuL2RlYnVnXCIsIFwiLi9kaVwiLCBcIi4vZGkvSW5qZWN0b3JcIiwgXCIuL3V0aWxzXCIsIFwiLi9zY29cIiwgXCIuL3BhZ2VcIiwgXCIuL3Jlc291cmNlXCIsIFwiLi9uYXZpZ2F0b3JcIiwgXCIuL2NvbXBvbmVudFwiLCBcIi4vc2Nvcm1cIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBJbmplY3Rvcl8xLCBkZWJ1Z18xO1xuICAgIHZhciBleHBvcnRlZE5hbWVzXzEgPSB7XG4gICAgICAgIFwiTG9nZ2VyXCI6IHRydWUsXG4gICAgICAgIFwiSW5qZWN0b3JTZXJ2aWNlXCI6IHRydWUsXG4gICAgICAgIFwiU2VydmljZVwiOiB0cnVlLFxuICAgICAgICBcIlNlcnZpY2VJbnN0YW5jZVwiOiB0cnVlLFxuICAgICAgICBcIk1vZHVsZVwiOiB0cnVlLFxuICAgICAgICBcIlNjb1wiOiB0cnVlLFxuICAgICAgICBcIkRlcGVuZGVuY2llc1wiOiB0cnVlLFxuICAgICAgICBcIlBhZ2VcIjogdHJ1ZSxcbiAgICAgICAgXCJSZXNvdXJjZVwiOiB0cnVlLFxuICAgICAgICBcIkNvbXBvbmVudFwiOiB0cnVlLFxuICAgICAgICBcIkV2ZW50RW1pdHRlclwiOiB0cnVlLFxuICAgICAgICBcIkV2ZW50RW1pdHRlckZhY3RvcnlcIjogdHJ1ZSxcbiAgICAgICAgXCJEYXRhT3B0aW9uc1wiOiB0cnVlLFxuICAgICAgICBcIlNjb0ZhY3RvcnlcIjogdHJ1ZSxcbiAgICAgICAgXCJTY29Db250cm9sbGVyXCI6IHRydWUsXG4gICAgICAgIFwiUGFnZUNvbnRyb2xsZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJQYWdlUmVnaXN0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJQYWdlRmFjdG9yeVwiOiB0cnVlLFxuICAgICAgICBcIlBhZ2VNYW5hZ2VyXCI6IHRydWUsXG4gICAgICAgIFwiUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcIjogdHJ1ZSxcbiAgICAgICAgXCJSZXNvdXJjZUNvbnRyb2xsZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJSZXNvdXJjZU1hbmFnZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJOYXZpZ2F0b3JcIjogdHJ1ZSxcbiAgICAgICAgXCJOYXZpZ2F0b3JTZXJ2aWNlXCI6IHRydWUsXG4gICAgICAgIFwiQ29tcG9uZW50Q29udHJvbGxlclwiOiB0cnVlLFxuICAgICAgICBcIkNvbXBvbmVudE1hbmFnZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJDb21wb25lbnRJbml0aWFsaXplclwiOiB0cnVlLFxuICAgICAgICBcIlNjb3JtU2VydmljZVwiOiB0cnVlXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHBvcnRTdGFyXzEobSkge1xuICAgICAgICB2YXIgZXhwb3J0cyA9IHt9O1xuICAgICAgICBmb3IgKHZhciBuIGluIG0pIHtcbiAgICAgICAgICAgIGlmIChuICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0ZWROYW1lc18xLmhhc093blByb3BlcnR5KG4pKVxuICAgICAgICAgICAgICAgIGV4cG9ydHNbbl0gPSBtW25dO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHNfMShleHBvcnRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGpxdWVyeV8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRTdGFyXzEoanF1ZXJ5XzFfMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRlYnVnXzJfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiTG9nZ2VyXCI6IGRlYnVnXzJfMVtcIkxvZ2dlclwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRlYnVnXzEgPSBkZWJ1Z18yXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiSW5qZWN0b3JTZXJ2aWNlXCI6IGRpXzFfMVtcIkluamVjdG9yU2VydmljZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlXCI6IGRpXzFfMVtcIlNlcnZpY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiU2VydmljZUluc3RhbmNlXCI6IGRpXzFfMVtcIlNlcnZpY2VJbnN0YW5jZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJNb2R1bGVcIjogZGlfMV8xW1wiTW9kdWxlXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlNjb1wiOiBkaV8xXzFbXCJTY29cIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiRGVwZW5kZW5jaWVzXCI6IGRpXzFfMVtcIkRlcGVuZGVuY2llc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlXCI6IGRpXzFfMVtcIlBhZ2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VcIjogZGlfMV8xW1wiUmVzb3VyY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiQ29tcG9uZW50XCI6IGRpXzFfMVtcIkNvbXBvbmVudFwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChJbmplY3Rvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBJbmplY3Rvcl8xID0gSW5qZWN0b3JfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICh1dGlsc18xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIkV2ZW50RW1pdHRlclwiOiB1dGlsc18xXzFbXCJFdmVudEVtaXR0ZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiRXZlbnRFbWl0dGVyRmFjdG9yeVwiOiB1dGlsc18xXzFbXCJFdmVudEVtaXR0ZXJGYWN0b3J5XCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkRhdGFPcHRpb25zXCI6IHV0aWxzXzFfMVtcIkRhdGFPcHRpb25zXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHNjb18xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIlNjb0ZhY3RvcnlcIjogc2NvXzFfMVtcIlNjb0ZhY3RvcnlcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiU2NvQ29udHJvbGxlclwiOiBzY29fMV8xW1wiU2NvQ29udHJvbGxlclwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChwYWdlXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiUGFnZUNvbnRyb2xsZXJcIjogcGFnZV8xXzFbXCJQYWdlQ29udHJvbGxlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlUmVnaXN0ZXJcIjogcGFnZV8xXzFbXCJQYWdlUmVnaXN0ZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiUGFnZUZhY3RvcnlcIjogcGFnZV8xXzFbXCJQYWdlRmFjdG9yeVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlTWFuYWdlclwiOiBwYWdlXzFfMVtcIlBhZ2VNYW5hZ2VyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc291cmNlXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcIjogcmVzb3VyY2VfMV8xW1wiUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VDb250cm9sbGVyXCI6IHJlc291cmNlXzFfMVtcIlJlc291cmNlQ29udHJvbGxlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJSZXNvdXJjZU1hbmFnZXJcIjogcmVzb3VyY2VfMV8xW1wiUmVzb3VyY2VNYW5hZ2VyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKG5hdmlnYXRvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIk5hdmlnYXRvclwiOiBuYXZpZ2F0b3JfMV8xW1wiTmF2aWdhdG9yXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIk5hdmlnYXRvclNlcnZpY2VcIjogbmF2aWdhdG9yXzFfMVtcIk5hdmlnYXRvclNlcnZpY2VcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoY29tcG9uZW50XzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29tcG9uZW50Q29udHJvbGxlclwiOiBjb21wb25lbnRfMV8xW1wiQ29tcG9uZW50Q29udHJvbGxlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJDb21wb25lbnRNYW5hZ2VyXCI6IGNvbXBvbmVudF8xXzFbXCJDb21wb25lbnRNYW5hZ2VyXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbXBvbmVudEluaXRpYWxpemVyXCI6IGNvbXBvbmVudF8xXzFbXCJDb21wb25lbnRJbml0aWFsaXplclwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChzY29ybV8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIlNjb3JtU2VydmljZVwiOiBzY29ybV8xXzFbXCJTY29ybVNlcnZpY2VcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgSW5qZWN0b3JfMS5JbmplY3Rvci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyU2VydmljZUluc3RhbmNlKFwiTG9nZ2VyXCIsIGRlYnVnXzEuTG9nZ2VyKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoiaW5kZXguanMifQ==
