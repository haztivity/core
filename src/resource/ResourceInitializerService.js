System.register(["./ResourceInitializer", "../di"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var ResourceInitializer_1, di_1, ResourceInitializerService;
    return {
        setters: [
            function (ResourceInitializer_1_1) {
                ResourceInitializer_1 = ResourceInitializer_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }
        ],
        execute: function () {
            ResourceInitializerService = (function () {
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
            exports_1("ResourceInitializerService", ResourceInitializerService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9SZXNvdXJjZUluaXRpYWxpemVyXCIsIFwiLi4vZGlcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyXzEsIGRpXzEsIFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChSZXNvdXJjZUluaXRpYWxpemVyXzFfMSkge1xuICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXJfMSA9IFJlc291cmNlSW5pdGlhbGl6ZXJfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogU2VydmljaW8gZGVsIGluaWNpYWxpemFkb3IgZGUgcmVjdXJzb3NcbiAgICAgICAgICAgICAgICAgKiBAY2xhc3NcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gUmVzb3VyY2VJbml0aWFsaXplclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlKFJlc291cmNlSW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHB1Ymxpc2ggPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWxpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5pdGlhbGl6ZU9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJnZXRSZXNvdXJjZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZ2V0UmVzb3VyY2VzQ29udHJvbGxlcnNcIlxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHB1Ymxpc2hfMSA9IHB1Ymxpc2g7IF9pIDwgcHVibGlzaF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHB1Ymxpc2hfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0gPSBSZXNvdXJjZUluaXRpYWxpemVyW21ldGhvZF0uYmluZChSZXNvdXJjZUluaXRpYWxpemVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UucHJvdG90eXBlLmdldFJlc291cmNlcyA9IGZ1bmN0aW9uICgkY29udGV4dCwgaW5pdFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5wcm90b3R5cGUuZ2V0UmVzb3VyY2VzQ29udHJvbGxlcnMgPSBmdW5jdGlvbiAoJGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluaWNpYWxpemEgdW4gcmVjdXJzbyBlbiB1biBlbGVtZW50byBlbiBjb25jcmV0by4gRWwgZWxlbWVudG8gaGEgZGUgdGVuZXIgdW4gcmVjdXJzbyB2w6FsaWRvIGluZGljYWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICAkZWxlbWVudCAgICAgICAgICAgIEVsZW1lbnRvIGVuIGVsIHF1ZSBpbmljaWFsaXphciBlbCByZWN1cnNvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnXSAgICAgICAgICAgIENvbmZpZ3VyYWNpw7NuIHBhcmEgbGEgaW5pY2lhbGl6YWNpw7NuLiBBY2VwdGE6XG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHsqfSAgICAgICBbY29uZmlnLm9wdGlvbnNdICAgIE9wY2lvbmVzIHBhcmEgZWwgY29tcG9uZW50ZS4gU2kgdW5hIG1pc21hIG9wY2nDs24gc2UgaW5kaWNhIGEgdHJhdsOpcyBkZSBjb25maWcub3B0aW9ucyB5IG1lZGlhbnRlIHVuIGF0cmlidXRvIGRhdGEtIHByZWRvbWluYSBlbCBpbmRpY2FkbyBtZWRpYW50ZSBjb25maWcub3B0aW9uc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gICAgICAgW2NvbmZpZy5kYXRhXSAgICAgICBEYXRvcyB5IGNvbmZpZ3VyYWNpw7NuIHBhcmEgZWwgY29udHJvbGFkb3IgZGVsIHJlY3Vyc29cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU9uZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5TZXJ2aWNlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZVwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlSW5pdGlhbGl6ZXJfMS5SZXNvdXJjZUluaXRpYWxpemVyXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcIiwgUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJyZXNvdXJjZS9SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZS5qcyJ9
