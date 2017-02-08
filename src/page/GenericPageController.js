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
//# sourceMappingURL=GenericPageController.js.map