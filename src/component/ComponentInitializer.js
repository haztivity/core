System.register(["../di", "./ComponentManager", "../utils", "../jquery", "./Errors"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, ComponentManager_1, utils_1, utils_2, jquery_1, Errors_1, ComponentInitializer;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ComponentManager_1_1) {
                ComponentManager_1 = ComponentManager_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
                utils_2 = utils_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            ComponentInitializer = (function () {
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
            exports_1("ComponentInitializer", ComponentInitializer);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50SW5pdGlhbGl6ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKFtcIi4uL2RpXCIsIFwiLi9Db21wb25lbnRNYW5hZ2VyXCIsIFwiLi4vdXRpbHNcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL0Vycm9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIENvbXBvbmVudE1hbmFnZXJfMSwgdXRpbHNfMSwgdXRpbHNfMiwganF1ZXJ5XzEsIEVycm9yc18xLCBDb21wb25lbnRJbml0aWFsaXplcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoQ29tcG9uZW50TWFuYWdlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBDb21wb25lbnRNYW5hZ2VyXzEgPSBDb21wb25lbnRNYW5hZ2VyXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgICAgICB1dGlsc18yID0gdXRpbHNfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAganF1ZXJ5XzEgPSBqcXVlcnlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChFcnJvcnNfMV8xKSB7XG4gICAgICAgICAgICAgICAgRXJyb3JzXzEgPSBFcnJvcnNfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBDb21wb25lbnRJbml0aWFsaXplciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5pY2lhbGl6YWRvciBkZSBjb21wb25lbnRlcy5cbiAgICAgICAgICAgICAgICAgKiBAY2xhc3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICAgICAgICAgIF8kXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnRNYW5hZ2VyfSAgICAgICAgICAgICAgICBfQ29tcG9uZW50TWFuYWdlclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SW5qZWN0b3JTZXJ2aWNlfSAgICAgICAgICAgICAgICAgX0luamVjdG9yU2VydmljZVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nLkpTfSAgICAgICAgICAgICAgICAgICAgICAgX1NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0RhdGFPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgIF9EYXRhT3B0aW9uc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudEluaXRpYWxpemVyKF8kLCBfQ29tcG9uZW50TWFuYWdlciwgX0luamVjdG9yU2VydmljZSwgX1MsIF9EYXRhT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0NvbXBvbmVudE1hbmFnZXIgPSBfQ29tcG9uZW50TWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3JTZXJ2aWNlID0gX0luamVjdG9yU2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUyA9IF9TO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9EYXRhT3B0aW9ucyA9IF9EYXRhT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJlZml4ID0gXCJoei1jb21wb25lbnRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FtZWxQcmVmaXggPSB0aGlzLl9TKHRoaXMuX3ByZWZpeCkuY2FtZWxpemUoKS5zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZURhdGFOYW1lID0gdGhpcy5fY2FtZWxQcmVmaXggKyBcIkluc3RhbmNlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdG9kb3MgbG9zIGNvbXBvbmVudGVzIGVuIHVuIGNvbnRleHRvIGVuIGNvbmNyZXRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkY29udGV4dCAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciBjb21wb25lbnRlcyBhIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50SW5pdGlhbGl6ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoJGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHRoaXMuX2ZpbmRFbGVtZW50c0luQ29udGV4dCgkY29udGV4dCksIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCAkZWxlbWVudHNfMSA9ICRlbGVtZW50czsgX2kgPCAkZWxlbWVudHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICRlbGVtZW50c18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmluaXRpYWxpemVPbmUoanF1ZXJ5XzEuJCgkZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdW4gY29tcG9uZW50ZSBlbiB1biBlbGVtZW50byBlbiBjb25jcmV0by4gRWwgZWxlbWVudG8gaGEgZGUgdGVuZXIgdW4gY29tcG9uZW50ZSB2w6FsaWRvIGluZGljYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkZWxlbWVudCAgICAgICAgICAgIEVsZW1lbnRvIGVuIGVsIHF1ZSBpbmljaWFsaXphciBlbCBjb21wb25lbnRlXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLm9wdGlvbnNdICAgIE9wY2lvbmVzIHBhcmEgZWwgY29tcG9uZW50ZS4gU2kgdW5hIG1pc21hIG9wY2nDs24gc2UgaW5kaWNhIGEgdHJhdsOpcyBkZSBjb25maWcub3B0aW9ucyB5IG1lZGlhbnRlIHVuIGF0cmlidXRvIGRhdGEtIHByZWRvbWluYSBlbCBpbmRpY2FkbyBtZWRpYW50ZSBjb25maWcub3B0aW9uc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5kYXRhXSAgICAgICBEYXRvcyB5IGNvbmZpZ3VyYWNpw7NuIHBhcmEgZWwgY29udHJvbGFkb3IgZGVsIGNvbXBvbmVudGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBDb21wb25lbnRJbml0aWFsaXplci5wcm90b3R5cGUuaW5pdGlhbGl6ZU9uZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxuICAgICAgICAgICAgICAgICAgICAvL2dldCBuYW1lXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJGVsZW1lbnQuZGF0YSh0aGlzLl9wcmVmaXgpLCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF0aGlzLl9Db21wb25lbnRNYW5hZ2VyLmV4aXN0cyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ2V0IGZyb20gRElcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlckluc3RhbmNlID0gJGVsZW1lbnQuZGF0YSh0aGlzLl9pbnN0YW5jZURhdGFOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlckluc3RhbmNlID09IHVuZGVmaW5lZCB8fCBjb250cm9sbGVySW5zdGFuY2UuaXNEZXN0cm95ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVySW5zdGFuY2UgPSB0aGlzLl9JbmplY3RvclNlcnZpY2UuZ2V0KG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlckluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGlzIGFscmVhZHkgaW5zdGFuY2lhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2V4dHJhY3Qgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLl9EYXRhT3B0aW9ucy5nZXREYXRhT3B0aW9ucygkZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ganF1ZXJ5XzEuJC5leHRlbmQoe30sIG9wdGlvbnMsIGNvbmZpZy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNvbnRyb2xsZXIgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZS5hY3RpdmF0ZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUsIGNvbnRyb2xsZXJJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2luaXQgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckluc3RhbmNlLmluaXQob3B0aW9ucywgY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRyb2xsZXJJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlJbnZhbGlkQ29tcG9uZW50Q29udHJvbGxlckVycm9yKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlDb21wb25lbnROb3RSZWdpc3RlcmVkRXJyb3IobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5Q29tcG9uZW50TmFtZVJlcXVpcmVkRXJyb3IoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGxvcyBlbGVtZW50b3MgRE9NIGluZGljYWRvcyBjb21vIGNvbXBvbmVudGVzXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgJGNvbnRleHQgICAgICAgICAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciBsb3MgY29tcG9uZW50ZXNcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gICAgICBbaW5pdFN0YXRlPTJdICAgICAgIEVzdGFibGVjZSBxdWUgY29tcG9uZW50ZXMgb2J0ZW5lci4gU2UgcHVlZGUgaW5kaWNhcjpcbiAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgICBzZSBvYnRpZW5lbiBsb3MgY29tcG9uZW50ZXMgc2luIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICAgc2Ugb2J0aWVuZW4gbG9zIGNvbXBvbmVudGVzIGluaWNpYWxpemFkb3NcbiAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgICBzZSBvYnRpZW5lbiBsb3MgY29tcG9uZW50ZXMgc2luIGluaWNpYWxpemFyIGUgaW5pY2lhbGl6YWRvc1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnl9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50SW5pdGlhbGl6ZXIucHJvdG90eXBlLmdldENvbXBvbmVudHMgPSBmdW5jdGlvbiAoJGNvbnRleHQsIGluaXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdFN0YXRlID09PSB2b2lkIDApIHsgaW5pdFN0YXRlID0gMjsgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sICRlbGVtZW50cyA9IHRoaXMuX2ZpbmRFbGVtZW50c0luQ29udGV4dCgkY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaW5pdFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmRhdGEodGhpcy5faW5zdGFuY2VEYXRhTmFtZSkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmRhdGEodGhpcy5faW5zdGFuY2VEYXRhTmFtZSkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGVsZW1lbnRJbmRleCA9IDAsICRlbGVtZW50c0xlbmd0aCA9ICRlbGVtZW50cy5sZW5ndGg7IGVsZW1lbnRJbmRleCA8ICRlbGVtZW50c0xlbmd0aDsgZWxlbWVudEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpxdWVyeV8xLiQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgbG9zIGNvbnRyb2xhZG9yZXMgZGUgY29tcG9uZW50ZXNcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICAgICAkY29udGV4dCAgICAgICAgICAgIENvbnRleHRvIGVuIGVsIGN1YWwgYnVzY2FyLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgIFtyZWN1cnNpdmU9dHJ1ZV0gICAgSW5kaWNhIHNpIGJ1c2NhciByZWN1cnNpdmFtZW50ZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBDb21wb25lbnRJbml0aWFsaXplci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50c0NvbnRyb2xsZXJzID0gZnVuY3Rpb24gKCRjb250ZXh0LCByZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSA9PT0gdm9pZCAwKSB7IHJlY3Vyc2l2ZSA9IHRydWU7IH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCAkZWxlbWVudHMgPSByZWN1cnNpdmUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAkY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSksIGNvbnRyb2xsZXIgPSAkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIENvbXBvbmVudEluaXRpYWxpemVyLnByb3RvdHlwZS5fZmluZEVsZW1lbnRzSW5Db250ZXh0ID0gZnVuY3Rpb24gKCRjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMsIHBhcmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBjb250ZXh0IGlzIGFsc28gYSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRjb250ZXh0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjb250ZXh0LmlzKFwiW1wiICsgdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgdGhpcy5fcHJlZml4ICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cyA9ICRjb250ZXh0LnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250ZXh0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gX3RoaXMuXyQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKFwiW1wiICsgX3RoaXMuX3ByZWZpeCArIFwiXSxbZGF0YS1cIiArIF90aGlzLl9wcmVmaXggKyBcIl1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudHMgPSBwYXJlbnRzLmNvbmNhdCgkY29udGV4dC5maW5kKFwiW1wiICsgdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgdGhpcy5fcHJlZml4ICsgXCJdXCIpLnRvQXJyYXkoKSk7IC8vZ2V0IGVsZW1lbnRzIHdpdGggdGhlIHByZWZpeFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganF1ZXJ5XzEuJCgkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudEluaXRpYWxpemVyO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIENvbXBvbmVudEluaXRpYWxpemVyID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJDb21wb25lbnRJbml0aWFsaXplclwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wb25lbnRNYW5hZ2VyXzEuQ29tcG9uZW50TWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpXzEuSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5TLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMi5EYXRhT3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIENvbXBvbmVudEluaXRpYWxpemVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkNvbXBvbmVudEluaXRpYWxpemVyXCIsIENvbXBvbmVudEluaXRpYWxpemVyKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoiY29tcG9uZW50L0NvbXBvbmVudEluaXRpYWxpemVyLmpzIn0=
