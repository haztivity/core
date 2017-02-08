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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuLi9kaVwiLCBcIi4vUGFnZVJlZ2lzdGVyXCIsIFwiLi9HZW5lcmljUGFnZUNvbnRyb2xsZXJcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBQYWdlUmVnaXN0ZXJfMSwgR2VuZXJpY1BhZ2VDb250cm9sbGVyXzEsIFBhZ2VGYWN0b3J5LCBQYWdlRmFjdG9yeV8xO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChQYWdlUmVnaXN0ZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgUGFnZVJlZ2lzdGVyXzEgPSBQYWdlUmVnaXN0ZXJfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChHZW5lcmljUGFnZUNvbnRyb2xsZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyXzEgPSBHZW5lcmljUGFnZUNvbnRyb2xsZXJfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBQYWdlRmFjdG9yeSA9IFBhZ2VGYWN0b3J5XzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFBhZ2VGYWN0b3J5KCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBHZW5lcmEgdW5hIHDDoWdpbmEgZ2Vuw6lyaWNhXG4gICAgICAgICAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SVBhZ2VPcHRpb25zfSAgICBvcHRpb25zICAgICBPcGNpb25lcyBwYXJhIGxhIGNyZWFjacOzbiBkZSBsYSBww6FnaW5hXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge1BhZ2V9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgUGFnZUZhY3RvcnkuY3JlYXRlUGFnZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBQYWdlRElGYWN0b3J5ID0gZGlfMS5JbmplY3Rvci5nZXRJbnN0YW5jZShQYWdlRmFjdG9yeV8xKS5nZXQoUGFnZVJlZ2lzdGVyXzEuUGFnZVJlZ2lzdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBQYWdlRElGYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IFBhZ2VDb250cm9sbGVyIGFzIGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IFwiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFnZS5hY3RpdmF0ZShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFnZUZhY3Rvcnk7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgUGFnZUZhY3RvcnkgPSBQYWdlRmFjdG9yeV8xID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5Db3JlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQYWdlRmFjdG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdlbmVyaWNQYWdlQ29udHJvbGxlcl8xLkdlbmVyaWNQYWdlQ29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFBhZ2VGYWN0b3J5KTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIlBhZ2VGYWN0b3J5XCIsIFBhZ2VGYWN0b3J5KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoicGFnZS9QYWdlRmFjdG9yeS5qcyJ9
