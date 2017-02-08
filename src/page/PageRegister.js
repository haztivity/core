System.register(["../di", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, utils_1, PageRegister, PageRegister_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            PageRegister = PageRegister_1 = (function () {
                /**
                 * Almacena la información de una página.
                 * Tipo Core
                 * @class
                 * @param EventEmitterFactory
                 */
                function PageRegister(_EventEmitterFactory) {
                    this._EventEmitterFactory = _EventEmitterFactory;
                }
                PageRegister.prototype.getResources = function () {
                    return this._options.resources;
                };
                /**
                 * Configura la clase nada más instanciarla
                 * @param options
                 */
                PageRegister.prototype.activate = function (options) {
                    this._options = options;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter();
                };
                PageRegister.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events + "." + PageRegister_1.NAMESPACE, data, handler);
                    return this;
                };
                PageRegister.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events + "." + PageRegister_1.NAMESPACE, data, handler);
                    return this;
                };
                PageRegister.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events + "." + PageRegister_1.NAMESPACE, handler);
                    return this;
                };
                /**
                 * Obtiene el nombre de la página
                 * @returns {string}
                 */
                PageRegister.prototype.getName = function () {
                    return this._options.name;
                };
                return PageRegister;
            }());
            PageRegister.NAMESPACE = "page";
            PageRegister = PageRegister_1 = __decorate([
                di_1.Core({
                    name: "PageRegister",
                    instantiable: true,
                    dependencies: [
                        utils_1.EventEmitterFactory
                    ]
                })
            ], PageRegister);
            exports_1("PageRegister", PageRegister);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VSZWdpc3Rlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi91dGlsc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIHV0aWxzXzEsIFBhZ2VSZWdpc3RlciwgUGFnZVJlZ2lzdGVyXzE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHV0aWxzXzFfMSkge1xuICAgICAgICAgICAgICAgIHV0aWxzXzEgPSB1dGlsc18xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFBhZ2VSZWdpc3RlciA9IFBhZ2VSZWdpc3Rlcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBbG1hY2VuYSBsYSBpbmZvcm1hY2nDs24gZGUgdW5hIHDDoWdpbmEuXG4gICAgICAgICAgICAgICAgICogVGlwbyBDb3JlXG4gICAgICAgICAgICAgICAgICogQGNsYXNzXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIEV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQYWdlUmVnaXN0ZXIoX0V2ZW50RW1pdHRlckZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeSA9IF9FdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBQYWdlUmVnaXN0ZXIucHJvdG90eXBlLmdldFJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnMucmVzb3VyY2VzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ29uZmlndXJhIGxhIGNsYXNlIG5hZGEgbcOhcyBpbnN0YW5jaWFybGFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VSZWdpc3Rlci5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeS5jcmVhdGVFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBQYWdlUmVnaXN0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24oZXZlbnRzICsgXCIuXCIgKyBQYWdlUmVnaXN0ZXJfMS5OQU1FU1BBQ0UsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VSZWdpc3Rlci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub25lKGV2ZW50cyArIFwiLlwiICsgUGFnZVJlZ2lzdGVyXzEuTkFNRVNQQUNFLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBQYWdlUmVnaXN0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihldmVudHMgKyBcIi5cIiArIFBhZ2VSZWdpc3Rlcl8xLk5BTUVTUEFDRSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSBlbCBub21icmUgZGUgbGEgcMOhZ2luYVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZVJlZ2lzdGVyLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5uYW1lO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhZ2VSZWdpc3RlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBQYWdlUmVnaXN0ZXIuTkFNRVNQQUNFID0gXCJwYWdlXCI7XG4gICAgICAgICAgICBQYWdlUmVnaXN0ZXIgPSBQYWdlUmVnaXN0ZXJfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiUGFnZVJlZ2lzdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBQYWdlUmVnaXN0ZXIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiUGFnZVJlZ2lzdGVyXCIsIFBhZ2VSZWdpc3Rlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvUGFnZVJlZ2lzdGVyLmpzIn0=
