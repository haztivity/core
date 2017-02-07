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
                        var name = resource._resourceName;
                        if (!!name) {
                            if (this.nameIsValid(name)) {
                                //check if already exists
                                var current = this._resources.get(name);
                                //if exists, should be equal
                                if (current != undefined) {
                                    if (current != resource) {
                                        throw new Errors_1.HaztivityResourceAlreadyRegisteredError(name);
                                    }
                                }
                                else {
                                    //if not exists, register
                                    this._resources.set(name, resource);
                                }
                            }
                            else {
                                throw new Errors_1.HaztivityResourceNameInvalidError(name);
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
//# sourceMappingURL=ResourceManager.js.map