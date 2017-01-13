"bundle";
System.register("src/sco/Errors.js", ["src/base/BaseError.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError_1;
    var HaztivityAppContextNotFound, HaztivityPagesContextNotFound;
    return {
        setters: [function (BaseError_1_1) {
            BaseError_1 = BaseError_1_1;
        }],
        execute: function () {
            /**
             * Error al no indicarse contexto para la aplicación
             */
            HaztivityAppContextNotFound = function (_super) {
                __extends(HaztivityAppContextNotFound, _super);
                function HaztivityAppContextNotFound() {
                    _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP");
                }
                return HaztivityAppContextNotFound;
            }(BaseError_1.BaseError);
            exports_1("HaztivityAppContextNotFound", HaztivityAppContextNotFound);
            /**
             * Error al no indicarse contexto para las páginas
             */
            HaztivityPagesContextNotFound = function (_super) {
                __extends(HaztivityPagesContextNotFound, _super);
                function HaztivityPagesContextNotFound() {
                    _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP");
                }
                return HaztivityPagesContextNotFound;
            }(BaseError_1.BaseError);
            exports_1("HaztivityPagesContextNotFound", HaztivityPagesContextNotFound);
        }
    };
});

System.register("src/sco/Sco.js", ["src/utils.js", "src/di.js", "src/page.js", "src/navigator.js", "src/sco/Errors.js", "src/resource.js", "src/component.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var utils_1, di_1, page_1, navigator_1, Errors_1, resource_1, component_1;
    var ScoController;
    return {
        setters: [function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }, function (page_1_1) {
            page_1 = page_1_1;
        }, function (navigator_1_1) {
            navigator_1 = navigator_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }, function (resource_1_1) {
            resource_1 = resource_1_1;
        }, function (component_1_1) {
            component_1 = component_1_1;
        }],
        execute: function () {
            ScoController = function () {
                function ScoController(Navigator, PageManager, ResourceManager, EventEmitterFactory, ComponentManager, ComponentInitializer) {
                    this.Navigator = Navigator;
                    this.PageManager = PageManager;
                    this.ResourceManager = ResourceManager;
                    this.EventEmitterFactory = EventEmitterFactory;
                    this.ComponentManager = ComponentManager;
                    this.ComponentInitializer = ComponentInitializer;
                    this.eventEmitter = EventEmitterFactory.createEmitter();
                }
                ScoController.prototype.activate = function (options) {
                    this.options = options;
                    this.ComponentManager.addAll(this.options.components || []);
                    this.PageManager.addPages(this.options.pages);
                    return this;
                };
                ScoController.prototype.on = function () {
                    return this;
                };
                ScoController.prototype._init = function () {
                    this.$context = $("[data-hz-app]");
                    //context must exists
                    if (this.$context.length > 0) {
                        this.$context.addClass(ScoController.CLASS_CONTEXT);
                        this.$pagesContainer = this.$context.find("[data-hz-pages]");
                        //page contexts must exists
                        if (this.$pagesContainer.length > 0) {
                            return true;
                        } else {
                            throw new Errors_1.HaztivityPagesContextNotFound();
                        }
                    } else {
                        throw new Errors_1.HaztivityAppContextNotFound();
                    }
                };
                ScoController.prototype.run = function () {
                    this._init();
                    this.Navigator.activate(this.$pagesContainer);
                    this.$pagesContainer.addClass(ScoController.CLASS_PAGES);
                    this.ComponentInitializer.initialize(this.$context);
                    //init components
                    this.Navigator.goTo(0);
                    return this;
                };
                ScoController.CLASS_CONTEXT = "hz-container";
                ScoController.CLASS_PAGES = "hz-pages-container";
                ScoController = __decorate([di_1.Sco({
                    name: "ScoController",
                    dependencies: [navigator_1.Navigator, page_1.PageManager, resource_1.ResourceManager, utils_1.EventEmitterFactory, component_1.ComponentManager, component_1.ComponentInitializer]
                })], ScoController);
                return ScoController;
            }();
            exports_1("ScoController", ScoController);
        }
    };
});

System.register("src/sco/ScoFactory.js", ["src/sco/Sco.js", "src/di.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Sco_1, di_1;
    var ScoFactory;
    return {
        setters: [function (Sco_1_1) {
            Sco_1 = Sco_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }],
        execute: function () {
            ScoFactory = function () {
                function ScoFactory() {}
                ScoFactory.createSco = function (options) {
                    var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory).get(Sco_1.ScoController);
                    var sco = ScoControllerFactory.instance();
                    sco.activate(options);
                    return sco;
                };
                ScoFactory.registerSco = function (scoController, options) {
                    var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory).get(scoController);
                    var sco = ScoControllerFactory.instance();
                    sco.activate(options);
                    return sco;
                };
                ScoFactory = __decorate([di_1.Core({
                    name: "ScoFactory",
                    dependencies: []
                })], ScoFactory);
                return ScoFactory;
            }();
            exports_1("ScoFactory", ScoFactory);
        }
    };
});

System.register("src/sco.js", ["src/sco/Errors.js", "src/sco/Sco.js", "src/sco/ScoFactory.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'ScoController': true,
        'IScoOptions': true,
        'ISco': true,
        'ScoFactory': true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [function (Errors_1_1) {
            exportStar_1(Errors_1_1);
        }, function (Sco_1_1) {
            exports_1({
                "ScoController": Sco_1_1["ScoController"],
                "IScoOptions": Sco_1_1["IScoOptions"],
                "ISco": Sco_1_1["ISco"]
            });
        }, function (ScoFactory_1_1) {
            exports_1({
                "ScoFactory": ScoFactory_1_1["ScoFactory"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/page/Page.js", ["src/di.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, utils_1;
    var Page;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            Page = function () {
                /**
                 * Almacena la información de una página.
                 * Tipo Core
                 * @class
                 * @param EventEmitterFactory
                 */
                function Page(EventEmitterFactory) {
                    this.EventEmitterFactory = EventEmitterFactory;
                }
                Page.prototype.getResources = function () {
                    return this.options.resources;
                };
                /**
                 * Configura la clase nada más instanciarla
                 * @param options
                 */
                Page.prototype.activate = function (options) {
                    this.options = options;
                    this.eventEmitter = this.EventEmitterFactory.createEmitter();
                };
                Page.prototype.on = function (events, data, handler) {
                    this.eventEmitter.on(events + "." + Page.NAMESPACE, data, handler);
                    return this;
                };
                Page.prototype.one = function (events, data, handler) {
                    this.eventEmitter.one(events + "." + Page.NAMESPACE, data, handler);
                    return this;
                };
                Page.prototype.off = function (events, handler) {
                    this.eventEmitter.off(events + "." + Page.NAMESPACE, handler);
                    return this;
                };
                /**
                 * Obtiene el nombre de la página
                 * @returns {string}
                 */
                Page.prototype.getName = function () {
                    return this.options.name;
                };
                Page.NAMESPACE = "page";
                Page = __decorate([di_1.Core({
                    name: "Page",
                    instantiable: true,
                    dependencies: [utils_1.EventEmitterFactory]
                })], Page);
                return Page;
            }();
            exports_1("Page", Page);
        }
    };
});

System.register("src/page/PageController.js", ["src/di.js", "src/jquery.js", "src/resource.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, jquery_1, resource_1;
    var PageController;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (resource_1_1) {
            resource_1 = resource_1_1;
        }],
        execute: function () {
            PageController = function () {
                /**
                 * Controller base para todas las páginas.
                 * Tipo Page
                 * @class
                 * @param {JQueryStatic}    $                   Objeto JQuery
                 * @param {InjectorService} InjectorService     Servicio del inyector
                 * @see Injector.TYPES
                 */
                function PageController($, InjectorService, ResourceInitializerService) {
                    this.$ = $;
                    this.InjectorService = InjectorService;
                    this.ResourceInitializerService = ResourceInitializerService;
                    this.resources = [];
                }
                /**
                 * Configura la clase nada más instanciarla
                 * @param {IPageControllerOptions}  options         Opciones para el controlador
                 * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
                 * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
                 * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
                 */
                PageController.prototype.activate = function (options, eventEmitter, state, store) {
                    this.options = options;
                    this.state = state;
                    this.store = store;
                    this.state.visited = true;
                    this.eventEmitter = eventEmitter;
                };
                PageController.prototype._getNumCompletedResources = function () {
                    var completed = 0;
                    for (var _i = 0, _a = this.resources; _i < _a.length; _i++) {
                        var resource = _a[_i];
                        completed += resource.isCompleted() ? 1 : 0;
                    }
                    return completed;
                };
                PageController.prototype.isCompleted = function (forceCheck) {
                    var result = this.state.completed,
                        current = this.state.completed;
                    if (forceCheck || this.state.completed != true) {
                        result = this._getNumCompletedResources() === this.resources.length;
                        //if the state changes, trigger event
                        this.state.completed = result;
                        if (current !== result) {
                            this.eventEmitter.trigger(PageController.ON_COMPLETE_CHANGE, [result, this.$element, this]);
                        }
                    }
                    return result;
                };
                PageController.prototype.render = function () {
                    var event = this.eventEmitter.createEvent(PageController.ON_RENDERING),
                        $element,

                    //allow to user to custom render the template
                    result = this.eventEmitter.trigger(event, [this.options.template, this]);
                    //if a result is provided, ignore the default render function
                    if (result instanceof this.$) {
                        $element = result;
                    } else {
                        $element = this._render(this.options.template);
                    }
                    $element.addClass(PageController.CLASS_PAGE + " " + PageController.CLASS_PAGE + "-" + this.options.name);
                    this.$element = $element;
                    return $element;
                };
                PageController.prototype._render = function (template) {
                    var $element = jquery_1.$(template);
                    return $element;
                };
                PageController.prototype.initializeResources = function () {
                    this.resources = this.ResourceInitializerService.initialize(this.$element);
                    for (var _i = 0, _a = this.resources; _i < _a.length; _i++) {
                        var resource = _a[_i];
                        resource.on(resource_1.ResourceController.ON_COMPLETED, { instance: this }, this._onResourceCompleted);
                    }
                    return this.resources;
                };
                PageController.prototype._onResourceCompleted = function (e) {
                    var instance = e.data.instance;
                    instance.isCompleted(true);
                };
                /**
                 * Gestiona la transición entre la página anterior y la nueva
                 * @param {JQuery}          $oldPage                    Página anterior
                 * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
                 * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
                 */
                PageController.prototype.show = function ($oldPage, oldPageRelativePosition) {
                    var deferred = jquery_1.$.Deferred(),
                        promise = deferred.promise(),
                        event = this.eventEmitter.createEvent(PageController.ON_SHOW),
                        result = this.eventEmitter.trigger(event, [this.$element, $oldPage, oldPageRelativePosition, this]);
                    if (!event.isDefaultPrevented()) {
                        //if the user doesn't prevent default
                        this._show($oldPage, oldPageRelativePosition).then(function () {
                            if (typeof result === "function") {
                                //call the event's function
                                result(deferred);
                            } else {
                                deferred.resolve();
                            }
                        });
                    } else {
                        //if is default prevented, check if the user returns a function
                        if (typeof result === "function") {
                            result(deferred); //call the event's function
                        } else {
                            //if not, return a resolved promise
                            deferred.resolve();
                        }
                    }
                    promise.then(this._onShowEnd.bind(this, $oldPage, oldPageRelativePosition));
                    return promise;
                };
                /**
                 * Invocado al finalizar el proceso de animación
                 * @protected
                 */
                PageController.prototype._onShowEnd = function ($oldPage, oldPageRelativePosition) {
                    this.eventEmitter.trigger(PageController.ON_SHOWN, [this.$element, $oldPage, oldPageRelativePosition, this]);
                };
                /**
                 * Realiza la animación correspondiente
                 * @param {JQuery}              $oldPage                Página anterior.
                 * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
                 * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
                 * @protected
                 */
                PageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
                    var defer = jquery_1.$.Deferred();
                    defer.resolve();
                    return defer.promise();
                };
                /**
                 * Obtiene el DOM de la página
                 * @returns {JQuery}
                 */
                PageController.prototype.getElement = function () {
                    return this.$element;
                };
                /**
                 * Invocado al solicitarse la destruccion de la página
                 */
                PageController.prototype._destroy = function () {
                    this.eventEmitter.trigger(PageController.ON_DESTROY, [this.$element, this]);
                };
                PageController.NAMESPACE = "pageController";
                PageController.ON_RENDERING = PageController.NAMESPACE + ":rendering";
                PageController.ON_RENDERED = PageController.NAMESPACE + ":rendered";
                PageController.ON_SHOW = PageController.NAMESPACE + ":show";
                PageController.ON_SHOWN = PageController.NAMESPACE + ":shown";
                PageController.ON_COMPLETE_CHANGE = PageController.NAMESPACE + ":completechange";
                PageController.ON_DESTROY = PageController.NAMESPACE + ":destroy";
                PageController.CLASS_PAGE = "hz-page";
                PageController = __decorate([di_1.Dependencies({
                    dependencies: [jquery_1.$, di_1.InjectorService, resource_1.ResourceInitializerService]
                })], PageController);
                return PageController;
            }();
            exports_1("PageController", PageController);
        }
    };
});

System.register("src/page/GenericPageController.js", ["src/di.js", "src/jquery.js", "src/page/PageController.js", "src/resource.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, jquery_1, PageController_1, resource_1;
    var GenericPageController;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (PageController_1_1) {
            PageController_1 = PageController_1_1;
        }, function (resource_1_1) {
            resource_1 = resource_1_1;
        }],
        execute: function () {
            GenericPageController = function (_super) {
                __extends(GenericPageController, _super);
                function GenericPageController() {
                    _super.apply(this, arguments);
                }
                GenericPageController.prototype._render = function (template) {
                    var $element = _super.prototype._render.call(this, template);
                    $element.hide();
                    return $element;
                };
                GenericPageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
                    var _this = this;
                    var defer = jquery_1.$.Deferred();
                    if ($oldPage) {
                        $oldPage.fadeOut(400, function () {
                            _this.$element.fadeIn(400, function () {
                                defer.resolve();
                            });
                        });
                    } else {
                        this.$element.fadeIn(400, function () {
                            defer.resolve();
                        });
                    }
                    return defer.promise();
                };
                GenericPageController = __decorate([di_1.Page({
                    name: "GenericPageController",
                    dependencies: [jquery_1.$, di_1.InjectorService, resource_1.ResourceInitializerService]
                })], GenericPageController);
                return GenericPageController;
            }(PageController_1.PageController);
            exports_1("GenericPageController", GenericPageController);
        }
    };
});

System.register("src/page/PageFactory.js", ["src/di.js", "src/page/Page.js", "src/page/GenericPageController.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, Page_1, GenericPageController_1;
    var PageFactory;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (Page_1_1) {
            Page_1 = Page_1_1;
        }, function (GenericPageController_1_1) {
            GenericPageController_1 = GenericPageController_1_1;
        }],
        execute: function () {
            /**
             * Factory para crear páginas genéricas
             * @class PageFactory
             */
            PageFactory = function () {
                function PageFactory() {}
                /**
                 * Genera una página genérica
                 * @static
                 * @param {IPageOptions}    options     Opciones para la creación de la página
                 * @returns {Page}
                 */
                PageFactory.createPage = function (options) {
                    var PageDIFactory = di_1.Injector.getInstance(PageFactory).get(Page_1.Page);
                    var page = PageDIFactory.instance();
                    //Set PageController as default
                    if (!options.controller) {
                        options.controller = "GenericPageController";
                    }
                    page.activate(options);
                    return page;
                };
                PageFactory = __decorate([di_1.Core({
                    name: "PageFactory",
                    dependencies: [GenericPageController_1.GenericPageController]
                })], PageFactory);
                return PageFactory;
            }();
            exports_1("PageFactory", PageFactory);
        }
    };
});

System.register("src/page/PageImplementation.js", ["src/di.js", "src/resource.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, di_2, resource_1;
    var PageImplementation;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
            di_2 = di_1_1;
        }, function (resource_1_1) {
            resource_1 = resource_1_1;
        }],
        execute: function () {
            PageImplementation = function () {
                /**
                 * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
                 * @class
                 * @param Injector
                 */
                function PageImplementation(ResourceManager, Injector) {
                    this.ResourceManager = ResourceManager;
                    this.Injector = Injector;
                    this.store = {
                        public: {},
                        private: {}
                    };
                    this.state = { completed: false, visited: false };
                }
                /**
                 * Configura la clase nada más instanciarla
                 * @param {Page}    page    Página registrada en el PageManager.
                 */
                PageImplementation.prototype.activate = function (page) {
                    this.resources = page.getResources();
                    this.page = page;
                };
                /**
                 * Obtiene el Page asociado
                 * @returns {Page}
                 */
                PageImplementation.prototype.getPage = function () {
                    return this.page;
                };
                /**
                 * Obtiene el nombre de la página
                 * @returns {string}
                 */
                PageImplementation.prototype.getPageName = function () {
                    return this.page.getName();
                };
                /**
                 * Obtiene una instancia del controlador.
                 * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
                 * @returns {PageController}
                 * @see PageController
                 */
                PageImplementation.prototype.getController = function () {
                    if (!this.currentController) {
                        var pageOptions = this.page.options;
                        if (!this.controllerFactory) {
                            this.controllerFactory = this.Injector.get(pageOptions.controller);
                        }
                        var controller = this.controllerFactory.instance();
                        controller.activate(pageOptions, this.page.eventEmitter, this.state, this.store);
                        controller.render();
                        controller.initializeResources();
                        this.currentController = controller;
                    }
                    return this.currentController;
                };
                /**
                 * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
                 */
                PageImplementation.prototype.detach = function () {
                    this.currentController._destroy();
                    this.currentController = null;
                };
                /**
                 * Desecha la instancia del controlador actual
                 */
                PageImplementation.prototype.stop = function () {
                    this.currentController = null;
                    return this;
                };
                PageImplementation = __decorate([di_1.Core({
                    name: "PageImplementation",
                    dependencies: [resource_1.ResourceManager, di_2.InjectorService],
                    instantiable: true
                })], PageImplementation);
                return PageImplementation;
            }();
            exports_1("PageImplementation", PageImplementation);
        }
    };
});

System.register("src/page/Errors.js", ["src/base/BaseError.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError_1;
    var HaztivityPageAlreadyRegistered, HaztivityPageNameInvalid;
    return {
        setters: [function (BaseError_1_1) {
            BaseError_1 = BaseError_1_1;
        }],
        execute: function () {
            /**
             * Error al tratar de registrar una página existente
             */
            HaztivityPageAlreadyRegistered = function (_super) {
                __extends(HaztivityPageAlreadyRegistered, _super);
                function HaztivityPageAlreadyRegistered(pageName) {
                    _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques");
                }
                return HaztivityPageAlreadyRegistered;
            }(BaseError_1.BaseError);
            exports_1("HaztivityPageAlreadyRegistered", HaztivityPageAlreadyRegistered);
            /**
             * Error al indicarse un nombre de página inválido
             */
            HaztivityPageNameInvalid = function (_super) {
                __extends(HaztivityPageNameInvalid, _super);
                function HaztivityPageNameInvalid(pageName) {
                    _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]");
                }
                return HaztivityPageNameInvalid;
            }(BaseError_1.BaseError);
            exports_1("HaztivityPageNameInvalid", HaztivityPageNameInvalid);
        }
    };
});

System.register("src/resource/ResourceController.js", ["src/di.js", "src/jquery.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, jquery_1, utils_1;
    var ResourceController;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            ResourceController = function () {
                /**
                 * Controlador base para los recursos
                 * @param {JQueryStatic}            $
                 * @param {EventEmitterFactory}     EventEmitterFactory
                 */
                function ResourceController($, EventEmitterFactory) {
                    this.$ = $;
                    this.EventEmitterFactory = EventEmitterFactory;
                    this._destroyed = false;
                    this._completed = false;
                    this._options = {};
                }
                /**
                 * Invocado al obtenerse el factory del DI para establecer las opciones
                 * @param {JQuery}  $element        Elemento del recurso
                 */
                ResourceController.prototype.activate = function ($element) {
                    this._$element = $element;
                    this._eventEmitter = this.EventEmitterFactory.createEmitter(this._$element);
                };
                /**
                 * Indica si se ha invocado al método destroy
                 * @returns {boolean}
                 */
                ResourceController.prototype.isDestroyed = function () {
                    return this._destroyed;
                };
                /**
                 * Realiza la comprobación de objetivo completado
                 * @returns {boolean}
                 */
                ResourceController.prototype.isCompleted = function () {
                    return this._completed;
                };
                ResourceController.prototype._markAsCompleted = function () {
                    this._completed = true;
                    this._eventEmitter.trigger(ResourceController.ON_COMPLETED);
                };
                ResourceController.prototype.setOption = function (name, value) {
                    this._options[name] = value;
                };
                ResourceController.prototype.getOption = function (name) {
                    return this._options[name];
                };
                /**
                 * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
                 */
                ResourceController.prototype.destroy = function () {
                    this._destroyed = true;
                };
                ResourceController.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events, data, handler);
                    return this;
                };
                ;
                ResourceController.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events, data, handler);
                    return this;
                };
                ;
                ResourceController.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events, handler);
                    return this;
                };
                ;
                ResourceController.NAMESPACE = "resourceController";
                ResourceController.ON_COMPLETED = ResourceController.NAMESPACE + ":completed";
                ResourceController = __decorate([di_1.Dependencies({
                    dependencies: [jquery_1.default, utils_1.EventEmitterFactory]
                })], ResourceController);
                return ResourceController;
            }();
            exports_1("ResourceController", ResourceController);
        }
    };
});

System.register("src/resource/ResourceManager.js", ["src/di.js", "src/resource/Errors.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, di_2, Errors_1, utils_1;
    var ResourceManager;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
            di_2 = di_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            ResourceManager = function () {
                function ResourceManager(Injector, S) {
                    this.Injector = Injector;
                    this.S = S;
                    //store available resources
                    this._resources = new Map();
                }
                /**
                 * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
                 * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
                 * @see Injector.registerResource
                 */
                ResourceManager.prototype.add = function (resource) {
                    //resource must exists
                    if (resource) {
                        //resource must have a name registered by the injector
                        var name_1 = resource._resourceName;
                        if (!!name_1) {
                            if (this.nameIsValid(name_1)) {
                                //check if already exists
                                var current = this._resources.get(name_1);
                                //if exists, should be equal
                                if (current != undefined) {
                                    if (current != resource) {
                                        throw new Errors_1.HaztivityResourceAlreadyRegisteredError(name_1);
                                    }
                                } else {
                                    //if not exists, register
                                    this._resources.set(name_1, resource);
                                }
                            } else {
                                throw new Errors_1.HaztivityResourceNameInvalidError(name_1);
                            }
                        } else {
                            throw new Errors_1.HaztivityResourceInvalidError();
                        }
                    } else {
                        throw new Errors_1.HaztivityResourceInvalidError();
                    }
                };
                ResourceManager.prototype.nameIsValid = function (name) {
                    return this.S(name).camelize().s === name;
                };
                ResourceManager.prototype.exists = function (name) {
                    return this._resources.get(name) != undefined;
                };
                /**
                 * Añade un conjunto de recursos.
                 * @see ResourceManager#add
                 * @param {ResourceController[]}    resources       Recursos a añadir
                 */
                ResourceManager.prototype.addAll = function (resources) {
                    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                        var resource = resources_1[_i];
                        this.add(resource);
                    }
                };
                ResourceManager = __decorate([di_1.Core({
                    name: "ResourceManager",
                    dependencies: [di_2.InjectorService, utils_1.S]
                })], ResourceManager);
                return ResourceManager;
            }();
            exports_1("ResourceManager", ResourceManager);
        }
    };
});

System.register("src/resource/Errors.js", ["src/base/BaseError.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError_1;
    var HaztivityResourceInvalidError, HaztivityResourceAlreadyRegisteredError, HaztivityResourceNameInvalidError, HaztivityResourceNameRequiredError, HaztivityResourceNotRegisteredError, HaztivityInvalidResourceControllerError;
    return {
        setters: [function (BaseError_1_1) {
            BaseError_1 = BaseError_1_1;
        }],
        execute: function () {
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceInvalidError = function (_super) {
                __extends(HaztivityResourceInvalidError, _super);
                function HaztivityResourceInvalidError() {
                    _super.call(this, "HaztivityResourceInvalidError", "Invalid resource");
                }
                return HaztivityResourceInvalidError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityResourceInvalidError", HaztivityResourceInvalidError);
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceAlreadyRegisteredError = function (_super) {
                __extends(HaztivityResourceAlreadyRegisteredError, _super);
                function HaztivityResourceAlreadyRegisteredError(resource) {
                    _super.call(this, "HaztivityResourceInvalidError", "Resource '" + resource + "' already registered with another controller.");
                }
                return HaztivityResourceAlreadyRegisteredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityResourceAlreadyRegisteredError", HaztivityResourceAlreadyRegisteredError);
            /**
             * Error al intentar registrar un recurso inválido
             */
            HaztivityResourceNameInvalidError = function (_super) {
                __extends(HaztivityResourceNameInvalidError, _super);
                function HaztivityResourceNameInvalidError(resource) {
                    //todo LINK
                    _super.call(this, "HaztivityResourceNameInvalidError", "Invalid name '" + resource + "'. Please use camelCase nomenclature.");
                }
                return HaztivityResourceNameInvalidError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityResourceNameInvalidError", HaztivityResourceNameInvalidError);
            /**
             * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
             */
            HaztivityResourceNameRequiredError = function (_super) {
                __extends(HaztivityResourceNameRequiredError, _super);
                function HaztivityResourceNameRequiredError($element) {
                    _super.call(this, "HaztivityResourceNameRequiredError", "Resource name not provider in data-* attribute. " + $element);
                }
                return HaztivityResourceNameRequiredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityResourceNameRequiredError", HaztivityResourceNameRequiredError);
            /**
             * Error al intentar inicializar un recurso no registrado
             */
            HaztivityResourceNotRegisteredError = function (_super) {
                __extends(HaztivityResourceNotRegisteredError, _super);
                function HaztivityResourceNotRegisteredError(resource) {
                    _super.call(this, "HaztivityResourceNotRegisteredError", "Attempt to initialize " + resource + " but is not registered");
                }
                return HaztivityResourceNotRegisteredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityResourceNotRegisteredError", HaztivityResourceNotRegisteredError);
            /**
             * Error de controlador invalido
             */
            HaztivityInvalidResourceControllerError = function (_super) {
                __extends(HaztivityInvalidResourceControllerError, _super);
                function HaztivityInvalidResourceControllerError(resource) {
                    _super.call(this, "HaztivityInvalidResourceControllerError", "Invalid controller for " + resource + " resource");
                }
                return HaztivityInvalidResourceControllerError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityInvalidResourceControllerError", HaztivityInvalidResourceControllerError);
        }
    };
});

System.register("src/resource/ResourceInitializer.js", ["src/di.js", "src/resource/ResourceManager.js", "src/utils.js", "src/jquery.js", "src/resource/Errors.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, ResourceManager_1, utils_1, utils_2, jquery_1, Errors_1;
    var ResourceInitializer;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (ResourceManager_1_1) {
            ResourceManager_1 = ResourceManager_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
            utils_2 = utils_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }],
        execute: function () {
            ResourceInitializer = function () {
                function ResourceInitializer($, ResourceManager, InjectorService, S, DataOptions) {
                    this.$ = $;
                    this.ResourceManager = ResourceManager;
                    this.InjectorService = InjectorService;
                    this.S = S;
                    this.DataOptions = DataOptions;
                    this._prefix = "hz-resource";
                    this._camelPrefix = this.S(this._prefix).camelize().s;
                    this._instanceDataName = this._camelPrefix + "Instance";
                }
                /**
                 * Inicializa todos los recursos en un contexto en concreto
                 * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
                 */
                ResourceInitializer.prototype.initialize = function ($context) {
                    var $elements = this._findElementsInContext($context),
                        results = [];
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
                 * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
                 * @param {JQuery}  $element            Elemento en el que inicializar el recurso
                 * @param {*}       [config]            Configuración para la inicialización. Acepta:
                 * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
                 * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
                 */
                ResourceInitializer.prototype.initializeOne = function ($element, config) {
                    if (config === void 0) {
                        config = {};
                    }
                    //get name
                    var name = $element.data(this._prefix),
                        result;
                    if (!!name) {
                        //check if exists
                        if (!!this.ResourceManager.exists(name)) {
                            //get from DI
                            var factory = this.InjectorService.get(name);
                            if (factory) {
                                //check if is already instanciated
                                var controllerInstance = $element.data(this._instanceDataName);
                                if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                                    //extract options
                                    var options = this.DataOptions.getDataOptions($element, name);
                                    options = jquery_1.$.extend({}, options, config.options);
                                    //get controller instance
                                    controllerInstance = factory.instance();
                                    controllerInstance.activate($element);
                                    $element.data(this._instanceDataName, controllerInstance);
                                    //init controller
                                    controllerInstance.init(options, config.data);
                                } else {}
                                result = controllerInstance;
                            } else {
                                throw new Errors_1.HaztivityInvalidResourceControllerError(name);
                            }
                        } else {
                            throw new Errors_1.HaztivityResourceNotRegisteredError(name);
                        }
                    } else {
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
                    if (initState === void 0) {
                        initState = 2;
                    }
                    var result = [],
                        $elements = this._findElementsInContext($context);
                    switch (initState) {
                        case 0:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
                                if ($element.data(this._instanceDataName) == undefined) {
                                    result.push($element);
                                }
                            }
                            break;
                        case 1:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
                                if ($element.data(this._instanceDataName) != undefined) {
                                    result.push($element);
                                }
                            }
                            break;
                        default:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
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
                    if (recursive === void 0) {
                        recursive = true;
                    }
                    var result = [],
                        $elements = recursive === true ? this._findElementsInContext($context) : $context;
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this.$($elements[elementIndex]),
                            controller = $element.data(this._instanceDataName);
                        if (controller != undefined) {
                            result.push(controller);
                        }
                    }
                    return result;
                };
                ResourceInitializer.prototype._findElementsInContext = function ($context) {
                    var _this = this;
                    var $elements,
                        parents = [];
                    //check if context is also a resource
                    if ($context.length === 1) {
                        if ($context.is("[" + this._prefix + "],[data-" + this._prefix + "]")) {
                            parents = $context.toArray();
                        }
                    } else {
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
                ResourceInitializer = __decorate([di_1.Core({
                    name: "ResourceInitializer",
                    dependencies: [jquery_1.$, ResourceManager_1.ResourceManager, di_1.InjectorService, utils_1.S, utils_2.DataOptions],
                    public: true
                })], ResourceInitializer);
                return ResourceInitializer;
            }();
            exports_1("ResourceInitializer", ResourceInitializer);
        }
    };
});

System.register("src/resource/ResourceInitializerService.js", ["src/resource/ResourceInitializer.js", "src/di.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ResourceInitializer_1, di_1;
    var ResourceInitializerService;
    return {
        setters: [function (ResourceInitializer_1_1) {
            ResourceInitializer_1 = ResourceInitializer_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }],
        execute: function () {
            ResourceInitializerService = function () {
                /**
                 * Servicio del inicializador de recursos
                 * @class
                 * @param ResourceInitializer
                 */
                function ResourceInitializerService(ResourceInitializer) {
                    var publish = ["initialize", "initializeOne", "getResources", "getResourcesControllers"];
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
                    if (config === void 0) {
                        config = {};
                    }
                    return undefined;
                };
                ResourceInitializerService = __decorate([di_1.Service({
                    name: "ResourceInitializerService",
                    dependencies: [ResourceInitializer_1.ResourceInitializer]
                })], ResourceInitializerService);
                return ResourceInitializerService;
            }();
            exports_1("ResourceInitializerService", ResourceInitializerService);
        }
    };
});

System.register("src/resource.js", ["src/resource/ResourceController.js", "src/resource/ResourceManager.js", "src/resource/ResourceInitializerService.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (ResourceController_1_1) {
            exports_1({
                "ResourceController": ResourceController_1_1["ResourceController"]
            });
        }, function (ResourceManager_1_1) {
            exports_1({
                "ResourceManager": ResourceManager_1_1["ResourceManager"]
            });
        }, function (ResourceInitializerService_1_1) {
            exports_1({
                "ResourceInitializerService": ResourceInitializerService_1_1["ResourceInitializerService"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/page/PageManager.js", ["src/di.js", "src/page/PageImplementation.js", "src/utils.js", "src/page/Errors.js", "src/resource.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, PageImplementation_1, utils_1, Errors_1, resource_1;
    var PageManager;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (PageImplementation_1_1) {
            PageImplementation_1 = PageImplementation_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }, function (resource_1_1) {
            resource_1 = resource_1_1;
        }],
        execute: function () {
            PageManager = function () {
                function PageManager(ResourceManager, EventEmitterFactory, PageImplementationFactory) {
                    this.ResourceManager = ResourceManager;
                    this.EventEmitterFactory = EventEmitterFactory;
                    this.PageImplementationFactory = PageImplementationFactory;
                    this.pages = [];
                    this.pagesMap = new Map();
                    this.eventEmitter = EventEmitterFactory.createEmitter();
                }
                /**
                 * Indica el número de páginas registradas
                 * @returns {number}
                 */
                PageManager.prototype.count = function () {
                    return this.pages.length;
                };
                /**
                 * Añade un conjunto de páginas.
                 * @param {Page[]}          pages       Conjunto de páginas a añadir
                 */
                PageManager.prototype.addPages = function (pages) {
                    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
                        var page = pages_1[_i];
                        this.addPage(page);
                    }
                };
                /**
                 * Añade una página
                 * @param {Page}    page        Página a añadir
                 */
                PageManager.prototype.addPage = function (page) {
                    var pageName = page.getName();
                    if (this.getPageIndex(pageName) === -1) {
                        if (this._validatePageName(pageName)) {
                            this.ResourceManager.addAll(page.getResources());
                            var pageImplementation = this.PageImplementationFactory.instance();
                            pageImplementation.activate(page);
                            this.pages.push(pageImplementation);
                            this.pagesMap.set(pageName, this.pages.length - 1);
                        } else {
                            throw new Errors_1.HaztivityPageNameInvalid(pageName);
                        }
                    } else {
                        throw new Errors_1.HaztivityPageAlreadyRegistered(pageName);
                    }
                };
                PageManager.prototype._validatePageName = function (name) {
                    return name.search(/[^\w|-]/g) == -1;
                };
                /**
                 * Actualiza el mapa de nombre-índice de las páginas
                 */
                PageManager.prototype.remapPages = function () {
                    this.pagesMap.clear();
                    var pages = this.pages;
                    for (var pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
                        var currentPage = pages[pageIndex];
                        this.pagesMap.set(currentPage.getPageName(), pageIndex);
                    }
                };
                /**
                 * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
                 * @param {string}      name    Nombre de la página
                 * @returns {number}
                 */
                PageManager.prototype.getPageIndex = function (name) {
                    var result = this.pagesMap.get(name);
                    result = result != undefined ? result : -1;
                    return result;
                };
                /**
                 * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
                 * @param {number}  index   Índice de la página a obtener
                 * @returns {PageImplementation}
                 */
                PageManager.prototype.getPage = function (index) {
                    return this.pages[index];
                };
                /**
                 * Obtiene una página por el nombre registrado. Si no se encuentra se devuelve undefined
                 * @param {string}  name    Nombre de la página a obtener
                 * @returns {PageImplementation}
                 * @see getPageIndex
                 * @see getPage
                 */
                PageManager.prototype.getPageByName = function (name) {
                    return this.getPage(this.getPageIndex(name));
                };
                PageManager.prototype.on = function () {};
                PageManager.prototype.off = function () {};
                PageManager = __decorate([di_1.Core({
                    name: "PageManager",
                    public: true,
                    dependencies: [resource_1.ResourceManager, utils_1.EventEmitterFactory, PageImplementation_1.PageImplementation]
                })], PageManager);
                return PageManager;
            }();
            exports_1("PageManager", PageManager);
        }
    };
});

System.register("src/page.js", ["src/page/Page.js", "src/page/PageController.js", "src/page/PageFactory.js", "src/page/PageImplementation.js", "src/page/PageManager.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Page_1_1) {
            exports_1({
                "Page": Page_1_1["Page"],
                "IPageOptions": Page_1_1["IPageOptions"]
            });
        }, function (PageController_1_1) {
            exports_1({
                "PageController": PageController_1_1["PageController"],
                "IPageControllerOptions": PageController_1_1["IPageControllerOptions"],
                "IPageState": PageController_1_1["IPageState"],
                "IPageStore": PageController_1_1["IPageStore"]
            });
        }, function (PageFactory_1_1) {
            exports_1({
                "PageFactory": PageFactory_1_1["PageFactory"]
            });
        }, function (PageImplementation_1_1) {
            exports_1({
                "PageImplementation": PageImplementation_1_1["PageImplementation"]
            });
        }, function (PageManager_1_1) {
            exports_1({
                "PageManager": PageManager_1_1["PageManager"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/navigator/Navigator.js", ["src/jquery.js", "src/di.js", "src/page.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var jquery_1, di_1, page_1, utils_1;
    var Navigator;
    return {
        setters: [function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }, function (page_1_1) {
            page_1 = page_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            Navigator = function () {
                /**
                 * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
                 * @param {JQueryStatic}                _$
                 * @param {PageManager}                 _PageManager
                 * @param {EventEmitterFactory}         _EventEmitterFactory
                 */
                function Navigator(_$, _PageManager, _EventEmitterFactory) {
                    this._$ = _$;
                    this._PageManager = _PageManager;
                    this._EventEmitterFactory = _EventEmitterFactory;
                }
                Navigator.prototype.activate = function ($context) {
                    this._$context = $context;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter();
                };
                /**
                 * Navega a la página solicitada.
                 * Debe estar registrada en PageManager
                 * @param {Number} index    Índice de la página a navegar
                 * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
                 * página. False si no se realiza el cambio
                 */
                Navigator.prototype.goTo = function (index) {
                    if (this.isDisabled() !== true) {
                        //get the page requested
                        var newPage = this._PageManager.getPage(index);
                        //the page must be provided and different of the current page
                        if (newPage) {
                            if (newPage !== this._currentPage) {
                                var currentPage = this.getCurrentPage(),
                                    //get current page and index
                                currentPageIndex = this.getCurrentPageIndex(),
                                    currentPageIs = currentPageIndex - index < 0 ? -1 : 1; //check the position of the old page relative to the new page
                                //check if resources are completed to go to the next page
                                if (currentPageIs === 1 || currentPage == undefined || currentPage.getController().isCompleted()) {
                                    if (this._currentRenderProcess && this._currentRenderProcess.state() === "pending") {
                                        this._currentRenderProcess.reject();
                                    }
                                    this._currentRenderProcess = $.Deferred();
                                    this._currentPage = newPage; //set new page as current
                                    this._currentPageIndex = index;
                                    var newPageName = newPage.getPageName(),
                                        //get name of new controller
                                    newPageData = {
                                        index: index,
                                        name: newPageName
                                    },
                                        currentPageData = void 0;
                                    if (currentPage) {
                                        currentPageData = {
                                            index: currentPageIndex,
                                            name: currentPage.getPageName()
                                        };
                                    }
                                    //trigger event in navigator
                                    this._eventEmitter.trigger(Navigator.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                                    //trigger a global event that could be listened by anyone
                                    this._eventEmitter.globalEmitter.trigger(Navigator.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                                    var currentPageElement = currentPage ? currentPage.getController().getElement() : null,
                                        //get current element
                                    newPageController = newPage.getController(),
                                        //create a controller for new page
                                    newPageElement = newPageController.getElement(); //get the rendered element
                                    //if the new page is before to the current page
                                    if (currentPageIndex === -1) {
                                        this._$context.prepend(newPageElement);
                                    } else {
                                        this._$context.append(newPageElement);
                                    }
                                    //trigger event in navigator
                                    this._eventEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                                    //trigger a global event that could be listened by anyone
                                    this._eventEmitter.globalEmitter.trigger(Navigator.ON_DRAW_PAGE, newPageName);
                                    //request animations
                                    var showPromise = newPageController.show(currentPageElement, currentPageIs);
                                    //if the function returns a promise
                                    if (typeof showPromise.then === "function") {
                                        showPromise.then(this._onPageShowEnd.bind(this, newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess));
                                    } else {
                                        this._onPageShowEnd(newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess);
                                    }
                                }
                            }
                        } else {}
                    }
                    return false;
                };
                /**
                 * Devuelve el estado actual de deshabilitado
                 * @returns {boolean}
                 */
                Navigator.prototype.isDisabled = function () {
                    return this._disabled;
                };
                /**
                 * Establece el estado de deshabilitado
                 * @param {boolean}     disabled        Estado a establecer
                 */
                Navigator.prototype.setDisabled = function (disabled) {
                    if (this._disabled !== disabled) {
                        this._disabled = disabled;
                        if (disabled) {
                            this._eventEmitter.trigger(Navigator.ON_ENABLE);
                        } else {
                            this._eventEmitter.trigger(Navigator.ON_DISABLE);
                        }
                    }
                };
                /**
                 * Habilita la navegación
                 */
                Navigator.prototype.enable = function () {
                    this.setDisabled(false);
                };
                /**
                 * Deshabilita la navegación
                 */
                Navigator.prototype.disable = function () {
                    this.setDisabled(true);
                };
                /**
                 * Retrocede a la página posterior si existe.
                 * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
                 * página. False si no se realiza el cambio
                 */
                Navigator.prototype.next = function () {
                    var numPages = this._PageManager.count(),
                        currentPageIndex = this.getCurrentPageIndex();
                    if (currentPageIndex < numPages - 1) {
                        return this.goTo(currentPageIndex + 1);
                    } else {
                        return false;
                    }
                };
                /**
                 * Retrocede a la página anterior si existe.
                 * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
                 * página. False si no se realiza el cambio
                 */
                Navigator.prototype.prev = function () {
                    var currentPageIndex = this.getCurrentPageIndex();
                    if (currentPageIndex > 0) {
                        return this.goTo(currentPageIndex - 1);
                    } else {
                        return false;
                    }
                };
                /**
                 * Invocado al finalizarse la animación del cambio de página
                 * @param {PageImplementation}      newPage     Página activada
                 * @param {INavigatorPageData}      newPageData Datos de la página activada
                 * @param {PageImplementation}      oldPage     Página desactivada
                 * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
                 * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
                 * @private
                 */
                Navigator.prototype._onPageShowEnd = function (newPage, newPageData, oldPage, oldPageData, defer) {
                    if (oldPage) {
                        var controller = oldPage.getController();
                        oldPage.detach();
                        controller.getElement().remove();
                    }
                    //trigger event in navigator
                    this._eventEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
                    //trigger a global event that could be listened by anyone
                    this._eventEmitter.globalEmitter.trigger(Navigator.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
                };
                /**
                 * Obtiene el índice de la página actual
                 * @returns {number}
                 */
                Navigator.prototype.getCurrentPageIndex = function () {
                    return this._currentPageIndex;
                };
                /**
                 * Obtiene la implementación de página actual
                 * @returns {PageImplementation}
                 */
                Navigator.prototype.getCurrentPage = function () {
                    return this._currentPage;
                };
                /**
                 * Devuelve los datos de la página actual
                 * @returns {INavigatorPageData}
                 */
                Navigator.prototype.getCurrentPageData = function () {
                    return {
                        index: this._currentPageIndex,
                        name: this._currentPage.getPageName()
                    };
                };
                /**
                 * @see EventEmitter#on
                 * @returns {Navigator}
                 */
                Navigator.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events, data, handler);
                    return this;
                };
                /**
                 * @see EventEmitter#one
                 * @returns {Navigator}
                 */
                Navigator.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events, data, handler);
                    return this;
                };
                /**
                 * @see EventEmitter#off
                 * @returns {Navigator}
                 */
                Navigator.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events, handler);
                    return this;
                };
                Navigator.NAMESPACE = "navigator";
                Navigator.ON_DRAW_PAGE = Navigator.NAMESPACE + ":draw";
                Navigator.ON_DISABLE = Navigator.NAMESPACE + ":disable";
                Navigator.ON_ENABLE = Navigator.NAMESPACE + ":enable";
                Navigator.ON_CHANGE_PAGE_END = Navigator.NAMESPACE + ":changeend";
                Navigator.ON_CHANGE_PAGE_START = Navigator.NAMESPACE + ":changestart";
                Navigator = __decorate([di_1.Core({
                    name: "Navigator",
                    public: true,
                    dependencies: [jquery_1.$, page_1.PageManager, utils_1.EventEmitterFactory]
                })], Navigator);
                return Navigator;
            }();
            exports_1("Navigator", Navigator);
        }
    };
});

System.register("src/navigator/NavigatorService.js", ["src/di.js", "src/navigator/Navigator.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, Navigator_1;
    var NavigatorService;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (Navigator_1_1) {
            Navigator_1 = Navigator_1_1;
        }],
        execute: function () {
            NavigatorService = function () {
                function NavigatorService(_Navigator) {
                    var publish = ["goTo", "isDisabled", "setDisabled", "enable", "disable", "next", "prev", "getCurrentPageData", "on", "one", "off"];
                    for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
                        var method = publish_1[_i];
                        this[method] = _Navigator[method].bind(_Navigator);
                    }
                }
                NavigatorService.prototype.goTo = function (index) {
                    return undefined;
                };
                NavigatorService.prototype.isDisabled = function () {
                    return undefined;
                };
                NavigatorService.prototype.setDisabled = function (disabled) {};
                NavigatorService.prototype.enable = function () {};
                NavigatorService.prototype.disable = function () {};
                NavigatorService.prototype.next = function () {
                    return undefined;
                };
                NavigatorService.prototype.prev = function () {
                    return undefined;
                };
                NavigatorService.prototype.getCurrentPageData = function () {
                    return undefined;
                };
                /**
                 * @see EventEmitter#on
                 */
                NavigatorService.prototype.on = function (events, data, handler) {
                    return undefined;
                };
                NavigatorService.prototype.one = function (events, data, handler) {
                    return undefined;
                };
                NavigatorService.prototype.off = function (events, handler) {
                    return undefined;
                };
                NavigatorService.ON_DRAW_PAGE = Navigator_1.Navigator.ON_DRAW_PAGE;
                NavigatorService.ON_DISABLE = Navigator_1.Navigator.ON_DISABLE;
                NavigatorService.ON_ENABLE = Navigator_1.Navigator.ON_ENABLE;
                NavigatorService.ON_CHANGE_PAGE_END = Navigator_1.Navigator.ON_CHANGE_PAGE_END;
                NavigatorService.ON_CHANGE_PAGE_START = Navigator_1.Navigator.ON_CHANGE_PAGE_START;
                NavigatorService = __decorate([di_1.Service({
                    name: "NavigatorService",
                    dependencies: [Navigator_1.Navigator]
                })], NavigatorService);
                return NavigatorService;
            }();
            exports_1("NavigatorService", NavigatorService);
        }
    };
});

System.register("src/navigator.js", ["src/navigator/Navigator.js", "src/navigator/NavigatorService.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Navigator_1_1) {
            exports_1({
                "Navigator": Navigator_1_1["Navigator"],
                "INavigatorPageData": Navigator_1_1["INavigatorPageData"]
            });
        }, function (NavigatorService_1_1) {
            exports_1({
                "NavigatorService": NavigatorService_1_1["NavigatorService"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/component/ComponentController.js", ["src/di.js", "src/jquery.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, jquery_1, utils_1;
    var ComponentController;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            ComponentController = function () {
                /**
                 * Controlador base para los recursos
                 * @param {JQueryStatic}            _$
                 * @param {EventEmitterFactory}     _EventEmitterFactory
                 */
                function ComponentController(_$, _EventEmitterFactory) {
                    this._$ = _$;
                    this._EventEmitterFactory = _EventEmitterFactory;
                    this._destroyed = false;
                    this._options = {};
                }
                /**
                 * Invocado al obtenerse el factory del DI para establecer las opciones
                 * @param {JQuery}  $element        Elemento del componente
                 */
                ComponentController.prototype.activate = function ($element) {
                    this._$element = $element;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
                };
                /**
                 * Indica si se ha invocado al método destroy
                 * @returns {boolean}
                 */
                ComponentController.prototype.isDestroyed = function () {
                    return this._destroyed;
                };
                /**
                 * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
                 */
                ComponentController.prototype.destroy = function () {
                    this._destroyed = true;
                };
                ComponentController.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events, data, handler);
                    return this;
                };
                ;
                ComponentController.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events, data, handler);
                    return this;
                };
                ;
                ComponentController.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events, handler);
                    return this;
                };
                ;
                ComponentController = __decorate([di_1.Dependencies({
                    dependencies: [jquery_1.default, utils_1.EventEmitterFactory]
                })], ComponentController);
                return ComponentController;
            }();
            exports_1("ComponentController", ComponentController);
        }
    };
});

System.register("src/component/ComponentManager.js", ["src/di.js", "src/component/Errors.js", "src/utils.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, di_2, Errors_1, utils_1;
    var ComponentManager;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
            di_2 = di_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            ComponentManager = function () {
                function ComponentManager(Injector, S) {
                    this.Injector = Injector;
                    this.S = S;
                    //store available components
                    this._components = new Map();
                }
                /**
                 * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
                 * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
                 * estar registrado en el DI con el tipo Component
                 * @see Injector.registerComponent
                 */
                ComponentManager.prototype.add = function (component) {
                    //component must exists
                    if (component) {
                        //component must have a name registered by the injector
                        var name_1 = component._componentName;
                        if (!!name_1) {
                            if (this.nameIsValid(name_1)) {
                                //check if already exists
                                var current = this._components.get(name_1);
                                //if exists, should be equal
                                if (current != undefined) {
                                    if (current != component) {
                                        throw new Errors_1.HaztivityComponentAlreadyRegisteredError(name_1);
                                    }
                                } else {
                                    //if not exists, register
                                    this._components.set(name_1, component);
                                }
                            } else {
                                throw new Errors_1.HaztivityComponentNameInvalidError(name_1);
                            }
                        } else {
                            throw new Errors_1.HaztivityComponentInvalidError();
                        }
                    } else {
                        throw new Errors_1.HaztivityComponentInvalidError();
                    }
                };
                ComponentManager.prototype.nameIsValid = function (name) {
                    return this.S(name).camelize().s === name;
                };
                ComponentManager.prototype.exists = function (name) {
                    return this._components.get(name) != undefined;
                };
                /**
                 * Añade un conjunto de componentes.
                 * @see ComponentManager#add
                 * @param {ComponentController[]}    components       Componentes a añadir
                 */
                ComponentManager.prototype.addAll = function (components) {
                    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
                        var component = components_1[_i];
                        this.add(component);
                    }
                };
                ComponentManager = __decorate([di_1.Core({
                    name: "ComponentManager",
                    dependencies: [di_2.InjectorService, utils_1.S]
                })], ComponentManager);
                return ComponentManager;
            }();
            exports_1("ComponentManager", ComponentManager);
        }
    };
});

System.register("src/utils/EventEmitterFactory.js", ["src/di.js", "src/utils/EventEmitter.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, EventEmitter_1;
    var EventEmitterFactory;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (EventEmitter_1_1) {
            EventEmitter_1 = EventEmitter_1_1;
        }],
        execute: function () {
            EventEmitterFactory = function () {
                /**
                 * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
                 * @requires _EventEmitter
                 */
                function EventEmitterFactory(_EventEmitter) {
                    this._EventEmitter = _EventEmitter;
                    this._globalEmitter = this.createEmitter();
                }
                /**
                 * Genera una instancia de EventEmitter2
                 * @param {*}  bind     Object to be the context to bind and trigger events
                 * @returns {EventEmitter}
                 */
                EventEmitterFactory.prototype.createEmitter = function (bind) {
                    var eventEmitter = this._EventEmitter.instance();
                    eventEmitter.activate(this._globalEmitter, bind);
                    return eventEmitter;
                };
                EventEmitterFactory = __decorate([di_1.Service({
                    name: "EventEmitterFactory",
                    dependencies: [EventEmitter_1.EventEmitter]
                })], EventEmitterFactory);
                return EventEmitterFactory;
            }();
            exports_1("EventEmitterFactory", EventEmitterFactory);
        }
    };
});

System.register("src/utils/EventEmitter.js", ["src/jquery.js", "src/di.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var jquery_1, di_1;
    var EventEmitter;
    return {
        setters: [function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }],
        execute: function () {
            EventEmitter = function () {
                function EventEmitter(_$) {
                    this._$ = _$;
                    this._namespace = ".eventEmitter" + new Date().getTime();
                }
                EventEmitter.prototype.activate = function (global, bind) {
                    if (bind === void 0) {
                        bind = {};
                    }
                    this._$context = jquery_1.$(bind);
                    this.globalEmitter = global;
                };
                EventEmitter.prototype.trigger = function (eventType) {
                    var extraParameters = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        extraParameters[_i - 1] = arguments[_i];
                    }
                    return this._$context.triggerHandler.apply(this._$context, arguments);
                };
                EventEmitter.prototype._attachNamespace = function (events) {
                    events = events + " ";
                    return events.replace(/\s/g, this._namespace + " ");
                };
                /**
                 * Añade un handler para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
                 * características, incluido el uso de namespaces
                 * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
                 * separados por
                 * espacios
                 * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
                 * @param {Function}                handler Función ha invocar al emitirse el evento
                 * @returns {EventEmitter}
                 * @example
                 * function callback(e){
                 *      let data = e.data,
                 *          someVar = data.someVar;//"example"
                 *      //do something
                 * }
                 * eventEmitter.on("someEvent",{someVar:"example"},callback);
                 * @see http://api.jquery.com/on/
                 */
                EventEmitter.prototype.on = function (events, data, handler) {
                    var validEvents = this._attachNamespace(events);
                    if (typeof data === "function" && typeof handler !== "function") {
                        this._$context.on(validEvents, handler);
                    } else {
                        this._$context.on(validEvents, data, handler);
                    }
                    return this;
                };
                /**
                 * Elimina los handlers para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
                 * características, incluido el uso de namespaces
                 * @param {String}                  events  Eventos a eliminar. Se pueden añadir varios eventos separados por
                 * espacios
                 * @param {Function}                handler Función ha invocar al emitirse el evento
                 * @returns {EventEmitter}
                 * @example
                 * eventEmitter.off("someEvent");
                 * @see http://api.jquery.com/off/
                 */
                EventEmitter.prototype.off = function (events, handler) {
                    var validEvents = this._attachNamespace(events);
                    this._$context.off(validEvents, handler);
                    return this;
                };
                /**
                 * Añade un handler para un evento que se auto elimina al lanzarse la primera vez. Hace uso del sistema de
                 * eventos de JQuery, se dispone de todas sus
                 * características, incluido el uso de namespaces
                 * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
                 * separados por
                 * espacios
                 * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
                 * @param {Function}                handler Función ha invocar al emitirse el evento
                 * @returns {EventEmitter}
                 * @example
                 * function callback(e){
                 *      let data = e.data,
                 *          someVar = data.someVar;//"example"
                 *      //do something
                 * }
                 * eventEmitter.on("someEvent",{someVar:"example"},callback);
                 * @see http://api.jquery.com/one/
                 */
                EventEmitter.prototype.one = function (events, data, handler) {
                    if (typeof data === "function" && typeof handler !== "function") {
                        this._$context.one(events, handler);
                    } else {
                        this._$context.one(events, data, handler);
                    }
                    return this;
                };
                EventEmitter.prototype.destroy = function () {
                    this.globalEmitter.off(this._namespace);
                };
                /**
                 * Crea un objeto JQueryEvent para utilizarse con EventEmitter
                 * @param {String}  name    Nombre del evento
                 * @returns {JQueryEventObject}
                 */
                EventEmitter.prototype.createEvent = function (name) {
                    return this._$.Event(name);
                };
                EventEmitter = __decorate([di_1.Core({
                    name: "EventEmitter",
                    instantiable: true,
                    public: true,
                    dependencies: [jquery_1.$]
                })], EventEmitter);
                return EventEmitter;
            }();
            exports_1("EventEmitter", EventEmitter);
        }
    };
});

System.registerDynamic("src/libs/String.js", [], true, function ($__require, exports, module) {
    /* */
    "format cjs";

    var define,
        global = this || self,
        GLOBAL = global;
    !function (e) {
        if ("object" == typeof exports) module.exports = e();else if ("function" == typeof define && define.amd) define(e);else {
            var f;
            "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.S = e();
        }
    }(function () {
        var define, module, exports;
        return function e(t, n, r) {
            function s(o, u) {
                if (!n[o]) {
                    if (!t[o]) {
                        var a = typeof $__require == "function" && $__require;
                        if (!u && a) return a(o, !0);
                        if (i) return i(o, !0);
                        throw new Error("Cannot find module '" + o + "'");
                    }
                    var f = n[o] = { exports: {} };
                    t[o][0].call(f.exports, function (e) {
                        var n = t[o][1][e];return s(n ? n : e);
                    }, f, f.exports, e, t, n, r);
                }return n[o].exports;
            }var i = typeof $__require == "function" && $__require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
        }({ 1: [function (_dereq_, module, exports) {
                function count(self, substr) {
                    var count = 0;
                    var pos = self.indexOf(substr);
                    while (pos >= 0) {
                        count += 1;
                        pos = self.indexOf(substr, pos + 1);
                    }
                    return count;
                }
                module.exports = count;
            }, {}], 2: [function (_dereq_, module, exports) {
                function splitLeft(self, sep, maxSplit, limit) {
                    if (typeof maxSplit === 'undefined') {
                        var maxSplit = -1;
                    }
                    var splitResult = self.split(sep);
                    var splitPart1 = splitResult.slice(0, maxSplit);
                    var splitPart2 = splitResult.slice(maxSplit);
                    if (splitPart2.length === 0) {
                        splitResult = splitPart1;
                    } else {
                        splitResult = splitPart1.concat(splitPart2.join(sep));
                    }
                    if (typeof limit === 'undefined') {
                        return splitResult;
                    } else if (limit < 0) {
                        return splitResult.slice(limit);
                    } else {
                        return splitResult.slice(0, limit);
                    }
                }
                module.exports = splitLeft;
            }, {}], 3: [function (_dereq_, module, exports) {
                function splitRight(self, sep, maxSplit, limit) {
                    if (typeof maxSplit === 'undefined') {
                        var maxSplit = -1;
                    }
                    if (typeof limit === 'undefined') {
                        var limit = 0;
                    }
                    var splitResult = [self];
                    for (var i = self.length - 1; i >= 0; i--) {
                        if (splitResult[0].slice(i).indexOf(sep) === 0 && (splitResult.length <= maxSplit || maxSplit === -1)) {
                            splitResult.splice(1, 0, splitResult[0].slice(i + sep.length)); // insert
                            splitResult[0] = splitResult[0].slice(0, i);
                        }
                    }
                    if (limit >= 0) {
                        return splitResult.slice(-limit);
                    } else {
                        return splitResult.slice(0, -limit);
                    }
                }
                module.exports = splitRight;
            }, {}], 4: [function (_dereq_, module, exports) {
                /*
                 string.js - Copyright (C) 2012-2014, JP Richardson <jprichardson@gmail.com>
                 */
                !function () {
                    "use strict";

                    var VERSION = '3.3.3';
                    var ENTITIES = {};
                    // from http://semplicewebsites.com/removing-accents-javascript
                    var latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "ẞ": "SS", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ß": "ss", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
                    //******************************************************************************
                    // Added an initialize function which is essentially the code from the S
                    // constructor.  Now, the S constructor calls this and a new method named
                    // setValue calls it as well.  The setValue function allows constructors for
                    // modules that extend string.js to set the initial value of an object without
                    // knowing the internal workings of string.js.
                    //
                    // Also, all methods which return a new S object now call:
                    //
                    //      return new this.constructor(s);
                    //
                    // instead of:
                    //
                    //      return new S(s);
                    //
                    // This allows extended objects to keep their proper instanceOf and constructor.
                    //******************************************************************************
                    function initialize(object, s) {
                        if (s !== null && s !== undefined) {
                            if (typeof s === 'string') object.s = s;else object.s = s.toString();
                        } else {
                            object.s = s; //null or undefined
                        }
                        object.orig = s; //original object, currently only used by toCSV() and toBoolean()
                        if (s !== null && s !== undefined) {
                            if (object.__defineGetter__) {
                                object.__defineGetter__('length', function () {
                                    return object.s.length;
                                });
                            } else {
                                object.length = s.length;
                            }
                        } else {
                            object.length = -1;
                        }
                    }
                    function S(s) {
                        initialize(this, s);
                    }
                    var __nsp = String.prototype;
                    var __sp = S.prototype = {
                        between: function (left, right) {
                            var s = this.s;
                            var startPos = s.indexOf(left);
                            var endPos = s.indexOf(right, startPos + left.length);
                            if (endPos == -1 && right != null) return new this.constructor('');else if (endPos == -1 && right == null) return new this.constructor(s.substring(startPos + left.length));else return new this.constructor(s.slice(startPos + left.length, endPos));
                        },
                        //# modified slightly from https://github.com/epeli/underscore.string
                        camelize: function () {
                            var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
                                return c ? c.toUpperCase() : '';
                            });
                            return new this.constructor(s);
                        },
                        capitalize: function () {
                            return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
                        },
                        charAt: function (index) {
                            return this.s.charAt(index);
                        },
                        chompLeft: function (prefix) {
                            var s = this.s;
                            if (s.indexOf(prefix) === 0) {
                                s = s.slice(prefix.length);
                                return new this.constructor(s);
                            } else {
                                return this;
                            }
                        },
                        chompRight: function (suffix) {
                            if (this.endsWith(suffix)) {
                                var s = this.s;
                                s = s.slice(0, s.length - suffix.length);
                                return new this.constructor(s);
                            } else {
                                return this;
                            }
                        },
                        //#thanks Google
                        collapseWhitespace: function () {
                            var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
                            return new this.constructor(s);
                        },
                        contains: function (ss) {
                            return this.s.indexOf(ss) >= 0;
                        },
                        count: function (ss) {
                            return _dereq_('./_count')(this.s, ss);
                        },
                        //#modified from https://github.com/epeli/underscore.string
                        dasherize: function () {
                            var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
                            return new this.constructor(s);
                        },
                        equalsIgnoreCase: function (prefix) {
                            var s = this.s;
                            return s.toLowerCase() == prefix.toLowerCase();
                        },
                        latinise: function () {
                            var s = this.replace(/[^A-Za-z0-9\[\] ]/g, function (x) {
                                return latin_map[x] || x;
                            });
                            return new this.constructor(s);
                        },
                        decodeHtmlEntities: function () {
                            var s = this.s;
                            s = s.replace(/&#(\d+);?/g, function (_, code) {
                                return String.fromCharCode(code);
                            }).replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
                                return String.fromCharCode(parseInt(hex, 16));
                            }).replace(/&([^;\W]+;?)/g, function (m, e) {
                                var ee = e.replace(/;$/, '');
                                var target = ENTITIES[e] || e.match(/;$/) && ENTITIES[ee];
                                if (typeof target === 'number') {
                                    return String.fromCharCode(target);
                                } else if (typeof target === 'string') {
                                    return target;
                                } else {
                                    return m;
                                }
                            });
                            return new this.constructor(s);
                        },
                        endsWith: function () {
                            var suffixes = Array.prototype.slice.call(arguments, 0);
                            for (var i = 0; i < suffixes.length; ++i) {
                                var l = this.s.length - suffixes[i].length;
                                if (l >= 0 && this.s.indexOf(suffixes[i], l) === l) return true;
                            }
                            return false;
                        },
                        escapeHTML: function () {
                            return new this.constructor(this.s.replace(/[&<>"']/g, function (m) {
                                return '&' + reversedEscapeChars[m] + ';';
                            }));
                        },
                        ensureLeft: function (prefix) {
                            var s = this.s;
                            if (s.indexOf(prefix) === 0) {
                                return this;
                            } else {
                                return new this.constructor(prefix + s);
                            }
                        },
                        ensureRight: function (suffix) {
                            var s = this.s;
                            if (this.endsWith(suffix)) {
                                return this;
                            } else {
                                return new this.constructor(s + suffix);
                            }
                        },
                        humanize: function () {
                            if (this.s === null || this.s === undefined) return new this.constructor('');
                            var s = this.underscore().replace(/_id$/, '').replace(/_/g, ' ').trim().capitalize();
                            return new this.constructor(s);
                        },
                        isAlpha: function () {
                            return !/[^a-z\xDF-\xFF]|^$/.test(this.s.toLowerCase());
                        },
                        isAlphaNumeric: function () {
                            return !/[^0-9a-z\xDF-\xFF]/.test(this.s.toLowerCase());
                        },
                        isEmpty: function () {
                            return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
                        },
                        isLower: function () {
                            return this.isAlpha() && this.s.toLowerCase() === this.s;
                        },
                        isNumeric: function () {
                            return !/[^0-9]/.test(this.s);
                        },
                        isUpper: function () {
                            return this.isAlpha() && this.s.toUpperCase() === this.s;
                        },
                        left: function (N) {
                            if (N >= 0) {
                                var s = this.s.substr(0, N);
                                return new this.constructor(s);
                            } else {
                                return this.right(-N);
                            }
                        },
                        lines: function () {
                            return this.replaceAll('\r\n', '\n').s.split('\n');
                        },
                        pad: function (len, ch) {
                            if (ch == null) ch = ' ';
                            if (this.s.length >= len) return new this.constructor(this.s);
                            len = len - this.s.length;
                            var left = Array(Math.ceil(len / 2) + 1).join(ch);
                            var right = Array(Math.floor(len / 2) + 1).join(ch);
                            return new this.constructor(left + this.s + right);
                        },
                        padLeft: function (len, ch) {
                            if (ch == null) ch = ' ';
                            if (this.s.length >= len) return new this.constructor(this.s);
                            return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
                        },
                        padRight: function (len, ch) {
                            if (ch == null) ch = ' ';
                            if (this.s.length >= len) return new this.constructor(this.s);
                            return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
                        },
                        parseCSV: function (delimiter, qualifier, escape, lineDelimiter) {
                            delimiter = delimiter || ',';
                            escape = escape || '\\';
                            if (typeof qualifier == 'undefined') qualifier = '"';
                            var i = 0,
                                fieldBuffer = [],
                                fields = [],
                                len = this.s.length,
                                inField = false,
                                inUnqualifiedString = false,
                                self = this;
                            var ca = function (i) {
                                return self.s.charAt(i);
                            };
                            if (typeof lineDelimiter !== 'undefined') var rows = [];
                            if (!qualifier) inField = true;
                            while (i < len) {
                                var current = ca(i);
                                switch (current) {
                                    case escape:
                                        //fix for issues #32 and #35
                                        if (inField && (escape !== qualifier || ca(i + 1) === qualifier)) {
                                            i += 1;
                                            fieldBuffer.push(ca(i));
                                            break;
                                        }
                                        if (escape !== qualifier) break;
                                    case qualifier:
                                        inField = !inField;
                                        break;
                                    case delimiter:
                                        if (inUnqualifiedString) {
                                            inField = false;
                                            inUnqualifiedString = false;
                                        }
                                        if (inField && qualifier) fieldBuffer.push(current);else {
                                            fields.push(fieldBuffer.join(''));
                                            fieldBuffer.length = 0;
                                        }
                                        break;
                                    case lineDelimiter:
                                        if (inUnqualifiedString) {
                                            inField = false;
                                            inUnqualifiedString = false;
                                            fields.push(fieldBuffer.join(''));
                                            rows.push(fields);
                                            fields = [];
                                            fieldBuffer.length = 0;
                                        } else if (inField) {
                                            fieldBuffer.push(current);
                                        } else {
                                            if (rows) {
                                                fields.push(fieldBuffer.join(''));
                                                rows.push(fields);
                                                fields = [];
                                                fieldBuffer.length = 0;
                                            }
                                        }
                                        break;
                                    case ' ':
                                        if (inField) fieldBuffer.push(current);
                                        break;
                                    default:
                                        if (inField) fieldBuffer.push(current);else if (current !== qualifier) {
                                            fieldBuffer.push(current);
                                            inField = true;
                                            inUnqualifiedString = true;
                                        }
                                        break;
                                }
                                i += 1;
                            }
                            fields.push(fieldBuffer.join(''));
                            if (rows) {
                                rows.push(fields);
                                return rows;
                            }
                            return fields;
                        },
                        replaceAll: function (ss, r) {
                            //var s = this.s.replace(new RegExp(ss, 'g'), r);
                            var s = this.s.split(ss).join(r);
                            return new this.constructor(s);
                        },
                        splitLeft: function (sep, maxSplit, limit) {
                            return _dereq_('./_splitLeft')(this.s, sep, maxSplit, limit);
                        },
                        splitRight: function (sep, maxSplit, limit) {
                            return _dereq_('./_splitRight')(this.s, sep, maxSplit, limit);
                        },
                        strip: function () {
                            var ss = this.s;
                            for (var i = 0, n = arguments.length; i < n; i++) {
                                ss = ss.split(arguments[i]).join('');
                            }
                            return new this.constructor(ss);
                        },
                        stripLeft: function (chars) {
                            var regex;
                            var pattern;
                            var ss = ensureString(this.s);
                            if (chars === undefined) {
                                pattern = /^\s+/g;
                            } else {
                                regex = escapeRegExp(chars);
                                pattern = new RegExp("^[" + regex + "]+", "g");
                            }
                            return new this.constructor(ss.replace(pattern, ""));
                        },
                        stripRight: function (chars) {
                            var regex;
                            var pattern;
                            var ss = ensureString(this.s);
                            if (chars === undefined) {
                                pattern = /\s+$/g;
                            } else {
                                regex = escapeRegExp(chars);
                                pattern = new RegExp("[" + regex + "]+$", "g");
                            }
                            return new this.constructor(ss.replace(pattern, ""));
                        },
                        right: function (N) {
                            if (N >= 0) {
                                var s = this.s.substr(this.s.length - N, N);
                                return new this.constructor(s);
                            } else {
                                return this.left(-N);
                            }
                        },
                        setValue: function (s) {
                            initialize(this, s);
                            return this;
                        },
                        slugify: function () {
                            var sl = new S(new S(this.s).latinise().s.replace(/[^\w\s-]/g, '').toLowerCase()).dasherize().s;
                            if (sl.charAt(0) === '-') sl = sl.substr(1);
                            return new this.constructor(sl);
                        },
                        startsWith: function () {
                            var prefixes = Array.prototype.slice.call(arguments, 0);
                            for (var i = 0; i < prefixes.length; ++i) {
                                if (this.s.lastIndexOf(prefixes[i], 0) === 0) return true;
                            }
                            return false;
                        },
                        stripPunctuation: function () {
                            //return new this.constructor(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
                            return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
                        },
                        stripTags: function () {
                            var s = this.s,
                                args = arguments.length > 0 ? arguments : [''];
                            multiArgs(args, function (tag) {
                                s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
                            });
                            return new this.constructor(s);
                        },
                        template: function (values, opening, closing) {
                            var s = this.s;
                            var opening = opening || Export.TMPL_OPEN;
                            var closing = closing || Export.TMPL_CLOSE;
                            var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
                            var close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
                            var r = new RegExp(open + '(.+?)' + close, 'g');
                            //, r = /\{\{(.+?)\}\}/g
                            var matches = s.match(r) || [];
                            matches.forEach(function (match) {
                                var key = match.substring(opening.length, match.length - closing.length).trim(); //chop {{ and }}
                                var value = typeof values[key] == 'undefined' ? '' : values[key];
                                s = s.replace(match, value);
                            });
                            return new this.constructor(s);
                        },
                        times: function (n) {
                            return new this.constructor(new Array(n + 1).join(this.s));
                        },
                        titleCase: function () {
                            var s = this.s;
                            if (s) {
                                s = s.replace(/(^[a-z]| [a-z]|-[a-z]|_[a-z])/g, function ($1) {
                                    return $1.toUpperCase();
                                });
                            }
                            return new this.constructor(s);
                        },
                        toBoolean: function () {
                            if (typeof this.orig === 'string') {
                                var s = this.s.toLowerCase();
                                return s === 'true' || s === 'yes' || s === 'on' || s === '1';
                            } else return this.orig === true || this.orig === 1;
                        },
                        toFloat: function (precision) {
                            var num = parseFloat(this.s);
                            if (precision) return parseFloat(num.toFixed(precision));else return num;
                        },
                        toInt: function () {
                            // If the string starts with '0x' or '-0x', parse as hex.
                            return (/^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)
                            );
                        },
                        trim: function () {
                            var s;
                            if (typeof __nsp.trim === 'undefined') s = this.s.replace(/(^\s*|\s*$)/g, '');else s = this.s.trim();
                            return new this.constructor(s);
                        },
                        trimLeft: function () {
                            var s;
                            if (__nsp.trimLeft) s = this.s.trimLeft();else s = this.s.replace(/(^\s*)/g, '');
                            return new this.constructor(s);
                        },
                        trimRight: function () {
                            var s;
                            if (__nsp.trimRight) s = this.s.trimRight();else s = this.s.replace(/\s+$/, '');
                            return new this.constructor(s);
                        },
                        truncate: function (length, pruneStr) {
                            var str = this.s;
                            length = ~~length;
                            pruneStr = pruneStr || '...';
                            if (str.length <= length) return new this.constructor(str);
                            var tmpl = function (c) {
                                return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
                            },
                                template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'
                            if (template.slice(template.length - 2).match(/\w\w/)) template = template.replace(/\s*\S+$/, '');else template = new S(template.slice(0, template.length - 1)).trimRight().s;
                            return (template + pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length) + pruneStr);
                        },
                        toCSV: function () {
                            var delim = ',',
                                qualifier = '"',
                                escape = '\\',
                                encloseNumbers = true,
                                keys = false;
                            var dataArray = [];
                            function hasVal(it) {
                                return it !== null && it !== '';
                            }
                            if (typeof arguments[0] === 'object') {
                                delim = arguments[0].delimiter || delim;
                                delim = arguments[0].separator || delim;
                                qualifier = arguments[0].qualifier || qualifier;
                                encloseNumbers = !!arguments[0].encloseNumbers;
                                escape = arguments[0].escape || escape;
                                keys = !!arguments[0].keys;
                            } else if (typeof arguments[0] === 'string') {
                                delim = arguments[0];
                            }
                            if (typeof arguments[1] === 'string') qualifier = arguments[1];
                            if (arguments[1] === null) qualifier = null;
                            if (this.orig instanceof Array) dataArray = this.orig;else {
                                for (var key in this.orig) if (this.orig.hasOwnProperty(key)) if (keys) dataArray.push(key);else dataArray.push(this.orig[key]);
                            }
                            var rep = escape + qualifier;
                            var buildString = [];
                            for (var i = 0; i < dataArray.length; ++i) {
                                var shouldQualify = hasVal(qualifier);
                                if (typeof dataArray[i] == 'number') shouldQualify &= encloseNumbers;
                                if (shouldQualify) buildString.push(qualifier);
                                if (dataArray[i] !== null && dataArray[i] !== undefined) {
                                    var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
                                    buildString.push(d);
                                } else buildString.push('');
                                if (shouldQualify) buildString.push(qualifier);
                                if (delim) buildString.push(delim);
                            }
                            //chop last delim
                            //console.log(buildString.length)
                            buildString.length = buildString.length - 1;
                            return new this.constructor(buildString.join(''));
                        },
                        toString: function () {
                            return this.s;
                        },
                        //#modified from https://github.com/epeli/underscore.string
                        underscore: function () {
                            var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
                            return new this.constructor(s);
                        },
                        unescapeHTML: function () {
                            return new this.constructor(this.s.replace(/\&([^;]+);/g, function (entity, entityCode) {
                                var match;
                                if (entityCode in escapeChars) {
                                    return escapeChars[entityCode];
                                } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                                    return String.fromCharCode(parseInt(match[1], 16));
                                } else if (match = entityCode.match(/^#(\d+)$/)) {
                                    return String.fromCharCode(~~match[1]);
                                } else {
                                    return entity;
                                }
                            }));
                        },
                        valueOf: function () {
                            return this.s.valueOf();
                        },
                        //#Added a New Function called wrapHTML.
                        wrapHTML: function (tagName, tagAttrs) {
                            var s = this.s,
                                el = tagName == null ? 'span' : tagName,
                                elAttr = '',
                                wrapped = '';
                            if (typeof tagAttrs == 'object') for (var prop in tagAttrs) elAttr += ' ' + prop + '="' + new this.constructor(tagAttrs[prop]).escapeHTML() + '"';
                            s = wrapped.concat('<', el, elAttr, '>', this, '</', el, '>');
                            return new this.constructor(s);
                        }
                    };
                    var methodsAdded = [];
                    function extendPrototype() {
                        for (var name in __sp) {
                            (function (name) {
                                var func = __sp[name];
                                if (!__nsp.hasOwnProperty(name)) {
                                    methodsAdded.push(name);
                                    __nsp[name] = function () {
                                        String.prototype.s = this;
                                        return func.apply(this, arguments);
                                    };
                                }
                            })(name);
                        }
                    }
                    function restorePrototype() {
                        for (var i = 0; i < methodsAdded.length; ++i) delete String.prototype[methodsAdded[i]];
                        methodsAdded.length = 0;
                    }
                    /*************************************
                     /* Attach Native JavaScript String Properties
                     /*************************************/
                    var nativeProperties = getNativeStringProperties();
                    for (var name in nativeProperties) {
                        (function (name) {
                            var stringProp = __nsp[name];
                            if (typeof stringProp == 'function') {
                                //console.log(stringProp)
                                if (!__sp[name]) {
                                    if (nativeProperties[name] === 'string') {
                                        __sp[name] = function () {
                                            //console.log(name)
                                            return new this.constructor(stringProp.apply(this, arguments));
                                        };
                                    } else {
                                        __sp[name] = stringProp;
                                    }
                                }
                            }
                        })(name);
                    }
                    /*************************************
                     /* Function Aliases
                     /*************************************/
                    __sp.repeat = __sp.times;
                    __sp.include = __sp.contains;
                    __sp.toInteger = __sp.toInt;
                    __sp.toBool = __sp.toBoolean;
                    __sp.decodeHTMLEntities = __sp.decodeHtmlEntities; //ensure consistent casing scheme of 'HTML'
                    //******************************************************************************
                    // Set the constructor.  Without this, string.js objects are instances of
                    // Object instead of S.
                    //******************************************************************************
                    __sp.constructor = S;
                    /*************************************
                     /* Private Functions
                     /*************************************/
                    function getNativeStringProperties() {
                        var names = getNativeStringPropertyNames();
                        var retObj = {};
                        for (var i = 0; i < names.length; ++i) {
                            var name = names[i];
                            if (name === 'to' || name === 'toEnd') continue; // get rid of the shelljs prototype messup
                            var func = __nsp[name];
                            try {
                                var type = typeof func.apply('teststring');
                                retObj[name] = type;
                            } catch (e) {}
                        }
                        return retObj;
                    }
                    function getNativeStringPropertyNames() {
                        var results = [];
                        if (Object.getOwnPropertyNames) {
                            results = Object.getOwnPropertyNames(__nsp);
                            results.splice(results.indexOf('valueOf'), 1);
                            results.splice(results.indexOf('toString'), 1);
                            return results;
                        } else {
                            var stringNames = {};
                            var objectNames = [];
                            for (var name in String.prototype) stringNames[name] = name;
                            for (var name in Object.prototype) delete stringNames[name];
                            //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
                            for (var name in stringNames) {
                                results.push(name);
                            }
                            return results;
                        }
                    }
                    function Export(str) {
                        return new S(str);
                    }
                    ;
                    //attach exports to StringJSWrapper
                    Export.extendPrototype = extendPrototype;
                    Export.restorePrototype = restorePrototype;
                    Export.VERSION = VERSION;
                    Export.TMPL_OPEN = '{{';
                    Export.TMPL_CLOSE = '}}';
                    Export.ENTITIES = ENTITIES;
                    /*************************************
                     /* Exports
                     /*************************************/
                    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
                        module.exports = { S: Export };
                    } else {
                        if (typeof define === "function" && define.amd) {
                            define([], function () {
                                return Export;
                            });
                        } else {
                            window.S = Export;
                        }
                    }
                    /*************************************
                     /* 3rd Party Private Functions
                     /*************************************/
                    //from sugar.js
                    function multiArgs(args, fn) {
                        var result = [],
                            i;
                        for (i = 0; i < args.length; i++) {
                            result.push(args[i]);
                            if (fn) fn.call(args, args[i], i);
                        }
                        return result;
                    }
                    //from underscore.string
                    var escapeChars = {
                        lt: '<',
                        gt: '>',
                        quot: '"',
                        apos: "'",
                        amp: '&'
                    };
                    function escapeRegExp(s) {
                        // most part from https://github.com/skulpt/skulpt/blob/ecaf75e69c2e539eff124b2ab45df0b01eaf2295/src/str.js#L242
                        var c;
                        var i;
                        var ret = [];
                        var re = /^[A-Za-z0-9]+$/;
                        s = ensureString(s);
                        for (i = 0; i < s.length; ++i) {
                            c = s.charAt(i);
                            if (re.test(c)) {
                                ret.push(c);
                            } else {
                                if (c === "\\000") {
                                    ret.push("\\000");
                                } else {
                                    ret.push("\\" + c);
                                }
                            }
                        }
                        return ret.join("");
                    }
                    function ensureString(string) {
                        return string == null ? '' : '' + string;
                    }
                    //from underscore.string
                    var reversedEscapeChars = {};
                    for (var key in escapeChars) {
                        reversedEscapeChars[escapeChars[key]] = key;
                    }
                    ENTITIES = {
                        "amp": "&",
                        "gt": ">",
                        "lt": "<",
                        "quot": "\"",
                        "apos": "'",
                        "AElig": 198,
                        "Aacute": 193,
                        "Acirc": 194,
                        "Agrave": 192,
                        "Aring": 197,
                        "Atilde": 195,
                        "Auml": 196,
                        "Ccedil": 199,
                        "ETH": 208,
                        "Eacute": 201,
                        "Ecirc": 202,
                        "Egrave": 200,
                        "Euml": 203,
                        "Iacute": 205,
                        "Icirc": 206,
                        "Igrave": 204,
                        "Iuml": 207,
                        "Ntilde": 209,
                        "Oacute": 211,
                        "Ocirc": 212,
                        "Ograve": 210,
                        "Oslash": 216,
                        "Otilde": 213,
                        "Ouml": 214,
                        "THORN": 222,
                        "Uacute": 218,
                        "Ucirc": 219,
                        "Ugrave": 217,
                        "Uuml": 220,
                        "Yacute": 221,
                        "aacute": 225,
                        "acirc": 226,
                        "aelig": 230,
                        "agrave": 224,
                        "aring": 229,
                        "atilde": 227,
                        "auml": 228,
                        "ccedil": 231,
                        "eacute": 233,
                        "ecirc": 234,
                        "egrave": 232,
                        "eth": 240,
                        "euml": 235,
                        "iacute": 237,
                        "icirc": 238,
                        "igrave": 236,
                        "iuml": 239,
                        "ntilde": 241,
                        "oacute": 243,
                        "ocirc": 244,
                        "ograve": 242,
                        "oslash": 248,
                        "otilde": 245,
                        "ouml": 246,
                        "szlig": 223,
                        "thorn": 254,
                        "uacute": 250,
                        "ucirc": 251,
                        "ugrave": 249,
                        "uuml": 252,
                        "yacute": 253,
                        "yuml": 255,
                        "copy": 169,
                        "reg": 174,
                        "nbsp": 160,
                        "iexcl": 161,
                        "cent": 162,
                        "pound": 163,
                        "curren": 164,
                        "yen": 165,
                        "brvbar": 166,
                        "sect": 167,
                        "uml": 168,
                        "ordf": 170,
                        "laquo": 171,
                        "not": 172,
                        "shy": 173,
                        "macr": 175,
                        "deg": 176,
                        "plusmn": 177,
                        "sup1": 185,
                        "sup2": 178,
                        "sup3": 179,
                        "acute": 180,
                        "micro": 181,
                        "para": 182,
                        "middot": 183,
                        "cedil": 184,
                        "ordm": 186,
                        "raquo": 187,
                        "frac14": 188,
                        "frac12": 189,
                        "frac34": 190,
                        "iquest": 191,
                        "times": 215,
                        "divide": 247,
                        "OElig;": 338,
                        "oelig;": 339,
                        "Scaron;": 352,
                        "scaron;": 353,
                        "Yuml;": 376,
                        "fnof;": 402,
                        "circ;": 710,
                        "tilde;": 732,
                        "Alpha;": 913,
                        "Beta;": 914,
                        "Gamma;": 915,
                        "Delta;": 916,
                        "Epsilon;": 917,
                        "Zeta;": 918,
                        "Eta;": 919,
                        "Theta;": 920,
                        "Iota;": 921,
                        "Kappa;": 922,
                        "Lambda;": 923,
                        "Mu;": 924,
                        "Nu;": 925,
                        "Xi;": 926,
                        "Omicron;": 927,
                        "Pi;": 928,
                        "Rho;": 929,
                        "Sigma;": 931,
                        "Tau;": 932,
                        "Upsilon;": 933,
                        "Phi;": 934,
                        "Chi;": 935,
                        "Psi;": 936,
                        "Omega;": 937,
                        "alpha;": 945,
                        "beta;": 946,
                        "gamma;": 947,
                        "delta;": 948,
                        "epsilon;": 949,
                        "zeta;": 950,
                        "eta;": 951,
                        "theta;": 952,
                        "iota;": 953,
                        "kappa;": 954,
                        "lambda;": 955,
                        "mu;": 956,
                        "nu;": 957,
                        "xi;": 958,
                        "omicron;": 959,
                        "pi;": 960,
                        "rho;": 961,
                        "sigmaf;": 962,
                        "sigma;": 963,
                        "tau;": 964,
                        "upsilon;": 965,
                        "phi;": 966,
                        "chi;": 967,
                        "psi;": 968,
                        "omega;": 969,
                        "thetasym;": 977,
                        "upsih;": 978,
                        "piv;": 982,
                        "ensp;": 8194,
                        "emsp;": 8195,
                        "thinsp;": 8201,
                        "zwnj;": 8204,
                        "zwj;": 8205,
                        "lrm;": 8206,
                        "rlm;": 8207,
                        "ndash;": 8211,
                        "mdash;": 8212,
                        "lsquo;": 8216,
                        "rsquo;": 8217,
                        "sbquo;": 8218,
                        "ldquo;": 8220,
                        "rdquo;": 8221,
                        "bdquo;": 8222,
                        "dagger;": 8224,
                        "Dagger;": 8225,
                        "bull;": 8226,
                        "hellip;": 8230,
                        "permil;": 8240,
                        "prime;": 8242,
                        "Prime;": 8243,
                        "lsaquo;": 8249,
                        "rsaquo;": 8250,
                        "oline;": 8254,
                        "frasl;": 8260,
                        "euro;": 8364,
                        "image;": 8465,
                        "weierp;": 8472,
                        "real;": 8476,
                        "trade;": 8482,
                        "alefsym;": 8501,
                        "larr;": 8592,
                        "uarr;": 8593,
                        "rarr;": 8594,
                        "darr;": 8595,
                        "harr;": 8596,
                        "crarr;": 8629,
                        "lArr;": 8656,
                        "uArr;": 8657,
                        "rArr;": 8658,
                        "dArr;": 8659,
                        "hArr;": 8660,
                        "forall;": 8704,
                        "part;": 8706,
                        "exist;": 8707,
                        "empty;": 8709,
                        "nabla;": 8711,
                        "isin;": 8712,
                        "notin;": 8713,
                        "ni;": 8715,
                        "prod;": 8719,
                        "sum;": 8721,
                        "minus;": 8722,
                        "lowast;": 8727,
                        "radic;": 8730,
                        "prop;": 8733,
                        "infin;": 8734,
                        "ang;": 8736,
                        "and;": 8743,
                        "or;": 8744,
                        "cap;": 8745,
                        "cup;": 8746,
                        "int;": 8747,
                        "there4;": 8756,
                        "sim;": 8764,
                        "cong;": 8773,
                        "asymp;": 8776,
                        "ne;": 8800,
                        "equiv;": 8801,
                        "le;": 8804,
                        "ge;": 8805,
                        "sub;": 8834,
                        "sup;": 8835,
                        "nsub;": 8836,
                        "sube;": 8838,
                        "supe;": 8839,
                        "oplus;": 8853,
                        "otimes;": 8855,
                        "perp;": 8869,
                        "sdot;": 8901,
                        "lceil;": 8968,
                        "rceil;": 8969,
                        "lfloor;": 8970,
                        "rfloor;": 8971,
                        "lang;": 9001,
                        "rang;": 9002,
                        "loz;": 9674,
                        "spades;": 9824,
                        "clubs;": 9827,
                        "hearts;": 9829,
                        "diams;": 9830
                    };
                }.call(this);
            }, { "./_count": 1, "./_splitLeft": 2, "./_splitRight": 3 }] }, {}, [4])(4);
    });
    

    return module.exports;
});
System.register("src/utils/String.js", ["src/libs/String.js", "src/di.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var String_1, di_1;
    return {
        setters: [function (String_1_1) {
            String_1 = String_1_1;
        }, function (di_1_1) {
            di_1 = di_1_1;
        }],
        execute: function () {
            di_1.Injector.getInstance().registerServiceInstance("S", String_1.S);
            exports_1("S", String_1.S);
        }
    };
});

System.register("src/utils/DataOptions.js", ["src/di.js", "src/jquery.js", "src/utils/String.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, jquery_1, String_1;
    var DataOptions;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (String_1_1) {
            String_1 = String_1_1;
        }],
        execute: function () {
            DataOptions = function () {
                function DataOptions($, S) {
                    this.$ = $;
                    this.S = S;
                }
                DataOptions.prototype.getDataOptions = function (element, prefix, optPrefix, mode) {
                    if (optPrefix === void 0) {
                        optPrefix = "opt";
                    }
                    //extract data-_attributes with jquery data
                    var $element = this.$(element),
                        params = $element.data(),
                        parsedParams = {},
                        optPrefix = String_1.S(optPrefix + "-" + prefix).camelize().s,
                        mode = mode || $element.data("paramsMode");
                    //each param: data-prefix-my-param is prefixMyParam
                    for (var key in params) {
                        //find prefix
                        if (key.search(optPrefix) != -1) {
                            //remove prefix: prefixMyParam to myParam
                            var parsedKey = key.replace(optPrefix, "");
                            //some components require different nomenclatures
                            switch (mode) {
                                case DataOptions.EXTRACT_DATA_MODE.underscore:
                                    //myParam to my_param
                                    parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                                    break;
                                case DataOptions.EXTRACT_DATA_MODE.hypen:
                                    //myParam to my-param
                                    parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                                    break;
                                default:
                                    //myParam
                                    parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                                    break;
                            }
                            var parsed = params[key];
                            //try to parse to JSON
                            try {
                                parsed = JSON.parse(parsed);
                            } catch (e) {}
                            parsedParams[parsedKey] = parsed;
                        }
                    }
                    return parsedParams;
                };
                DataOptions.EXTRACT_DATA_MODE = {
                    underscore: "underscore",
                    hypen: "hypen",
                    camel: "camel"
                };
                DataOptions = __decorate([di_1.Service({
                    name: "DataOptions",
                    dependencies: [jquery_1.$, String_1.S]
                })], DataOptions);
                return DataOptions;
            }();
            exports_1("DataOptions", DataOptions);
        }
    };
});

/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
System.register("src/utils.js", ["src/utils/EventEmitterFactory.js", "src/utils/EventEmitter.js", "src/utils/String.js", "src/utils/DataOptions.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (EventEmitterFactory_1_1) {
            exports_1({
                "EventEmitterFactory": EventEmitterFactory_1_1["EventEmitterFactory"]
            });
        }, function (EventEmitter_1_1) {
            exports_1({
                "IEventHandler": EventEmitter_1_1["IEventHandler"],
                "EventEmitter": EventEmitter_1_1["EventEmitter"]
            });
        }, function (String_1_1) {
            exports_1({
                "S": String_1_1["S"]
            });
        }, function (DataOptions_1_1) {
            exports_1({
                "DataOptions": DataOptions_1_1["DataOptions"]
            });
        }],
        execute: function () {}
    };
});

System.registerDynamic('npm:process@0.11.9/browser.js', [], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
    return module.exports;
});
System.registerDynamic("npm:process@0.11.9.js", ["npm:process@0.11.9/browser.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.9/browser.js");
  return module.exports;
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.9.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.9.js');
  return module.exports;
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
  return module.exports;
});
System.registerDynamic('npm:bottlejs@1.5.0/dist/bottle.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var define,
      global = this || self,
      GLOBAL = global;
  (function (process) {
    ;
    (function (undefined) {
      'use strict';

      var id = 0;
      var slice = Array.prototype.slice;
      var getNested = function getNested(obj, prop) {
        var service = obj[prop];
        if (service === undefined && globalConfig.strict) {
          throw new Error('Bottle was unable to resolve a service.  `' + prop + '` is undefined.');
        }
        return service;
      };
      var getNestedBottle = function getNestedBottle(name) {
        return this.nested[name] || (this.nested[name] = Bottle.pop());
      };
      var getNestedService = function getNestedService(fullname) {
        return fullname.split('.').reduce(getNested, this);
      };
      var constant = function constant(name, value) {
        var parts = name.split('.');
        name = parts.pop();
        defineConstant.call(parts.reduce(setValueObject, this.container), name, value);
        return this;
      };
      var defineConstant = function defineConstant(name, value) {
        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: true,
          value: value,
          writable: false
        });
      };
      var decorator = function decorator(fullname, func) {
        var parts, name;
        if (typeof fullname === 'function') {
          func = fullname;
          fullname = '__global__';
        }
        parts = fullname.split('.');
        name = parts.shift();
        if (parts.length) {
          getNestedBottle.call(this, name).decorator(parts.join('.'), func);
        } else {
          if (!this.decorators[name]) {
            this.decorators[name] = [];
          }
          this.decorators[name].push(func);
        }
        return this;
      };
      var defer = function defer(func) {
        this.deferred.push(func);
        return this;
      };
      var digest = function digest(services) {
        return (services || []).map(getNestedService, this.container);
      };
      var factory = function factory(name, Factory) {
        return provider.call(this, name, function GenericProvider() {
          this.$get = Factory;
        });
      };
      var instanceFactory = function instanceFactory(name, Factory) {
        return factory.call(this, name, function GenericInstanceFactory(container) {
          return { instance: Factory.bind(Factory, container) };
        });
      };
      var byMethod = function byMethod(name) {
        return !/^\$(?:register|list)$|Provider$/.test(name);
      };
      var list = function list(container) {
        return Object.keys(container || this.container || {}).filter(byMethod);
      };
      var applyMiddleware = function applyMiddleware(middleware, name, instance, container) {
        var descriptor = {
          configurable: true,
          enumerable: true
        };
        if (middleware.length) {
          descriptor.get = function getWithMiddlewear() {
            var index = 0;
            var next = function nextMiddleware(err) {
              if (err) {
                throw err;
              }
              if (middleware[index]) {
                middleware[index++](instance, next);
              }
            };
            next();
            return instance;
          };
        } else {
          descriptor.value = instance;
          descriptor.writable = true;
        }
        Object.defineProperty(container, name, descriptor);
        return container[name];
      };
      var middleware = function middleware(fullname, func) {
        var parts, name;
        if (typeof fullname === 'function') {
          func = fullname;
          fullname = '__global__';
        }
        parts = fullname.split('.');
        name = parts.shift();
        if (parts.length) {
          getNestedBottle.call(this, name).middleware(parts.join('.'), func);
        } else {
          if (!this.middlewares[name]) {
            this.middlewares[name] = [];
          }
          this.middlewares[name].push(func);
        }
        return this;
      };
      var bottles = {};
      var pop = function pop(name) {
        var instance;
        if (name) {
          instance = bottles[name];
          if (!instance) {
            bottles[name] = instance = new Bottle();
            instance.constant('BOTTLE_NAME', name);
          }
          return instance;
        }
        return new Bottle();
      };
      var clear = function clear(name) {
        if (name) {
          delete bottles[name];
        } else {
          bottles = {};
        }
      };
      var reducer = function reducer(instance, func) {
        return func(instance);
      };
      var provider = function provider(fullname, Provider) {
        var parts, name;
        parts = fullname.split('.');
        if (this.providerMap[fullname] && parts.length === 1 && !this.container[fullname + 'Provider']) {
          return console.error(fullname + ' provider already instantiated.');
        }
        this.providerMap[fullname] = true;
        name = parts.shift();
        if (parts.length) {
          createSubProvider.call(this, name, Provider, parts);
          return this;
        }
        return createProvider.call(this, name, Provider);
      };
      var getWithGlobal = function getWithGlobal(collection, name) {
        return (collection[name] || []).concat(collection.__global__ || []);
      };
      var createProvider = function createProvider(name, Provider) {
        var providerName, properties, container, id, decorators, middlewares;
        id = this.id;
        container = this.container;
        decorators = this.decorators;
        middlewares = this.middlewares;
        providerName = name + 'Provider';
        properties = Object.create(null);
        properties[providerName] = {
          configurable: true,
          enumerable: true,
          get: function getProvider() {
            var instance = new Provider();
            delete container[providerName];
            container[providerName] = instance;
            return instance;
          }
        };
        properties[name] = {
          configurable: true,
          enumerable: true,
          get: function getService() {
            var provider = container[providerName];
            var instance;
            if (provider) {
              instance = getWithGlobal(decorators, name).reduce(reducer, provider.$get(container));
              delete container[providerName];
              delete container[name];
            }
            return instance === undefined ? instance : applyMiddleware(getWithGlobal(middlewares, name), name, instance, container);
          }
        };
        Object.defineProperties(container, properties);
        return this;
      };
      var createSubProvider = function createSubProvider(name, Provider, parts) {
        var bottle;
        bottle = getNestedBottle.call(this, name);
        this.factory(name, function SubProviderFactory() {
          return bottle.container;
        });
        return bottle.provider(parts.join('.'), Provider);
      };
      var register = function register(Obj) {
        var value = Obj.$value === undefined ? Obj : Obj.$value;
        return this[Obj.$type || 'service'].apply(this, [Obj.$name, value].concat(Obj.$inject || []));
      };
      var resolve = function resolve(data) {
        this.deferred.forEach(function deferredIterator(func) {
          func(data);
        });
        return this;
      };
      var service = function service(name, Service) {
        var deps = arguments.length > 2 ? slice.call(arguments, 2) : null;
        var bottle = this;
        return factory.call(this, name, function GenericFactory() {
          if (deps) {
            deps = deps.map(getNestedService, bottle.container);
            deps.unshift(Service);
            Service = Service.bind.apply(Service, deps);
          }
          return new Service();
        });
      };
      var value = function value(name, val) {
        var parts;
        parts = name.split('.');
        name = parts.pop();
        defineValue.call(parts.reduce(setValueObject, this.container), name, val);
        return this;
      };
      var setValueObject = function setValueObject(container, name) {
        var nestedContainer = container[name];
        if (!nestedContainer) {
          nestedContainer = {};
          defineValue.call(container, name, nestedContainer);
        }
        return nestedContainer;
      };
      var defineValue = function defineValue(name, val) {
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          value: val,
          writable: true
        });
      };
      var Bottle = function Bottle(name) {
        if (!(this instanceof Bottle)) {
          return Bottle.pop(name);
        }
        this.id = id++;
        this.decorators = {};
        this.middlewares = {};
        this.nested = {};
        this.providerMap = {};
        this.deferred = [];
        this.container = {
          $register: register.bind(this),
          $list: list.bind(this)
        };
      };
      Bottle.prototype = {
        constant: constant,
        decorator: decorator,
        defer: defer,
        digest: digest,
        factory: factory,
        instanceFactory: instanceFactory,
        list: list,
        middleware: middleware,
        provider: provider,
        register: register,
        resolve: resolve,
        service: service,
        value: value
      };
      Bottle.pop = pop;
      Bottle.clear = clear;
      Bottle.list = list;
      var globalConfig = Bottle.config = { strict: false };
      var objectTypes = {
        'function': true,
        'object': true
      };
      (function exportBottle(root) {
        var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
        var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
        var freeGlobal = objectTypes[typeof global] && global;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
          root = freeGlobal;
        }
        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
          root.Bottle = Bottle;
          define(function () {
            return Bottle;
          });
        } else if (freeExports && freeModule) {
          if (moduleExports) {
            (freeModule.exports = Bottle).Bottle = Bottle;
          } else {
            freeExports.Bottle = Bottle;
          }
        } else {
          root.Bottle = Bottle;
        }
      })(objectTypes[typeof window] && window || this);
    }).call(this);
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});
System.registerDynamic("npm:bottlejs@1.5.0.js", ["npm:bottlejs@1.5.0/dist/bottle.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:bottlejs@1.5.0/dist/bottle.js");
  return module.exports;
});
System.register("src/di/Errors.js", ["src/base/BaseError.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError_1;
    var HaztivityDependencyNotRegisteredError, HaztivityDependencyAlreadyRegistered, HaztivityDependencyOptionRequired, HaztivityDependencyHasItsOwnAsDependency, HaztivityDependencyAccessDenied, HaztivityDependencyNotValid;
    return {
        setters: [function (BaseError_1_1) {
            BaseError_1 = BaseError_1_1;
        }],
        execute: function () {
            /**
             * Error al intentar obtener una dependencia no registrada
             */
            HaztivityDependencyNotRegisteredError = function (_super) {
                __extends(HaztivityDependencyNotRegisteredError, _super);
                function HaztivityDependencyNotRegisteredError(dependency, target) {
                    _super.call(this, "HaztivityDependencyNotRegisteredError", target ? "could not inject " + dependency + " into " + target + " because is not registered" : dependency + " is not registered in the Injector.");
                }
                return HaztivityDependencyNotRegisteredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyNotRegisteredError", HaztivityDependencyNotRegisteredError);
            /**
             * Error al intentar registrar una dependencia ya registrada
             */
            HaztivityDependencyAlreadyRegistered = function (_super) {
                __extends(HaztivityDependencyAlreadyRegistered, _super);
                function HaztivityDependencyAlreadyRegistered(dependency) {
                    _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered");
                }
                return HaztivityDependencyAlreadyRegistered;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyAlreadyRegistered", HaztivityDependencyAlreadyRegistered);
            /**
             * Error al no indicarse un parámetro obligatorio
             */
            HaztivityDependencyOptionRequired = function (_super) {
                __extends(HaztivityDependencyOptionRequired, _super);
                function HaztivityDependencyOptionRequired(parameterName) {
                    _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required");
                }
                return HaztivityDependencyOptionRequired;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyOptionRequired", HaztivityDependencyOptionRequired);
            /**
             * Error al definir una clase como dependencia de ella misma
             */
            HaztivityDependencyHasItsOwnAsDependency = function (_super) {
                __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
                function HaztivityDependencyHasItsOwnAsDependency(dependency) {
                    _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency");
                }
                return HaztivityDependencyHasItsOwnAsDependency;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyHasItsOwnAsDependency", HaztivityDependencyHasItsOwnAsDependency);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyAccessDenied = function (_super) {
                __extends(HaztivityDependencyAccessDenied, _super);
                function HaztivityDependencyAccessDenied(target, dependency) {
                    _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency);
                }
                return HaztivityDependencyAccessDenied;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyAccessDenied", HaztivityDependencyAccessDenied);
            /**
             * Error al intentar inyectar una dependencia a la que no se tiene acceso
             */
            HaztivityDependencyNotValid = function (_super) {
                __extends(HaztivityDependencyNotValid, _super);
                function HaztivityDependencyNotValid(target, dependencies) {
                    _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.");
                }
                return HaztivityDependencyNotValid;
            }(BaseError_1.BaseError);
            exports_1("HaztivityDependencyNotValid", HaztivityDependencyNotValid);
        }
    };
});

System.register("src/di/Injector.js", ["npm:bottlejs@1.5.0.js", "src/di/Errors.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var bottlejs_1, Errors_1;
    var TYPES, Injector, InjectorService, InjectorRegisterService;
    return {
        setters: [function (bottlejs_1_1) {
            bottlejs_1 = bottlejs_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }],
        execute: function () {
            //Create readonly types
            exports_1("TYPES", TYPES = function () {
                function sealProperty(val) {
                    return {
                        writable: false,
                        configurable: false,
                        value: val
                    };
                    Object.freeze(val);
                }
                function registerType(types, name, allowAccess) {
                    var obj = {};
                    Object.defineProperties(obj, {
                        "name": sealProperty(name),
                        "allowAccess": sealProperty(allowAccess)
                    });
                    types[name] = obj;
                }
                var types = {};
                registerType(types, "Core", true);
                registerType(types, "CorePublic", true);
                registerType(types, "Module", ["Core", "CorePublic", "Service", "Page"]);
                registerType(types, "Service", ["CorePublic", "Service", "Module"]);
                registerType(types, "Sco", ["Core", "CorePublic", "Resource", "Component", "Service"]);
                registerType(types, "Resource", ["Service"]);
                registerType(types, "Component", ["CorePublic", "Service"]);
                registerType(types, "Page", ["Service"]);
                Object.freeze(types);
                return types;
            }());
            /**
             * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
             * @class
             */
            Injector = function () {
                /**
                 * Instancia el Inyector. Por defecto se genera un contenedor root
                 * @constructor
                 */
                function Injector() {
                    this._registers = new Map();
                    this._registersName = new Map();
                    this._root = new bottlejs_1.Bottle();
                }
                /**
                 * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
                 * @param {String}  name    Nombre registrado de la clase a comprobar
                 * @returns {boolean}
                 */
                Injector.prototype.exists = function (name) {
                    return this._registersName.has(name);
                };
                Injector.prototype._getInjectorRegister = function (key) {
                    var result;
                    if (typeof key == "string") {
                        result = this._registersName.get(key);
                    } else {
                        result = this._registers.get(key);
                    }
                    return result;
                };
                /**
                 * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
                 * @param {String|Object}  service    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
                 */
                Injector.prototype._getFromBottle = function (service) {
                    return this._root.container[service];
                };
                /**
                 * Obtiene el provider para una clase
                 * @param {String}  name        Nombre de la clase para la cual obtener el provider
                 * @returns {any}
                 * @private
                 */
                Injector.prototype._getProvider = function (name) {
                    return this._root.container[name + "Provider"];
                };
                /**
                 * Registra el nombre indicado para la dependencia
                 * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
                 * @param {String}                  name        Nombre a registrar
                 * @private
                 */
                Injector.prototype._setName = function (target, name) {
                    var save = target.prototype || target;
                    Object.defineProperty(save, "_injectorName", {
                        configurable: false,
                        writable: false,
                        value: name
                    });
                };
                /**
                 * Obtiene el nombre registrado para una dependencia
                 * @param {Function|Object}     target      Objeto en el cual buscar el nombre
                 * @returns {String}
                 * @private
                 */
                Injector.prototype._getName = function (target) {
                    return target.prototype ? target.prototype._injectorName : target._injectorName;
                };
                /**
                 * Registra el tipo para la dependencia
                 * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
                 * @param {String}                  type            Tipo a registrar
                 * @private
                 */
                Injector.prototype._setType = function (target, type) {
                    var save = target.prototype || target;
                    Object.defineProperty(save, "_injectorType", {
                        configurable: false,
                        writable: false,
                        value: type
                    });
                };
                /**
                 * Obtiene el tipo registrado para una dependencia
                 * @param {Function|Object}     target      Objeto en el cual buscar el tipo
                 * @returns {String}
                 * @private
                 */
                Injector.prototype._getType = function (target) {
                    return target.prototype ? target.prototype._injectorType : target._injectorType;
                };
                /**
                 * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
                 * @param {*}       target         Servicio para el cual obtener instancias de sus dependencias
                 * @param {*}       [dependencies]  Dependencias concretas a obtener. En caso de no indicarse se obtienen todas
                 * @returns {Array}
                 * @protected
                 */
                Injector.prototype._getFor = function (target, dependencies) {
                    var serviceInjectorRegister = this._getInjectorRegister(target),
                        resolvedDependencies = [],
                        serviceName = serviceInjectorRegister.name;
                    dependencies = dependencies || serviceInjectorRegister.dependencies;
                    //each dependency to resolve
                    for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
                        var dependencyToResolve = dependencies_1[_i];
                        //dependency must exists
                        if (dependencyToResolve != undefined) {
                            var dependencyToResolveInjectorRegister = this._getInjectorRegister(dependencyToResolve),
                                dependencyToResolveName = void 0;
                            if (dependencyToResolveInjectorRegister != undefined) {
                                dependencyToResolveName = dependencyToResolveInjectorRegister.name;
                                //try to get the provider
                                var serviceType = serviceInjectorRegister.type,
                                    dependencyType = dependencyToResolveInjectorRegister.type;
                                if (serviceType && dependencyType && (serviceType.allowAccess === true || serviceType.allowAccess.indexOf(dependencyType.name) !== -1)) {
                                    var dependency = this._getFromBottle(dependencyToResolveName);
                                    //If the dependency is the InjectorService, create de instance with the service
                                    //For more info see InjectorService
                                    if (dependencyToResolveName === "InjectorService") {
                                        dependency = dependency.instance(serviceInjectorRegister.service);
                                    }
                                    resolvedDependencies.push(dependency);
                                } else {
                                    throw new Errors_1.HaztivityDependencyAccessDenied(serviceName, dependencyToResolveName);
                                }
                            } else {
                                throw new Errors_1.HaztivityDependencyNotRegisteredError(dependencyToResolve);
                            }
                        } else {
                            throw new Errors_1.HaztivityDependencyNotValid(serviceName, dependencies);
                        }
                    }
                    return resolvedDependencies;
                };
                /**
                 * Registra un servicio
                 * @param {IInjectorType}   type            Tipo de elemento de haztivity
                 * @param {String}          name            Nombre del servicio. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @example
                 * class MyService{
                 *
                 * }
                 * let myServiceDependencies = [
                 *      "SomeDependency"
                 * ]
                 * injector._registerService("MyService",MyService,myServiceDependencies,(service,dependencies,resolvedDependencies)=>{
                 *      let instance = new service(...resolvedDependencies);
                 *      instance.doSomething();
                 *      return instance;
                 * })
                 * @protected
                 * @throws HaztivityDependencyHasItsOwnAsDependency
                 * @throws HaztivityDependencyAlreadyRegistered
                 * @throws HaztivityDependencyOptionRequired
                 */
                Injector.prototype._registerService = function (type, name, service, dependencies, factory) {
                    var _this = this;
                    if (this._validateName(name, dependencies)) {
                        //store type in the constructor to manage permisions
                        var injectorRegister = {
                            name: name,
                            type: type,
                            dependencies: dependencies,
                            service: service
                        };
                        this._addRegister(injectorRegister);
                        var bottleInstance = this._root.factory(name, function (container) {
                            var injectorRegister = _this._getInjectorRegister(name),
                                service = injectorRegister.service;
                            var resolvedDependencies = _this._getFor(service);
                            //if a custom factory function is provided
                            if (typeof factory === "function") {
                                return factory.call(null, service, injectorRegister.dependencies, resolvedDependencies);
                            } else {
                                return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                            }
                        });
                    }
                };
                Injector.prototype._addRegister = function (register) {
                    this._registers.set(register.service, register);
                    this._registersName.set(register.name, register);
                };
                /**
                 * Registra dependencias en una clase
                 * @param {*}                   service         Servicio en el cual registrar las dependencias
                 * @param {String[]}            dependencies    Dependencias a registrar
                 * @private
                 */
                Injector.prototype.registerDependencies = function (service, dependencies) {
                    var registeredDependencies = this._getRegisteredDependencies(service);
                    //if the element already has dependencies, concat
                    dependencies = $.unique(dependencies.concat(registeredDependencies));
                    service.prototype.$inject = dependencies;
                    return dependencies;
                };
                /**
                 * Recupera las dependencias registradas en una clase
                 * @param {*}   service     Servicio del cual recuperar las dependencias
                 * @returns {Array<string>}
                 * @private
                 */
                Injector.prototype._getRegisteredDependencies = function (service) {
                    return service.prototype.$inject || [];
                };
                /**
                 * Registra una clase instanciable generando un factory. Funciona de forma similar a _registerService con la diferencia de que la función factory indicada se ejecutará cada vez
                 * que se solicite la dependencia generando una instancia nueva de la clase.
                 * @param {IInjectorType}   type            Tipo de elemento de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @example
                 * class MyClass{
                 *
                 * }
                 * let myClassDependencies = [
                 *      "SomeDependency"
                 * ]
                 * injector._registerTransient("MyClass",MyClass,myClassDependencies,(service,dependencies,resolvedDependencies)=>{
                 *      let instance = new service(...resolvedDependencies);
                 *      instance.doSomething();
                 *      return instance;
                 * })
                 * @protected
                 * @throws HaztivityDependencyHasItsOwnAsDependency
                 * @throws HaztivityDependencyAlreadyRegistered
                 * @throws HaztivityDependencyOptionRequired
                 */
                Injector.prototype._registerTransient = function (type, name, service, dependencies, factory) {
                    if (this._validateName(name, dependencies)) {
                        var injectorRegister = {
                            name: name,
                            type: type,
                            dependencies: dependencies,
                            service: service
                        };
                        this._addRegister(injectorRegister);
                        var that_1 = this;
                        //create factory func
                        var GenericFactory = function (container, params) {
                            var injectorRegister = that_1._getInjectorRegister(name),
                                service = injectorRegister.service,
                                dependenciesToInject = injectorRegister.dependencies,
                                resolvedDependencies = that_1._getFor(service);
                            //if a custom factory function is provided
                            if (typeof factory === "function") {
                                return factory.call(null, service, dependenciesToInject, resolvedDependencies, params);
                            } else {
                                return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                            }
                        };
                        this._root.instanceFactory(name, GenericFactory);
                    }
                };
                /**
                 * Valida la disponibilidad de un nombre y las dependencias. El nombre no debe estar registrado y el propio nombre no puede estar registrado como una dependencia
                 * @param {String}      name                Nombre a validar
                 * @param {Stirng[]}    dependencies        Dependencias
                 * @returns {boolean}
                 * @protected
                 * @throws HaztivityDependencyHasItsOwnAsDependency
                 * @throws HaztivityDependencyAlreadyRegistered
                 * @throws HaztivityDependencyOptionRequired
                 */
                Injector.prototype._validateName = function (name, dependencies) {
                    if (!!name) {
                        if (!this.exists(name)) {
                            if (dependencies.indexOf(name) === -1) {
                                return true;
                            } else {
                                throw new Errors_1.HaztivityDependencyHasItsOwnAsDependency(name);
                            }
                        } else {
                            throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
                        }
                    } else {
                        throw new Errors_1.HaztivityDependencyOptionRequired("name");
                    }
                };
                /**
                 * Registra un servicio de tipo Service de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerService = function (name, service, dependencies, factory) {
                    this._registerService(TYPES.Service, name, service, dependencies, factory);
                };
                /**
                 * Registra un servicio de tipo Service de haztivity instanciable.
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerServiceTransient = function (name, service, dependencies, factory) {
                    this._registerTransient(TYPES.Service, name, service, dependencies, factory);
                };
                /**
                 * Registra una instancia. No resuelve dependencias.
                 * @param {String}          name            Nombre del servicio.
                 * @param {*}               instance        Servicio a registar
                 * @example
                 * injector.registerServiceInstance("$",$);
                 */
                Injector.prototype.registerServiceInstance = function (name, instance) {
                    var dependencies = [];
                    if (this._validateName(name, dependencies)) {
                        var injectorRegister = {
                            name: name,
                            type: TYPES.Service,
                            dependencies: dependencies,
                            service: instance
                        };
                        this._addRegister(injectorRegister);
                        this._root.constant(name, instance);
                    } else {
                        throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
                    }
                };
                /**
                 * Registra un servicio de tipo Core de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerCore = function (name, service, dependencies, factory) {
                    this._registerService(TYPES.Core, name, service, dependencies, factory);
                };
                /**
                 * Registra una clase de tipo Core de haztivity instanciable
                 * @param {String}              name            Nombre con el cual registrar la clase
                 * @param {*}                   Class          Clase a registrar
                 * @param {String[]}            dependencies    Dependencias de la clase a registrar
                 * @param {Function}            [factory]       Función que aplique la lógica de instanciación
                 * @see _registerTransient
                 */
                Injector.prototype.registerCoreTransient = function (name, Class, dependencies, factory) {
                    this._registerTransient(TYPES.Core, name, Class, dependencies, factory);
                };
                /**
                 * Registra un servicio de tipo CorePublic de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerCorePublic = function (name, service, dependencies, factory) {
                    this._registerService(TYPES.CorePublic, name, service, dependencies, factory);
                };
                /**
                 * Registra una clase de tipo CorePublic de haztivity instanciable
                 * @param {String}              name            Nombre con el cual registrar la clase
                 * @param {*}                   Class           Clase a registrar
                 * @param {String[]}            dependencies    Dependencias de la clase a registrar
                 * @param {Function}            [factory]       Función que aplique la lógica de instanciación
                 * @see _registerTransient
                 */
                Injector.prototype.registerCorePublicTransient = function (name, Class, dependencies, factory) {
                    this._registerTransient(TYPES.CorePublic, name, Class, dependencies, factory);
                };
                /**
                 * Registra un servicio de tipo Sco de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerSco = function (name, service, dependencies, factory) {
                    this._registerTransient(TYPES.Sco, name, service, dependencies, factory);
                };
                /**
                 * Registra un servicio de tipo Module de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerModule = function (name, service, dependencies, factory) {
                    this._registerService(TYPES.Module, name, service, dependencies, factory);
                };
                /**
                 * Registra un servicio de tipo Component de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerService
                 * @see TYPES
                 */
                Injector.prototype.registerComponent = function (name, service, dependencies, factory) {
                    if (service._componentName == undefined) {
                        service._componentName = name;
                    }
                    this._registerService(TYPES.Component, name, service, dependencies, factory);
                };
                /**
                 * Registra una clase de tipo Page de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerTransient
                 * @see TYPES
                 */
                Injector.prototype.registerPage = function (name, service, dependencies, factory) {
                    this._registerTransient(TYPES.Page, name, service, dependencies, factory);
                };
                /**
                 * Registra una clase de tipo Resource de haztivity
                 * @param {String}          name            Nombre de la dependencia. Debe ser único
                 * @param {*}               service         Clase a registrar
                 * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
                 * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
                 * @see _registerTransient
                 * @see TYPES
                 */
                Injector.prototype.registerResource = function (name, service, dependencies, factory) {
                    if (service._resourceName == undefined) {
                        service._resourceName = name;
                    }
                    this._registerTransient(TYPES.Resource, name, service, dependencies, factory);
                };
                /**
                 * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
                 * Si no se indica target se obtiene una instancia de InjectorRegisterService
                 * @param   {*}         [target]            Target para el cual obtener el servicio
                 * @returns {Injector}
                 * @see InjectorService
                 * @see InjectorRegisterService
                 */
                Injector.getInstance = function (target) {
                    var toReturn;
                    if (!Injector._instance) {
                        Injector._instance = new Injector();
                        Injector._registerInstance = new InjectorRegisterService(Injector._instance);
                    }
                    //The injector has a internal permission resolver, this resolver requires an haztivity type to work because each type has access to different dependencies.
                    //To get the InjectorService that could get dependencies is required tell what type of element is requiring the dependency, to prevent that anyone could get any dependency, is necessary pass the element that want to get dependencies
                    if (target) {
                        toReturn = new InjectorService(Injector._instance, target);
                    } else {
                        toReturn = Injector._registerInstance;
                    }
                    return toReturn;
                };
                return Injector;
            }();
            exports_1("Injector", Injector);
            InjectorService = function () {
                function InjectorService(injector, target) {
                    this.get = function (service) {
                        var result;
                        if (Array.isArray(name)) {
                            result = injector._getFor(target, service);
                        } else {
                            result = injector._getFor(target, [service]);
                            if (result.length > 0) {
                                result = result[0];
                            }
                        }
                        return result;
                    };
                    this.exists = injector.exists.bind(injector);
                }
                /**
                 * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
                 * @param {String}  name    Nombre registrado de la clase a comprobar
                 * @returns {boolean}
                 */
                InjectorService.prototype.exists = function (name) {
                    return undefined;
                };
                /**
                 * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
                 * @param {String}  name    Nombre registrado de la clase a obtener
                 */
                InjectorService.prototype.get = function (name) {};
                return InjectorService;
            }();
            exports_1("InjectorService", InjectorService);
            //Map dynamically the methods
            InjectorRegisterService = function () {
                function InjectorRegisterService(injector) {
                    var publish = ["registerService", "registerServiceTransient", "registerCore", "registerCoreTransient", "registerCorePublic", "registerCorePublicTransient", "registerSco", "registerModule", "registerComponent", "registerServiceInstance", "registerPage", "registerResource", "registerDependencies"];
                    for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
                        var method = publish_1[_i];
                        this[method] = injector[method].bind(injector);
                    }
                }
                return InjectorRegisterService;
            }();
            exports_1("InjectorRegisterService", InjectorRegisterService);
            //Register Injector as a instantiable service.
            Injector.getInstance().registerServiceTransient("InjectorService", InjectorService, [], function (service, dependencies, resolvedDependencies, requester) {
                return Injector.getInstance(requester);
            });
        }
    };
});

System.register("src/di/decorators.js", ["src/di/Injector.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Injector_1;
    var injectorInstance;
    /**
     * Decorador para registrar una clase como Core.
     * Si se indica el parámetro public se registrará la clase como CorePublic, en caso contrario como Core
     * Si se indica el parámetro instantiable se registrará la clase como transient, en caso contrario como service
     * @param {ICoreParams}     params
     * @static
     * @function
     */
    function Core(params) {
        return function (target) {
            if (params.public) {
                if (params.instantiable) {
                    injectorInstance.registerCorePublicTransient(params.name, target, params.dependencies, params.factory);
                } else {
                    injectorInstance.registerCorePublic(params.name, target, params.dependencies, params.factory);
                }
            } else {
                if (params.instantiable) {
                    injectorInstance.registerCoreTransient(params.name, target, params.dependencies, params.factory);
                } else {
                    injectorInstance.registerCore(params.name, target, params.dependencies, params.factory);
                }
            }
        };
    }
    exports_1("Core", Core);
    /**
     * Decorador para registrar una clase como Module
     * @param {IModuleParams}     params
     * @static
     * @function
     */
    function Module(params) {
        return function (target) {
            injectorInstance.registerModule(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Module", Module);
    /**
     * Decorador para registrar una clase como Service
     * @param {IServiceParams}     params
     * @static
     * @function
     */
    function Service(params) {
        return function (target) {
            injectorInstance.registerService(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Service", Service);
    /**
     * Decorador para registrar una clase como ServiceInstance
     * @param {IServiceInstanceParams}     params
     * @static
     * @function
     */
    function ServiceInstance(params) {
        return function (target) {
            injectorInstance.registerServiceInstance(params.name, params.instance);
        };
    }
    exports_1("ServiceInstance", ServiceInstance);
    /**
     * Decorador para registrar una clase como Sco
     * @param {IScoParams}     params
     * @static
     * @function
     */
    function Sco(params) {
        return function (target) {
            injectorInstance.registerSco(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Sco", Sco);
    /**
     * Decorador para registrar una clase como Page
     * @param {IPageParams}     params
     * @static
     * @function
     */
    function Page(params) {
        return function (target) {
            injectorInstance.registerPage(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Page", Page);
    /**
     * Decorador para registrar una clase como Recurso
     * @param {IResourceParams}     params
     * @static
     * @function
     */
    function Resource(params) {
        return function (target) {
            injectorInstance.registerResource(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Resource", Resource);
    /**
     * Decorador para registrar una clase como Recurso
     * @param {IResourceParams}     params
     * @static
     * @function
     */
    function Component(params) {
        return function (target) {
            injectorInstance.registerComponent(params.name, target, params.dependencies, params.factory);
        };
    }
    exports_1("Component", Component);
    /**
     * Decorador para registrar las dependencias sin registrar la clase como inyectable
     * @param {{dependencies:any[]}}     params
     * @static
     * @function
     */
    function Dependencies(params) {
        return function (target) {
            injectorInstance.registerDependencies(target, params.dependencies);
        };
    }
    exports_1("Dependencies", Dependencies);
    return {
        setters: [function (Injector_1_1) {
            Injector_1 = Injector_1_1;
        }],
        execute: function () {
            injectorInstance = Injector_1.Injector.getInstance();
        }
    };
});

System.register("src/di.js", ["src/di/Injector.js", "src/di/decorators.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'Injector': true,
        'TYPES': true,
        'IInjectorType': true,
        'InjectorRegisterService': true,
        'IInjectorRegisterService': true,
        'InjectorService': true,
        'IInjectorService': true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [function (Injector_1_1) {
            exports_1({
                "Injector": Injector_1_1["Injector"],
                "TYPES": Injector_1_1["TYPES"],
                "IInjectorType": Injector_1_1["IInjectorType"],
                "InjectorRegisterService": Injector_1_1["InjectorRegisterService"],
                "IInjectorRegisterService": Injector_1_1["IInjectorRegisterService"],
                "InjectorService": Injector_1_1["InjectorService"],
                "IInjectorService": Injector_1_1["IInjectorService"]
            });
        }, function (decorators_1_1) {
            exportStar_1(decorators_1_1);
        }],
        execute: function () {}
    };
});

(function() {
var define = System.amdDefine;
(function(global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  "use strict";
  var arr = [];
  var document = window.document;
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};
  function DOMEval(code, doc) {
    doc = doc || document;
    var script = doc.createElement("script");
    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
  var version = "3.1.1",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      if (num == null) {
        return slice.call(this);
      }
      return num < 0 ? this[num + this.length] : this[num];
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var type = jQuery.type(obj);
      return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
    },
    isPlainObject: function(obj) {
      var proto,
          Ctor;
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }
      proto = getProto(obj);
      if (!proto) {
        return true;
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      DOMEval(code);
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function(ch, asCodePoint) {
          if (asCodePoint) {
            if (ch === "\0") {
              return "\uFFFD";
            }
            return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
          }
          return "\\" + ch;
        },
        unloadHandler = function() {
          setDocument();
        },
        disabledAncestor = addCombinator(function(elem) {
          return elem.disabled === true && ("form" in elem || "label" in elem);
        }, {
          dir: "parentNode",
          next: "legend"
        });
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rcssescape, fcssescape);
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = "#" + nid + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var el = document.createElement("fieldset");
      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        el = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createDisabledPseudo(disabled) {
      return function(elem) {
        if ("form" in elem) {
          if (elem.parentNode && elem.disabled === false) {
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            return elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
          }
          return elem.disabled === disabled;
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        }
        return false;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false);
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(el) {
        el.className = "i";
        return !el.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
                i,
                elems,
                elem = context.getElementById(id);
            if (elem) {
              node = elem.getAttributeNode("id");
              if (node && node.value === id) {
                return [elem];
              }
              elems = context.getElementsByName(id);
              i = 0;
              while ((elem = elems[i++])) {
                node = elem.getAttributeNode("id");
                if (node && node.value === id) {
                  return [elem];
                }
              }
            }
            return [];
          }
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(el) {
          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D");
          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          docElem.appendChild(el).disabled = true;
          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(el) {
          support.disconnectedMatch = matches.call(el, "*");
          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.escape = function(sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": createDisabledPseudo(false),
        "disabled": createDisabledPseudo(true),
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
        return false;
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[key] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(el) {
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    });
    if (!assert(function(el) {
      el.innerHTML = "<a href='#'></a>";
      return el.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(el) {
      el.innerHTML = "<input/>";
      el.firstChild.setAttribute("value", "");
      return el.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(el) {
      return el.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function(elem) {
        return (indexOf.call(qualifier, elem) > -1) !== not;
      });
    }
    if (risSimple.test(qualifier)) {
      return jQuery.filter(qualifier, elements, not);
    }
    qualifier = jQuery.filter(qualifier, elements);
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }
    return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          ret,
          len = this.length,
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      ret = this.pushStack([]);
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem) {
                this[0] = elem;
                this.length = 1;
              }
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors);
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  function Identity(v) {
    return v;
  }
  function Thrower(ex) {
    throw ex;
  }
  function adoptValue(value, resolve, reject) {
    var method;
    try {
      if (value && jQuery.isFunction((method = value.promise))) {
        method.call(value).done(resolve).fail(reject);
      } else if (value && jQuery.isFunction((method = value.then))) {
        method.call(value, resolve, reject);
      } else {
        resolve.call(undefined, value);
      }
    } catch (value) {
      reject.call(undefined, value);
    }
  }
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },
            pipe: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred, handler, special) {
                return function() {
                  var that = this,
                      args = arguments,
                      mightThrow = function() {
                        var returned,
                            then;
                        if (depth < maxDepth) {
                          return;
                        }
                        returned = handler.apply(that, args);
                        if (returned === deferred.promise()) {
                          throw new TypeError("Thenable self-resolution");
                        }
                        then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                        if (jQuery.isFunction(then)) {
                          if (special) {
                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                          } else {
                            maxDepth++;
                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                          }
                        } else {
                          if (handler !== Identity) {
                            that = undefined;
                            args = [returned];
                          }
                          (special || deferred.resolveWith)(that, args);
                        }
                      },
                      process = special ? mightThrow : function() {
                        try {
                          mightThrow();
                        } catch (e) {
                          if (jQuery.Deferred.exceptionHook) {
                            jQuery.Deferred.exceptionHook(e, process.stackTrace);
                          }
                          if (depth + 1 >= maxDepth) {
                            if (handler !== Thrower) {
                              that = undefined;
                              args = [e];
                            }
                            deferred.rejectWith(that, args);
                          }
                        }
                      };
                  if (depth) {
                    process();
                  } else {
                    if (jQuery.Deferred.getStackHook) {
                      process.stackTrace = jQuery.Deferred.getStackHook();
                    }
                    window.setTimeout(process);
                  }
                };
              }
              return jQuery.Deferred(function(newDefer) {
                tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));
                tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[5];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[3 - i][2].disable, tuples[0][2].lock);
        }
        list.add(tuple[3].fire);
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(singleValue) {
      var remaining = arguments.length,
          i = remaining,
          resolveContexts = Array(i),
          resolveValues = slice.call(arguments),
          master = jQuery.Deferred(),
          updateFunc = function(i) {
            return function(value) {
              resolveContexts[i] = this;
              resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!(--remaining)) {
                master.resolveWith(resolveContexts, resolveValues);
              }
            };
          };
      if (remaining <= 1) {
        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);
        if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
          return master.then();
        }
      }
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), master.reject);
      }
      return master.promise();
    }
  });
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  jQuery.Deferred.exceptionHook = function(error, stack) {
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };
  jQuery.readyException = function(error) {
    window.setTimeout(function() {
      throw error;
    });
  };
  var readyList = jQuery.Deferred();
  jQuery.fn.ready = function(fn) {
    readyList.then(fn).catch(function(error) {
      jQuery.readyException(error);
    });
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then;
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    window.setTimeout(jQuery.ready);
  } else {
    document.addEventListener("DOMContentLoaded", completed);
    window.addEventListener("load", completed);
  }
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    if (chainable) {
      return elems;
    }
    if (bulk) {
      return fn.call(elems);
    }
    return len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    cache: function(owner) {
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[jQuery.camelCase(data)] = value;
      } else {
        for (prop in data) {
          cache[jQuery.camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
    },
    access: function(owner, key, value) {
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        return this.get(owner, key);
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key !== undefined) {
        if (jQuery.isArray(key)) {
          key = key.map(jQuery.camelCase);
        } else {
          key = jQuery.camelCase(key);
          key = key in cache ? [key] : (key.match(rnothtmlwhite) || []);
        }
        i = key.length;
        while (i--) {
          delete cache[key[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function getData(data) {
    if (data === "true") {
      return true;
    }
    if (data === "false") {
      return false;
    }
    if (data === "null") {
      return null;
    }
    if (data === +data + "") {
      return +data;
    }
    if (rbrace.test(data)) {
      return JSON.parse(data);
    }
    return data;
  }
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, key);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        this.each(function() {
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHiddenWithinTree = function(elem, el) {
    elem = el || elem;
    return elem.style.display === "none" || elem.style.display === "" && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var defaultDisplayMap = {};
  function getDefaultDisplay(elem) {
    var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];
    if (display) {
      return display;
    }
    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);
    if (display === "none") {
      display = "block";
    }
    defaultDisplayMap[nodeName] = display;
    return display;
  }
  function showHide(elements, show) {
    var display,
        elem,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      display = elem.style.display;
      if (show) {
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;
          if (!values[index]) {
            elem.style.display = "";
          }
        }
        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none";
          dataPriv.set(elem, "display", display);
        }
      }
    }
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret;
    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }
    if (tag === undefined || tag && jQuery.nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }
    return ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var documentElement = document.documentElement;
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(nativeEvent) {
      var event = jQuery.event.fix(nativeEvent);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue,
          args = new Array(arguments.length),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          handleObj,
          sel,
          matchedHandlers,
          matchedSelectors,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      }
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    addProp: function(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: jQuery.isFunction(hook) ? function() {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function() {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function(originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
      this.target = (src.target && src.target.nodeType === 3) ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: function(event) {
      var button = event.button;
      if (event.which == null && rkeyEvent.test(event.type)) {
        return event.charCode != null ? event.charCode : event.keyCode;
      }
      if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
        if (button & 1) {
          return 1;
        }
        if (button & 2) {
          return 3;
        }
        if (button & 4) {
          return 2;
        }
        return 0;
      }
      return event.which;
    }
  }, jQuery.event.addProp);
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    if (jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return elem.getElementsByTagName("tbody")[0] || elem;
    }
    return elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), doc);
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  (function() {
    function computeStyleTests() {
      if (!div) {
        return;
      }
      div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
      div = null;
    }
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        computeStyleTests();
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        computeStyleTests();
        return reliableMarginLeftVal;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i,
        val = 0;
    if (extra === (isBorderBox ? "border" : "content")) {
      i = 4;
    } else {
      i = name === "width" ? 1 : 0;
    }
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var val,
        valueIsBorderBox = true,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (elem.getClientRects().length) {
      val = elem.getBoundingClientRect()[name];
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }});
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function raf() {
    if (timerId) {
      window.requestAnimationFrame(raf);
      jQuery.fx.tick();
    }
  }
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        hooks,
        oldfire,
        propTween,
        restoreDisplay,
        display,
        isBox = "width" in props || "height" in props,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHiddenWithinTree(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }
    propTween = !jQuery.isEmptyObject(props);
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    }
    if (isBox && elem.nodeType === 1) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }
      display = jQuery.css(elem, "display");
      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      }
      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          if (!propTween) {
            anim.done(function() {
              style.display = restoreDisplay;
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }
          style.display = "inline-block";
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    propTween = false;
    for (prop in orig) {
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {display: restoreDisplay});
        }
        if (toggle) {
          dataShow.hidden = !hidden;
        }
        if (hidden) {
          showHide([elem], true);
        }
        anim.done(function() {
          if (!hidden) {
            showHide([elem]);
          }
          dataPriv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      }
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    if (jQuery.fx.off || document.hidden) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    }
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    if (window.cancelAnimationFrame) {
      window.cancelAnimationFrame(timerId);
    } else {
      window.clearInterval(timerId);
    }
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          i = 0,
          attrNames = value && value.match(rnothtmlwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle,
          lowercaseName = name.toLowerCase();
      if (!isXML) {
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          if (tabindex) {
            return parseInt(tabindex, 10);
          }
          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }
          return -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnothtmlwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnothtmlwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnothtmlwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          }
          return ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : stripAndCollapse(jQuery.text(elem));
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;
          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          }
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, valueOrFunction) {
          var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        };
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        if (val == null) {
          return null;
        }
        if (jQuery.isArray(val)) {
          return jQuery.map(val, function(val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }
        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  var r20 = /%20/g,
      rhash = /#.*$/,
      rantiCache = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": JSON.parse,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          completed,
          fireGlobals,
          i,
          uncached,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (completed) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return completed ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              if (completed == null) {
                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (completed == null) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (completed) {
                  jqXHR.always(map[jqXHR.status]);
                } else {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR);
      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (completed) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url.replace(rhash, "");
      if (!s.hasContent) {
        uncached = s.url.slice(cacheURL.length);
        if (s.data) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
        }
        s.url = cacheURL + uncached;
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (completed) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (completed) {
            throw e;
          }
          done(-1, e);
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (completed) {
          return;
        }
        completed = true;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (this[0]) {
        if (jQuery.isFunction(html)) {
          html = html.call(this[0]);
        }
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function(selector) {
      this.parent(selector).not("body").each(function() {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });
  jQuery.expr.pseudos.hidden = function(elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };
  jQuery.expr.pseudos.visible = function(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxPrefilter(function(s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    var base,
        parsed,
        scripts;
    if (!context) {
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument("");
        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }
    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  jQuery.fn.load = function(url, params, callback) {
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.pseudos.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          rect,
          doc,
          elem = this[0];
      if (!elem) {
        return;
      }
      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      }
      rect = elem.getBoundingClientRect();
      if (rect.width || rect.height) {
        doc = elem.ownerDocument;
        win = getWindow(doc);
        docElem = doc.documentElement;
        return {
          top: rect.top + win.pageYOffset - docElem.clientTop,
          left: rect.left + win.pageXOffset - docElem.clientLeft
        };
      }
      return rect;
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset = {
          top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
          left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
        };
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  });
  jQuery.parseJSON = JSON.parse;
  if (typeof define === "function" && define.amd) {
    define("npm:jquery@3.1.1/dist/jquery.js", [], function() {
      return jQuery;
    }) && define("jquery", ["npm:jquery@3.1.1/dist/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});

})();
(function() {
var define = System.amdDefine;
define("npm:jquery@3.1.1.js", ["npm:jquery@3.1.1/dist/jquery.js"], function(main) {
  return main;
});

})();
System.register("src/jquery.js", ["src/di.js", "npm:jquery@3.1.1.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }],
        execute: function () {
            di_1.Injector.getInstance().registerServiceInstance("$", jquery_1.default);
            exports_1("$", jquery_1.default);
        }
    };
});

System.registerDynamic("npm:loglevel@1.4.1/lib/loglevel.js", [], true, function ($__require, exports, module) {
    /* */
    "format cjs";
    /*
    * loglevel - https://github.com/pimterry/loglevel
    *
    * Copyright (c) 2013 Tim Perry
    * Licensed under the MIT license.
    */

    var define,
        global = this || self,
        GLOBAL = global;
    (function (root, definition) {
        "use strict";

        if (typeof define === 'function' && define.amd) {
            define(definition);
        } else if (typeof module === 'object' && module.exports) {
            module.exports = definition();
        } else {
            root.log = definition();
        }
    })(this, function () {
        "use strict";

        var noop = function () {};
        var undefinedType = "undefined";

        function realMethod(methodName) {
            if (typeof console === undefinedType) {
                return false; // We can't build a real method without a console to log to
            } else if (console[methodName] !== undefined) {
                return bindMethod(console, methodName);
            } else if (console.log !== undefined) {
                return bindMethod(console, 'log');
            } else {
                return noop;
            }
        }

        function bindMethod(obj, methodName) {
            var method = obj[methodName];
            if (typeof method.bind === 'function') {
                return method.bind(obj);
            } else {
                try {
                    return Function.prototype.bind.call(method, obj);
                } catch (e) {
                    // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                    return function () {
                        return Function.prototype.apply.apply(method, [obj, arguments]);
                    };
                }
            }
        }

        // these private functions always need `this` to be set properly

        function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
            return function () {
                if (typeof console !== undefinedType) {
                    replaceLoggingMethods.call(this, level, loggerName);
                    this[methodName].apply(this, arguments);
                }
            };
        }

        function replaceLoggingMethods(level, loggerName) {
            /*jshint validthis:true */
            for (var i = 0; i < logMethods.length; i++) {
                var methodName = logMethods[i];
                this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
            }
        }

        function defaultMethodFactory(methodName, level, loggerName) {
            /*jshint validthis:true */
            return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
        }

        var logMethods = ["trace", "debug", "info", "warn", "error"];

        function Logger(name, defaultLevel, factory) {
            var self = this;
            var currentLevel;
            var storageKey = "loglevel";
            if (name) {
                storageKey += ":" + name;
            }

            function persistLevelIfPossible(levelNum) {
                var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

                // Use localStorage if available
                try {
                    window.localStorage[storageKey] = levelName;
                    return;
                } catch (ignore) {}

                // Use session cookie as fallback
                try {
                    window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
                } catch (ignore) {}
            }

            function getPersistedLevel() {
                var storedLevel;

                try {
                    storedLevel = window.localStorage[storageKey];
                } catch (ignore) {}

                if (typeof storedLevel === undefinedType) {
                    try {
                        var cookie = window.document.cookie;
                        var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
                        if (location) {
                            storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                        }
                    } catch (ignore) {}
                }

                // If the stored level is not valid, treat it as if nothing was stored.
                if (self.levels[storedLevel] === undefined) {
                    storedLevel = undefined;
                }

                return storedLevel;
            }

            /*
             *
             * Public API
             *
             */

            self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
                "ERROR": 4, "SILENT": 5 };

            self.methodFactory = factory || defaultMethodFactory;

            self.getLevel = function () {
                return currentLevel;
            };

            self.setLevel = function (level, persist) {
                if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
                    level = self.levels[level.toUpperCase()];
                }
                if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                    currentLevel = level;
                    if (persist !== false) {
                        // defaults to true
                        persistLevelIfPossible(level);
                    }
                    replaceLoggingMethods.call(self, level, name);
                    if (typeof console === undefinedType && level < self.levels.SILENT) {
                        return "No console available for logging";
                    }
                } else {
                    throw "log.setLevel() called with invalid level: " + level;
                }
            };

            self.setDefaultLevel = function (level) {
                if (!getPersistedLevel()) {
                    self.setLevel(level, false);
                }
            };

            self.enableAll = function (persist) {
                self.setLevel(self.levels.TRACE, persist);
            };

            self.disableAll = function (persist) {
                self.setLevel(self.levels.SILENT, persist);
            };

            // Initialize with the right level
            var initialLevel = getPersistedLevel();
            if (initialLevel == null) {
                initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
            }
            self.setLevel(initialLevel, false);
        }

        /*
         *
         * Package-level API
         *
         */

        var defaultLogger = new Logger();

        var _loggersByName = {};
        defaultLogger.getLogger = function getLogger(name) {
            if (typeof name !== "string" || name === "") {
                throw new TypeError("You must supply a name when creating a logger.");
            }

            var logger = _loggersByName[name];
            if (!logger) {
                logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
            }
            return logger;
        };

        // Grab the current global log variable in case of overwrite
        var _log = typeof window !== undefinedType ? window.log : undefined;
        defaultLogger.noConflict = function () {
            if (typeof window !== undefinedType && window.log === defaultLogger) {
                window.log = _log;
            }

            return defaultLogger;
        };

        return defaultLogger;
    });
    return module.exports;
});
System.registerDynamic("npm:loglevel@1.4.1.js", ["npm:loglevel@1.4.1/lib/loglevel.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:loglevel@1.4.1/lib/loglevel.js");
  return module.exports;
});
System.register("src/debug/Logger.js", ["npm:loglevel@1.4.1.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var loglevel;
    var log, originalFactory;
    return {
        setters: [function (loglevel_1) {
            loglevel = loglevel_1;
        }],
        execute: function () {
            //Create log
            log = loglevel.getLogger("haztivity-core");
            //Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
            originalFactory = log.methodFactory;
            log.methodFactory = function (methodName, logLevel, loggerName) {
                var rawMethod = originalFactory(methodName, logLevel, loggerName);
                return function (name) {
                    var messages = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        messages[_i - 1] = arguments[_i];
                    }
                    messages.unshift("[" + methodName.toUpperCase() + "] " + name + " - ");
                    rawMethod.apply(undefined, messages);
                };
            };
            log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
            exports_1("Logger", log);
        }
    };
});

/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
System.register("src/debug.js", ["src/debug/Logger.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Logger_1_1) {
            exports_1({
                "Logger": Logger_1_1["Logger"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/base/BaseError.js", ["src/debug.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var debug_1;
    var BaseError;
    return {
        setters: [function (debug_1_1) {
            debug_1 = debug_1_1;
        }],
        execute: function () {
            debug_1.Logger;
            BaseError = function (_super) {
                __extends(BaseError, _super);
                function BaseError(name, message) {
                    _super.call(this, message);
                    this.name = name;
                    this.message = message;
                    debug_1.Logger.error(name, message);
                }
                return BaseError;
            }(Error);
            exports_1("BaseError", BaseError);
        }
    };
});

System.register("src/component/Errors.js", ["src/base/BaseError.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError_1;
    var HaztivityComponentInvalidError, HaztivityComponentAlreadyRegisteredError, HaztivityComponentNameInvalidError, HaztivityComponentNameRequiredError, HaztivityComponentNotRegisteredError, HaztivityInvalidComponentControllerError;
    return {
        setters: [function (BaseError_1_1) {
            BaseError_1 = BaseError_1_1;
        }],
        execute: function () {
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentInvalidError = function (_super) {
                __extends(HaztivityComponentInvalidError, _super);
                function HaztivityComponentInvalidError() {
                    _super.call(this, "HaztivityComponentInvalidError", "Invalid component");
                }
                return HaztivityComponentInvalidError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityComponentInvalidError", HaztivityComponentInvalidError);
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentAlreadyRegisteredError = function (_super) {
                __extends(HaztivityComponentAlreadyRegisteredError, _super);
                function HaztivityComponentAlreadyRegisteredError(component) {
                    _super.call(this, "HaztivityComponentInvalidError", "Component '" + component + "' already registered with another controller.");
                }
                return HaztivityComponentAlreadyRegisteredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityComponentAlreadyRegisteredError", HaztivityComponentAlreadyRegisteredError);
            /**
             * Error al intentar registrar un componente inválido
             */
            HaztivityComponentNameInvalidError = function (_super) {
                __extends(HaztivityComponentNameInvalidError, _super);
                function HaztivityComponentNameInvalidError(component) {
                    //todo LINK
                    _super.call(this, "HaztivityComponentNameInvalidError", "Invalid component name '" + component + "'. Please use camelCase nomenclature.");
                }
                return HaztivityComponentNameInvalidError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityComponentNameInvalidError", HaztivityComponentNameInvalidError);
            /**
             * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
             */
            HaztivityComponentNameRequiredError = function (_super) {
                __extends(HaztivityComponentNameRequiredError, _super);
                function HaztivityComponentNameRequiredError($element) {
                    _super.call(this, "HaztivityComponentNameRequiredError", "Component name not provider in data-* attribute. " + $element);
                }
                return HaztivityComponentNameRequiredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityComponentNameRequiredError", HaztivityComponentNameRequiredError);
            /**
             * Error al intentar inicializar un componente no registrado
             */
            HaztivityComponentNotRegisteredError = function (_super) {
                __extends(HaztivityComponentNotRegisteredError, _super);
                function HaztivityComponentNotRegisteredError(component) {
                    _super.call(this, "HaztivityComponentNotRegisteredError", "Attempt to initialize " + component + " but is not registered");
                }
                return HaztivityComponentNotRegisteredError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityComponentNotRegisteredError", HaztivityComponentNotRegisteredError);
            /**
             * Error de controlador invalido
             */
            HaztivityInvalidComponentControllerError = function (_super) {
                __extends(HaztivityInvalidComponentControllerError, _super);
                function HaztivityInvalidComponentControllerError(component) {
                    _super.call(this, "HaztivityInvalidComponentControllerError", "Invalid controller for " + component + " component");
                }
                return HaztivityInvalidComponentControllerError;
            }(BaseError_1.BaseError);
            exports_1("HaztivityInvalidComponentControllerError", HaztivityInvalidComponentControllerError);
        }
    };
});

System.register("src/component/ComponentInitializer.js", ["src/di.js", "src/component/ComponentManager.js", "src/utils.js", "src/jquery.js", "src/component/Errors.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, ComponentManager_1, utils_1, utils_2, jquery_1, Errors_1;
    var ComponentInitializer;
    return {
        setters: [function (di_1_1) {
            di_1 = di_1_1;
        }, function (ComponentManager_1_1) {
            ComponentManager_1 = ComponentManager_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
            utils_2 = utils_1_1;
        }, function (jquery_1_1) {
            jquery_1 = jquery_1_1;
        }, function (Errors_1_1) {
            Errors_1 = Errors_1_1;
        }],
        execute: function () {
            ComponentInitializer = function () {
                /**
                 * Inicializador de componentes.
                 * @class
                 * @param {JQueryStatic}                    $
                 * @param {ComponentManager}                ComponentManager
                 * @param {InjectorService}                 InjectorService
                 * @param {String.JS}                       S
                 * @param {DataOptions}                     DataOptions
                 */
                function ComponentInitializer($, ComponentManager, InjectorService, S, DataOptions) {
                    this.$ = $;
                    this.ComponentManager = ComponentManager;
                    this.InjectorService = InjectorService;
                    this.S = S;
                    this.DataOptions = DataOptions;
                    this._prefix = "hz-component";
                    this._camelPrefix = this.S(this._prefix).camelize().s;
                    this._instanceDataName = this._camelPrefix + "Instance";
                }
                /**
                 * Inicializa todos los componentes en un contexto en concreto
                 * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
                 */
                ComponentInitializer.prototype.initialize = function ($context) {
                    var $elements = this._findElementsInContext($context),
                        results = [];
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
                    if (config === void 0) {
                        config = {};
                    }
                    //get name
                    var name = $element.data(this._prefix),
                        result;
                    if (!!name) {
                        //check if exists
                        if (!!this.ComponentManager.exists(name)) {
                            //get from DI
                            var controllerInstance = $element.data(this._instanceDataName);
                            if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                                controllerInstance = this.InjectorService.get(name);
                                if (controllerInstance) {
                                    //check if is already instanciated
                                    //extract options
                                    var options = this.DataOptions.getDataOptions($element, name);
                                    options = jquery_1.$.extend({}, options, config.options);
                                    //get controller instance
                                    controllerInstance.activate($element);
                                    $element.data(this._instanceDataName, controllerInstance);
                                    //init controller
                                    controllerInstance.init(options, config.data);
                                } else {}
                                result = controllerInstance;
                            } else {
                                throw new Errors_1.HaztivityInvalidComponentControllerError(name);
                            }
                        } else {
                            throw new Errors_1.HaztivityComponentNotRegisteredError(name);
                        }
                    } else {
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
                    if (initState === void 0) {
                        initState = 2;
                    }
                    var result = [],
                        $elements = this._findElementsInContext($context);
                    switch (initState) {
                        case 0:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
                                if ($element.data(this._instanceDataName) == undefined) {
                                    result.push($element);
                                }
                            }
                            break;
                        case 1:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
                                if ($element.data(this._instanceDataName) != undefined) {
                                    result.push($element);
                                }
                            }
                            break;
                        default:
                            for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                                var $element = this.$($elements[elementIndex]);
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
                    if (recursive === void 0) {
                        recursive = true;
                    }
                    var result = [],
                        $elements = recursive === true ? this._findElementsInContext($context) : $context;
                    for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                        var $element = this.$($elements[elementIndex]),
                            controller = $element.data(this._instanceDataName);
                        if (controller != undefined) {
                            result.push(controller);
                        }
                    }
                    return result;
                };
                ComponentInitializer.prototype._findElementsInContext = function ($context) {
                    var _this = this;
                    var $elements,
                        parents = [];
                    //check if context is also a component
                    if ($context.length === 1) {
                        if ($context.is("[" + this._prefix + "],[data-" + this._prefix + "]")) {
                            parents = $context.toArray();
                        }
                    } else {
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
                ComponentInitializer = __decorate([di_1.Core({
                    name: "ComponentInitializer",
                    dependencies: [jquery_1.$, ComponentManager_1.ComponentManager, di_1.InjectorService, utils_1.S, utils_2.DataOptions]
                })], ComponentInitializer);
                return ComponentInitializer;
            }();
            exports_1("ComponentInitializer", ComponentInitializer);
        }
    };
});

System.register("src/component.js", ["src/component/ComponentController.js", "src/component/ComponentManager.js", "src/component/ComponentInitializer.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (ComponentController_1_1) {
            exports_1({
                "ComponentController": ComponentController_1_1["ComponentController"]
            });
        }, function (ComponentManager_1_1) {
            exports_1({
                "ComponentManager": ComponentManager_1_1["ComponentManager"]
            });
        }, function (ComponentInitializer_1_1) {
            exports_1({
                "ComponentInitializer": ComponentInitializer_1_1["ComponentInitializer"]
            });
        }],
        execute: function () {}
    };
});

System.register("src/core.js", ["src/jquery.js", "src/di.js", "src/utils.js", "src/sco.js", "src/page.js", "src/resource.js", "src/navigator.js", "src/component.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'IInjectorService': true,
        'IInjectorRegisterService': true,
        'Service': true,
        'IServiceParams': true,
        'ServiceInstance': true,
        'IServiceInstanceParams': true,
        'Module': true,
        'IModuleParams': true,
        'Sco': true,
        'IScoParams': true,
        'Dependencies': true,
        'Page': true,
        'IPageParams': true,
        'Resource': true,
        'IResourceParams': true,
        'Component': true,
        'IComponentParams': true,
        'EventEmitter': true,
        'EventEmitterFactory': true,
        'ScoFactory': true,
        'ISco': true,
        'IScoOptions': true,
        'ScoController': true,
        'PageController': true,
        'Page': true,
        'IPageOptions': true,
        'PageFactory': true,
        'PageManager': true,
        'ResourceInitializerService': true,
        'ResourceController': true,
        'ResourceManager': true,
        'Navigator': true,
        'INavigatorPageData': true,
        'NavigatorService': true,
        'ComponentController': true,
        'ComponentManager': true,
        'ComponentInitializer': true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [function (jquery_1_1) {
            exportStar_1(jquery_1_1);
        }, function (di_1_1) {
            exports_1({
                "IInjectorService": di_1_1["IInjectorService"],
                "IInjectorRegisterService": di_1_1["IInjectorRegisterService"],
                "Service": di_1_1["Service"],
                "IServiceParams": di_1_1["IServiceParams"],
                "ServiceInstance": di_1_1["ServiceInstance"],
                "IServiceInstanceParams": di_1_1["IServiceInstanceParams"],
                "Module": di_1_1["Module"],
                "IModuleParams": di_1_1["IModuleParams"],
                "Sco": di_1_1["Sco"],
                "IScoParams": di_1_1["IScoParams"],
                "Dependencies": di_1_1["Dependencies"],
                "Page": di_1_1["Page"],
                "IPageParams": di_1_1["IPageParams"],
                "Resource": di_1_1["Resource"],
                "IResourceParams": di_1_1["IResourceParams"],
                "Component": di_1_1["Component"],
                "IComponentParams": di_1_1["IComponentParams"]
            });
        }, function (utils_1_1) {
            exports_1({
                "EventEmitter": utils_1_1["EventEmitter"],
                "EventEmitterFactory": utils_1_1["EventEmitterFactory"]
            });
        }, function (sco_1_1) {
            exports_1({
                "ScoFactory": sco_1_1["ScoFactory"],
                "ISco": sco_1_1["ISco"],
                "IScoOptions": sco_1_1["IScoOptions"],
                "ScoController": sco_1_1["ScoController"]
            });
        }, function (page_1_1) {
            exports_1({
                "PageController": page_1_1["PageController"],
                "Page": page_1_1["Page"],
                "IPageOptions": page_1_1["IPageOptions"],
                "PageFactory": page_1_1["PageFactory"],
                "PageManager": page_1_1["PageManager"]
            });
        }, function (resource_1_1) {
            exports_1({
                "ResourceInitializerService": resource_1_1["ResourceInitializerService"],
                "ResourceController": resource_1_1["ResourceController"],
                "ResourceManager": resource_1_1["ResourceManager"]
            });
        }, function (navigator_1_1) {
            exports_1({
                "Navigator": navigator_1_1["Navigator"],
                "INavigatorPageData": navigator_1_1["INavigatorPageData"],
                "NavigatorService": navigator_1_1["NavigatorService"]
            });
        }, function (component_1_1) {
            exports_1({
                "ComponentController": component_1_1["ComponentController"],
                "ComponentManager": component_1_1["ComponentManager"],
                "ComponentInitializer": component_1_1["ComponentInitializer"]
            });
        }],
        execute: function () {}
    };
});

//# sourceMappingURL=core.js.map