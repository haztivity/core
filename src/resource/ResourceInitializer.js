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
        define(["require", "exports", "../di", "./ResourceManager", "../utils", "../jquery", "./Errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var ResourceManager_1 = require("./ResourceManager");
    var utils_1 = require("../utils");
    var jquery_1 = require("../jquery");
    var Errors_1 = require("./Errors");
    var ResourceInitializer = ResourceInitializer_1 = (function () {
        function ResourceInitializer(_$, _ResourceManager, _InjectorService, _DataOptions) {
            this._$ = _$;
            this._ResourceManager = _ResourceManager;
            this._InjectorService = _InjectorService;
            this._DataOptions = _DataOptions;
        }
        /**
         * Inicializa todos los recursos en un contexto en concreto
         * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
         */
        ResourceInitializer.prototype.initialize = function ($context) {
            var $elements = this._findElementsInContext($context), results = [];
            for (var _i = 0, _a = $elements; _i < _a.length; _i++) {
                var element = _a[_i];
                var result = this.initializeOne(jquery_1.$(element));
                if (result != undefined) {
                    results.push(result);
                }
            }
            return results;
        };
        /**
         * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
         * @param {JQuery}  $element            Elemento en el que inicializar el recurso
         * @param {*}       [config]            Configuración para la inicialización. Acepta:
         * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
         * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
         */
        ResourceInitializer.prototype.initializeOne = function ($element, config) {
            if (config === void 0) { config = {}; }
            //get name
            var name = $element.data(ResourceInitializer_1.CAMEL_PREFIX), result;
            if (!!name) {
                //check if exists
                if (!!this._ResourceManager.exists(name)) {
                    //get from DI
                    var factory = this._InjectorService.get(name);
                    if (factory) {
                        //check if is already instanciated
                        var controllerInstance = $element.data(ResourceInitializer_1.PREFIX_INSTANCE);
                        if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                            //extract options
                            var options = this._DataOptions.getDataOptions($element, name);
                            options = jquery_1.$.extend({}, options, config.options);
                            //get controller instance
                            controllerInstance = factory.instance();
                            controllerInstance.activate($element);
                            $element.data(ResourceInitializer_1.PREFIX_INSTANCE, controllerInstance);
                            //init controller
                            controllerInstance.init(options, config.data);
                        }
                        else {
                            //warn
                        }
                        result = controllerInstance;
                    }
                    else {
                        throw new Errors_1.HaztivityInvalidResourceControllerError(name);
                    }
                }
                else {
                    throw new Errors_1.HaztivityResourceNotRegisteredError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityResourceNameRequiredError($element);
            }
            return result;
        };
        /**
         * Obtiene los elementos DOM indicados como recursos
         * @param {JQuery}      $context            Contexto en el cual buscar los recursos
         * @param {number}      [initState=2]       Establece que recursos obtener. Se puede indicar:
         *                                          0   se obtienen los recursos sin inicializar
         *                                          1   se obtienen los recursos inicializados
         *                                          2   se obtienen los recursos sin inicializar e inicializados
         * @returns {JQuery}
         */
        ResourceInitializer.prototype.getResources = function ($context, initState) {
            if (initState === void 0) { initState = 2; }
            var result = [], $elements = this._findElementsInContext($context);
            switch (initState) {
                case 0:
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this._$($elements[elementIndex]);
                        if ($element.data(ResourceInitializer_1.PREFIX_INSTANCE) == undefined) {
                            result.push($element);
                        }
                    }
                    break;
                case 1:
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this._$($elements[elementIndex]);
                        if ($element.data(ResourceInitializer_1.PREFIX_INSTANCE) != undefined) {
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
         * Obtiene los controladores de recursos
         * @param {JQuery}      $context            Contexto en el cual buscar.
         * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
         * @returns {Array}
         */
        ResourceInitializer.prototype.getResourcesControllers = function ($context, recursive) {
            if (recursive === void 0) { recursive = true; }
            var result = [], $elements = recursive === true
                ? this._findElementsInContext($context)
                : $context;
            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                var $element = this._$($elements[elementIndex]), controller = $element.data(ResourceInitializer_1.PREFIX_INSTANCE);
                if (controller != undefined) {
                    result.push(controller);
                }
            }
            return result;
        };
        ResourceInitializer.prototype._findElementsInContext = function ($context) {
            var $elements, parents = [];
            //check if context is also a resource
            if ($context.length === 1) {
                if ($context.is("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]")) {
                    parents = $context.toArray();
                }
            }
            else {
                $context.each(function (index, element) {
                    var $element = jquery_1.$(element);
                    if ($element.is("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]")) {
                        parents.push($element);
                    }
                });
            }
            $elements = parents.concat($context.find("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]").toArray()); //get elements with the prefix
            return jquery_1.$($elements);
        };
        return ResourceInitializer;
    }());
    ResourceInitializer.PREFIX = "hz-resource";
    ResourceInitializer.CAMEL_PREFIX = "hzResource";
    ResourceInitializer.PREFIX_INSTANCE = "hzResourceInstance";
    ResourceInitializer = ResourceInitializer_1 = __decorate([
        di_1.Core({
            name: "ResourceInitializer",
            dependencies: [
                jquery_1.$,
                ResourceManager_1.ResourceManager,
                di_1.InjectorService,
                utils_1.DataOptions
            ],
            public: true
        })
    ], ResourceInitializer);
    exports.ResourceInitializer = ResourceInitializer;
    var ResourceInitializer_1;
});
//# sourceMappingURL=ResourceInitializer.js.map