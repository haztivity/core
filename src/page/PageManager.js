System.register(["../di", "./PageImplementation", "../utils", "./Errors", "../resource"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, PageImplementation_1, utils_1, Errors_1, resource_1, PageManager;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (PageImplementation_1_1) {
                PageImplementation_1 = PageImplementation_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            }
        ],
        execute: function () {
            PageManager = (function () {
                function PageManager(_ResourceManager, _EventEmitterFactory, _PageImplementationFactory) {
                    this._ResourceManager = _ResourceManager;
                    this._EventEmitterFactory = _EventEmitterFactory;
                    this._PageImplementationFactory = _PageImplementationFactory;
                    this._pages = [];
                    this._pagesMap = new Map();
                    this._eventEmitter = this._EventEmitterFactory.createEmitter();
                }
                /**
                 * Indica el número de páginas registradas
                 * @returns {number}
                 */
                PageManager.prototype.count = function () {
                    return this._pages.length;
                };
                /**
                 * Añade un conjunto de páginas.
                 * @param {PageRegister[]}          pages       Conjunto de páginas a añadir
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
                            this._ResourceManager.addAll(page.getResources());
                            var pageImplementation = this._PageImplementationFactory.instance();
                            pageImplementation.activate(page);
                            this._pages.push(pageImplementation);
                            this._pagesMap.set(pageName, this._pages.length - 1);
                        }
                        else {
                            throw new Errors_1.HaztivityPageNameInvalid(pageName);
                        }
                    }
                    else {
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
                    this._pagesMap.clear();
                    var pages = this._pages;
                    for (var pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
                        var currentPage = pages[pageIndex];
                        this._pagesMap.set(currentPage.getPageName(), pageIndex);
                    }
                };
                /**
                 * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
                 * @param {string}      name    Nombre de la página
                 * @returns {number}
                 */
                PageManager.prototype.getPageIndex = function (name) {
                    var result = this._pagesMap.get(name);
                    result = result != undefined
                        ? result
                        : -1;
                    return result;
                };
                /**
                 * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
                 * @param {number}  index   Índice de la página a obtener
                 * @returns {PageImplementation}
                 */
                PageManager.prototype.getPage = function (index) {
                    return this._pages[index];
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
                PageManager.prototype.on = function () {
                };
                PageManager.prototype.off = function () {
                };
                return PageManager;
            }());
            PageManager = __decorate([
                di_1.Core({
                    name: "PageManager",
                    public: true,
                    dependencies: [
                        resource_1.ResourceManager,
                        utils_1.EventEmitterFactory,
                        PageImplementation_1.PageImplementation
                    ]
                })
            ], PageManager);
            exports_1("PageManager", PageManager);
        }
    };
});
//# sourceMappingURL=PageManager.js.map