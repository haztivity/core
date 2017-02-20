var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../base/BaseError"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var BaseError_1 = require("../base/BaseError");
    /**
     * Error al intentar obtener una dependencia no registrada
     */
    var HaztivityDependencyNotRegisteredError = (function (_super) {
        __extends(HaztivityDependencyNotRegisteredError, _super);
        function HaztivityDependencyNotRegisteredError(dependency, target) {
            return _super.call(this, "HaztivityDependencyNotRegisteredError", target
                ? "could not inject " + dependency + " into " + target + " because is not registered"
                : dependency + " is not registered in the Injector.") || this;
        }
        return HaztivityDependencyNotRegisteredError;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyNotRegisteredError = HaztivityDependencyNotRegisteredError;
    /**
     * Error al intentar registrar una dependencia ya registrada
     */
    var HaztivityDependencyAlreadyRegistered = (function (_super) {
        __extends(HaztivityDependencyAlreadyRegistered, _super);
        function HaztivityDependencyAlreadyRegistered(dependency) {
            return _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered") || this;
        }
        return HaztivityDependencyAlreadyRegistered;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyAlreadyRegistered = HaztivityDependencyAlreadyRegistered;
    /**
     * Error al no indicarse un parámetro obligatorio
     */
    var HaztivityDependencyOptionRequired = (function (_super) {
        __extends(HaztivityDependencyOptionRequired, _super);
        function HaztivityDependencyOptionRequired(parameterName) {
            return _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required") || this;
        }
        return HaztivityDependencyOptionRequired;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyOptionRequired = HaztivityDependencyOptionRequired;
    /**
     * Error al definir una clase como dependencia de ella misma
     */
    var HaztivityDependencyHasItsOwnAsDependency = (function (_super) {
        __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
        function HaztivityDependencyHasItsOwnAsDependency(dependency) {
            return _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency") || this;
        }
        return HaztivityDependencyHasItsOwnAsDependency;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyHasItsOwnAsDependency = HaztivityDependencyHasItsOwnAsDependency;
    /**
     * Error al intentar inyectar una dependencia a la que no se tiene acceso
     */
    var HaztivityDependencyAccessDenied = (function (_super) {
        __extends(HaztivityDependencyAccessDenied, _super);
        function HaztivityDependencyAccessDenied(target, dependency) {
            return _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency) || this;
        }
        return HaztivityDependencyAccessDenied;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyAccessDenied = HaztivityDependencyAccessDenied;
    /**
     * Error al intentar inyectar una dependencia a la que no se tiene acceso
     */
    var HaztivityDependencyNotValid = (function (_super) {
        __extends(HaztivityDependencyNotValid, _super);
        function HaztivityDependencyNotValid(target, dependencies) {
            return _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.") || this;
        }
        return HaztivityDependencyNotValid;
    }(BaseError_1.BaseError));
    exports.HaztivityDependencyNotValid = HaztivityDependencyNotValid;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBCYXNlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi9iYXNlL0Jhc2VFcnJvclwiKTtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBvYnRlbmVyIHVuYSBkZXBlbmRlbmNpYSBubyByZWdpc3RyYWRhXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvcihkZXBlbmRlbmN5LCB0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3JcIiwgdGFyZ2V0XG4gICAgICAgICAgICAgICAgPyBcImNvdWxkIG5vdCBpbmplY3QgXCIgKyBkZXBlbmRlbmN5ICsgXCIgaW50byBcIiArIHRhcmdldCArIFwiIGJlY2F1c2UgaXMgbm90IHJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgIDogZGVwZW5kZW5jeSArIFwiIGlzIG5vdCByZWdpc3RlcmVkIGluIHRoZSBJbmplY3Rvci5cIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvciA9IEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3I7XG4gICAgLyoqXG4gICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuYSBkZXBlbmRlbmNpYSB5YSByZWdpc3RyYWRhXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZChkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWRcIiwgZGVwZW5kZW5jeSArIFwiIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQ7XG4gICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICBleHBvcnRzLkhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCA9IEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZDtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBubyBpbmRpY2Fyc2UgdW4gcGFyw6FtZXRybyBvYmxpZ2F0b3Jpb1xuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQocGFyYW1ldGVyTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkXCIsIFwiVGhlIHBhcmFtZXRlciAnXCIgKyBwYXJhbWV0ZXJOYW1lICsgXCInIGlzIHJlcXVpcmVkXCIpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZDtcbiAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgIGV4cG9ydHMuSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkID0gSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkO1xuICAgIC8qKlxuICAgICAqIEVycm9yIGFsIGRlZmluaXIgdW5hIGNsYXNlIGNvbW8gZGVwZW5kZW5jaWEgZGUgZWxsYSBtaXNtYVxuICAgICAqL1xuICAgIHZhciBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3ksIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3koZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeVwiLCBkZXBlbmRlbmN5ICsgXCIgaGFzIGl0cyBvd24gYXMgZGVwZW5kZW5jeVwiKSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5O1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5ID0gSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeTtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbnllY3RhciB1bmEgZGVwZW5kZW5jaWEgYSBsYSBxdWUgbm8gc2UgdGllbmUgYWNjZXNvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCh0YXJnZXQsIGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWRcIiwgdGFyZ2V0ICsgXCIgaGFzIG5vdCBhY2Nlc3MgdG8gXCIgKyBkZXBlbmRlbmN5KSB8fCB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkID0gSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZDtcbiAgICAvKipcbiAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbnllY3RhciB1bmEgZGVwZW5kZW5jaWEgYSBsYSBxdWUgbm8gc2UgdGllbmUgYWNjZXNvXG4gICAgICovXG4gICAgdmFyIEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZCh0YXJnZXQsIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkXCIsIFwiU29tZSBkZXBlbmRlbmN5IGZvciBcIiArIHRhcmdldCArIFwiIGlzIHVuZGVmaW5lZC5cIikgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkO1xuICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgZXhwb3J0cy5IYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQgPSBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQ7XG59KTtcbiJdLCJmaWxlIjoiZGkvRXJyb3JzLmpzIn0=
