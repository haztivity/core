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
                        options = this._$.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance.activate($element);
                        $element.data(this._instanceDataName, controllerInstance);
                        //init controller
                        controllerInstance.init(options, config.data);
                    }
                    else {
                        //warn
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
        return this._$(result);
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
        return this._$($elements);
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
//# sourceMappingURL=ComponentInitializer.js.map