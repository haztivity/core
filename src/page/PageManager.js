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
        define(["require", "exports", "../di", "./PageImplementation", "../utils", "./Errors", "../resource"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var PageImplementation_1 = require("./PageImplementation");
    var utils_1 = require("../utils");
    var Errors_1 = require("./Errors");
    var resource_1 = require("../resource");
    var PageManager = (function () {
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
    exports.PageManager = PageManager;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VNYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuL1BhZ2VJbXBsZW1lbnRhdGlvblwiLCBcIi4uL3V0aWxzXCIsIFwiLi9FcnJvcnNcIiwgXCIuLi9yZXNvdXJjZVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgUGFnZUltcGxlbWVudGF0aW9uXzEgPSByZXF1aXJlKFwiLi9QYWdlSW1wbGVtZW50YXRpb25cIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIEVycm9yc18xID0gcmVxdWlyZShcIi4vRXJyb3JzXCIpO1xuICAgIHZhciByZXNvdXJjZV8xID0gcmVxdWlyZShcIi4uL3Jlc291cmNlXCIpO1xuICAgIHZhciBQYWdlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBhZ2VNYW5hZ2VyKF9SZXNvdXJjZU1hbmFnZXIsIF9FdmVudEVtaXR0ZXJGYWN0b3J5LCBfUGFnZUltcGxlbWVudGF0aW9uRmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VNYW5hZ2VyID0gX1Jlc291cmNlTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkgPSBfRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICAgICAgICAgIHRoaXMuX1BhZ2VJbXBsZW1lbnRhdGlvbkZhY3RvcnkgPSBfUGFnZUltcGxlbWVudGF0aW9uRmFjdG9yeTtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VzID0gW107XG4gICAgICAgICAgICB0aGlzLl9wYWdlc01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2EgZWwgbsO6bWVybyBkZSBww6FnaW5hcyByZWdpc3RyYWRhc1xuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEHDsWFkZSB1biBjb25qdW50byBkZSBww6FnaW5hcy5cbiAgICAgICAgICogQHBhcmFtIHtQYWdlUmVnaXN0ZXJbXX0gICAgICAgICAgcGFnZXMgICAgICAgQ29uanVudG8gZGUgcMOhZ2luYXMgYSBhw7FhZGlyXG4gICAgICAgICAqL1xuICAgICAgICBQYWdlTWFuYWdlci5wcm90b3R5cGUuYWRkUGFnZXMgPSBmdW5jdGlvbiAocGFnZXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgcGFnZXNfMSA9IHBhZ2VzOyBfaSA8IHBhZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBwYWdlc18xW19pXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhZ2UocGFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBw7FhZGUgdW5hIHDDoWdpbmFcbiAgICAgICAgICogQHBhcmFtIHtQYWdlfSAgICBwYWdlICAgICAgICBQw6FnaW5hIGEgYcOxYWRpclxuICAgICAgICAgKi9cbiAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLmFkZFBhZ2UgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICAgICAgdmFyIHBhZ2VOYW1lID0gcGFnZS5nZXROYW1lKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRQYWdlSW5kZXgocGFnZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVBhZ2VOYW1lKHBhZ2VOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIuYWRkQWxsKHBhZ2UuZ2V0UmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZUltcGxlbWVudGF0aW9uID0gdGhpcy5fUGFnZUltcGxlbWVudGF0aW9uRmFjdG9yeS5pbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlSW1wbGVtZW50YXRpb24uYWN0aXZhdGUocGFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VzLnB1c2gocGFnZUltcGxlbWVudGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZXNNYXAuc2V0KHBhZ2VOYW1lLCB0aGlzLl9wYWdlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlQYWdlTmFtZUludmFsaWQocGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlQYWdlQWxyZWFkeVJlZ2lzdGVyZWQocGFnZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBQYWdlTWFuYWdlci5wcm90b3R5cGUuX3ZhbGlkYXRlUGFnZU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUuc2VhcmNoKC9bXlxcd3wtXS9nKSA9PSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjdHVhbGl6YSBlbCBtYXBhIGRlIG5vbWJyZS3DrW5kaWNlIGRlIGxhcyBww6FnaW5hc1xuICAgICAgICAgKi9cbiAgICAgICAgUGFnZU1hbmFnZXIucHJvdG90eXBlLnJlbWFwUGFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9wYWdlc01hcC5jbGVhcigpO1xuICAgICAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5fcGFnZXM7XG4gICAgICAgICAgICBmb3IgKHZhciBwYWdlSW5kZXggPSAwLCBwYWdlc0xlbmd0aCA9IHBhZ2VzLmxlbmd0aDsgcGFnZUluZGV4IDwgcGFnZXNMZW5ndGg7IHBhZ2VJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQYWdlID0gcGFnZXNbcGFnZUluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlc01hcC5zZXQoY3VycmVudFBhZ2UuZ2V0UGFnZU5hbWUoKSwgcGFnZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgZWwgw61uZGljZSBkZSB1bmEgcMOhZ2luYSBlbiBiYXNlIGFsIG5vbWJyZSByZWdpc3RyYWRvLiBTaSBubyBzZSBlbmN1ZW50cmEgbGEgcMOhZ2luYSBzZSBkZXZ1ZWx2ZSAtMVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICBuYW1lICAgIE5vbWJyZSBkZSBsYSBww6FnaW5hXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBQYWdlTWFuYWdlci5wcm90b3R5cGUuZ2V0UGFnZUluZGV4ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9wYWdlc01hcC5nZXQobmFtZSk7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyByZXN1bHRcbiAgICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgdW5hIHDDoWdpbmEgcG9yIHN1IMOtbmRpY2UuIFNpIG5vIHNlIGVuY3VlbnRyYSBzZSBkZXZ1ZWx2ZSB1bmRlZmluZWRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9ICBpbmRleCAgIMONbmRpY2UgZGUgbGEgcMOhZ2luYSBhIG9idGVuZXJcbiAgICAgICAgICogQHJldHVybnMge1BhZ2VJbXBsZW1lbnRhdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRQYWdlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFnZXNbaW5kZXhdO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT2J0aWVuZSB1bmEgcMOhZ2luYSBwb3IgZWwgbm9tYnJlIHJlZ2lzdHJhZG8uIFNpIG5vIHNlIGVuY3VlbnRyYSBzZSBkZXZ1ZWx2ZSB1bmRlZmluZWRcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9ICBuYW1lICAgIE5vbWJyZSBkZSBsYSBww6FnaW5hIGEgb2J0ZW5lclxuICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUltcGxlbWVudGF0aW9ufVxuICAgICAgICAgKiBAc2VlIGdldFBhZ2VJbmRleFxuICAgICAgICAgKiBAc2VlIGdldFBhZ2VcbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRQYWdlQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UodGhpcy5nZXRQYWdlSW5kZXgobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICBQYWdlTWFuYWdlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIFBhZ2VNYW5hZ2VyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQYWdlTWFuYWdlcjtcbiAgICB9KCkpO1xuICAgIFBhZ2VNYW5hZ2VyID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICBuYW1lOiBcIlBhZ2VNYW5hZ2VyXCIsXG4gICAgICAgICAgICBwdWJsaWM6IHRydWUsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xLlJlc291cmNlTWFuYWdlcixcbiAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnksXG4gICAgICAgICAgICAgICAgUGFnZUltcGxlbWVudGF0aW9uXzEuUGFnZUltcGxlbWVudGF0aW9uXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgUGFnZU1hbmFnZXIpO1xuICAgIGV4cG9ydHMuUGFnZU1hbmFnZXIgPSBQYWdlTWFuYWdlcjtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL1BhZ2VNYW5hZ2VyLmpzIn0=
