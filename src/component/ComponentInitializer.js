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
        define(["require", "exports", "../di", "./ComponentManager", "../utils", "../utils", "../jquery", "./Errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var ComponentManager_1 = require("./ComponentManager");
    var utils_1 = require("../utils");
    var utils_2 = require("../utils");
    var jquery_1 = require("../jquery");
    var Errors_1 = require("./Errors");
    var ComponentInitializer = (function () {
        /**
         * Inicializador de componentes.
         * @class
         * @param {JQueryStatic}                    _$
         * @param {ComponentManager}                _ComponentManager
         * @param {InjectorService}                 _InjectorService
         * @param {String.JS}                       _S
         * @param {DataOptions}                     _DataOptions
         */
        function ComponentInitializer(_$, _ComponentManager, _InjectorService, _S, _DataOptions) {
            this._$ = _$;
            this._ComponentManager = _ComponentManager;
            this._InjectorService = _InjectorService;
            this._S = _S;
            this._DataOptions = _DataOptions;
            this._prefix = "hz-component";
            this._camelPrefix = this._S(this._prefix).camelize().s;
            this._instanceDataName = this._camelPrefix + "Instance";
        }
        /**
         * Inicializa todos los componentes en un contexto en concreto
         * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
         */
        ComponentInitializer.prototype.initialize = function ($context) {
            var $elements = this._findElementsInContext($context), results = [];
            for (var _i = 0, $elements_1 = $elements; _i < $elements_1.length; _i++) {
                var $element = $elements_1[_i];
                var result = this.initializeOne(jquery_1.$($element));
                if (result != undefined) {
                    results.push(result);
                }
            }
            return results;
        };
        /**
         * Inicializa un componente en un elemento en concreto. El elemento ha de tener un componente válido indicado
         * @param {JQuery}  $element            Elemento en el que inicializar el componente
         * @param {*}       [config]            Configuración para la inicialización. Acepta:
         * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
         * @param {*}       [config.data]       Datos y configuración para el controlador del componente
         */
        ComponentInitializer.prototype.initializeOne = function ($element, config) {
            if (config === void 0) { config = {}; }
            //get name
            var name = $element.data(this._prefix), result;
            if (!!name) {
                //check if exists
                if (!!this._ComponentManager.exists(name)) {
                    //get from DI
                    var controllerInstance = $element.data(this._instanceDataName);
                    if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                        controllerInstance = this._InjectorService.get(name);
                        if (controllerInstance) {
                            //check if is already instanciated
                            //extract options
                            var options = this._DataOptions.getDataOptions($element, name);
                            options = jquery_1.$.extend({}, options, config.options);
                            //get controller instance
                            controllerInstance.activate($element);
                            $element.data(this._instanceDataName, controllerInstance);
                            //init controller
                            controllerInstance.init(options, config.data);
                        }
                        else {
                        }
                        result = controllerInstance;
                    }
                    else {
                        throw new Errors_1.HaztivityInvalidComponentControllerError(name);
                    }
                }
                else {
                    throw new Errors_1.HaztivityComponentNotRegisteredError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityComponentNameRequiredError($element);
            }
            return result;
        };
        /**
         * Obtiene los elementos DOM indicados como componentes
         * @param {JQuery}      $context            Contexto en el cual buscar los componentes
         * @param {number}      [initState=2]       Establece que componentes obtener. Se puede indicar:
         *                                          0   se obtienen los componentes sin inicializar
         *                                          1   se obtienen los componentes inicializados
         *                                          2   se obtienen los componentes sin inicializar e inicializados
         * @returns {JQuery}
         */
        ComponentInitializer.prototype.getComponents = function ($context, initState) {
            if (initState === void 0) { initState = 2; }
            var result = [], $elements = this._findElementsInContext($context);
            switch (initState) {
                case 0:
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this._$($elements[elementIndex]);
                        if ($element.data(this._instanceDataName) == undefined) {
                            result.push($element);
                        }
                    }
                    break;
                case 1:
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this._$($elements[elementIndex]);
                        if ($element.data(this._instanceDataName) != undefined) {
                            result.push($element);
                        }
                    }
                    break;
                default:
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this._$($elements[elementIndex]);
                        result.push($element);
                    }
                    break;
            }
            return jquery_1.$(result);
        };
        /**
         * Obtiene los controladores de componentes
         * @param {JQuery}      $context            Contexto en el cual buscar.
         * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
         * @returns {Array}
         */
        ComponentInitializer.prototype.getComponentsControllers = function ($context, recursive) {
            if (recursive === void 0) { recursive = true; }
            var result = [], $elements = recursive === true
                ? this._findElementsInContext($context)
                : $context;
            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                var $element = this._$($elements[elementIndex]), controller = $element.data(this._instanceDataName);
                if (controller != undefined) {
                    result.push(controller);
                }
            }
            return result;
        };
        ComponentInitializer.prototype._findElementsInContext = function ($context) {
            var _this = this;
            var $elements, parents = [];
            //check if context is also a component
            if ($context.length === 1) {
                if ($context.is("[" + this._prefix + "],[data-" + this._prefix + "]")) {
                    parents = $context.toArray();
                }
            }
            else {
                $context.each(function (index, element) {
                    var $element = _this._$(element);
                    if ($element.is("[" + _this._prefix + "],[data-" + _this._prefix + "]")) {
                        parents.push($element);
                    }
                });
            }
            $elements = parents.concat($context.find("[" + this._prefix + "],[data-" + this._prefix + "]").toArray()); //get elements with the prefix
            return jquery_1.$($elements);
        };
        return ComponentInitializer;
    }());
    ComponentInitializer = __decorate([
        di_1.Core({
            name: "ComponentInitializer",
            dependencies: [
                jquery_1.$,
                ComponentManager_1.ComponentManager,
                di_1.InjectorService,
                utils_1.S,
                utils_2.DataOptions
            ]
        })
    ], ComponentInitializer);
    exports.ComponentInitializer = ComponentInitializer;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50SW5pdGlhbGl6ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9kaVwiLCBcIi4vQ29tcG9uZW50TWFuYWdlclwiLCBcIi4uL3V0aWxzXCIsIFwiLi4vdXRpbHNcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL0Vycm9yc1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgQ29tcG9uZW50TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFuYWdlclwiKTtcbiAgICB2YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbiAgICB2YXIgdXRpbHNfMiA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbiAgICB2YXIganF1ZXJ5XzEgPSByZXF1aXJlKFwiLi4vanF1ZXJ5XCIpO1xuICAgIHZhciBFcnJvcnNfMSA9IHJlcXVpcmUoXCIuL0Vycm9yc1wiKTtcbiAgICB2YXIgQ29tcG9uZW50SW5pdGlhbGl6ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5pY2lhbGl6YWRvciBkZSBjb21wb25lbnRlcy5cbiAgICAgICAgICogQGNsYXNzXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5U3RhdGljfSAgICAgICAgICAgICAgICAgICAgXyRcbiAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnRNYW5hZ2VyfSAgICAgICAgICAgICAgICBfQ29tcG9uZW50TWFuYWdlclxuICAgICAgICAgKiBAcGFyYW0ge0luamVjdG9yU2VydmljZX0gICAgICAgICAgICAgICAgIF9JbmplY3RvclNlcnZpY2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmcuSlN9ICAgICAgICAgICAgICAgICAgICAgICBfU1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGFPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgIF9EYXRhT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50SW5pdGlhbGl6ZXIoXyQsIF9Db21wb25lbnRNYW5hZ2VyLCBfSW5qZWN0b3JTZXJ2aWNlLCBfUywgX0RhdGFPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICB0aGlzLl9Db21wb25lbnRNYW5hZ2VyID0gX0NvbXBvbmVudE1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl9JbmplY3RvclNlcnZpY2UgPSBfSW5qZWN0b3JTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy5fUyA9IF9TO1xuICAgICAgICAgICAgdGhpcy5fRGF0YU9wdGlvbnMgPSBfRGF0YU9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLl9wcmVmaXggPSBcImh6LWNvbXBvbmVudFwiO1xuICAgICAgICAgICAgdGhpcy5fY2FtZWxQcmVmaXggPSB0aGlzLl9TKHRoaXMuX3ByZWZpeCkuY2FtZWxpemUoKS5zO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VEYXRhTmFtZSA9IHRoaXMuX2NhbWVsUHJlZml4ICsgXCJJbnN0YW5jZVwiO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmljaWFsaXphIHRvZG9zIGxvcyBjb21wb25lbnRlcyBlbiB1biBjb250ZXh0byBlbiBjb25jcmV0b1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICRjb250ZXh0ICAgIENvbnRleHRvIGVuIGVsIGN1YWwgYnVzY2FyIGNvbXBvbmVudGVzIGEgaW5pY2lhbGl6YXJcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudEluaXRpYWxpemVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCRjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KSwgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCAkZWxlbWVudHNfMSA9ICRlbGVtZW50czsgX2kgPCAkZWxlbWVudHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkZWxlbWVudHNfMVtfaV07XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuaW5pdGlhbGl6ZU9uZShqcXVlcnlfMS4kKCRlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmljaWFsaXphIHVuIGNvbXBvbmVudGUgZW4gdW4gZWxlbWVudG8gZW4gY29uY3JldG8uIEVsIGVsZW1lbnRvIGhhIGRlIHRlbmVyIHVuIGNvbXBvbmVudGUgdsOhbGlkbyBpbmRpY2Fkb1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICRlbGVtZW50ICAgICAgICAgICAgRWxlbWVudG8gZW4gZWwgcXVlIGluaWNpYWxpemFyIGVsIGNvbXBvbmVudGVcbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5vcHRpb25zXSAgICBPcGNpb25lcyBwYXJhIGVsIGNvbXBvbmVudGUuIFNpIHVuYSBtaXNtYSBvcGNpw7NuIHNlIGluZGljYSBhIHRyYXbDqXMgZGUgY29uZmlnLm9wdGlvbnMgeSBtZWRpYW50ZSB1biBhdHJpYnV0byBkYXRhLSBwcmVkb21pbmEgZWwgaW5kaWNhZG8gbWVkaWFudGUgY29uZmlnLm9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLmRhdGFdICAgICAgIERhdG9zIHkgY29uZmlndXJhY2nDs24gcGFyYSBlbCBjb250cm9sYWRvciBkZWwgY29tcG9uZW50ZVxuICAgICAgICAgKi9cbiAgICAgICAgQ29tcG9uZW50SW5pdGlhbGl6ZXIucHJvdG90eXBlLmluaXRpYWxpemVPbmUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XG4gICAgICAgICAgICAvL2dldCBuYW1lXG4gICAgICAgICAgICB2YXIgbmFtZSA9ICRlbGVtZW50LmRhdGEodGhpcy5fcHJlZml4KSwgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKCEhbmFtZSkge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKCEhdGhpcy5fQ29tcG9uZW50TWFuYWdlci5leGlzdHMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgZnJvbSBESVxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlckluc3RhbmNlID0gJGVsZW1lbnQuZGF0YSh0aGlzLl9pbnN0YW5jZURhdGFOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXJJbnN0YW5jZSA9PSB1bmRlZmluZWQgfHwgY29udHJvbGxlckluc3RhbmNlLmlzRGVzdHJveWVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZSA9IHRoaXMuX0luamVjdG9yU2VydmljZS5nZXQobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlckluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpcyBhbHJlYWR5IGluc3RhbmNpYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXh0cmFjdCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLl9EYXRhT3B0aW9ucy5nZXREYXRhT3B0aW9ucygkZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGpxdWVyeV8xLiQuZXh0ZW5kKHt9LCBvcHRpb25zLCBjb25maWcub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9nZXQgY29udHJvbGxlciBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZS5hY3RpdmF0ZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZGF0YSh0aGlzLl9pbnN0YW5jZURhdGFOYW1lLCBjb250cm9sbGVySW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdCBjb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckluc3RhbmNlLmluaXQob3B0aW9ucywgY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjb250cm9sbGVySW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5SW52YWxpZENvbXBvbmVudENvbnRyb2xsZXJFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3IoJGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgbG9zIGVsZW1lbnRvcyBET00gaW5kaWNhZG9zIGNvbW8gY29tcG9uZW50ZXNcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgJGNvbnRleHQgICAgICAgICAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciBsb3MgY29tcG9uZW50ZXNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9ICAgICAgW2luaXRTdGF0ZT0yXSAgICAgICBFc3RhYmxlY2UgcXVlIGNvbXBvbmVudGVzIG9idGVuZXIuIFNlIHB1ZWRlIGluZGljYXI6XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAgIHNlIG9idGllbmVuIGxvcyBjb21wb25lbnRlcyBzaW4gaW5pY2lhbGl6YXJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICAgc2Ugb2J0aWVuZW4gbG9zIGNvbXBvbmVudGVzIGluaWNpYWxpemFkb3NcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyICAgc2Ugb2J0aWVuZW4gbG9zIGNvbXBvbmVudGVzIHNpbiBpbmljaWFsaXphciBlIGluaWNpYWxpemFkb3NcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeX1cbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudEluaXRpYWxpemVyLnByb3RvdHlwZS5nZXRDb21wb25lbnRzID0gZnVuY3Rpb24gKCRjb250ZXh0LCBpbml0U3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChpbml0U3RhdGUgPT09IHZvaWQgMCkgeyBpbml0U3RhdGUgPSAyOyB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sICRlbGVtZW50cyA9IHRoaXMuX2ZpbmRFbGVtZW50c0luQ29udGV4dCgkY29udGV4dCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGluaXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuZGF0YSh0aGlzLl9pbnN0YW5jZURhdGFOYW1lKSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBqcXVlcnlfMS4kKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIGxvcyBjb250cm9sYWRvcmVzIGRlIGNvbXBvbmVudGVzXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgICAgICRjb250ZXh0ICAgICAgICAgICAgQ29udGV4dG8gZW4gZWwgY3VhbCBidXNjYXIuXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgIFtyZWN1cnNpdmU9dHJ1ZV0gICAgSW5kaWNhIHNpIGJ1c2NhciByZWN1cnNpdmFtZW50ZVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRJbml0aWFsaXplci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50c0NvbnRyb2xsZXJzID0gZnVuY3Rpb24gKCRjb250ZXh0LCByZWN1cnNpdmUpIHtcbiAgICAgICAgICAgIGlmIChyZWN1cnNpdmUgPT09IHZvaWQgMCkgeyByZWN1cnNpdmUgPSB0cnVlOyB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sICRlbGVtZW50cyA9IHJlY3Vyc2l2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KVxuICAgICAgICAgICAgICAgIDogJGNvbnRleHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSksIGNvbnRyb2xsZXIgPSAkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBDb21wb25lbnRJbml0aWFsaXplci5wcm90b3R5cGUuX2ZpbmRFbGVtZW50c0luQ29udGV4dCA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciAkZWxlbWVudHMsIHBhcmVudHMgPSBbXTtcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgY29udGV4dCBpcyBhbHNvIGEgY29tcG9uZW50XG4gICAgICAgICAgICBpZiAoJGNvbnRleHQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRjb250ZXh0LmlzKFwiW1wiICsgdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgdGhpcy5fcHJlZml4ICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMgPSAkY29udGV4dC50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJGNvbnRleHQuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gX3RoaXMuXyQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcyhcIltcIiArIF90aGlzLl9wcmVmaXggKyBcIl0sW2RhdGEtXCIgKyBfdGhpcy5fcHJlZml4ICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZWxlbWVudHMgPSBwYXJlbnRzLmNvbmNhdCgkY29udGV4dC5maW5kKFwiW1wiICsgdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgdGhpcy5fcHJlZml4ICsgXCJdXCIpLnRvQXJyYXkoKSk7IC8vZ2V0IGVsZW1lbnRzIHdpdGggdGhlIHByZWZpeFxuICAgICAgICAgICAgcmV0dXJuIGpxdWVyeV8xLiQoJGVsZW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudEluaXRpYWxpemVyO1xuICAgIH0oKSk7XG4gICAgQ29tcG9uZW50SW5pdGlhbGl6ZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ29tcG9uZW50SW5pdGlhbGl6ZXJcIixcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50TWFuYWdlcl8xLkNvbXBvbmVudE1hbmFnZXIsXG4gICAgICAgICAgICAgICAgZGlfMS5JbmplY3RvclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5TLFxuICAgICAgICAgICAgICAgIHV0aWxzXzIuRGF0YU9wdGlvbnNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBDb21wb25lbnRJbml0aWFsaXplcik7XG4gICAgZXhwb3J0cy5Db21wb25lbnRJbml0aWFsaXplciA9IENvbXBvbmVudEluaXRpYWxpemVyO1xufSk7XG4iXSwiZmlsZSI6ImNvbXBvbmVudC9Db21wb25lbnRJbml0aWFsaXplci5qcyJ9
