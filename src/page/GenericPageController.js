System.register(["../di", "../jquery", "./PageController", "../resource"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
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
                function GenericPageController(_$, _InjectorService, _ResourceInitializerService, _ResourceSequenceFactory) {
                    var _this = _super.call(this, _$, _InjectorService, _ResourceInitializerService) || this;
                    _this._sequences = [];
                    _this._ResourceSequenceFactory = _ResourceSequenceFactory;
                    return _this;
                }
                /**
                 * Crea una secuencia
                 * @param items
                 * @returns {ResourceSequence}
                 * @see ResourceSequenceFactory
                 */
                GenericPageController.prototype.createResourceSequence = function (items) {
                    var sequence = this._ResourceSequenceFactory.createSequence(items);
                    this._sequences.push(sequence);
                    return sequence;
                };
                GenericPageController.prototype._render = function (template) {
                    var render = _super.prototype._render.call(this, template);
                    render.hide();
                    return render;
                };
                GenericPageController.prototype._initializeResources = function () {
                    _super.prototype._initializeResources.call(this);
                    if (this.options.autoSequence != false) {
                        this.createResourceSequence(this._resources).run();
                    }
                    return this._resources;
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
                        resource_1.ResourceInitializerService,
                        resource_1.ResourceSequenceFactory
                    ]
                })
            ], GenericPageController);
            exports_1("GenericPageController", GenericPageController);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0dlbmVyaWNQYWdlQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL1BhZ2VDb250cm9sbGVyXCIsIFwiLi4vcmVzb3VyY2VcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBqcXVlcnlfMSwgUGFnZUNvbnRyb2xsZXJfMSwgcmVzb3VyY2VfMSwgR2VuZXJpY1BhZ2VDb250cm9sbGVyO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAganF1ZXJ5XzEgPSBqcXVlcnlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChQYWdlQ29udHJvbGxlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlcl8xID0gUGFnZUNvbnRyb2xsZXJfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNvdXJjZV8xXzEpIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xID0gcmVzb3VyY2VfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHZW5lcmljUGFnZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhHZW5lcmljUGFnZUNvbnRyb2xsZXIsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gR2VuZXJpY1BhZ2VDb250cm9sbGVyKF8kLCBfSW5qZWN0b3JTZXJ2aWNlLCBfUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2UsIF9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBfJCwgX0luamVjdG9yU2VydmljZSwgX1Jlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VxdWVuY2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSA9IF9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDcmVhIHVuYSBzZWN1ZW5jaWFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gaXRlbXNcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7UmVzb3VyY2VTZXF1ZW5jZX1cbiAgICAgICAgICAgICAgICAgKiBAc2VlIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVSZXNvdXJjZVNlcXVlbmNlID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IHRoaXMuX1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5LmNyZWF0ZVNlcXVlbmNlKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VxdWVuY2VzLnB1c2goc2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VxdWVuY2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBHZW5lcmljUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbmRlciA9IF9zdXBlci5wcm90b3R5cGUuX3JlbmRlci5jYWxsKHRoaXMsIHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlcjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEdlbmVyaWNQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX2luaXRpYWxpemVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuX2luaXRpYWxpemVSZXNvdXJjZXMuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvU2VxdWVuY2UgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVzb3VyY2VTZXF1ZW5jZSh0aGlzLl9yZXNvdXJjZXMpLnJ1bigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBHZW5lcmljUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLl9zaG93ID0gZnVuY3Rpb24gKCRvbGRQYWdlLCBvbGRQYWdlUmVsYXRpdmVQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmZXIgPSBqcXVlcnlfMS4kLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkb2xkUGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJG9sZFBhZ2UuZmFkZU91dCg0MDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5mYWRlSW4oNDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5mYWRlSW4oNDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBHZW5lcmljUGFnZUNvbnRyb2xsZXI7XG4gICAgICAgICAgICB9KFBhZ2VDb250cm9sbGVyXzEuUGFnZUNvbnRyb2xsZXIpKTtcbiAgICAgICAgICAgIEdlbmVyaWNQYWdlQ29udHJvbGxlciA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGRpXzEuUGFnZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpXzEuSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfMS5SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlXzEuUmVzb3VyY2VTZXF1ZW5jZUZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBHZW5lcmljUGFnZUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCIsIEdlbmVyaWNQYWdlQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvR2VuZXJpY1BhZ2VDb250cm9sbGVyLmpzIn0=
