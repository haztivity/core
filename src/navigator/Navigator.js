System.register(["../jquery", "../di", "../page", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var jquery_1, di_1, page_1, utils_1, Navigator, Navigator_1;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Navigator = Navigator_1 = (function () {
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
            exports_1("Navigator", Navigator);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYXZpZ2F0b3IvTmF2aWdhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9qcXVlcnlcIiwgXCIuLi9kaVwiLCBcIi4uL3BhZ2VcIiwgXCIuLi91dGlsc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGpxdWVyeV8xLCBkaV8xLCBwYWdlXzEsIHV0aWxzXzEsIE5hdmlnYXRvciwgTmF2aWdhdG9yXzE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKGpxdWVyeV8xXzEpIHtcbiAgICAgICAgICAgICAgICBqcXVlcnlfMSA9IGpxdWVyeV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHBhZ2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgcGFnZV8xID0gcGFnZV8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHV0aWxzXzFfMSkge1xuICAgICAgICAgICAgICAgIHV0aWxzXzEgPSB1dGlsc18xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIE5hdmlnYXRvciA9IE5hdmlnYXRvcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBHZXN0aW9uYSBsYSB0cmFuc2ljacOzbiBlbnRyZSBww6FnaW5hcyB5IGVsIHJlbmRlcml6YWRvIGRlIGxhcyBtaXNtYXMgZW4gdW4gY29udGV4dG8gZXNwZWPDrWZpY29cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeVN0YXRpY30gICAgICAgICAgICAgICAgXyRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1BhZ2VNYW5hZ2VyfSAgICAgICAgICAgICAgICAgX1BhZ2VNYW5hZ2VyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJGYWN0b3J5fSAgICAgICAgIF9FdmVudEVtaXR0ZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTmF2aWdhdG9yKF8kLCBfUGFnZU1hbmFnZXIsIF9FdmVudEVtaXR0ZXJGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUGFnZU1hbmFnZXIgPSBfUGFnZU1hbmFnZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkgPSBfRXZlbnRFbWl0dGVyRmFjdG9yeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgkY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dCA9ICRjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIgPSB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5LmNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE5hdmVnYSBhIGxhIHDDoWdpbmEgc29saWNpdGFkYS5cbiAgICAgICAgICAgICAgICAgKiBEZWJlIGVzdGFyIHJlZ2lzdHJhZGEgZW4gUGFnZU1hbmFnZXJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggICAgw41uZGljZSBkZSBsYSBww6FnaW5hIGEgbmF2ZWdhclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlfGJvb2xlYW59IFByb21lc2EgcXVlIGVzIHJlc3VlbHRhIGFsIGZpbmFsaXphcnNlIGVsIHByb2Nlc28gY29tcGxldG8gZGUgY2FtYmlvIGRlXG4gICAgICAgICAgICAgICAgICogcMOhZ2luYS4gRmFsc2Ugc2kgbm8gc2UgcmVhbGl6YSBlbCBjYW1iaW9cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmdvVG8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCgpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dldCB0aGUgcGFnZSByZXF1ZXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdQYWdlID0gdGhpcy5fUGFnZU1hbmFnZXIuZ2V0UGFnZShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZSBwYWdlIG11c3QgYmUgcHJvdmlkZWQgYW5kIGRpZmZlcmVudCBvZiB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3UGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdQYWdlICE9PSB0aGlzLl9jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlKCksIC8vZ2V0IGN1cnJlbnQgcGFnZSBhbmQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2VJbmRleCA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VJbmRleCgpLCBjdXJyZW50UGFnZUlzID0gY3VycmVudFBhZ2VJbmRleCAtIGluZGV4IDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAxOyAvL2NoZWNrIHRoZSBwb3NpdGlvbiBvZiB0aGUgb2xkIHBhZ2UgcmVsYXRpdmUgdG8gdGhlIG5ldyBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcmVzb3VyY2VzIGFyZSBjb21wbGV0ZWQgdG8gZ28gdG8gdGhlIG5leHQgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2VJcyA9PT0gMSB8fCAoY3VycmVudFBhZ2UgPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRQYWdlLmdldENvbnRyb2xsZXIoKS5pc0NvbXBsZXRlZCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzICYmIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFJlbmRlclByb2Nlc3MucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UmVuZGVyUHJvY2VzcyA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gbmV3UGFnZTsgLy9zZXQgbmV3IHBhZ2UgYXMgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhZ2VJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BhZ2VOYW1lID0gbmV3UGFnZS5nZXRQYWdlTmFtZSgpLCAvL2dldCBuYW1lIG9mIG5ldyBjb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYWdlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmV3UGFnZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGN1cnJlbnRQYWdlRGF0YSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRQYWdlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnRQYWdlLmdldFBhZ2VOYW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90cmlnZ2VyIGV2ZW50IGluIG5hdmlnYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fQ0hBTkdFX1BBR0VfU1RBUlQsIG5ld1BhZ2VEYXRhLCBjdXJyZW50UGFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90cmlnZ2VyIGEgZ2xvYmFsIGV2ZW50IHRoYXQgY291bGQgYmUgbGlzdGVuZWQgYnkgYW55b25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZ2xvYmFsRW1pdHRlci50cmlnZ2VyKE5hdmlnYXRvcl8xLk9OX0NIQU5HRV9QQUdFX1NUQVJULCBuZXdQYWdlRGF0YSwgY3VycmVudFBhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UGFnZUVsZW1lbnQgPSBjdXJyZW50UGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY3VycmVudFBhZ2UuZ2V0Q29udHJvbGxlcigpLmdldEVsZW1lbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCwgLy9nZXQgY3VycmVudCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYWdlQ29udHJvbGxlciA9IG5ld1BhZ2UuZ2V0Q29udHJvbGxlcigpLCAvL2NyZWF0ZSBhIGNvbnRyb2xsZXIgZm9yIG5ldyBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYWdlRWxlbWVudCA9IG5ld1BhZ2UucmVuZGVyKCk7IC8vZ2V0IHRoZSByZW5kZXJlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSBuZXcgcGFnZSBpcyBiZWZvcmUgdG8gdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQucHJlcGVuZChuZXdQYWdlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5hcHBlbmQobmV3UGFnZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsaXplIHJlc291cmNlcyBhbmQgdHJpZ2dlciByZW5kZXJlZCBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFnZS5wb3N0UmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5yZW1vdmVBdHRyKE5hdmlnYXRvcl8xLkFUVFJfQ1VSUkVOVCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5hdHRyKE5hdmlnYXRvcl8xLkFUVFJfVFJBTlNJVElPTl9UTywgbmV3UGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90cmlnZ2VyIGV2ZW50IGluIG5hdmlnYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fRFJBV19QQUdFLCBuZXdQYWdlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyaWdnZXIgYSBnbG9iYWwgZXZlbnQgdGhhdCBjb3VsZCBiZSBsaXN0ZW5lZCBieSBhbnlvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5nbG9iYWxFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fRFJBV19QQUdFLCBuZXdQYWdlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob3dQcm9taXNlID0gbmV3UGFnZUNvbnRyb2xsZXIuc2hvdyhjdXJyZW50UGFnZUVsZW1lbnQsIGN1cnJlbnRQYWdlSXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2hvd1Byb21pc2UudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1Byb21pc2UudGhlbih0aGlzLl9vblBhZ2VTaG93RW5kLmJpbmQodGhpcywgbmV3UGFnZSwgbmV3UGFnZURhdGEsIGN1cnJlbnRQYWdlLCBjdXJyZW50UGFnZURhdGEsIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblBhZ2VTaG93RW5kKG5ld1BhZ2UsIG5ld1BhZ2VEYXRhLCBjdXJyZW50UGFnZSwgY3VycmVudFBhZ2VEYXRhLCB0aGlzLl9jdXJyZW50UmVuZGVyUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZW5kZXJQcm9jZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERldnVlbHZlIHVuIGFycmF5IGNvbiBsb3Mgw61uZGljZXMgZGUgbGFzIHDDoWdpbmFzIHF1ZSBoYXlhbiBzaWRvIHZpc2l0YWRhc1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmdldFZpc2l0ZWRQYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VzTGVuZ3RoID0gdGhpcy5fUGFnZU1hbmFnZXIuY291bnQoKSwgcGFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcGFnZUluZGV4ID0gMDsgcGFnZUluZGV4IDwgcGFnZXNMZW5ndGg7IHBhZ2VJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSB0aGlzLl9QYWdlTWFuYWdlci5nZXRQYWdlKHBhZ2VJbmRleCksIHN0YXRlID0gY3VycmVudFBhZ2UuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaChwYWdlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERldnVlbHZlIGVsIGVzdGFkbyBhY3R1YWwgZGUgZGVzaGFiaWxpdGFkb1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuaXNEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRXN0YWJsZWNlIGVsIGVzdGFkbyBkZSBkZXNoYWJpbGl0YWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSAgICAgZGlzYWJsZWQgICAgICAgIEVzdGFkbyBhIGVzdGFibGVjZXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLnNldERpc2FibGVkID0gZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihOYXZpZ2F0b3JfMS5PTl9FTkFCTEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fRElTQUJMRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEhhYmlsaXRhIGxhIG5hdmVnYWNpw7NuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVzaGFiaWxpdGEgbGEgbmF2ZWdhY2nDs25cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZXRyb2NlZGUgYSBsYSBww6FnaW5hIHBvc3RlcmlvciBzaSBleGlzdGUuXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2V8Ym9vbGVhbn0gUHJvbWVzYSBxdWUgZXMgcmVzdWVsdGEgYWwgZmluYWxpemFyc2UgZWwgcHJvY2VzbyBjb21wbGV0byBkZSBjYW1iaW8gZGVcbiAgICAgICAgICAgICAgICAgKiBww6FnaW5hLiBGYWxzZSBzaSBubyBzZSByZWFsaXphIGVsIGNhbWJpb1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bVBhZ2VzID0gdGhpcy5fUGFnZU1hbmFnZXIuY291bnQoKSwgY3VycmVudFBhZ2VJbmRleCA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2VJbmRleCA8IG51bVBhZ2VzIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29UbyhjdXJyZW50UGFnZUluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJldHJvY2VkZSBhIGxhIHDDoWdpbmEgYW50ZXJpb3Igc2kgZXhpc3RlLlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlfGJvb2xlYW59IFByb21lc2EgcXVlIGVzIHJlc3VlbHRhIGFsIGZpbmFsaXphcnNlIGVsIHByb2Nlc28gY29tcGxldG8gZGUgY2FtYmlvIGRlXG4gICAgICAgICAgICAgICAgICogcMOhZ2luYS4gRmFsc2Ugc2kgbm8gc2UgcmVhbGl6YSBlbCBjYW1iaW9cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UGFnZUluZGV4ID0gdGhpcy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29UbyhjdXJyZW50UGFnZUluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEludm9jYWRvIGFsIGZpbmFsaXphcnNlIGxhIGFuaW1hY2nDs24gZGVsIGNhbWJpbyBkZSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtQYWdlSW1wbGVtZW50YXRpb259ICAgICAgbmV3UGFnZSAgICAgUMOhZ2luYSBhY3RpdmFkYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SU5hdmlnYXRvclBhZ2VEYXRhfSAgICAgIG5ld1BhZ2VEYXRhIERhdG9zIGRlIGxhIHDDoWdpbmEgYWN0aXZhZGFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1BhZ2VJbXBsZW1lbnRhdGlvbn0gICAgICBvbGRQYWdlICAgICBQw6FnaW5hIGRlc2FjdGl2YWRhXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtJTmF2aWdhdG9yUGFnZURhdGF9ICAgICAgb2xkUGFnZURhdGEgRGF0b3MgZGUgbGEgcMOhZ2luYSBkZXNhY3RpdmFkYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5RGVmZXJyZWR9ICAgICAgICAgIGRlZmVyICAgICAgIERlZmVycmVkIGEgcmVzb2x2ZXIgcGFyYSBpbmRpY2FyIHF1ZSBlbCBwcm9jZXNvIGhhIGZpbmFsaXphZG9cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuX29uUGFnZVNob3dFbmQgPSBmdW5jdGlvbiAobmV3UGFnZSwgbmV3UGFnZURhdGEsIG9sZFBhZ2UsIG9sZFBhZ2VEYXRhLCBkZWZlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkUGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBvbGRQYWdlLmdldENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFBhZ2UuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmdldEVsZW1lbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5yZW1vdmVBdHRyKE5hdmlnYXRvcl8xLkFUVFJfVFJBTlNJVElPTl9UTyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0LmF0dHIoTmF2aWdhdG9yXzEuQVRUUl9DVVJSRU5ULCBuZXdQYWdlRGF0YS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy90cmlnZ2VyIGV2ZW50IGluIG5hdmlnYXRvclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIudHJpZ2dlcihOYXZpZ2F0b3JfMS5PTl9DSEFOR0VfUEFHRV9FTkQsIFtuZXdQYWdlRGF0YSwgb2xkUGFnZURhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgLy90cmlnZ2VyIGEgZ2xvYmFsIGV2ZW50IHRoYXQgY291bGQgYmUgbGlzdGVuZWQgYnkgYW55b25lXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5nbG9iYWxFbWl0dGVyLnRyaWdnZXIoTmF2aWdhdG9yXzEuT05fQ0hBTkdFX1BBR0VfRU5ELCBbbmV3UGFnZURhdGEsIG9sZFBhZ2VEYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUobmV3UGFnZURhdGEsIG9sZFBhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgZWwgw61uZGljZSBkZSBsYSBww6FnaW5hIGFjdHVhbFxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2VJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE9idGllbmUgbGEgaW1wbGVtZW50YWNpw7NuIGRlIHDDoWdpbmEgYWN0dWFsXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge1BhZ2VJbXBsZW1lbnRhdGlvbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLmdldEN1cnJlbnRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZXZ1ZWx2ZSBsb3MgZGF0b3MgZGUgbGEgcMOhZ2luYSBhY3R1YWxcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7SU5hdmlnYXRvclBhZ2VEYXRhfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5wcm90b3R5cGUuZ2V0Q3VycmVudFBhZ2VEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuX2N1cnJlbnRQYWdlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLl9jdXJyZW50UGFnZS5nZXRQYWdlTmFtZSgpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAc2VlIEV2ZW50RW1pdHRlciNvblxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtOYXZpZ2F0b3J9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHNlZSBFdmVudEVtaXR0ZXIjb25lXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge05hdmlnYXRvcn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudHMsIGRhdGEsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uZShldmVudHMsIGRhdGEsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBzZWUgRXZlbnRFbWl0dGVyI29mZlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtOYXZpZ2F0b3J9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vZmYoZXZlbnRzLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF2aWdhdG9yO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIE5hdmlnYXRvci5OQU1FU1BBQ0UgPSBcIm5hdmlnYXRvclwiO1xuICAgICAgICAgICAgTmF2aWdhdG9yLk9OX0RSQVdfUEFHRSA9IE5hdmlnYXRvcl8xLk5BTUVTUEFDRSArIFwiOmRyYXdcIjtcbiAgICAgICAgICAgIE5hdmlnYXRvci5PTl9ESVNBQkxFID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6ZGlzYWJsZVwiO1xuICAgICAgICAgICAgTmF2aWdhdG9yLk9OX0VOQUJMRSA9IE5hdmlnYXRvcl8xLk5BTUVTUEFDRSArIFwiOmVuYWJsZVwiO1xuICAgICAgICAgICAgTmF2aWdhdG9yLk9OX0NIQU5HRV9QQUdFX0VORCA9IE5hdmlnYXRvcl8xLk5BTUVTUEFDRSArIFwiOmNoYW5nZWVuZFwiO1xuICAgICAgICAgICAgTmF2aWdhdG9yLk9OX0NIQU5HRV9QQUdFX1NUQVJUID0gTmF2aWdhdG9yXzEuTkFNRVNQQUNFICsgXCI6Y2hhbmdlc3RhcnRcIjtcbiAgICAgICAgICAgIE5hdmlnYXRvci5BVFRSX1RSQU5TSVRJT05fVE8gPSBcImRhdGEtaHotbmF2aWdhdG9yLXRyYW5zaXRpb24tdG9cIjtcbiAgICAgICAgICAgIE5hdmlnYXRvci5BVFRSX0NVUlJFTlQgPSBcImRhdGEtaHotbmF2aWdhdG9yLXBhZ2VcIjtcbiAgICAgICAgICAgIE5hdmlnYXRvciA9IE5hdmlnYXRvcl8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOYXZpZ2F0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlXzEuUGFnZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBOYXZpZ2F0b3IpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiTmF2aWdhdG9yXCIsIE5hdmlnYXRvcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6Im5hdmlnYXRvci9OYXZpZ2F0b3IuanMifQ==
