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
        define(["require", "exports", "./ResourceInitializer", "../di"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var ResourceInitializer_1 = require("./ResourceInitializer");
    var di_1 = require("../di");
    var ResourceInitializerService = (function () {
        /**
         * Servicio del inicializador de recursos
         * @class
         * @param ResourceInitializer
         */
        function ResourceInitializerService(ResourceInitializer) {
            var publish = [
                "initialize",
                "initializeOne",
                "getResources",
                "getResourcesControllers"
            ];
            for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
                var method = publish_1[_i];
                this[method] = ResourceInitializer[method].bind(ResourceInitializer);
            }
        }
        ResourceInitializerService.prototype.initialize = function ($context) {
            return undefined;
        };
        ResourceInitializerService.prototype.getResources = function ($context, initState) {
            return undefined;
        };
        ResourceInitializerService.prototype.getResourcesControllers = function ($context) {
            return undefined;
        };
        /**
         * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
         * @param {JQuery}  $element            Elemento en el que inicializar el recurso
         * @param {*}       [config]            Configuración para la inicialización. Acepta:
         * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
         * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
         */
        ResourceInitializerService.prototype.initializeOne = function ($element, config) {
            if (config === void 0) { config = {}; }
            return undefined;
        };
        return ResourceInitializerService;
    }());
    ResourceInitializerService = __decorate([
        di_1.Service({
            name: "ResourceInitializerService",
            dependencies: [
                ResourceInitializer_1.ResourceInitializer
            ]
        })
    ], ResourceInitializerService);
    exports.ResourceInitializerService = ResourceInitializerService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4vUmVzb3VyY2VJbml0aWFsaXplclwiLCBcIi4uL2RpXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyXzEgPSByZXF1aXJlKFwiLi9SZXNvdXJjZUluaXRpYWxpemVyXCIpO1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXJ2aWNpbyBkZWwgaW5pY2lhbGl6YWRvciBkZSByZWN1cnNvc1xuICAgICAgICAgKiBAY2xhc3NcbiAgICAgICAgICogQHBhcmFtIFJlc291cmNlSW5pdGlhbGl6ZXJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlKFJlc291cmNlSW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHZhciBwdWJsaXNoID0gW1xuICAgICAgICAgICAgICAgIFwiaW5pdGlhbGl6ZVwiLFxuICAgICAgICAgICAgICAgIFwiaW5pdGlhbGl6ZU9uZVwiLFxuICAgICAgICAgICAgICAgIFwiZ2V0UmVzb3VyY2VzXCIsXG4gICAgICAgICAgICAgICAgXCJnZXRSZXNvdXJjZXNDb250cm9sbGVyc1wiXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwdWJsaXNoXzEgPSBwdWJsaXNoOyBfaSA8IHB1Ymxpc2hfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gcHVibGlzaF8xW19pXTtcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0gPSBSZXNvdXJjZUluaXRpYWxpemVyW21ldGhvZF0uYmluZChSZXNvdXJjZUluaXRpYWxpemVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UucHJvdG90eXBlLmdldFJlc291cmNlcyA9IGZ1bmN0aW9uICgkY29udGV4dCwgaW5pdFN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5wcm90b3R5cGUuZ2V0UmVzb3VyY2VzQ29udHJvbGxlcnMgPSBmdW5jdGlvbiAoJGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmljaWFsaXphIHVuIHJlY3Vyc28gZW4gdW4gZWxlbWVudG8gZW4gY29uY3JldG8uIEVsIGVsZW1lbnRvIGhhIGRlIHRlbmVyIHVuIHJlY3Vyc28gdsOhbGlkbyBpbmRpY2Fkb1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gICRlbGVtZW50ICAgICAgICAgICAgRWxlbWVudG8gZW4gZWwgcXVlIGluaWNpYWxpemFyIGVsIHJlY3Vyc29cbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5vcHRpb25zXSAgICBPcGNpb25lcyBwYXJhIGVsIGNvbXBvbmVudGUuIFNpIHVuYSBtaXNtYSBvcGNpw7NuIHNlIGluZGljYSBhIHRyYXbDqXMgZGUgY29uZmlnLm9wdGlvbnMgeSBtZWRpYW50ZSB1biBhdHJpYnV0byBkYXRhLSBwcmVkb21pbmEgZWwgaW5kaWNhZG8gbWVkaWFudGUgY29uZmlnLm9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLmRhdGFdICAgICAgIERhdG9zIHkgY29uZmlndXJhY2nDs24gcGFyYSBlbCBjb250cm9sYWRvciBkZWwgcmVjdXJzb1xuICAgICAgICAgKi9cbiAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemVPbmUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2U7XG4gICAgfSgpKTtcbiAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLlNlcnZpY2Uoe1xuICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplcl8xLlJlc291cmNlSW5pdGlhbGl6ZXJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSk7XG4gICAgZXhwb3J0cy5SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSA9IFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlO1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlLmpzIn0=
