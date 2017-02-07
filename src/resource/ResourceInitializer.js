System.register(["../di", "./ResourceManager", "../utils", "../jquery", "./Errors"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, ResourceManager_1, utils_1, utils_2, jquery_1, Errors_1, ResourceInitializer;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ResourceManager_1_1) {
                ResourceManager_1 = ResourceManager_1_1;
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
            ResourceInitializer = (function () {
                function ResourceInitializer(_$, _ResourceManager, _InjectorService, _S, _DataOptions) {
                    this._$ = _$;
                    this._ResourceManager = _ResourceManager;
                    this._InjectorService = _InjectorService;
                    this._S = _S;
                    this._DataOptions = _DataOptions;
                    this._prefix = "hz-resource";
                    this._camelPrefix = this._S(this._prefix).camelize().s;
                    this._instanceDataName = this._camelPrefix + "Instance";
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
                    var name = $element.data(this._prefix), result;
                    if (!!name) {
                        //check if exists
                        if (!!this._ResourceManager.exists(name)) {
                            //get from DI
                            var factory = this._InjectorService.get(name);
                            if (factory) {
                                //check if is already instanciated
                                var controllerInstance = $element.data(this._instanceDataName);
                                if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                                    //extract options
                                    var options = this._DataOptions.getDataOptions($element, name);
                                    options = jquery_1.$.extend({}, options, config.options);
                                    //get controller instance
                                    controllerInstance = factory.instance();
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
                        var $element = this._$($elements[elementIndex]), controller = $element.data(this._instanceDataName);
                        if (controller != undefined) {
                            result.push(controller);
                        }
                    }
                    return result;
                };
                ResourceInitializer.prototype._findElementsInContext = function ($context) {
                    var _this = this;
                    var $elements, parents = [];
                    //check if context is also a resource
                    if ($context.length === 1) {
                        if ($context.is("[" + this._prefix + "],[data-" + this._prefix + "]")) {
                            parents = $context.toArray();
                        }
                    }
                    else {
                        $context.each(function (index, element) {
                            var $element = jquery_1.$(element);
                            if ($element.is("[" + _this._prefix + "],[data-" + _this._prefix + "]")) {
                                parents.push($element);
                            }
                        });
                    }
                    $elements = parents.concat($context.find("[" + this._prefix + "],[data-" + this._prefix + "]").toArray()); //get elements with the prefix
                    return jquery_1.$($elements);
                };
                return ResourceInitializer;
            }());
            ResourceInitializer = __decorate([
                di_1.Core({
                    name: "ResourceInitializer",
                    dependencies: [
                        jquery_1.$,
                        ResourceManager_1.ResourceManager,
                        di_1.InjectorService,
                        utils_1.S,
                        utils_2.DataOptions
                    ],
                    public: true
                })
            ], ResourceInitializer);
            exports_1("ResourceInitializer", ResourceInitializer);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4vUmVzb3VyY2VNYW5hZ2VyXCIsIFwiLi4vdXRpbHNcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL0Vycm9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIFJlc291cmNlTWFuYWdlcl8xLCB1dGlsc18xLCB1dGlsc18yLCBqcXVlcnlfMSwgRXJyb3JzXzEsIFJlc291cmNlSW5pdGlhbGl6ZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKFJlc291cmNlTWFuYWdlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXJfMSA9IFJlc291cmNlTWFuYWdlcl8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHV0aWxzXzFfMSkge1xuICAgICAgICAgICAgICAgIHV0aWxzXzEgPSB1dGlsc18xXzE7XG4gICAgICAgICAgICAgICAgdXRpbHNfMiA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VJbml0aWFsaXplcihfJCwgX1Jlc291cmNlTWFuYWdlciwgX0luamVjdG9yU2VydmljZSwgX1MsIF9EYXRhT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1Jlc291cmNlTWFuYWdlciA9IF9SZXNvdXJjZU1hbmFnZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0luamVjdG9yU2VydmljZSA9IF9JbmplY3RvclNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1MgPSBfUztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRGF0YU9wdGlvbnMgPSBfRGF0YU9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZpeCA9IFwiaHotcmVzb3VyY2VcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FtZWxQcmVmaXggPSB0aGlzLl9TKHRoaXMuX3ByZWZpeCkuY2FtZWxpemUoKS5zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZURhdGFOYW1lID0gdGhpcy5fY2FtZWxQcmVmaXggKyBcIkluc3RhbmNlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdG9kb3MgbG9zIHJlY3Vyc29zIGVuIHVuIGNvbnRleHRvIGVuIGNvbmNyZXRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkY29udGV4dCAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciByZWN1cnNvcyBhIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KSwgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gJGVsZW1lbnRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbml0aWFsaXplT25lKGpxdWVyeV8xLiQoZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdW4gcmVjdXJzbyBlbiB1biBlbGVtZW50byBlbiBjb25jcmV0by4gRWwgZWxlbWVudG8gaGEgZGUgdGVuZXIgdW4gcmVjdXJzbyB2w6FsaWRvIGluZGljYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkZWxlbWVudCAgICAgICAgICAgIEVsZW1lbnRvIGVuIGVsIHF1ZSBpbmljaWFsaXphciBlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLm9wdGlvbnNdICAgIE9wY2lvbmVzIHBhcmEgZWwgY29tcG9uZW50ZS4gU2kgdW5hIG1pc21hIG9wY2nDs24gc2UgaW5kaWNhIGEgdHJhdsOpcyBkZSBjb25maWcub3B0aW9ucyB5IG1lZGlhbnRlIHVuIGF0cmlidXRvIGRhdGEtIHByZWRvbWluYSBlbCBpbmRpY2FkbyBtZWRpYW50ZSBjb25maWcub3B0aW9uc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5kYXRhXSAgICAgICBEYXRvcyB5IGNvbmZpZ3VyYWNpw7NuIHBhcmEgZWwgY29udHJvbGFkb3IgZGVsIHJlY3Vyc29cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyLnByb3RvdHlwZS5pbml0aWFsaXplT25lID0gZnVuY3Rpb24gKCRlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XG4gICAgICAgICAgICAgICAgICAgIC8vZ2V0IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkZWxlbWVudC5kYXRhKHRoaXMuX3ByZWZpeCksIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXRoaXMuX1Jlc291cmNlTWFuYWdlci5leGlzdHMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dldCBmcm9tIERJXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhY3RvcnkgPSB0aGlzLl9JbmplY3RvclNlcnZpY2UuZ2V0KG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgaXMgYWxyZWFkeSBpbnN0YW5jaWF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXJJbnN0YW5jZSA9ICRlbGVtZW50LmRhdGEodGhpcy5faW5zdGFuY2VEYXRhTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVySW5zdGFuY2UgPT0gdW5kZWZpbmVkIHx8IGNvbnRyb2xsZXJJbnN0YW5jZS5pc0Rlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2V4dHJhY3Qgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLl9EYXRhT3B0aW9ucy5nZXREYXRhT3B0aW9ucygkZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ganF1ZXJ5XzEuJC5leHRlbmQoe30sIG9wdGlvbnMsIGNvbmZpZy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNvbnRyb2xsZXIgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZSA9IGZhY3RvcnkuaW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZS5hY3RpdmF0ZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUsIGNvbnRyb2xsZXJJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2luaXQgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckluc3RhbmNlLmluaXQob3B0aW9ucywgY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRyb2xsZXJJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVJlc291cmNlTm90UmVnaXN0ZXJlZEVycm9yKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVJlc291cmNlTmFtZVJlcXVpcmVkRXJyb3IoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGxvcyBlbGVtZW50b3MgRE9NIGluZGljYWRvcyBjb21vIHJlY3Vyc29zXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgJGNvbnRleHQgICAgICAgICAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciBsb3MgcmVjdXJzb3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gICAgICBbaW5pdFN0YXRlPTJdICAgICAgIEVzdGFibGVjZSBxdWUgcmVjdXJzb3Mgb2J0ZW5lci4gU2UgcHVlZGUgaW5kaWNhcjpcbiAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgICBzZSBvYnRpZW5lbiBsb3MgcmVjdXJzb3Mgc2luIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICAgc2Ugb2J0aWVuZW4gbG9zIHJlY3Vyc29zIGluaWNpYWxpemFkb3NcbiAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgICBzZSBvYnRpZW5lbiBsb3MgcmVjdXJzb3Mgc2luIGluaWNpYWxpemFyIGUgaW5pY2lhbGl6YWRvc1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnl9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuZ2V0UmVzb3VyY2VzID0gZnVuY3Rpb24gKCRjb250ZXh0LCBpbml0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRTdGF0ZSA9PT0gdm9pZCAwKSB7IGluaXRTdGF0ZSA9IDI7IH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCAkZWxlbWVudHMgPSB0aGlzLl9maW5kRWxlbWVudHNJbkNvbnRleHQoJGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGluaXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGVsZW1lbnRJbmRleCA9IDAsICRlbGVtZW50c0xlbmd0aCA9ICRlbGVtZW50cy5sZW5ndGg7IGVsZW1lbnRJbmRleCA8ICRlbGVtZW50c0xlbmd0aDsgZWxlbWVudEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUpID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGVsZW1lbnRJbmRleCA9IDAsICRlbGVtZW50c0xlbmd0aCA9ICRlbGVtZW50cy5sZW5ndGg7IGVsZW1lbnRJbmRleCA8ICRlbGVtZW50c0xlbmd0aDsgZWxlbWVudEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5kYXRhKHRoaXMuX2luc3RhbmNlRGF0YU5hbWUpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IHRoaXMuXyQoJGVsZW1lbnRzW2VsZW1lbnRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqcXVlcnlfMS4kKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGxvcyBjb250cm9sYWRvcmVzIGRlIHJlY3Vyc29zXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAgICAgJGNvbnRleHQgICAgICAgICAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2Nhci5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59ICAgICBbcmVjdXJzaXZlPXRydWVdICAgIEluZGljYSBzaSBidXNjYXIgcmVjdXJzaXZhbWVudGVcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuZ2V0UmVzb3VyY2VzQ29udHJvbGxlcnMgPSBmdW5jdGlvbiAoJGNvbnRleHQsIHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjdXJzaXZlID09PSB2b2lkIDApIHsgcmVjdXJzaXZlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sICRlbGVtZW50cyA9IHJlY3Vyc2l2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9maW5kRWxlbWVudHNJbkNvbnRleHQoJGNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICRjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKSwgY29udHJvbGxlciA9ICRlbGVtZW50LmRhdGEodGhpcy5faW5zdGFuY2VEYXRhTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuX2ZpbmRFbGVtZW50c0luQ29udGV4dCA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzLCBwYXJlbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgY29udGV4dCBpcyBhbHNvIGEgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRjb250ZXh0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjb250ZXh0LmlzKFwiW1wiICsgdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgdGhpcy5fcHJlZml4ICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cyA9ICRjb250ZXh0LnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250ZXh0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0ganF1ZXJ5XzEuJChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaXMoXCJbXCIgKyBfdGhpcy5fcHJlZml4ICsgXCJdLFtkYXRhLVwiICsgX3RoaXMuX3ByZWZpeCArIFwiXVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50cyA9IHBhcmVudHMuY29uY2F0KCRjb250ZXh0LmZpbmQoXCJbXCIgKyB0aGlzLl9wcmVmaXggKyBcIl0sW2RhdGEtXCIgKyB0aGlzLl9wcmVmaXggKyBcIl1cIikudG9BcnJheSgpKTsgLy9nZXQgZWxlbWVudHMgd2l0aCB0aGUgcHJlZml4XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqcXVlcnlfMS4kKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VJbml0aWFsaXplcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZUluaXRpYWxpemVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlcl8xLlJlc291cmNlTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpXzEuSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5TLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMi5EYXRhT3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgUmVzb3VyY2VJbml0aWFsaXplcik7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJSZXNvdXJjZUluaXRpYWxpemVyXCIsIFJlc291cmNlSW5pdGlhbGl6ZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyLmpzIn0=
