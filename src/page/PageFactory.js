System.register(["../di", "./PageRegister", "./GenericPageController"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, PageRegister_1, GenericPageController_1, PageFactory, PageFactory_1;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (PageRegister_1_1) {
                PageRegister_1 = PageRegister_1_1;
            },
            function (GenericPageController_1_1) {
                GenericPageController_1 = GenericPageController_1_1;
            }
        ],
        execute: function () {
            PageFactory = PageFactory_1 = (function () {
                function PageFactory() {
                }
                /**
                 * Genera una página genérica
                 * @static
                 * @param {IPageOptions}    options     Opciones para la creación de la página
                 * @returns {Page}
                 */
                PageFactory.createPage = function (options) {
                    var PageDIFactory = di_1.Injector.getInstance(PageFactory_1).get(PageRegister_1.PageRegister);
                    var page = PageDIFactory.instance();
                    //Set PageController as default
                    if (!options.controller) {
                        options.controller = "GenericPageController";
                    }
                    page.activate(options);
                    return page;
                };
                return PageFactory;
            }());
            PageFactory = PageFactory_1 = __decorate([
                di_1.Core({
                    name: "PageFactory",
                    dependencies: [
                        GenericPageController_1.GenericPageController
                    ]
                })
            ], PageFactory);
            exports_1("PageFactory", PageFactory);
        }
    };
});
//# sourceMappingURL=PageFactory.js.map