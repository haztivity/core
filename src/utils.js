/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils/EventEmitterFactory", "./utils/EventEmitter", "./utils/String", "./utils/DataOptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @module
     * @description
     * El módulo "utils" contiene utilidades para el desarrollo
     */
    var EventEmitterFactory_1 = require("./utils/EventEmitterFactory");
    exports.EventEmitterFactory = EventEmitterFactory_1.EventEmitterFactory;
    var EventEmitter_1 = require("./utils/EventEmitter");
    exports.EventEmitter = EventEmitter_1.EventEmitter;
    var String_1 = require("./utils/String");
    exports.S = String_1.S;
    var DataOptions_1 = require("./utils/DataOptions");
    exports.DataOptions = DataOptions_1.DataOptions;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi91dGlscy9FdmVudEVtaXR0ZXJGYWN0b3J5XCIsIFwiLi91dGlscy9FdmVudEVtaXR0ZXJcIiwgXCIuL3V0aWxzL1N0cmluZ1wiLCBcIi4vdXRpbHMvRGF0YU9wdGlvbnNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQG1vZHVsZVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEVsIG3Ds2R1bG8gXCJ1dGlsc1wiIGNvbnRpZW5lIHV0aWxpZGFkZXMgcGFyYSBlbCBkZXNhcnJvbGxvXG4gICAgICovXG4gICAgdmFyIEV2ZW50RW1pdHRlckZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL0V2ZW50RW1pdHRlckZhY3RvcnlcIik7XG4gICAgZXhwb3J0cy5FdmVudEVtaXR0ZXJGYWN0b3J5ID0gRXZlbnRFbWl0dGVyRmFjdG9yeV8xLkV2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgdmFyIEV2ZW50RW1pdHRlcl8xID0gcmVxdWlyZShcIi4vdXRpbHMvRXZlbnRFbWl0dGVyXCIpO1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyO1xuICAgIHZhciBTdHJpbmdfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL1N0cmluZ1wiKTtcbiAgICBleHBvcnRzLlMgPSBTdHJpbmdfMS5TO1xuICAgIHZhciBEYXRhT3B0aW9uc18xID0gcmVxdWlyZShcIi4vdXRpbHMvRGF0YU9wdGlvbnNcIik7XG4gICAgZXhwb3J0cy5EYXRhT3B0aW9ucyA9IERhdGFPcHRpb25zXzEuRGF0YU9wdGlvbnM7XG59KTtcbiJdLCJmaWxlIjoidXRpbHMuanMifQ==
