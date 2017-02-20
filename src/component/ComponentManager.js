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
    var ComponentManager = (function () {
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
        return ComponentManager;
    }());
    ComponentManager = __decorate([
        di_1.Core({
            name: "ComponentManager",
            dependencies: [
                di_2.InjectorService,
                utils_1.S
            ]
        })
    ], ComponentManager);
    exports.ComponentManager = ComponentManager;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50TWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi4vZGlcIiwgXCIuL0Vycm9yc1wiLCBcIi4uL3V0aWxzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBkaV8yID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBFcnJvcnNfMSA9IHJlcXVpcmUoXCIuL0Vycm9yc1wiKTtcbiAgICB2YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbiAgICB2YXIgQ29tcG9uZW50TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudE1hbmFnZXIoX0luamVjdG9yLCBfUykge1xuICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3IgPSBfSW5qZWN0b3I7XG4gICAgICAgICAgICB0aGlzLl9TID0gX1M7XG4gICAgICAgICAgICAvL3N0b3JlIGF2YWlsYWJsZSBjb21wb25lbnRzXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBw7FhZGUgdW4gY29tcG9uZW50ZSBwYXJhIHBvZGVyIHNlciB1c2FkbyBlbiBsYXMgcMOhZ2luYXMuIEVsIGNvbnRyb2xhZG9yIGRlYmUgZXh0ZW5kZXIgZGUgQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgICAgKiBAcGFyYW0ge0NvbXBvbmVudENvbnRyb2xsZXJ9ICBjb21wb25lbnQgICAgICAgIENvbnRyb2xhZG9yIGRlbCBjb21wb25lbnRlLiBEZWJlIGV4dGVuZGVyIGRlIENvbXBvbmVudENvbnRyb2xsZXIgeVxuICAgICAgICAgKiBlc3RhciByZWdpc3RyYWRvIGVuIGVsIERJIGNvbiBlbCB0aXBvIENvbXBvbmVudFxuICAgICAgICAgKiBAc2VlIEluamVjdG9yLnJlZ2lzdGVyQ29tcG9uZW50XG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAvL2NvbXBvbmVudCBtdXN0IGV4aXN0c1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIC8vY29tcG9uZW50IG11c3QgaGF2ZSBhIG5hbWUgcmVnaXN0ZXJlZCBieSB0aGUgaW5qZWN0b3JcbiAgICAgICAgICAgICAgICB2YXIgbmFtZV8xID0gY29tcG9uZW50Ll9jb21wb25lbnROYW1lO1xuICAgICAgICAgICAgICAgIGlmICghIW5hbWVfMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uYW1lSXNWYWxpZChuYW1lXzEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuX2NvbXBvbmVudHMuZ2V0KG5hbWVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGV4aXN0cywgc2hvdWxkIGJlIGVxdWFsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPSBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUNvbXBvbmVudEFscmVhZHlSZWdpc3RlcmVkRXJyb3IobmFtZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIG5vdCBleGlzdHMsIHJlZ2lzdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zZXQobmFtZV8xLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUNvbXBvbmVudE5hbWVJbnZhbGlkRXJyb3IobmFtZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUNvbXBvbmVudEludmFsaWRFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29tcG9uZW50TWFuYWdlci5wcm90b3R5cGUubmFtZUlzVmFsaWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1MobmFtZSkuY2FtZWxpemUoKS5zID09PSBuYW1lO1xuICAgICAgICB9O1xuICAgICAgICBDb21wb25lbnRNYW5hZ2VyLnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHMuZ2V0KG5hbWUpICE9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEHDsWFkZSB1biBjb25qdW50byBkZSBjb21wb25lbnRlcy5cbiAgICAgICAgICogQHNlZSBDb21wb25lbnRNYW5hZ2VyI2FkZFxuICAgICAgICAgKiBAcGFyYW0ge0NvbXBvbmVudENvbnRyb2xsZXJbXX0gICAgY29tcG9uZW50cyAgICAgICBDb21wb25lbnRlcyBhIGHDsWFkaXJcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudE1hbmFnZXIucHJvdG90eXBlLmFkZEFsbCA9IGZ1bmN0aW9uIChjb21wb25lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNvbXBvbmVudHNfMSA9IGNvbXBvbmVudHM7IF9pIDwgY29tcG9uZW50c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBjb21wb25lbnRzXzFbX2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYW5hZ2VyO1xuICAgIH0oKSk7XG4gICAgQ29tcG9uZW50TWFuYWdlciA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJDb21wb25lbnRNYW5hZ2VyXCIsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICBkaV8yLkluamVjdG9yU2VydmljZSxcbiAgICAgICAgICAgICAgICB1dGlsc18xLlNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBDb21wb25lbnRNYW5hZ2VyKTtcbiAgICBleHBvcnRzLkNvbXBvbmVudE1hbmFnZXIgPSBDb21wb25lbnRNYW5hZ2VyO1xufSk7XG4iXSwiZmlsZSI6ImNvbXBvbmVudC9Db21wb25lbnRNYW5hZ2VyLmpzIn0=
