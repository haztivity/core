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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VNYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4vUGFnZUltcGxlbWVudGF0aW9uXCIsIFwiLi4vdXRpbHNcIiwgXCIuL0Vycm9yc1wiLCBcIi4uL3Jlc291cmNlXCJdLCBmdW5jdGlvbiAoZXhwb3J0c18xLCBjb250ZXh0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgZGlfMSwgUGFnZUltcGxlbWVudGF0aW9uXzEsIHV0aWxzXzEsIEVycm9yc18xLCByZXNvdXJjZV8xLCBQYWdlTWFuYWdlcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoUGFnZUltcGxlbWVudGF0aW9uXzFfMSkge1xuICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbl8xID0gUGFnZUltcGxlbWVudGF0aW9uXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb3VyY2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfMSA9IHJlc291cmNlXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUGFnZU1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFBhZ2VNYW5hZ2VyKF9SZXNvdXJjZU1hbmFnZXIsIF9FdmVudEVtaXR0ZXJGYWN0b3J5LCBfUGFnZUltcGxlbWVudGF0aW9uRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIgPSBfUmVzb3VyY2VNYW5hZ2VyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1BhZ2VJbXBsZW1lbnRhdGlvbkZhY3RvcnkgPSBfUGFnZUltcGxlbWVudGF0aW9uRmFjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZXNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbmRpY2EgZWwgbsO6bWVybyBkZSBww6FnaW5hcyByZWdpc3RyYWRhc1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFnZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuIGNvbmp1bnRvIGRlIHDDoWdpbmFzLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7UGFnZVJlZ2lzdGVyW119ICAgICAgICAgIHBhZ2VzICAgICAgIENvbmp1bnRvIGRlIHDDoWdpbmFzIGEgYcOxYWRpclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5hZGRQYWdlcyA9IGZ1bmN0aW9uIChwYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhZ2VzXzEgPSBwYWdlczsgX2kgPCBwYWdlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBwYWdlc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFnZShwYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQcOxYWRlIHVuYSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtQYWdlfSAgICBwYWdlICAgICAgICBQw6FnaW5hIGEgYcOxYWRpclxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5hZGRQYWdlID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VOYW1lID0gcGFnZS5nZXROYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBhZ2VJbmRleChwYWdlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVQYWdlTmFtZShwYWdlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIuYWRkQWxsKHBhZ2UuZ2V0UmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWdlSW1wbGVtZW50YXRpb24gPSB0aGlzLl9QYWdlSW1wbGVtZW50YXRpb25GYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUltcGxlbWVudGF0aW9uLmFjdGl2YXRlKHBhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VzLnB1c2gocGFnZUltcGxlbWVudGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYWdlc01hcC5zZXQocGFnZU5hbWUsIHRoaXMuX3BhZ2VzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVBhZ2VOYW1lSW52YWxpZChwYWdlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JzXzEuSGF6dGl2aXR5UGFnZUFscmVhZHlSZWdpc3RlcmVkKHBhZ2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLl92YWxpZGF0ZVBhZ2VOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUuc2VhcmNoKC9bXlxcd3wtXS9nKSA9PSAtMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFjdHVhbGl6YSBlbCBtYXBhIGRlIG5vbWJyZS3DrW5kaWNlIGRlIGxhcyBww6FnaW5hc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5yZW1hcFBhZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYWdlc01hcC5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLl9wYWdlcztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcGFnZUluZGV4ID0gMCwgcGFnZXNMZW5ndGggPSBwYWdlcy5sZW5ndGg7IHBhZ2VJbmRleCA8IHBhZ2VzTGVuZ3RoOyBwYWdlSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQYWdlID0gcGFnZXNbcGFnZUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VzTWFwLnNldChjdXJyZW50UGFnZS5nZXRQYWdlTmFtZSgpLCBwYWdlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIGVsIMOtbmRpY2UgZGUgdW5hIHDDoWdpbmEgZW4gYmFzZSBhbCBub21icmUgcmVnaXN0cmFkby4gU2kgbm8gc2UgZW5jdWVudHJhIGxhIHDDoWdpbmEgc2UgZGV2dWVsdmUgLTFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICBuYW1lICAgIE5vbWJyZSBkZSBsYSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5wcm90b3R5cGUuZ2V0UGFnZUluZGV4ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3BhZ2VzTWFwLmdldChuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIHVuYSBww6FnaW5hIHBvciBzdSDDrW5kaWNlLiBTaSBubyBzZSBlbmN1ZW50cmEgc2UgZGV2dWVsdmUgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9ICBpbmRleCAgIMONbmRpY2UgZGUgbGEgcMOhZ2luYSBhIG9idGVuZXJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUltcGxlbWVudGF0aW9ufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRQYWdlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWdlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBPYnRpZW5lIHVuYSBww6FnaW5hIHBvciBlbCBub21icmUgcmVnaXN0cmFkby4gU2kgbm8gc2UgZW5jdWVudHJhIHNlIGRldnVlbHZlIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgbmFtZSAgICBOb21icmUgZGUgbGEgcMOhZ2luYSBhIG9idGVuZXJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUltcGxlbWVudGF0aW9ufVxuICAgICAgICAgICAgICAgICAqIEBzZWUgZ2V0UGFnZUluZGV4XG4gICAgICAgICAgICAgICAgICogQHNlZSBnZXRQYWdlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLmdldFBhZ2VCeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlKHRoaXMuZ2V0UGFnZUluZGV4KG5hbWUpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFnZU1hbmFnZXI7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgUGFnZU1hbmFnZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBhZ2VNYW5hZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV8xLlJlc291cmNlTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuRXZlbnRFbWl0dGVyRmFjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VJbXBsZW1lbnRhdGlvbl8xLlBhZ2VJbXBsZW1lbnRhdGlvblxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFBhZ2VNYW5hZ2VyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlBhZ2VNYW5hZ2VyXCIsIFBhZ2VNYW5hZ2VyKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicGFnZS9QYWdlTWFuYWdlci5qcyJ9
