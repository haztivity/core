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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuL1Jlc291cmNlTWFuYWdlclwiLCBcIi4uL3V0aWxzXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi9FcnJvcnNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIFJlc291cmNlTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vUmVzb3VyY2VNYW5hZ2VyXCIpO1xuICAgIHZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuICAgIHZhciBqcXVlcnlfMSA9IHJlcXVpcmUoXCIuLi9qcXVlcnlcIik7XG4gICAgdmFyIEVycm9yc18xID0gcmVxdWlyZShcIi4vRXJyb3JzXCIpO1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyID0gUmVzb3VyY2VJbml0aWFsaXplcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VJbml0aWFsaXplcihfJCwgX1Jlc291cmNlTWFuYWdlciwgX0luamVjdG9yU2VydmljZSwgX0RhdGFPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl8kID0gXyQ7XG4gICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIgPSBfUmVzb3VyY2VNYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fSW5qZWN0b3JTZXJ2aWNlID0gX0luamVjdG9yU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuX0RhdGFPcHRpb25zID0gX0RhdGFPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmljaWFsaXphIHRvZG9zIGxvcyByZWN1cnNvcyBlbiB1biBjb250ZXh0byBlbiBjb25jcmV0b1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICRjb250ZXh0ICAgIENvbnRleHRvIGVuIGVsIGN1YWwgYnVzY2FyIHJlY3Vyc29zIGEgaW5pY2lhbGl6YXJcbiAgICAgICAgICovXG4gICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoJGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSB0aGlzLl9maW5kRWxlbWVudHNJbkNvbnRleHQoJGNvbnRleHQpLCByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gJGVsZW1lbnRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmluaXRpYWxpemVPbmUoanF1ZXJ5XzEuJChlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmljaWFsaXphIHVuIHJlY3Vyc28gZW4gdW4gZWxlbWVudG8gZW4gY29uY3JldG8uIEVsIGVsZW1lbnRvIGhhIGRlIHRlbmVyIHVuIHJlY3Vyc28gdsOhbGlkbyBpbmRpY2Fkb1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICRlbGVtZW50ICAgICAgICAgICAgRWxlbWVudG8gZW4gZWwgcXVlIGluaWNpYWxpemFyIGVsIHJlY3Vyc29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5vcHRpb25zXSAgICBPcGNpb25lcyBwYXJhIGVsIGNvbXBvbmVudGUuIFNpIHVuYSBtaXNtYSBvcGNpw7NuIHNlIGluZGljYSBhIHRyYXbDqXMgZGUgY29uZmlnLm9wdGlvbnMgeSBtZWRpYW50ZSB1biBhdHJpYnV0byBkYXRhLSBwcmVkb21pbmEgZWwgaW5kaWNhZG8gbWVkaWFudGUgY29uZmlnLm9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLmRhdGFdICAgICAgIERhdG9zIHkgY29uZmlndXJhY2nDs24gcGFyYSBlbCBjb250cm9sYWRvciBkZWwgcmVjdXJzb1xuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuaW5pdGlhbGl6ZU9uZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cbiAgICAgICAgICAgIC8vZ2V0IG5hbWVcbiAgICAgICAgICAgIHZhciBuYW1lID0gJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuQ0FNRUxfUFJFRklYKSwgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKCEhbmFtZSkge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKCEhdGhpcy5fUmVzb3VyY2VNYW5hZ2VyLmV4aXN0cyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAvL2dldCBmcm9tIERJXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWN0b3J5ID0gdGhpcy5fSW5qZWN0b3JTZXJ2aWNlLmdldChuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgaXMgYWxyZWFkeSBpbnN0YW5jaWF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVySW5zdGFuY2UgPSAkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVhfSU5TVEFOQ0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXJJbnN0YW5jZSA9PSB1bmRlZmluZWQgfHwgY29udHJvbGxlckluc3RhbmNlLmlzRGVzdHJveWVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2V4dHJhY3Qgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5fRGF0YU9wdGlvbnMuZ2V0RGF0YU9wdGlvbnMoJGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBqcXVlcnlfMS4kLmV4dGVuZCh7fSwgb3B0aW9ucywgY29uZmlnLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNvbnRyb2xsZXIgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVySW5zdGFuY2UgPSBmYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckluc3RhbmNlLmFjdGl2YXRlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVhfSU5TVEFOQ0UsIGNvbnRyb2xsZXJJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0IGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVySW5zdGFuY2UuaW5pdChvcHRpb25zLCBjb25maWcuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRyb2xsZXJJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlJbnZhbGlkUmVzb3VyY2VDb250cm9sbGVyRXJyb3IobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlSZXNvdXJjZU5vdFJlZ2lzdGVyZWRFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UmVzb3VyY2VOYW1lUmVxdWlyZWRFcnJvcigkZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSBsb3MgZWxlbWVudG9zIERPTSBpbmRpY2Fkb3MgY29tbyByZWN1cnNvc1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICAgICAkY29udGV4dCAgICAgICAgICAgIENvbnRleHRvIGVuIGVsIGN1YWwgYnVzY2FyIGxvcyByZWN1cnNvc1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gICAgICBbaW5pdFN0YXRlPTJdICAgICAgIEVzdGFibGVjZSBxdWUgcmVjdXJzb3Mgb2J0ZW5lci4gU2UgcHVlZGUgaW5kaWNhcjpcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwICAgc2Ugb2J0aWVuZW4gbG9zIHJlY3Vyc29zIHNpbiBpbmljaWFsaXphclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEgICBzZSBvYnRpZW5lbiBsb3MgcmVjdXJzb3MgaW5pY2lhbGl6YWRvc1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgICBzZSBvYnRpZW5lbiBsb3MgcmVjdXJzb3Mgc2luIGluaWNpYWxpemFyIGUgaW5pY2lhbGl6YWRvc1xuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5fVxuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuZ2V0UmVzb3VyY2VzID0gZnVuY3Rpb24gKCRjb250ZXh0LCBpbml0U3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChpbml0U3RhdGUgPT09IHZvaWQgMCkgeyBpbml0U3RhdGUgPSAyOyB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sICRlbGVtZW50cyA9IHRoaXMuX2ZpbmRFbGVtZW50c0luQ29udGV4dCgkY29udGV4dCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGluaXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gdGhpcy5fJCgkZWxlbWVudHNbZWxlbWVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYX0lOU1RBTkNFKSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5kYXRhKFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVhfSU5TVEFOQ0UpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtZW50SW5kZXggPSAwLCAkZWxlbWVudHNMZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoOyBlbGVtZW50SW5kZXggPCAkZWxlbWVudHNMZW5ndGg7IGVsZW1lbnRJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLl8kKCRlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBqcXVlcnlfMS4kKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIGxvcyBjb250cm9sYWRvcmVzIGRlIHJlY3Vyc29zXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgICAgICRjb250ZXh0ICAgICAgICAgICAgQ29udGV4dG8gZW4gZWwgY3VhbCBidXNjYXIuXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgIFtyZWN1cnNpdmU9dHJ1ZV0gICAgSW5kaWNhIHNpIGJ1c2NhciByZWN1cnNpdmFtZW50ZVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyLnByb3RvdHlwZS5nZXRSZXNvdXJjZXNDb250cm9sbGVycyA9IGZ1bmN0aW9uICgkY29udGV4dCwgcmVjdXJzaXZlKSB7XG4gICAgICAgICAgICBpZiAocmVjdXJzaXZlID09PSB2b2lkIDApIHsgcmVjdXJzaXZlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCAkZWxlbWVudHMgPSByZWN1cnNpdmUgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2ZpbmRFbGVtZW50c0luQ29udGV4dCgkY29udGV4dClcbiAgICAgICAgICAgICAgICA6ICRjb250ZXh0O1xuICAgICAgICAgICAgZm9yICh2YXIgZWxlbWVudEluZGV4ID0gMCwgJGVsZW1lbnRzTGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDsgZWxlbWVudEluZGV4IDwgJGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IHRoaXMuXyQoJGVsZW1lbnRzW2VsZW1lbnRJbmRleF0pLCBjb250cm9sbGVyID0gJGVsZW1lbnQuZGF0YShSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYX0lOU1RBTkNFKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplci5wcm90b3R5cGUuX2ZpbmRFbGVtZW50c0luQ29udGV4dCA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgdmFyICRlbGVtZW50cywgcGFyZW50cyA9IFtdO1xuICAgICAgICAgICAgLy9jaGVjayBpZiBjb250ZXh0IGlzIGFsc28gYSByZXNvdXJjZVxuICAgICAgICAgICAgaWYgKCRjb250ZXh0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGlmICgkY29udGV4dC5pcyhcIltcIiArIFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVggKyBcIl0sW2RhdGEtXCIgKyBSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYICsgXCJdXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMgPSAkY29udGV4dC50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJGNvbnRleHQuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0ganF1ZXJ5XzEuJChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKFwiW1wiICsgUmVzb3VyY2VJbml0aWFsaXplcl8xLlBSRUZJWCArIFwiXSxbZGF0YS1cIiArIFJlc291cmNlSW5pdGlhbGl6ZXJfMS5QUkVGSVggKyBcIl1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRlbGVtZW50cyA9IHBhcmVudHMuY29uY2F0KCRjb250ZXh0LmZpbmQoXCJbXCIgKyBSZXNvdXJjZUluaXRpYWxpemVyXzEuUFJFRklYICsgXCJdLFtkYXRhLVwiICsgUmVzb3VyY2VJbml0aWFsaXplcl8xLlBSRUZJWCArIFwiXVwiKS50b0FycmF5KCkpOyAvL2dldCBlbGVtZW50cyB3aXRoIHRoZSBwcmVmaXhcbiAgICAgICAgICAgIHJldHVybiBqcXVlcnlfMS4kKCRlbGVtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZXNvdXJjZUluaXRpYWxpemVyO1xuICAgIH0oKSk7XG4gICAgUmVzb3VyY2VJbml0aWFsaXplci5QUkVGSVggPSBcImh6LXJlc291cmNlXCI7XG4gICAgUmVzb3VyY2VJbml0aWFsaXplci5DQU1FTF9QUkVGSVggPSBcImh6UmVzb3VyY2VcIjtcbiAgICBSZXNvdXJjZUluaXRpYWxpemVyLlBSRUZJWF9JTlNUQU5DRSA9IFwiaHpSZXNvdXJjZUluc3RhbmNlXCI7XG4gICAgUmVzb3VyY2VJbml0aWFsaXplciA9IFJlc291cmNlSW5pdGlhbGl6ZXJfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZUluaXRpYWxpemVyXCIsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICBqcXVlcnlfMS4kLFxuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlcl8xLlJlc291cmNlTWFuYWdlcixcbiAgICAgICAgICAgICAgICBkaV8xLkluamVjdG9yU2VydmljZSxcbiAgICAgICAgICAgICAgICB1dGlsc18xLkRhdGFPcHRpb25zXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcHVibGljOiB0cnVlXG4gICAgICAgIH0pXG4gICAgXSwgUmVzb3VyY2VJbml0aWFsaXplcik7XG4gICAgZXhwb3J0cy5SZXNvdXJjZUluaXRpYWxpemVyID0gUmVzb3VyY2VJbml0aWFsaXplcjtcbiAgICB2YXIgUmVzb3VyY2VJbml0aWFsaXplcl8xO1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlSW5pdGlhbGl6ZXIuanMifQ==
