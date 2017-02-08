System.register(["../di", "./Errors", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, di_2, Errors_1, utils_1, ComponentManager;
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
            ComponentManager = (function () {
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
            exports_1("ComponentManager", ComponentManager);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50TWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuL0Vycm9yc1wiLCBcIi4uL3V0aWxzXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgZGlfMSwgZGlfMiwgRXJyb3JzXzEsIHV0aWxzXzEsIENvbXBvbmVudE1hbmFnZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICAgICAgZGlfMiA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgQ29tcG9uZW50TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50TWFuYWdlcihfSW5qZWN0b3IsIF9TKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0luamVjdG9yID0gX0luamVjdG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9TID0gX1M7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcmUgYXZhaWxhYmxlIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuIGNvbXBvbmVudGUgcGFyYSBwb2RlciBzZXIgdXNhZG8gZW4gbGFzIHDDoWdpbmFzLiBFbCBjb250cm9sYWRvciBkZWJlIGV4dGVuZGVyIGRlIENvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0NvbXBvbmVudENvbnRyb2xsZXJ9ICBjb21wb25lbnQgICAgICAgIENvbnRyb2xhZG9yIGRlbCBjb21wb25lbnRlLiBEZWJlIGV4dGVuZGVyIGRlIENvbXBvbmVudENvbnRyb2xsZXIgeVxuICAgICAgICAgICAgICAgICAqIGVzdGFyIHJlZ2lzdHJhZG8gZW4gZWwgREkgY29uIGVsIHRpcG8gQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICogQHNlZSBJbmplY3Rvci5yZWdpc3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIENvbXBvbmVudE1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb21wb25lbnQgbXVzdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb21wb25lbnQgbXVzdCBoYXZlIGEgbmFtZSByZWdpc3RlcmVkIGJ5IHRoZSBpbmplY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IGNvbXBvbmVudC5fY29tcG9uZW50TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW5hbWVfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWVJc1ZhbGlkKG5hbWVfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuX2NvbXBvbmVudHMuZ2V0KG5hbWVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgZXhpc3RzLCBzaG91bGQgYmUgZXF1YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPSBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5Q29tcG9uZW50QWxyZWFkeVJlZ2lzdGVyZWRFcnJvcihuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBub3QgZXhpc3RzLCByZWdpc3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zZXQobmFtZV8xLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5Q29tcG9uZW50TmFtZUludmFsaWRFcnJvcihuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlDb21wb25lbnRJbnZhbGlkRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgQ29tcG9uZW50TWFuYWdlci5wcm90b3R5cGUubmFtZUlzVmFsaWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fUyhuYW1lKS5jYW1lbGl6ZSgpLnMgPT09IG5hbWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBDb21wb25lbnRNYW5hZ2VyLnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cy5nZXQobmFtZSkgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuIGNvbmp1bnRvIGRlIGNvbXBvbmVudGVzLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgQ29tcG9uZW50TWFuYWdlciNhZGRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0NvbXBvbmVudENvbnRyb2xsZXJbXX0gICAgY29tcG9uZW50cyAgICAgICBDb21wb25lbnRlcyBhIGHDsWFkaXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBDb21wb25lbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGRBbGwgPSBmdW5jdGlvbiAoY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNvbXBvbmVudHNfMSA9IGNvbXBvbmVudHM7IF9pIDwgY29tcG9uZW50c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IGNvbXBvbmVudHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFuYWdlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBDb21wb25lbnRNYW5hZ2VyID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJDb21wb25lbnRNYW5hZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlfMi5JbmplY3RvclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLlNcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBDb21wb25lbnRNYW5hZ2VyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkNvbXBvbmVudE1hbmFnZXJcIiwgQ29tcG9uZW50TWFuYWdlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6ImNvbXBvbmVudC9Db21wb25lbnRNYW5hZ2VyLmpzIn0=
