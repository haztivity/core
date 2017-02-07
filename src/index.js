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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9qcXVlcnlcIiwgXCIuL2RlYnVnXCIsIFwiLi9kaVwiLCBcIi4vZGkvSW5qZWN0b3JcIiwgXCIuL3V0aWxzXCIsIFwiLi9zY29cIiwgXCIuL3BhZ2VcIiwgXCIuL3Jlc291cmNlXCIsIFwiLi9uYXZpZ2F0b3JcIiwgXCIuL2NvbXBvbmVudFwiLCBcIi4vc2Nvcm1cIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBJbmplY3Rvcl8xLCBkZWJ1Z18xO1xuICAgIHZhciBleHBvcnRlZE5hbWVzXzEgPSB7XG4gICAgICAgIFwiTG9nZ2VyXCI6IHRydWUsXG4gICAgICAgIFwiSW5qZWN0b3JTZXJ2aWNlXCI6IHRydWUsXG4gICAgICAgIFwiU2VydmljZVwiOiB0cnVlLFxuICAgICAgICBcIlNlcnZpY2VJbnN0YW5jZVwiOiB0cnVlLFxuICAgICAgICBcIk1vZHVsZVwiOiB0cnVlLFxuICAgICAgICBcIlNjb1wiOiB0cnVlLFxuICAgICAgICBcIkRlcGVuZGVuY2llc1wiOiB0cnVlLFxuICAgICAgICBcIlBhZ2VcIjogdHJ1ZSxcbiAgICAgICAgXCJSZXNvdXJjZVwiOiB0cnVlLFxuICAgICAgICBcIkNvbXBvbmVudFwiOiB0cnVlLFxuICAgICAgICBcIkV2ZW50RW1pdHRlclwiOiB0cnVlLFxuICAgICAgICBcIkV2ZW50RW1pdHRlckZhY3RvcnlcIjogdHJ1ZSxcbiAgICAgICAgXCJEYXRhT3B0aW9uc1wiOiB0cnVlLFxuICAgICAgICBcIlNcIjogdHJ1ZSxcbiAgICAgICAgXCJTY29GYWN0b3J5XCI6IHRydWUsXG4gICAgICAgIFwiU2NvQ29udHJvbGxlclwiOiB0cnVlLFxuICAgICAgICBcIlBhZ2VDb250cm9sbGVyXCI6IHRydWUsXG4gICAgICAgIFwiUGFnZVJlZ2lzdGVyXCI6IHRydWUsXG4gICAgICAgIFwiUGFnZUZhY3RvcnlcIjogdHJ1ZSxcbiAgICAgICAgXCJQYWdlTWFuYWdlclwiOiB0cnVlLFxuICAgICAgICBcIlJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlXCI6IHRydWUsXG4gICAgICAgIFwiUmVzb3VyY2VDb250cm9sbGVyXCI6IHRydWUsXG4gICAgICAgIFwiUmVzb3VyY2VNYW5hZ2VyXCI6IHRydWUsXG4gICAgICAgIFwiTmF2aWdhdG9yXCI6IHRydWUsXG4gICAgICAgIFwiTmF2aWdhdG9yU2VydmljZVwiOiB0cnVlLFxuICAgICAgICBcIkNvbXBvbmVudENvbnRyb2xsZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJDb21wb25lbnRNYW5hZ2VyXCI6IHRydWUsXG4gICAgICAgIFwiQ29tcG9uZW50SW5pdGlhbGl6ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJTY29ybVNlcnZpY2VcIjogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXhwb3J0U3Rhcl8xKG0pIHtcbiAgICAgICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgbiBpbiBtKSB7XG4gICAgICAgICAgICBpZiAobiAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydGVkTmFtZXNfMS5oYXNPd25Qcm9wZXJ0eShuKSlcbiAgICAgICAgICAgICAgICBleHBvcnRzW25dID0gbVtuXTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzXzEoZXhwb3J0cyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0U3Rhcl8xKGpxdWVyeV8xXzEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkZWJ1Z18yXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIkxvZ2dlclwiOiBkZWJ1Z18yXzFbXCJMb2dnZXJcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWJ1Z18xID0gZGVidWdfMl8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIkluamVjdG9yU2VydmljZVwiOiBkaV8xXzFbXCJJbmplY3RvclNlcnZpY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiU2VydmljZVwiOiBkaV8xXzFbXCJTZXJ2aWNlXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcnZpY2VJbnN0YW5jZVwiOiBkaV8xXzFbXCJTZXJ2aWNlSW5zdGFuY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiTW9kdWxlXCI6IGRpXzFfMVtcIk1vZHVsZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJTY29cIjogZGlfMV8xW1wiU2NvXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkRlcGVuZGVuY2llc1wiOiBkaV8xXzFbXCJEZXBlbmRlbmNpZXNcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiUGFnZVwiOiBkaV8xXzFbXCJQYWdlXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlJlc291cmNlXCI6IGRpXzFfMVtcIlJlc291cmNlXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbXBvbmVudFwiOiBkaV8xXzFbXCJDb21wb25lbnRcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoSW5qZWN0b3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgSW5qZWN0b3JfMSA9IEluamVjdG9yXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJFdmVudEVtaXR0ZXJcIjogdXRpbHNfMV8xW1wiRXZlbnRFbWl0dGVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkV2ZW50RW1pdHRlckZhY3RvcnlcIjogdXRpbHNfMV8xW1wiRXZlbnRFbWl0dGVyRmFjdG9yeVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJEYXRhT3B0aW9uc1wiOiB1dGlsc18xXzFbXCJEYXRhT3B0aW9uc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJTXCI6IHV0aWxzXzFfMVtcIlNcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoc2NvXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiU2NvRmFjdG9yeVwiOiBzY29fMV8xW1wiU2NvRmFjdG9yeVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJTY29Db250cm9sbGVyXCI6IHNjb18xXzFbXCJTY29Db250cm9sbGVyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHBhZ2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlQ29udHJvbGxlclwiOiBwYWdlXzFfMVtcIlBhZ2VDb250cm9sbGVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlBhZ2VSZWdpc3RlclwiOiBwYWdlXzFfMVtcIlBhZ2VSZWdpc3RlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlRmFjdG9yeVwiOiBwYWdlXzFfMVtcIlBhZ2VGYWN0b3J5XCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlBhZ2VNYW5hZ2VyXCI6IHBhZ2VfMV8xW1wiUGFnZU1hbmFnZXJcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb3VyY2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZVwiOiByZXNvdXJjZV8xXzFbXCJSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJSZXNvdXJjZUNvbnRyb2xsZXJcIjogcmVzb3VyY2VfMV8xW1wiUmVzb3VyY2VDb250cm9sbGVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIlJlc291cmNlTWFuYWdlclwiOiByZXNvdXJjZV8xXzFbXCJSZXNvdXJjZU1hbmFnZXJcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAobmF2aWdhdG9yXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiTmF2aWdhdG9yXCI6IG5hdmlnYXRvcl8xXzFbXCJOYXZpZ2F0b3JcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiTmF2aWdhdG9yU2VydmljZVwiOiBuYXZpZ2F0b3JfMV8xW1wiTmF2aWdhdG9yU2VydmljZVwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChjb21wb25lbnRfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJDb21wb25lbnRDb250cm9sbGVyXCI6IGNvbXBvbmVudF8xXzFbXCJDb21wb25lbnRDb250cm9sbGVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbXBvbmVudE1hbmFnZXJcIjogY29tcG9uZW50XzFfMVtcIkNvbXBvbmVudE1hbmFnZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIFwiQ29tcG9uZW50SW5pdGlhbGl6ZXJcIjogY29tcG9uZW50XzFfMVtcIkNvbXBvbmVudEluaXRpYWxpemVyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHNjb3JtXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiU2Nvcm1TZXJ2aWNlXCI6IHNjb3JtXzFfMVtcIlNjb3JtU2VydmljZVwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBJbmplY3Rvcl8xLkluamVjdG9yLmdldEluc3RhbmNlKCkucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UoXCJMb2dnZXJcIiwgZGVidWdfMS5Mb2dnZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJpbmRleC5qcyJ9
