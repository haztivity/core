System.register(["../utils", "../di", "../page", "../navigator", "./Errors", "../resource", "../component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var utils_1, di_1, page_1, navigator_1, Errors_1, resource_1, component_1, ScoController, ScoController_1;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            },
            function (navigator_1_1) {
                navigator_1 = navigator_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            ScoController = ScoController_1 = (function () {
                function ScoController(_Navigator, _PageManager, _ResourceManager, _EventEmitterFactory, _ComponentManager, _ComponentInitializer) {
                    this._Navigator = _Navigator;
                    this._PageManager = _PageManager;
                    this._ResourceManager = _ResourceManager;
                    this._EventEmitterFactory = _EventEmitterFactory;
                    this._ComponentManager = _ComponentManager;
                    this._ComponentInitializer = _ComponentInitializer;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter();
                }
                ScoController.prototype.activate = function (options) {
                    this._options = options;
                    this._ComponentManager.addAll(this._options.components || []);
                    this._PageManager.addPages(this._options.pages);
                    return this;
                };
                ScoController.prototype.on = function () {
                    return this;
                };
                ScoController.prototype._init = function () {
                    this._$context = $("[data-hz-app]");
                    //context must exists
                    if (this._$context.length > 0) {
                        this._$context.addClass(ScoController_1.CLASS_CONTEXT);
                        this._$pagesContainer = this._$context.find("[data-hz-pages]");
                        //page contexts must exists
                        if (this._$pagesContainer.length > 0) {
                            return true;
                        }
                        else {
                            throw new Errors_1.HaztivityPagesContextNotFound();
                        }
                    }
                    else {
                        throw new Errors_1.HaztivityAppContextNotFound();
                    }
                };
                ScoController.prototype.run = function () {
                    this._init();
                    this._Navigator.activate(this._$pagesContainer);
                    this._$pagesContainer.addClass(ScoController_1.CLASS_PAGES);
                    this._ComponentInitializer.initialize(this._$context);
                    //init components
                    this._Navigator.goTo(0);
                    return this;
                };
                return ScoController;
            }());
            ScoController.CLASS_CONTEXT = "hz-container";
            ScoController.CLASS_PAGES = "hz-pages-container";
            ScoController = ScoController_1 = __decorate([
                di_1.Sco({
                    name: "ScoController",
                    dependencies: [
                        navigator_1.Navigator,
                        page_1.PageManager,
                        resource_1.ResourceManager,
                        utils_1.EventEmitterFactory,
                        component_1.ComponentManager,
                        component_1.ComponentInitializer
                    ]
                })
            ], ScoController);
            exports_1("ScoController", ScoController);
        }
    };
});
//# sourceMappingURL=Sco.js.map