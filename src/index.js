(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./jquery", "./debug", "./di", "./di/Injector", "./debug", "./utils", "./sco", "./page", "./resource", "./navigator", "./component", "./scorm"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    __export(require("./jquery"));
    var debug_1 = require("./debug");
    exports.Logger = debug_1.Logger;
    var di_1 = require("./di");
    exports.InjectorService = di_1.InjectorService;
    exports.Service = di_1.Service;
    exports.ServiceInstance = di_1.ServiceInstance;
    exports.Module = di_1.Module;
    exports.Sco = di_1.Sco;
    exports.Dependencies = di_1.Dependencies;
    exports.Page = di_1.Page;
    exports.Resource = di_1.Resource;
    exports.Component = di_1.Component;
    var Injector_1 = require("./di/Injector");
    var debug_2 = require("./debug");
    Injector_1.Injector.getInstance().registerServiceInstance("Logger", debug_2.Logger);
    var utils_1 = require("./utils");
    exports.EventEmitter = utils_1.EventEmitter;
    exports.EventEmitterFactory = utils_1.EventEmitterFactory;
    exports.DataOptions = utils_1.DataOptions;
    exports.S = utils_1.S;
    var sco_1 = require("./sco");
    exports.ScoFactory = sco_1.ScoFactory;
    exports.ScoController = sco_1.ScoController;
    var page_1 = require("./page");
    exports.PageController = page_1.PageController;
    exports.PageRegister = page_1.PageRegister;
    exports.PageFactory = page_1.PageFactory;
    exports.PageManager = page_1.PageManager;
    exports.GenericPageController = page_1.GenericPageController;
    var resource_1 = require("./resource");
    exports.ResourceInitializerService = resource_1.ResourceInitializerService;
    exports.ResourceController = resource_1.ResourceController;
    exports.ResourceManager = resource_1.ResourceManager;
    exports.ResourceSequenceFactory = resource_1.ResourceSequenceFactory;
    exports.ResourceSequence = resource_1.ResourceSequence;
    var navigator_1 = require("./navigator");
    exports.Navigator = navigator_1.Navigator;
    exports.NavigatorService = navigator_1.NavigatorService;
    var component_1 = require("./component");
    exports.ComponentController = component_1.ComponentController;
    exports.ComponentManager = component_1.ComponentManager;
    exports.ComponentInitializer = component_1.ComponentInitializer;
    var scorm_1 = require("./scorm");
    exports.ScormService = scorm_1.ScormService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4vanF1ZXJ5XCIsIFwiLi9kZWJ1Z1wiLCBcIi4vZGlcIiwgXCIuL2RpL0luamVjdG9yXCIsIFwiLi9kZWJ1Z1wiLCBcIi4vdXRpbHNcIiwgXCIuL3Njb1wiLCBcIi4vcGFnZVwiLCBcIi4vcmVzb3VyY2VcIiwgXCIuL25hdmlnYXRvclwiLCBcIi4vY29tcG9uZW50XCIsIFwiLi9zY29ybVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgX19leHBvcnQocmVxdWlyZShcIi4vanF1ZXJ5XCIpKTtcbiAgICB2YXIgZGVidWdfMSA9IHJlcXVpcmUoXCIuL2RlYnVnXCIpO1xuICAgIGV4cG9ydHMuTG9nZ2VyID0gZGVidWdfMS5Mb2dnZXI7XG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi9kaVwiKTtcbiAgICBleHBvcnRzLkluamVjdG9yU2VydmljZSA9IGRpXzEuSW5qZWN0b3JTZXJ2aWNlO1xuICAgIGV4cG9ydHMuU2VydmljZSA9IGRpXzEuU2VydmljZTtcbiAgICBleHBvcnRzLlNlcnZpY2VJbnN0YW5jZSA9IGRpXzEuU2VydmljZUluc3RhbmNlO1xuICAgIGV4cG9ydHMuTW9kdWxlID0gZGlfMS5Nb2R1bGU7XG4gICAgZXhwb3J0cy5TY28gPSBkaV8xLlNjbztcbiAgICBleHBvcnRzLkRlcGVuZGVuY2llcyA9IGRpXzEuRGVwZW5kZW5jaWVzO1xuICAgIGV4cG9ydHMuUGFnZSA9IGRpXzEuUGFnZTtcbiAgICBleHBvcnRzLlJlc291cmNlID0gZGlfMS5SZXNvdXJjZTtcbiAgICBleHBvcnRzLkNvbXBvbmVudCA9IGRpXzEuQ29tcG9uZW50O1xuICAgIHZhciBJbmplY3Rvcl8xID0gcmVxdWlyZShcIi4vZGkvSW5qZWN0b3JcIik7XG4gICAgdmFyIGRlYnVnXzIgPSByZXF1aXJlKFwiLi9kZWJ1Z1wiKTtcbiAgICBJbmplY3Rvcl8xLkluamVjdG9yLmdldEluc3RhbmNlKCkucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UoXCJMb2dnZXJcIiwgZGVidWdfMi5Mb2dnZXIpO1xuICAgIHZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4gICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSB1dGlsc18xLkV2ZW50RW1pdHRlcjtcbiAgICBleHBvcnRzLkV2ZW50RW1pdHRlckZhY3RvcnkgPSB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgZXhwb3J0cy5EYXRhT3B0aW9ucyA9IHV0aWxzXzEuRGF0YU9wdGlvbnM7XG4gICAgZXhwb3J0cy5TID0gdXRpbHNfMS5TO1xuICAgIHZhciBzY29fMSA9IHJlcXVpcmUoXCIuL3Njb1wiKTtcbiAgICBleHBvcnRzLlNjb0ZhY3RvcnkgPSBzY29fMS5TY29GYWN0b3J5O1xuICAgIGV4cG9ydHMuU2NvQ29udHJvbGxlciA9IHNjb18xLlNjb0NvbnRyb2xsZXI7XG4gICAgdmFyIHBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VcIik7XG4gICAgZXhwb3J0cy5QYWdlQ29udHJvbGxlciA9IHBhZ2VfMS5QYWdlQ29udHJvbGxlcjtcbiAgICBleHBvcnRzLlBhZ2VSZWdpc3RlciA9IHBhZ2VfMS5QYWdlUmVnaXN0ZXI7XG4gICAgZXhwb3J0cy5QYWdlRmFjdG9yeSA9IHBhZ2VfMS5QYWdlRmFjdG9yeTtcbiAgICBleHBvcnRzLlBhZ2VNYW5hZ2VyID0gcGFnZV8xLlBhZ2VNYW5hZ2VyO1xuICAgIGV4cG9ydHMuR2VuZXJpY1BhZ2VDb250cm9sbGVyID0gcGFnZV8xLkdlbmVyaWNQYWdlQ29udHJvbGxlcjtcbiAgICB2YXIgcmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL3Jlc291cmNlXCIpO1xuICAgIGV4cG9ydHMuUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UgPSByZXNvdXJjZV8xLlJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlO1xuICAgIGV4cG9ydHMuUmVzb3VyY2VDb250cm9sbGVyID0gcmVzb3VyY2VfMS5SZXNvdXJjZUNvbnRyb2xsZXI7XG4gICAgZXhwb3J0cy5SZXNvdXJjZU1hbmFnZXIgPSByZXNvdXJjZV8xLlJlc291cmNlTWFuYWdlcjtcbiAgICBleHBvcnRzLlJlc291cmNlU2VxdWVuY2VGYWN0b3J5ID0gcmVzb3VyY2VfMS5SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeTtcbiAgICBleHBvcnRzLlJlc291cmNlU2VxdWVuY2UgPSByZXNvdXJjZV8xLlJlc291cmNlU2VxdWVuY2U7XG4gICAgdmFyIG5hdmlnYXRvcl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdG9yXCIpO1xuICAgIGV4cG9ydHMuTmF2aWdhdG9yID0gbmF2aWdhdG9yXzEuTmF2aWdhdG9yO1xuICAgIGV4cG9ydHMuTmF2aWdhdG9yU2VydmljZSA9IG5hdmlnYXRvcl8xLk5hdmlnYXRvclNlcnZpY2U7XG4gICAgdmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xuICAgIGV4cG9ydHMuQ29tcG9uZW50Q29udHJvbGxlciA9IGNvbXBvbmVudF8xLkNvbXBvbmVudENvbnRyb2xsZXI7XG4gICAgZXhwb3J0cy5Db21wb25lbnRNYW5hZ2VyID0gY29tcG9uZW50XzEuQ29tcG9uZW50TWFuYWdlcjtcbiAgICBleHBvcnRzLkNvbXBvbmVudEluaXRpYWxpemVyID0gY29tcG9uZW50XzEuQ29tcG9uZW50SW5pdGlhbGl6ZXI7XG4gICAgdmFyIHNjb3JtXzEgPSByZXF1aXJlKFwiLi9zY29ybVwiKTtcbiAgICBleHBvcnRzLlNjb3JtU2VydmljZSA9IHNjb3JtXzEuU2Nvcm1TZXJ2aWNlO1xufSk7XG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
