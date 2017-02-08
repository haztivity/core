System.register(["../di", "./ResourceManager", "../utils", "../jquery", "./Errors"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, ResourceManager_1, utils_1, jquery_1, Errors_1, ResourceInitializer, ResourceInitializer_1;
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
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            ResourceInitializer = ResourceInitializer_1 = (function () {
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
            exports_1("ResourceInitializer", ResourceInitializer);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4vUmVzb3VyY2VNYW5hZ2VyXCIsIFwiLi4vdXRpbHNcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL0Vycm9yc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIFJlc291cmNlTWFuYWdlcl8xLCB1dGlsc18xLCBqcXVlcnlfMSwgRXJyb3JzXzEsIFJlc291cmNlSW5pdGlhbGl6ZXIsIFJlc291cmNlSW5pdGlhbGl6ZXJfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoUmVzb3VyY2VNYW5hZ2VyXzFfMSkge1xuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlcl8xID0gUmVzb3VyY2VNYW5hZ2VyXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplciA9IFJlc291cmNlSW5pdGlhbGl6ZXJfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VJbml0aWFsaXplcihfJCwgX1Jlc291cmNlTWFuYWdlciwgX0luamVjdG9yU2VydmljZSwgX0RhdGFPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VNYW5hZ2VyID0gX1Jlc291cmNlTWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3JTZXJ2aWNlID0gX0luamVjdG9yU2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRGF0YU9wdGlvbnMgPSBfRGF0YU9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdG9kb3MgbG9zIHJlY3Vyc29zIGVuIHVuIGNvbnRleHRvIGVuIGNvbmNyZXRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkY29udGV4dCAgICBDb250ZXh0byBlbiBlbCBjdWFsIGJ1c2NhciByZWN1cnNvcyBhIGluaWNpYWxpemFyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KSwgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gJGVsZW1lbnRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbml0aWFsaXplT25lKGpxdWVyeV8xLiQoZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdW4gcmVjdXJzbyBlbiB1biBlbGVtZW50byBlbiBjb25jcmV0by4gRWwgZWxlbWVudG8gaGEgZGUgdGVuZXIgdW4gcmVjdXJzbyB2w6FsaWRvIGluZGljYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkZWxlbWVudCAgICAgICAgICAgIEVsZW1lbnRvIGVuIGVsIHF1ZSBpbmljaWFsaXphciBlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLm9wdGlvbnNdICAgIE9wY2lvbmVzIHBhcmEgZWwgY29tcG9uZW50ZS4gU2kgdW5hIG1pc21hIG9wY2nDs24gc2UgaW5kaWNhIGEgdHJhdsOpcyBkZSBjb25maWcub3B0aW9ucyB5IG1lZGlhbnRlIHVuIGF0cmlidXRvIGRhdGEtIHByZWRvbWluYSBlbCBpbmRpY2FkbyBtZWRpYW50ZSBjb25maWcub3B0aW9uc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5kYXRhXSAgICAgICBEYXRvcyB5IGNvbmZpZ3VyYWNpw7NuIHBhcmEgZWwgY29udHJvbGFkb3IgZGVsIHJlY3Vyc29cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyLnByb3RvdHlwZS5pbml0aWFsaXplT25lID0gZnVuY3Rpb24gKCRlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XG4gICAgICAgICAgICAgICAgICAgIC8vZ2V0IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5DQU1FTF9QUkVGSVgpLCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF0aGlzLl9SZXNvdXJjZU1hbmFnZXIuZXhpc3RzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9nZXQgZnJvbSBESVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWN0b3J5ID0gdGhpcy5fSW5qZWN0b3JTZXJ2aWNlLmdldChuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGlzIGFscmVhZHkgaW5zdGFuY2lhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVySW5zdGFuY2UgPSAkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVhfSU5TVEFOQ0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlckluc3RhbmNlID09IHVuZGVmaW5lZCB8fCBjb250cm9sbGVySW5zdGFuY2UuaXNEZXN0cm95ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9leHRyYWN0IG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5fRGF0YU9wdGlvbnMuZ2V0RGF0YU9wdGlvbnMoJGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGpxdWVyeV8xLiQuZXh0ZW5kKHt9LCBvcHRpb25zLCBjb25maWcub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dldCBjb250cm9sbGVyIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVySW5zdGFuY2UgPSBmYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVySW5zdGFuY2UuYWN0aXZhdGUoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYX0lOU1RBTkNFLCBjb250cm9sbGVySW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0IGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMsIGNvbmZpZy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjb250cm9sbGVySW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5SW52YWxpZFJlc291cmNlQ29udHJvbGxlckVycm9yKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlSZXNvdXJjZU5hbWVSZXF1aXJlZEVycm9yKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSBsb3MgZWxlbWVudG9zIERPTSBpbmRpY2Fkb3MgY29tbyByZWN1cnNvc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgICAgICRjb250ZXh0ICAgICAgICAgICAgQ29udGV4dG8gZW4gZWwgY3VhbCBidXNjYXIgbG9zIHJlY3Vyc29zXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9ICAgICAgW2luaXRTdGF0ZT0yXSAgICAgICBFc3RhYmxlY2UgcXVlIHJlY3Vyc29zIG9idGVuZXIuIFNlIHB1ZWRlIGluZGljYXI6XG4gICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwICAgc2Ugb2J0aWVuZW4gbG9zIHJlY3Vyc29zIHNpbiBpbmljaWFsaXphclxuICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSAgIHNlIG9idGllbmVuIGxvcyByZWN1cnNvcyBpbmljaWFsaXphZG9zXG4gICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyICAgc2Ugb2J0aWVuZW4gbG9zIHJlY3Vyc29zIHNpbiBpbmljaWFsaXphciBlIGluaWNpYWxpemFkb3NcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIucHJvdG90eXBlLmdldFJlc291cmNlcyA9IGZ1bmN0aW9uICgkY29udGV4dCwgaW5pdFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0U3RhdGUgPT09IHZvaWQgMCkgeyBpbml0U3RhdGUgPSAyOyB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgJGVsZW1lbnRzID0gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbml0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IHRoaXMuXyQoJGVsZW1lbnRzW2VsZW1lbnRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYX0lOU1RBTkNFKSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IHRoaXMuXyQoJGVsZW1lbnRzW2VsZW1lbnRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYX0lOU1RBTkNFKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganF1ZXJ5XzEuJChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogT2J0aWVuZSBsb3MgY29udHJvbGFkb3JlcyBkZSByZWN1cnNvc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgICAgICRjb250ZXh0ICAgICAgICAgICAgQ29udGV4dG8gZW4gZWwgY3VhbCBidXNjYXIuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSAgICAgW3JlY3Vyc2l2ZT10cnVlXSAgICBJbmRpY2Egc2kgYnVzY2FyIHJlY3Vyc2l2YW1lbnRlXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIucHJvdG90eXBlLmdldFJlc291cmNlc0NvbnRyb2xsZXJzID0gZnVuY3Rpb24gKCRjb250ZXh0LCByZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSA9PT0gdm9pZCAwKSB7IHJlY3Vyc2l2ZSA9IHRydWU7IH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCAkZWxlbWVudHMgPSByZWN1cnNpdmUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fZmluZEVsZW1lbnRzSW5Db250ZXh0KCRjb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAkY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSksIGNvbnRyb2xsZXIgPSAkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVhfSU5TVEFOQ0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIucHJvdG90eXBlLl9maW5kRWxlbWVudHNJbkNvbnRleHQgPSBmdW5jdGlvbiAoJGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cywgcGFyZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGNvbnRleHQgaXMgYWxzbyBhIHJlc291cmNlXG4gICAgICAgICAgICAgICAgICAgIGlmICgkY29udGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkY29udGV4dC5pcyhcIltcIiArIFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVggKyBcIl0sW2RhdGEtXCIgKyBSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cyA9ICRjb250ZXh0LnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250ZXh0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0ganF1ZXJ5XzEuJChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaXMoXCJbXCIgKyBSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYICsgXCJdLFtkYXRhLVwiICsgUmVzb3VyY2VJbml0aWFsaXplcl8xLlBSRUZJWCArIFwiXVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50cyA9IHBhcmVudHMuY29uY2F0KCRjb250ZXh0LmZpbmQoXCJbXCIgKyBSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYICsgXCJdLFtkYXRhLVwiICsgUmVzb3VyY2VJbml0aWFsaXplcl8xLlBSRUZJWCArIFwiXVwiKS50b0FycmF5KCkpOyAvL2dldCBlbGVtZW50cyB3aXRoIHRoZSBwcmVmaXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpxdWVyeV8xLiQoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUluaXRpYWxpemVyO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIuUFJFRklYID0gXCJoei1yZXNvdXJjZVwiO1xuICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5DQU1FTF9QUkVGSVggPSBcImh6UmVzb3VyY2VcIjtcbiAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIuUFJFRklYX0lOU1RBTkNFID0gXCJoelJlc291cmNlSW5zdGFuY2VcIjtcbiAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIgPSBSZXNvdXJjZUluaXRpYWxpemVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlSW5pdGlhbGl6ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBqcXVlcnlfMS4kLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyXzEuUmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlfMS5JbmplY3RvclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkRhdGFPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBSZXNvdXJjZUluaXRpYWxpemVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlJlc291cmNlSW5pdGlhbGl6ZXJcIiwgUmVzb3VyY2VJbml0aWFsaXplcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlSW5pdGlhbGl6ZXIuanMifQ==
