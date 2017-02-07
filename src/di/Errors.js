System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var BaseError_1, HaztivityDependencyNotRegisteredError, HaztivityDependencyAlreadyRegistered, HaztivityDependencyOptionRequired, HaztivityDependencyHasItsOwnAsDependency, HaztivityDependencyAccessDenied, HaztivityDependencyNotValid;
    return {
        setters: [
            function (BaseError_1_1) {
                BaseError_1 = BaseError_1_1;
            }
        ],
        execute: function () {
            /**
             * Error al intentar obtener una dependencia no registrada
             */
            HaztivityDependencyNotRegisteredError = (function (_super) {
                __extends(HaztivityDependencyNotRegisteredError, _super);
                function HaztivityDependencyNotRegisteredError(dependency, target) {
                    return _super.call(this, "HaztivityDependencyNotRegisteredError", target
                        ? "could not inject " + dependency + " into " + target + " because is not registered"
                        : dependency + " is not registered in the Injector.") || this;
                }
                return HaztivityDependencyNotRegisteredError;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyNotRegisteredError", HaztivityDependencyNotRegisteredError);
            /**
             * Error al intentar registrar una dependencia ya registrada
             */
            HaztivityDependencyAlreadyRegistered = (function (_super) {
                __extends(HaztivityDependencyAlreadyRegistered, _super);
                function HaztivityDependencyAlreadyRegistered(dependency) {
                    return _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered") || this;
                }
                return HaztivityDependencyAlreadyRegistered;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyAlreadyRegistered", HaztivityDependencyAlreadyRegistered);
            /**
             * Error al no indicarse un parámetro obligatorio
             */
            HaztivityDependencyOptionRequired = (function (_super) {
                __extends(HaztivityDependencyOptionRequired, _super);
                function HaztivityDependencyOptionRequired(parameterName) {
                    return _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required") || this;
                }
                return HaztivityDependencyOptionRequired;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyOptionRequired", HaztivityDependencyOptionRequired);
            /**
             * Error al definir una clase como dependencia de ella misma
             */
            HaztivityDependencyHasItsOwnAsDependency = (function (_super) {
                __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
                function HaztivityDependencyHasItsOwnAsDependency(dependency) {
                    return _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency") || this;
                }
                return HaztivityDependencyHasItsOwnAsDependency;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyHasItsOwnAsDependency", HaztivityDependencyHasItsOwnAsDependency);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyAccessDenied = (function (_super) {
                __extends(HaztivityDependencyAccessDenied, _super);
                function HaztivityDependencyAccessDenied(target, dependency) {
                    return _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency) || this;
                }
                return HaztivityDependencyAccessDenied;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyAccessDenied", HaztivityDependencyAccessDenied);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyNotValid = (function (_super) {
                __extends(HaztivityDependencyNotValid, _super);
                function HaztivityDependencyNotValid(target, dependencies) {
                    return _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.") || this;
                }
                return HaztivityDependencyNotValid;
            }(BaseError_1.BaseError));
            exports_1("HaztivityDependencyNotValid", HaztivityDependencyNotValid);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIEJhc2VFcnJvcl8xLCBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yLCBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQsIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZCwgSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeSwgSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCwgSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChCYXNlRXJyb3JfMV8xKSB7XG4gICAgICAgICAgICAgICAgQmFzZUVycm9yXzEgPSBCYXNlRXJyb3JfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIG9idGVuZXIgdW5hIGRlcGVuZGVuY2lhIG5vIHJlZ2lzdHJhZGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3IsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvcihkZXBlbmRlbmN5LCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvclwiLCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJjb3VsZCBub3QgaW5qZWN0IFwiICsgZGVwZW5kZW5jeSArIFwiIGludG8gXCIgKyB0YXJnZXQgKyBcIiBiZWNhdXNlIGlzIG5vdCByZWdpc3RlcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZGVwZW5kZW5jeSArIFwiIGlzIG5vdCByZWdpc3RlcmVkIGluIHRoZSBJbmplY3Rvci5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3I7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvclwiLCBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgcmVnaXN0cmFyIHVuYSBkZXBlbmRlbmNpYSB5YSByZWdpc3RyYWRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWRcIiwgZGVwZW5kZW5jeSArIFwiIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZFwiLCBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBubyBpbmRpY2Fyc2UgdW4gcGFyw6FtZXRybyBvYmxpZ2F0b3Jpb1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkKHBhcmFtZXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkXCIsIFwiVGhlIHBhcmFtZXRlciAnXCIgKyBwYXJhbWV0ZXJOYW1lICsgXCInIGlzIHJlcXVpcmVkXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQ7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkXCIsIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGRlZmluaXIgdW5hIGNsYXNlIGNvbW8gZGVwZW5kZW5jaWEgZGUgZWxsYSBtaXNtYVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeSwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5KGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeVwiLCBkZXBlbmRlbmN5ICsgXCIgaGFzIGl0cyBvd24gYXMgZGVwZW5kZW5jeVwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeTtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5XCIsIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3kpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbnllY3RhciB1bmEgZGVwZW5kZW5jaWEgYSBsYSBxdWUgbm8gc2UgdGllbmUgYWNjZXNvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWQodGFyZ2V0LCBkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWRcIiwgdGFyZ2V0ICsgXCIgaGFzIG5vdCBhY2Nlc3MgdG8gXCIgKyBkZXBlbmRlbmN5KSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkXCIsIEhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWQpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciBpbnllY3RhciB1bmEgZGVwZW5kZW5jaWEgYSBsYSBxdWUgbm8gc2UgdGllbmUgYWNjZXNvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQodGFyZ2V0LCBkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkXCIsIFwiU29tZSBkZXBlbmRlbmN5IGZvciBcIiArIHRhcmdldCArIFwiIGlzIHVuZGVmaW5lZC5cIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWRcIiwgSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoiZGkvRXJyb3JzLmpzIn0=
