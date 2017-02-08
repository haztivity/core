System.register(["../di", "./Errors", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, di_2, Errors_1, utils_1, ResourceManager;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            ResourceManager = (function () {
                function ResourceManager(_Injector, _S) {
                    this._Injector = _Injector;
                    this._S = _S;
                    //store available resources
                    this._resources = new Map();
                }
                /**
                 * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
                 * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
                 * @see Injector.registerResource
                 */
                ResourceManager.prototype.add = function (resource) {
                    //resource must exists
                    if (resource) {
                        //resource must have a name registered by the injector
                        var name_1 = resource._resourceName;
                        if (!!name_1) {
                            if (this.nameIsValid(name_1)) {
                                //check if already exists
                                var current = this._resources.get(name_1);
                                //if exists, should be equal
                                if (current != undefined) {
                                    if (current != resource) {
                                        throw new Errors_1.HaztivityResourceAlreadyRegisteredError(name_1);
                                    }
                                }
                                else {
                                    //if not exists, register
                                    this._resources.set(name_1, resource);
                                }
                            }
                            else {
                                throw new Errors_1.HaztivityResourceNameInvalidError(name_1);
                            }
                        }
                        else {
                            throw new Errors_1.HaztivityResourceInvalidError();
                        }
                    }
                    else {
                        throw new Errors_1.HaztivityResourceInvalidError();
                    }
                };
                ResourceManager.prototype.nameIsValid = function (name) {
                    return this._S(name).camelize().s === name;
                };
                ResourceManager.prototype.exists = function (name) {
                    return this._resources.get(name) != undefined;
                };
                /**
                 * Añade un conjunto de recursos.
                 * @see ResourceManager#add
                 * @param {ResourceController[]}    resources       Recursos a añadir
                 */
                ResourceManager.prototype.addAll = function (resources) {
                    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                        var resource = resources_1[_i];
                        this.add(resource);
                    }
                };
                return ResourceManager;
            }());
            ResourceManager = __decorate([
                di_1.Core({
                    name: "ResourceManager",
                    dependencies: [
                        di_2.InjectorService,
                        utils_1.S
                    ]
                })
            ], ResourceManager);
            exports_1("ResourceManager", ResourceManager);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi9FcnJvcnNcIiwgXCIuLi91dGlsc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIGRpXzIsIEVycm9yc18xLCB1dGlsc18xLCBSZXNvdXJjZU1hbmFnZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICAgICAgZGlfMiA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBSZXNvdXJjZU1hbmFnZXIoX0luamVjdG9yLCBfUykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9JbmplY3RvciA9IF9JbmplY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUyA9IF9TO1xuICAgICAgICAgICAgICAgICAgICAvL3N0b3JlIGF2YWlsYWJsZSByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBw7FhZGUgdW4gcmVjdXJzbyBwYXJhIHBvZGVyIHNlciB1c2FkbyBlbiBsYXMgcMOhZ2luYXMuIEVsIGNvbnRyb2xhZG9yIGRlYmUgZXh0ZW5kZXIgZGUgUmVzb3VyY2VDb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtSZXNvdXJjZUNvbnRyb2xsZXJ9ICByZXNvdXJjZSAgICAgICAgQ29udHJvbGFkb3IgZGVsIHJlY3Vyc28uIERlYmUgZXh0ZW5kZXIgZGUgUmVzb3VyY2VDb250cm9sbGVyIHkgZXN0YXIgcmVnaXN0cmFkbyBlbiBlbCBESSBjb24gZWwgdGlwbyBSZXNvdXJjZVxuICAgICAgICAgICAgICAgICAqIEBzZWUgSW5qZWN0b3IucmVnaXN0ZXJSZXNvdXJjZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVzb3VyY2UgbXVzdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc291cmNlIG11c3QgaGF2ZSBhIG5hbWUgcmVnaXN0ZXJlZCBieSB0aGUgaW5qZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lXzEgPSByZXNvdXJjZS5fcmVzb3VyY2VOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbmFtZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmFtZUlzVmFsaWQobmFtZV8xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5fcmVzb3VyY2VzLmdldChuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGV4aXN0cywgc2hvdWxkIGJlIGVxdWFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT0gcmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VBbHJlYWR5UmVnaXN0ZXJlZEVycm9yKG5hbWVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIG5vdCBleGlzdHMsIHJlZ2lzdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KG5hbWVfMSwgcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VOYW1lSW52YWxpZEVycm9yKG5hbWVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVJlc291cmNlSW52YWxpZEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLnByb3RvdHlwZS5uYW1lSXNWYWxpZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9TKG5hbWUpLmNhbWVsaXplKCkucyA9PT0gbmFtZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlcy5nZXQobmFtZSkgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuIGNvbmp1bnRvIGRlIHJlY3Vyc29zLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgUmVzb3VyY2VNYW5hZ2VyI2FkZFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDb250cm9sbGVyW119ICAgIHJlc291cmNlcyAgICAgICBSZWN1cnNvcyBhIGHDsWFkaXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIucHJvdG90eXBlLmFkZEFsbCA9IGZ1bmN0aW9uIChyZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCByZXNvdXJjZXNfMSA9IHJlc291cmNlczsgX2kgPCByZXNvdXJjZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IHJlc291cmNlc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlTWFuYWdlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlTWFuYWdlclwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpXzIuSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5TXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgUmVzb3VyY2VNYW5hZ2VyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlJlc291cmNlTWFuYWdlclwiLCBSZXNvdXJjZU1hbmFnZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJyZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXIuanMifQ==
