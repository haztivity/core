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
//# sourceMappingURL=ResourceInitializerService.js.map