(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./di/Injector", "./di/decorators"], factory);
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
    var Injector_1 = require("./di/Injector");
    exports.Injector = Injector_1.Injector;
    exports.TYPES = Injector_1.TYPES;
    exports.InjectorRegisterService = Injector_1.InjectorRegisterService;
    exports.InjectorService = Injector_1.InjectorService;
    __export(require("./di/decorators"));
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4vZGkvSW5qZWN0b3JcIiwgXCIuL2RpL2RlY29yYXRvcnNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgICAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBJbmplY3Rvcl8xID0gcmVxdWlyZShcIi4vZGkvSW5qZWN0b3JcIik7XG4gICAgZXhwb3J0cy5JbmplY3RvciA9IEluamVjdG9yXzEuSW5qZWN0b3I7XG4gICAgZXhwb3J0cy5UWVBFUyA9IEluamVjdG9yXzEuVFlQRVM7XG4gICAgZXhwb3J0cy5JbmplY3RvclJlZ2lzdGVyU2VydmljZSA9IEluamVjdG9yXzEuSW5qZWN0b3JSZWdpc3RlclNlcnZpY2U7XG4gICAgZXhwb3J0cy5JbmplY3RvclNlcnZpY2UgPSBJbmplY3Rvcl8xLkluamVjdG9yU2VydmljZTtcbiAgICBfX2V4cG9ydChyZXF1aXJlKFwiLi9kaS9kZWNvcmF0b3JzXCIpKTtcbn0pO1xuIl0sImZpbGUiOiJkaS5qcyJ9
