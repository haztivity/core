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
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=ResourceManager.js.map