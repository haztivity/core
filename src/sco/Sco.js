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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vU2NvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi91dGlsc1wiLCBcIi4uL2RpXCIsIFwiLi4vcGFnZVwiLCBcIi4uL25hdmlnYXRvclwiLCBcIi4vRXJyb3JzXCIsIFwiLi4vcmVzb3VyY2VcIiwgXCIuLi9jb21wb25lbnRcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciB1dGlsc18xLCBkaV8xLCBwYWdlXzEsIG5hdmlnYXRvcl8xLCBFcnJvcnNfMSwgcmVzb3VyY2VfMSwgY29tcG9uZW50XzEsIFNjb0NvbnRyb2xsZXIsIFNjb0NvbnRyb2xsZXJfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAodXRpbHNfMV8xKSB7XG4gICAgICAgICAgICAgICAgdXRpbHNfMSA9IHV0aWxzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocGFnZV8xXzEpIHtcbiAgICAgICAgICAgICAgICBwYWdlXzEgPSBwYWdlXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAobmF2aWdhdG9yXzFfMSkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvcl8xID0gbmF2aWdhdG9yXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoRXJyb3JzXzFfMSkge1xuICAgICAgICAgICAgICAgIEVycm9yc18xID0gRXJyb3JzXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb3VyY2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfMSA9IHJlc291cmNlXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoY29tcG9uZW50XzFfMSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudF8xID0gY29tcG9uZW50XzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU2NvQ29udHJvbGxlciA9IFNjb0NvbnRyb2xsZXJfMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2NvQ29udHJvbGxlcihfTmF2aWdhdG9yLCBfUGFnZU1hbmFnZXIsIF9SZXNvdXJjZU1hbmFnZXIsIF9FdmVudEVtaXR0ZXJGYWN0b3J5LCBfQ29tcG9uZW50TWFuYWdlciwgX0NvbXBvbmVudEluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX05hdmlnYXRvciA9IF9OYXZpZ2F0b3I7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1BhZ2VNYW5hZ2VyID0gX1BhZ2VNYW5hZ2VyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIgPSBfUmVzb3VyY2VNYW5hZ2VyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5ID0gX0V2ZW50RW1pdHRlckZhY3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0NvbXBvbmVudE1hbmFnZXIgPSBfQ29tcG9uZW50TWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fQ29tcG9uZW50SW5pdGlhbGl6ZXIgPSBfQ29tcG9uZW50SW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IHRoaXMuX0V2ZW50RW1pdHRlckZhY3RvcnkuY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9Db21wb25lbnRNYW5hZ2VyLmFkZEFsbCh0aGlzLl9vcHRpb25zLmNvbXBvbmVudHMgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9QYWdlTWFuYWdlci5hZGRQYWdlcyh0aGlzLl9vcHRpb25zLnBhZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQgPSAkKFwiW2RhdGEtaHotYXBwXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb250ZXh0IG11c3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl8kY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGV4dC5hZGRDbGFzcyhTY29Db250cm9sbGVyXzEuQ0xBU1NfQ09OVEVYVCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kcGFnZXNDb250YWluZXIgPSB0aGlzLl8kY29udGV4dC5maW5kKFwiW2RhdGEtaHotcGFnZXNdXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYWdlIGNvbnRleHRzIG11c3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fJHBhZ2VzQ29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5IYXp0aXZpdHlQYWdlc0NvbnRleHROb3RGb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fTmF2aWdhdG9yLmFjdGl2YXRlKHRoaXMuXyRwYWdlc0NvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRwYWdlc0NvbnRhaW5lci5hZGRDbGFzcyhTY29Db250cm9sbGVyXzEuQ0xBU1NfUEFHRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9Db21wb25lbnRJbml0aWFsaXplci5pbml0aWFsaXplKHRoaXMuXyRjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0IGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fTmF2aWdhdG9yLmdvVG8oMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNjb0NvbnRyb2xsZXI7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgU2NvQ29udHJvbGxlci5DTEFTU19DT05URVhUID0gXCJoei1jb250YWluZXJcIjtcbiAgICAgICAgICAgIFNjb0NvbnRyb2xsZXIuQ0xBU1NfUEFHRVMgPSBcImh6LXBhZ2VzLWNvbnRhaW5lclwiO1xuICAgICAgICAgICAgU2NvQ29udHJvbGxlciA9IFNjb0NvbnRyb2xsZXJfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGRpXzEuU2NvKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTY29Db250cm9sbGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yXzEuTmF2aWdhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZV8xLlBhZ2VNYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfMS5SZXNvdXJjZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRfMS5Db21wb25lbnRNYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50XzEuQ29tcG9uZW50SW5pdGlhbGl6ZXJcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBTY29Db250cm9sbGVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlNjb0NvbnRyb2xsZXJcIiwgU2NvQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InNjby9TY28uanMifQ==
