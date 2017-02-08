System.register(["../base/BaseError"], function (exports_1, context_1) {
    "use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaS9FcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2Jhc2UvQmFzZUVycm9yXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgQmFzZUVycm9yXzEsIEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3IsIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCwgSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkLCBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5LCBIYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkLCBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKEJhc2VFcnJvcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBCYXNlRXJyb3JfMSA9IEJhc2VFcnJvcl8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgaW50ZW50YXIgb2J0ZW5lciB1bmEgZGVwZW5kZW5jaWEgbm8gcmVnaXN0cmFkYVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvciwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yKGRlcGVuZGVuY3ksIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yXCIsIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcImNvdWxkIG5vdCBpbmplY3QgXCIgKyBkZXBlbmRlbmN5ICsgXCIgaW50byBcIiArIHRhcmdldCArIFwiIGJlY2F1c2UgaXMgbm90IHJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkZXBlbmRlbmN5ICsgXCIgaXMgbm90IHJlZ2lzdGVyZWQgaW4gdGhlIEluamVjdG9yLlwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFJlZ2lzdGVyZWRFcnJvcjtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlEZXBlbmRlbmN5Tm90UmVnaXN0ZXJlZEVycm9yXCIsIEhhenRpdml0eURlcGVuZGVuY3lOb3RSZWdpc3RlcmVkRXJyb3IpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFcnJvciBhbCBpbnRlbnRhciByZWdpc3RyYXIgdW5hIGRlcGVuZGVuY2lhIHlhIHJlZ2lzdHJhZGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZChkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBcIkhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZFwiLCBkZXBlbmRlbmN5ICsgXCIgaXMgYWxyZWFkeSByZWdpc3RlcmVkXCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5QWxyZWFkeVJlZ2lzdGVyZWQ7XG4gICAgICAgICAgICB9KEJhc2VFcnJvcl8xLkJhc2VFcnJvcikpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSGF6dGl2aXR5RGVwZW5kZW5jeUFscmVhZHlSZWdpc3RlcmVkXCIsIEhhenRpdml0eURlcGVuZGVuY3lBbHJlYWR5UmVnaXN0ZXJlZCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIG5vIGluZGljYXJzZSB1biBwYXLDoW1ldHJvIG9ibGlnYXRvcmlvXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZCwgX3N1cGVyKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWQocGFyYW1ldGVyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWRcIiwgXCJUaGUgcGFyYW1ldGVyICdcIiArIHBhcmFtZXRlck5hbWUgKyBcIicgaXMgcmVxdWlyZWRcIikgfHwgdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhhenRpdml0eURlcGVuZGVuY3lPcHRpb25SZXF1aXJlZDtcbiAgICAgICAgICAgIH0oQmFzZUVycm9yXzEuQmFzZUVycm9yKSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJIYXp0aXZpdHlEZXBlbmRlbmN5T3B0aW9uUmVxdWlyZWRcIiwgSGF6dGl2aXR5RGVwZW5kZW5jeU9wdGlvblJlcXVpcmVkKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXJyb3IgYWwgZGVmaW5pciB1bmEgY2xhc2UgY29tbyBkZXBlbmRlbmNpYSBkZSBlbGxhIG1pc21hXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3kgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5LCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3koZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5XCIsIGRlcGVuZGVuY3kgKyBcIiBoYXMgaXRzIG93biBhcyBkZXBlbmRlbmN5XCIpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5SGFzSXRzT3duQXNEZXBlbmRlbmN5O1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eURlcGVuZGVuY3lIYXNJdHNPd25Bc0RlcGVuZGVuY3lcIiwgSGF6dGl2aXR5RGVwZW5kZW5jeUhhc0l0c093bkFzRGVwZW5kZW5jeSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIGlueWVjdGFyIHVuYSBkZXBlbmRlbmNpYSBhIGxhIHF1ZSBubyBzZSB0aWVuZSBhY2Nlc29cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWQsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCh0YXJnZXQsIGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFwiSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZFwiLCB0YXJnZXQgKyBcIiBoYXMgbm90IGFjY2VzcyB0byBcIiArIGRlcGVuZGVuY3kpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBIYXp0aXZpdHlEZXBlbmRlbmN5QWNjZXNzRGVuaWVkO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eURlcGVuZGVuY3lBY2Nlc3NEZW5pZWRcIiwgSGF6dGl2aXR5RGVwZW5kZW5jeUFjY2Vzc0RlbmllZCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIGFsIGludGVudGFyIGlueWVjdGFyIHVuYSBkZXBlbmRlbmNpYSBhIGxhIHF1ZSBubyBzZSB0aWVuZSBhY2Nlc29cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZCh0YXJnZXQsIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgXCJIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWRcIiwgXCJTb21lIGRlcGVuZGVuY3kgZm9yIFwiICsgdGFyZ2V0ICsgXCIgaXMgdW5kZWZpbmVkLlwiKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSGF6dGl2aXR5RGVwZW5kZW5jeU5vdFZhbGlkO1xuICAgICAgICAgICAgfShCYXNlRXJyb3JfMS5CYXNlRXJyb3IpKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkhhenRpdml0eURlcGVuZGVuY3lOb3RWYWxpZFwiLCBIYXp0aXZpdHlEZXBlbmRlbmN5Tm90VmFsaWQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJkaS9FcnJvcnMuanMifQ==
