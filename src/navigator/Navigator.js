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
        define(["require", "exports", "../jquery", "../di", "../page", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var jquery_1 = require("../jquery");
    var di_1 = require("../di");
    var page_1 = require("../page");
    var utils_1 = require("../utils");
    var Navigator = Navigator_1 = (function () {
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
                        var currentPage = this.getCurrentPage(), //get current page and index
                        currentPageIndex = this.getCurrentPageIndex(), currentPageIs = currentPageIndex - index < 0
                            ? -1
                            : 1; //check the position of the old page relative to the new page
                        //check if resources are completed to go to the next page
                        if (currentPageIs === 1 || (currentPage == undefined || currentPage.getController().isCompleted())) {
                            if (this._currentRenderProcess && this._currentRenderProcess.state() === "pending") {
                                this._currentRenderProcess.reject();
                            }
                            this._currentRenderProcess = $.Deferred();
                            this._currentPage = newPage; //set new page as current
                            this._currentPageIndex = index;
                            var newPageName = newPage.getPageName(), //get name of new controller
                            newPageData = {
                                index: index,
                                name: newPageName
                            }, currentPageData = void 0;
                            if (currentPage) {
                                currentPageData = {
                                    index: currentPageIndex,
                                    name: currentPage.getPageName()
                                };
                            }
                            //trigger event in navigator
                            this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                            //trigger a global event that could be listened by anyone
                            this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                            var currentPageElement = currentPage
                                ? currentPage.getController().getElement()
                                : null, //get current element
                            newPageController = newPage.getController(), //create a controller for new page
                            newPageElement = newPage.render(); //get the rendered element
                            //if the new page is before to the current page
                            if (currentPageIndex === -1) {
                                this._$context.prepend(newPageElement);
                            }
                            else {
                                this._$context.append(newPageElement);
                            }
                            //initialize resources and trigger rendered event
                            newPage.postRender();
                            this._$context.removeAttr(Navigator_1.ATTR_CURRENT);
                            this._$context.attr(Navigator_1.ATTR_TRANSITION_TO, newPageName);
                            //trigger event in navigator
                            this._eventEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                            //trigger a global event that could be listened by anyone
                            this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                            //request animations
                            var showPromise = newPageController.show(currentPageElement, currentPageIs);
                            //if the function returns a promise
                            if (typeof showPromise.then === "function") {
                                showPromise.then(this._onPageShowEnd.bind(this, newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess));
                            }
                            else {
                                this._onPageShowEnd(newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess);
                            }
                        }
                        return this._currentRenderProcess;
                    }
                }
                else {
                }
            }
            return false;
        };
        /**
         * Devuelve un array con los índices de las páginas que hayan sido visitadas
         * @returns {Number[]}
         */
        Navigator.prototype.getVisitedPages = function () {
            var pagesLength = this._PageManager.count(), pages = [];
            for (var pageIndex = 0; pageIndex < pagesLength; pageIndex++) {
                var currentPage = this._PageManager.getPage(pageIndex), state = currentPage.getState();
                if (state.visited) {
                    pages.push(pageIndex);
                }
            }
            return pages;
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
                    this._eventEmitter.trigger(Navigator_1.ON_ENABLE);
                }
                else {
                    this._eventEmitter.trigger(Navigator_1.ON_DISABLE);
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
            var numPages = this._PageManager.count(), currentPageIndex = this.getCurrentPageIndex();
            if (currentPageIndex < numPages - 1) {
                return this.goTo(currentPageIndex + 1);
            }
            else {
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
            }
            else {
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
            this._$context.removeAttr(Navigator_1.ATTR_TRANSITION_TO);
            this._$context.attr(Navigator_1.ATTR_CURRENT, newPageData.name);
            //trigger event in navigator
            this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
            //trigger a global event that could be listened by anyone
            this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
            defer.resolve(newPageData, oldPageData);
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
        return Navigator;
    }());
    Navigator.NAMESPACE = "navigator";
    Navigator.ON_DRAW_PAGE = Navigator_1.NAMESPACE + ":draw";
    Navigator.ON_DISABLE = Navigator_1.NAMESPACE + ":disable";
    Navigator.ON_ENABLE = Navigator_1.NAMESPACE + ":enable";
    Navigator.ON_CHANGE_PAGE_END = Navigator_1.NAMESPACE + ":changeend";
    Navigator.ON_CHANGE_PAGE_START = Navigator_1.NAMESPACE + ":changestart";
    Navigator.ATTR_TRANSITION_TO = "data-hz-navigator-transition-to";
    Navigator.ATTR_CURRENT = "data-hz-navigator-page";
    Navigator = Navigator_1 = __decorate([
        di_1.Core({
            name: "Navigator",
            public: true,
            dependencies: [
                jquery_1.$,
                page_1.PageManager,
                utils_1.EventEmitterFactory
            ]
        })
    ], Navigator);
    exports.Navigator = Navigator;
    var Navigator_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYXZpZ2F0b3IvTmF2aWdhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vanF1ZXJ5XCIsIFwiLi4vZGlcIiwgXCIuLi9wYWdlXCIsIFwiLi4vdXRpbHNcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGpxdWVyeV8xID0gcmVxdWlyZShcIi4uL2pxdWVyeVwiKTtcbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICB2YXIgcGFnZV8xID0gcmVxdWlyZShcIi4uL3BhZ2VcIik7XG4gICAgdmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4gICAgdmFyIE5hdmlnYXRvciA9IE5hdmlnYXRvcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlc3Rpb25hIGxhIHRyYW5zaWNpw7NuIGVudHJlIHDDoWdpbmFzIHkgZWwgcmVuZGVyaXphZG8gZGUgbGFzIG1pc21hcyBlbiB1biBjb250ZXh0byBlc3BlY8OtZmljb1xuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICAgICAgXyRcbiAgICAgICAgICogQHBhcmFtIHtQYWdlTWFuYWdlcn0gICAgICAgICAgICAgICAgIF9QYWdlTWFuYWdlclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50RW1pdHRlckZhY3Rvcnl9ICAgICAgICAgX0V2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIE5hdmlnYXRvcihfJCwgX1BhZ2VNYW5hZ2VyLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fJCA9IF8kO1xuICAgICAgICAgICAgdGhpcy5fUGFnZU1hbmFnZXIgPSBfUGFnZU1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQgPSAkY29udGV4dDtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTmF2ZWdhIGEgbGEgcMOhZ2luYSBzb2xpY2l0YWRhLlxuICAgICAgICAgKiBEZWJlIGVzdGFyIHJlZ2lzdHJhZGEgZW4gUGFnZU1hbmFnZXJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4ICAgIMONbmRpY2UgZGUgbGEgcMOhZ2luYSBhIG5hdmVnYXJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2V8Ym9vbGVhbn0gUHJvbWVzYSBxdWUgZXMgcmVzdWVsdGEgYWwgZmluYWxpemFyc2UgZWwgcHJvY2VzbyBjb21wbGV0byBkZSBjYW1iaW8gZGVcbiAgICAgICAgICogcMOhZ2luYS4gRmFsc2Ugc2kgbm8gc2UgcmVhbGl6YSBlbCBjYW1iaW9cbiAgICAgICAgICovXG4gICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuZ29UbyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCgpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy9nZXQgdGhlIHBhZ2UgcmVxdWVzdGVkXG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhZ2UgPSB0aGlzLl9QYWdlTWFuYWdlci5nZXRQYWdlKGluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3RoZSBwYWdlIG11c3QgYmUgcHJvdmlkZWQgYW5kIGRpZmZlcmVudCBvZiB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgICAgICAgICAgaWYgKG5ld1BhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1BhZ2UgIT09IHRoaXMuX2N1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlKCksIC8vZ2V0IGN1cnJlbnQgcGFnZSBhbmQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlSW5kZXggPSB0aGlzLmdldEN1cnJlbnRQYWdlSW5kZXgoKSwgY3VycmVudFBhZ2VJcyA9IGN1cnJlbnRQYWdlSW5kZXggLSBpbmRleCA8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAxOyAvL2NoZWNrIHRoZSBwb3NpdGlvbiBvZiB0aGUgb2xkIHBhZ2UgcmVsYXRpdmUgdG8gdGhlIG5ldyBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHJlc291cmNlcyBhcmUgY29tcGxldGVkIHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZUlzID09PSAxIHx8IChjdXJyZW50UGFnZSA9PSB1bmRlZmluZWQgfHwgY3VycmVudFBhZ2UuZ2V0Q29udHJvbGxlcigpLmlzQ29tcGxldGVkKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzICYmIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UmVuZGVyUHJvY2VzcyA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IG5ld1BhZ2U7IC8vc2V0IG5ldyBwYWdlIGFzIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFnZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BhZ2VOYW1lID0gbmV3UGFnZS5nZXRQYWdlTmFtZSgpLCAvL2dldCBuYW1lIG9mIG5ldyBjb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFnZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmV3UGFnZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjdXJyZW50UGFnZURhdGEgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjdXJyZW50UGFnZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFBhZ2UuZ2V0UGFnZU5hbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyaWdnZXIgZXZlbnQgaW4gbmF2aWdhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fQ0hBTkdFX1BBR0VfU1RBUlQsIG5ld1BhZ2VEYXRhLCBjdXJyZW50UGFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJpZ2dlciBhIGdsb2JhbCBldmVudCB0aGF0IGNvdWxkIGJlIGxpc3RlbmVkIGJ5IGFueW9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5nbG9iYWxFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fQ0hBTkdFX1BBR0VfU1RBUlQsIG5ld1BhZ2VEYXRhLCBjdXJyZW50UGFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UGFnZUVsZW1lbnQgPSBjdXJyZW50UGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnRQYWdlLmdldENvbnRyb2xsZXIoKS5nZXRFbGVtZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLCAvL2dldCBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYWdlQ29udHJvbGxlciA9IG5ld1BhZ2UuZ2V0Q29udHJvbGxlcigpLCAvL2NyZWF0ZSBhIGNvbnRyb2xsZXIgZm9yIG5ldyBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFnZUVsZW1lbnQgPSBuZXdQYWdlLnJlbmRlcigpOyAvL2dldCB0aGUgcmVuZGVyZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIG5ldyBwYWdlIGlzIGJlZm9yZSB0byB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0LnByZXBlbmQobmV3UGFnZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQuYXBwZW5kKG5ld1BhZ2VFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsaXplIHJlc291cmNlcyBhbmQgdHJpZ2dlciByZW5kZXJlZCBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhZ2UucG9zdFJlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0LnJlbW92ZUF0dHIoTmF2aWdhdG9yXzEuQVRUUl9DVVJSRU5UKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5hdHRyKE5hdmlnYXRvcl8xLkFUVFJfVFJBTlNJVElPTl9UTywgbmV3UGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJpZ2dlciBldmVudCBpbiBuYXZpZ2F0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihOYXZpZ2F0b3JfMS5PTl9EUkFXX1BBR0UsIG5ld1BhZ2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyaWdnZXIgYSBnbG9iYWwgZXZlbnQgdGhhdCBjb3VsZCBiZSBsaXN0ZW5lZCBieSBhbnlvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZ2xvYmFsRW1pdHRlci50cmlnZ2VyKE5hdmlnYXRvcl8xLk9OX0RSQVdfUEFHRSwgbmV3UGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob3dQcm9taXNlID0gbmV3UGFnZUNvbnRyb2xsZXIuc2hvdyhjdXJyZW50UGFnZUVsZW1lbnQsIGN1cnJlbnRQYWdlSXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYSBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzaG93UHJvbWlzZS50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1Byb21pc2UudGhlbih0aGlzLl9vblBhZ2VTaG93RW5kLmJpbmQodGhpcywgbmV3UGFnZSwgbmV3UGFnZURhdGEsIGN1cnJlbnRQYWdlLCBjdXJyZW50UGFnZURhdGEsIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblBhZ2VTaG93RW5kKG5ld1BhZ2UsIG5ld1BhZ2VEYXRhLCBjdXJyZW50UGFnZSwgY3VycmVudFBhZ2VEYXRhLCB0aGlzLl9jdXJyZW50UmVuZGVyUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldnVlbHZlIHVuIGFycmF5IGNvbiBsb3Mgw61uZGljZXMgZGUgbGFzIHDDoWdpbmFzIHF1ZSBoYXlhbiBzaWRvIHZpc2l0YWRhc1xuICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyW119XG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmdldFZpc2l0ZWRQYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwYWdlc0xlbmd0aCA9IHRoaXMuX1BhZ2VNYW5hZ2VyLmNvdW50KCksIHBhZ2VzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBwYWdlSW5kZXggPSAwOyBwYWdlSW5kZXggPCBwYWdlc0xlbmd0aDsgcGFnZUluZGV4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSB0aGlzLl9QYWdlTWFuYWdlci5nZXRQYWdlKHBhZ2VJbmRleCksIHN0YXRlID0gY3VycmVudFBhZ2UuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmlzaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHBhZ2VJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhZ2VzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV2dWVsdmUgZWwgZXN0YWRvIGFjdHVhbCBkZSBkZXNoYWJpbGl0YWRvXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRXN0YWJsZWNlIGVsIGVzdGFkbyBkZSBkZXNoYWJpbGl0YWRvXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgIGRpc2FibGVkICAgICAgICBFc3RhZG8gYSBlc3RhYmxlY2VyXG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLnNldERpc2FibGVkID0gZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fRU5BQkxFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci50cmlnZ2VyKE5hdmlnYXRvcl8xLk9OX0RJU0FCTEUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhYmlsaXRhIGxhIG5hdmVnYWNpw7NuXG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVzaGFiaWxpdGEgbGEgbmF2ZWdhY2nDs25cbiAgICAgICAgICovXG4gICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRyb2NlZGUgYSBsYSBww6FnaW5hIHBvc3RlcmlvciBzaSBleGlzdGUuXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlfGJvb2xlYW59IFByb21lc2EgcXVlIGVzIHJlc3VlbHRhIGFsIGZpbmFsaXphcnNlIGVsIHByb2Nlc28gY29tcGxldG8gZGUgY2FtYmlvIGRlXG4gICAgICAgICAqIHDDoWdpbmEuIEZhbHNlIHNpIG5vIHNlIHJlYWxpemEgZWwgY2FtYmlvXG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbnVtUGFnZXMgPSB0aGlzLl9QYWdlTWFuYWdlci5jb3VudCgpLCBjdXJyZW50UGFnZUluZGV4ID0gdGhpcy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBhZ2VJbmRleCA8IG51bVBhZ2VzIC0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvVG8oY3VycmVudFBhZ2VJbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cm9jZWRlIGEgbGEgcMOhZ2luYSBhbnRlcmlvciBzaSBleGlzdGUuXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlfGJvb2xlYW59IFByb21lc2EgcXVlIGVzIHJlc3VlbHRhIGFsIGZpbmFsaXphcnNlIGVsIHByb2Nlc28gY29tcGxldG8gZGUgY2FtYmlvIGRlXG4gICAgICAgICAqIHDDoWdpbmEuIEZhbHNlIHNpIG5vIHNlIHJlYWxpemEgZWwgY2FtYmlvXG4gICAgICAgICAqL1xuICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBhZ2VJbmRleCA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29UbyhjdXJyZW50UGFnZUluZGV4IC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZvY2FkbyBhbCBmaW5hbGl6YXJzZSBsYSBhbmltYWNpw7NuIGRlbCBjYW1iaW8gZGUgcMOhZ2luYVxuICAgICAgICAgKiBAcGFyYW0ge1BhZ2VJbXBsZW1lbnRhdGlvbn0gICAgICBuZXdQYWdlICAgICBQw6FnaW5hIGFjdGl2YWRhXG4gICAgICAgICAqIEBwYXJhbSB7SU5hdmlnYXRvclBhZ2VEYXRhfSAgICAgIG5ld1BhZ2VEYXRhIERhdG9zIGRlIGxhIHDDoWdpbmEgYWN0aXZhZGFcbiAgICAgICAgICogQHBhcmFtIHtQYWdlSW1wbGVtZW50YXRpb259ICAgICAgb2xkUGFnZSAgICAgUMOhZ2luYSBkZXNhY3RpdmFkYVxuICAgICAgICAgKiBAcGFyYW0ge0lOYXZpZ2F0b3JQYWdlRGF0YX0gICAgICBvbGRQYWdlRGF0YSBEYXRvcyBkZSBsYSBww6FnaW5hIGRlc2FjdGl2YWRhXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5RGVmZXJyZWR9ICAgICAgICAgIGRlZmVyICAgICAgIERlZmVycmVkIGEgcmVzb2x2ZXIgcGFyYSBpbmRpY2FyIHF1ZSBlbCBwcm9jZXNvIGhhIGZpbmFsaXphZG9cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuX29uUGFnZVNob3dFbmQgPSBmdW5jdGlvbiAobmV3UGFnZSwgbmV3UGFnZURhdGEsIG9sZFBhZ2UsIG9sZFBhZ2VEYXRhLCBkZWZlcikge1xuICAgICAgICAgICAgaWYgKG9sZFBhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IG9sZFBhZ2UuZ2V0Q29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIG9sZFBhZ2UuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5nZXRFbGVtZW50KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl8kY29udGV4dC5yZW1vdmVBdHRyKE5hdmlnYXRvcl8xLkFUVFJfVFJBTlNJVElPTl9UTyk7XG4gICAgICAgICAgICB0aGlzLl8kY29udGV4dC5hdHRyKE5hdmlnYXRvcl8xLkFUVFJfQ1VSUkVOVCwgbmV3UGFnZURhdGEubmFtZSk7XG4gICAgICAgICAgICAvL3RyaWdnZXIgZXZlbnQgaW4gbmF2aWdhdG9yXG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihOYXZpZ2F0b3JfMS5PTl9DSEFOR0VfUEFHRV9FTkQsIFtuZXdQYWdlRGF0YSwgb2xkUGFnZURhdGFdKTtcbiAgICAgICAgICAgIC8vdHJpZ2dlciBhIGdsb2JhbCBldmVudCB0aGF0IGNvdWxkIGJlIGxpc3RlbmVkIGJ5IGFueW9uZVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLmdsb2JhbEVtaXR0ZXIudHJpZ2dlcihOYXZpZ2F0b3JfMS5PTl9DSEFOR0VfUEFHRV9FTkQsIFtuZXdQYWdlRGF0YSwgb2xkUGFnZURhdGFdKTtcbiAgICAgICAgICAgIGRlZmVyLnJlc29sdmUobmV3UGFnZURhdGEsIG9sZFBhZ2VEYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9idGllbmUgZWwgw61uZGljZSBkZSBsYSBww6FnaW5hIGFjdHVhbFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlSW5kZXg7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnRpZW5lIGxhIGltcGxlbWVudGFjacOzbiBkZSBww6FnaW5hIGFjdHVhbFxuICAgICAgICAgKiBAcmV0dXJucyB7UGFnZUltcGxlbWVudGF0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldnVlbHZlIGxvcyBkYXRvcyBkZSBsYSBww6FnaW5hIGFjdHVhbFxuICAgICAgICAgKiBAcmV0dXJucyB7SU5hdmlnYXRvclBhZ2VEYXRhfVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLl9jdXJyZW50UGFnZUluZGV4LFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2N1cnJlbnRQYWdlLmdldFBhZ2VOYW1lKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIEV2ZW50RW1pdHRlciNvblxuICAgICAgICAgKiBAcmV0dXJucyB7TmF2aWdhdG9yfVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIEV2ZW50RW1pdHRlciNvbmVcbiAgICAgICAgICogQHJldHVybnMge05hdmlnYXRvcn1cbiAgICAgICAgICovXG4gICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uZShldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIEV2ZW50RW1pdHRlciNvZmZcbiAgICAgICAgICogQHJldHVybnMge05hdmlnYXRvcn1cbiAgICAgICAgICovXG4gICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihldmVudHMsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBOYXZpZ2F0b3I7XG4gICAgfSgpKTtcbiAgICBOYXZpZ2F0b3IuTkFNRVNQQUNFID0gXCJuYXZpZ2F0b3JcIjtcbiAgICBOYXZpZ2F0b3IuT05fRFJBV19QQUdFID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6ZHJhd1wiO1xuICAgIE5hdmlnYXRvci5PTl9ESVNBQkxFID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6ZGlzYWJsZVwiO1xuICAgIE5hdmlnYXRvci5PTl9FTkFCTEUgPSBOYXZpZ2F0b3JfMS5OQU1FU1BBQ0UgKyBcIjplbmFibGVcIjtcbiAgICBOYXZpZ2F0b3IuT05fQ0hBTkdFX1BBR0VfRU5EID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6Y2hhbmdlZW5kXCI7XG4gICAgTmF2aWdhdG9yLk9OX0NIQU5HRV9QQUdFX1NUQVJUID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6Y2hhbmdlc3RhcnRcIjtcbiAgICBOYXZpZ2F0b3IuQVRUUl9UUkFOU0lUSU9OX1RPID0gXCJkYXRhLWh6LW5hdmlnYXRvci10cmFuc2l0aW9uLXRvXCI7XG4gICAgTmF2aWdhdG9yLkFUVFJfQ1VSUkVOVCA9IFwiZGF0YS1oei1uYXZpZ2F0b3ItcGFnZVwiO1xuICAgIE5hdmlnYXRvciA9IE5hdmlnYXRvcl8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICBuYW1lOiBcIk5hdmlnYXRvclwiLFxuICAgICAgICAgICAgcHVibGljOiB0cnVlLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICBwYWdlXzEuUGFnZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgTmF2aWdhdG9yKTtcbiAgICBleHBvcnRzLk5hdmlnYXRvciA9IE5hdmlnYXRvcjtcbiAgICB2YXIgTmF2aWdhdG9yXzE7XG59KTtcbiJdLCJmaWxlIjoibmF2aWdhdG9yL05hdmlnYXRvci5qcyJ9
