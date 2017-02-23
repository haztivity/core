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
        define(["require", "exports", "../di", "./PageRegister", "./GenericPageController"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var PageRegister_1 = require("./PageRegister");
    var GenericPageController_1 = require("./GenericPageController");
    /**
     * Factory para crear páginas genéricas
     * @class PageFactory
     */
    var PageFactory = PageFactory_1 = (function () {
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
    exports.PageFactory = PageFactory;
    var PageFactory_1;
});
//# sourceMappingURL=PageFactory.js.map