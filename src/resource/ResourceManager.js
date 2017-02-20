var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "../di", "./Errors", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var di_2 = require("../di");
    var Errors_1 = require("./Errors");
    var utils_1 = require("../utils");
    var ResourceManager = (function () {
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
    exports.ResourceManager = ResourceManager;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9kaVwiLCBcIi4uL2RpXCIsIFwiLi9FcnJvcnNcIiwgXCIuLi91dGlsc1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgZGlfMiA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgRXJyb3JzXzEgPSByZXF1aXJlKFwiLi9FcnJvcnNcIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIFJlc291cmNlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlTWFuYWdlcihfSW5qZWN0b3IsIF9TKSB7XG4gICAgICAgICAgICB0aGlzLl9JbmplY3RvciA9IF9JbmplY3RvcjtcbiAgICAgICAgICAgIHRoaXMuX1MgPSBfUztcbiAgICAgICAgICAgIC8vc3RvcmUgYXZhaWxhYmxlIHJlc291cmNlc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBw7FhZGUgdW4gcmVjdXJzbyBwYXJhIHBvZGVyIHNlciB1c2FkbyBlbiBsYXMgcMOhZ2luYXMuIEVsIGNvbnRyb2xhZG9yIGRlYmUgZXh0ZW5kZXIgZGUgUmVzb3VyY2VDb250cm9sbGVyXG4gICAgICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDb250cm9sbGVyfSAgcmVzb3VyY2UgICAgICAgIENvbnRyb2xhZG9yIGRlbCByZWN1cnNvLiBEZWJlIGV4dGVuZGVyIGRlIFJlc291cmNlQ29udHJvbGxlciB5IGVzdGFyIHJlZ2lzdHJhZG8gZW4gZWwgREkgY29uIGVsIHRpcG8gUmVzb3VyY2VcbiAgICAgICAgICogQHNlZSBJbmplY3Rvci5yZWdpc3RlclJlc291cmNlXG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZU1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICAgICAgLy9yZXNvdXJjZSBtdXN0IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgLy9yZXNvdXJjZSBtdXN0IGhhdmUgYSBuYW1lIHJlZ2lzdGVyZWQgYnkgdGhlIGluamVjdG9yXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHJlc291cmNlLl9yZXNvdXJjZU5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKCEhbmFtZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWVJc1ZhbGlkKG5hbWVfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5fcmVzb3VyY2VzLmdldChuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBleGlzdHMsIHNob3VsZCBiZSBlcXVhbFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT0gcmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVJlc291cmNlQWxyZWFkeVJlZ2lzdGVyZWRFcnJvcihuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbm90IGV4aXN0cywgcmVnaXN0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KG5hbWVfMSwgcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVJlc291cmNlTmFtZUludmFsaWRFcnJvcihuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLnByb3RvdHlwZS5uYW1lSXNWYWxpZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fUyhuYW1lKS5jYW1lbGl6ZSgpLnMgPT09IG5hbWU7XG4gICAgICAgIH07XG4gICAgICAgIFJlc291cmNlTWFuYWdlci5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZXMuZ2V0KG5hbWUpICE9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEHDsWFkZSB1biBjb25qdW50byBkZSByZWN1cnNvcy5cbiAgICAgICAgICogQHNlZSBSZXNvdXJjZU1hbmFnZXIjYWRkXG4gICAgICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDb250cm9sbGVyW119ICAgIHJlc291cmNlcyAgICAgICBSZWN1cnNvcyBhIGHDsWFkaXJcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlTWFuYWdlci5wcm90b3R5cGUuYWRkQWxsID0gZnVuY3Rpb24gKHJlc291cmNlcykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCByZXNvdXJjZXNfMSA9IHJlc291cmNlczsgX2kgPCByZXNvdXJjZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSByZXNvdXJjZXNfMVtfaV07XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VNYW5hZ2VyO1xuICAgIH0oKSk7XG4gICAgUmVzb3VyY2VNYW5hZ2VyID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlTWFuYWdlclwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgZGlfMi5JbmplY3RvclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5TXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgUmVzb3VyY2VNYW5hZ2VyKTtcbiAgICBleHBvcnRzLlJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlcjtcbn0pO1xuIl0sImZpbGUiOiJyZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXIuanMifQ==
