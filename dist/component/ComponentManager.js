"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var di_2 = require("../di");
var Errors_1 = require("./Errors");
var utils_1 = require("../utils");
var ComponentManager = /** @class */ (function () {
    function ComponentManager(_Injector, _S) {
        this._Injector = _Injector;
        this._S = _S;
        //store available components
        this._components = new Map();
    }
    /**
     * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
     * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
     * estar registrado en el DI con el tipo Component
     * @see Injector.registerComponent
     */
    ComponentManager.prototype.add = function (component) {
        //component must exists
        if (component) {
            //component must have a name registered by the injector
            var name_1 = component._componentName;
            if (!!name_1) {
                if (this.nameIsValid(name_1)) {
                    //check if already exists
                    var current = this._components.get(name_1);
                    //if exists, should be equal
                    if (current != undefined) {
                        if (current != component) {
                            throw new Errors_1.HaztivityComponentAlreadyRegisteredError(name_1);
                        }
                    }
                    else {
                        //if not exists, register
                        this._components.set(name_1, component);
                    }
                }
                else {
                    throw new Errors_1.HaztivityComponentNameInvalidError(name_1);
                }
            }
            else {
                throw new Errors_1.HaztivityComponentInvalidError();
            }
        }
        else {
            throw new Errors_1.HaztivityComponentInvalidError();
        }
    };
    ComponentManager.prototype.nameIsValid = function (name) {
        return this._S(name).camelize().s === name;
    };
    ComponentManager.prototype.exists = function (name) {
        return this._components.get(name) != undefined;
    };
    /**
     * Añade un conjunto de componentes.
     * @see ComponentManager#add
     * @param {ComponentController[]}    components       Componentes a añadir
     */
    ComponentManager.prototype.addAll = function (components) {
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            this.add(component);
        }
    };
    ComponentManager = __decorate([
        di_1.Core({
            name: "ComponentManager",
            dependencies: [
                di_2.InjectorService,
                utils_1.S
            ]
        })
    ], ComponentManager);
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map