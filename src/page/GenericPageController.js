System.register(["../di", "../jquery", "./PageController", "../resource"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, PageController_1, resource_1, GenericPageController;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (PageController_1_1) {
                PageController_1 = PageController_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            }
        ],
        execute: function () {
            GenericPageController = (function (_super) {
                __extends(GenericPageController, _super);
                function GenericPageController() {
                    return _super.apply(this, arguments) || this;
                }
                GenericPageController.prototype._render = function (template) {
                    var render = _super.prototype._render.call(this, template);
                    render.hide();
                    return render;
                };
                GenericPageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
                    var _this = this;
                    var defer = jquery_1.$.Deferred();
                    if ($oldPage) {
                        $oldPage.fadeOut(400, function () {
                            _this.$element.fadeIn(400, function () {
                                defer.resolve();
                            });
                        });
                    }
                    else {
                        this.$element.fadeIn(400, function () {
                            defer.resolve();
                        });
                    }
                    return defer.promise();
                };
                return GenericPageController;
            }(PageController_1.PageController));
            GenericPageController = __decorate([
                di_1.Page({
                    name: "GenericPageController",
                    dependencies: [
                        jquery_1.$,
                        di_1.InjectorService,
                        resource_1.ResourceInitializerService
                    ]
                })
            ], GenericPageController);
            exports_1("GenericPageController", GenericPageController);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0dlbmVyaWNQYWdlQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL1BhZ2VDb250cm9sbGVyXCIsIFwiLi4vcmVzb3VyY2VcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tb2R1bGVOYW1lID0gY29udGV4dF8xICYmIGNvbnRleHRfMS5pZDtcbiAgICB2YXIgZGlfMSwganF1ZXJ5XzEsIFBhZ2VDb250cm9sbGVyXzEsIHJlc291cmNlXzEsIEdlbmVyaWNQYWdlQ29udHJvbGxlcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGlfMV8xKSB7XG4gICAgICAgICAgICAgICAgZGlfMSA9IGRpXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoanF1ZXJ5XzFfMSkge1xuICAgICAgICAgICAgICAgIGpxdWVyeV8xID0ganF1ZXJ5XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoUGFnZUNvbnRyb2xsZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXJfMSA9IFBhZ2VDb250cm9sbGVyXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb3VyY2VfMV8xKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfMSA9IHJlc291cmNlXzFfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoR2VuZXJpY1BhZ2VDb250cm9sbGVyLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEdlbmVyaWNQYWdlQ29udHJvbGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEdlbmVyaWNQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyID0gX3N1cGVyLnByb3RvdHlwZS5fcmVuZGVyLmNhbGwodGhpcywgdGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uICgkb2xkUGFnZSwgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyID0ganF1ZXJ5XzEuJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJG9sZFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRvbGRQYWdlLmZhZGVPdXQoNDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuZmFkZUluKDQwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuZmFkZUluKDQwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2VuZXJpY1BhZ2VDb250cm9sbGVyO1xuICAgICAgICAgICAgfShQYWdlQ29udHJvbGxlcl8xLlBhZ2VDb250cm9sbGVyKSk7XG4gICAgICAgICAgICBHZW5lcmljUGFnZUNvbnRyb2xsZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLlBhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdlbmVyaWNQYWdlQ29udHJvbGxlclwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLiQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaV8xLkluamVjdG9yU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlXzEuUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBHZW5lcmljUGFnZUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCIsIEdlbmVyaWNQYWdlQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvR2VuZXJpY1BhZ2VDb250cm9sbGVyLmpzIn0=
