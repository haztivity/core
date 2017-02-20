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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "../jquery", "./PageController", "../resource"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var jquery_1 = require("../jquery");
    var PageController_1 = require("./PageController");
    var resource_1 = require("../resource");
    var GenericPageController = (function (_super) {
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
    exports.GenericPageController = GenericPageController;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL0dlbmVyaWNQYWdlQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuL1BhZ2VDb250cm9sbGVyXCIsIFwiLi4vcmVzb3VyY2VcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIGRpXzEgPSByZXF1aXJlKFwiLi4vZGlcIik7XG4gICAgdmFyIGpxdWVyeV8xID0gcmVxdWlyZShcIi4uL2pxdWVyeVwiKTtcbiAgICB2YXIgUGFnZUNvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL1BhZ2VDb250cm9sbGVyXCIpO1xuICAgIHZhciByZXNvdXJjZV8xID0gcmVxdWlyZShcIi4uL3Jlc291cmNlXCIpO1xuICAgIHZhciBHZW5lcmljUGFnZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoR2VuZXJpY1BhZ2VDb250cm9sbGVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBHZW5lcmljUGFnZUNvbnRyb2xsZXIoXyQsIF9JbmplY3RvclNlcnZpY2UsIF9SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSwgX1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBfJCwgX0luamVjdG9yU2VydmljZSwgX1Jlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMuX3NlcXVlbmNlcyA9IFtdO1xuICAgICAgICAgICAgX3RoaXMuX1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5ID0gX1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5O1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhIHVuYSBzZWN1ZW5jaWFcbiAgICAgICAgICogQHBhcmFtIGl0ZW1zXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZVNlcXVlbmNlfVxuICAgICAgICAgKiBAc2VlIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5XG4gICAgICAgICAqL1xuICAgICAgICBHZW5lcmljUGFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZVJlc291cmNlU2VxdWVuY2UgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IHRoaXMuX1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5LmNyZWF0ZVNlcXVlbmNlKGl0ZW1zKTtcbiAgICAgICAgICAgIHRoaXMuX3NlcXVlbmNlcy5wdXNoKHNlcXVlbmNlKTtcbiAgICAgICAgICAgIHJldHVybiBzZXF1ZW5jZTtcbiAgICAgICAgfTtcbiAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyID0gX3N1cGVyLnByb3RvdHlwZS5fcmVuZGVyLmNhbGwodGhpcywgdGVtcGxhdGUpO1xuICAgICAgICAgICAgcmVuZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXI7XG4gICAgICAgIH07XG4gICAgICAgIEdlbmVyaWNQYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX2luaXRpYWxpemVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9pbml0aWFsaXplUmVzb3VyY2VzLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9TZXF1ZW5jZSAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVzb3VyY2VTZXF1ZW5jZSh0aGlzLl9yZXNvdXJjZXMpLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlcztcbiAgICAgICAgfTtcbiAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uICgkb2xkUGFnZSwgb2xkUGFnZVJlbGF0aXZlUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSBqcXVlcnlfMS4kLkRlZmVycmVkKCk7XG4gICAgICAgICAgICBpZiAoJG9sZFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAkb2xkUGFnZS5mYWRlT3V0KDQwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5mYWRlSW4oNDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5mYWRlSW4oNDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBHZW5lcmljUGFnZUNvbnRyb2xsZXI7XG4gICAgfShQYWdlQ29udHJvbGxlcl8xLlBhZ2VDb250cm9sbGVyKSk7XG4gICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGRpXzEuUGFnZSh7XG4gICAgICAgICAgICBuYW1lOiBcIkdlbmVyaWNQYWdlQ29udHJvbGxlclwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAganF1ZXJ5XzEuJCxcbiAgICAgICAgICAgICAgICBkaV8xLkluamVjdG9yU2VydmljZSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZV8xLlJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHJlc291cmNlXzEuUmVzb3VyY2VTZXF1ZW5jZUZhY3RvcnlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBHZW5lcmljUGFnZUNvbnRyb2xsZXIpO1xuICAgIGV4cG9ydHMuR2VuZXJpY1BhZ2VDb250cm9sbGVyID0gR2VuZXJpY1BhZ2VDb250cm9sbGVyO1xufSk7XG4iXSwiZmlsZSI6InBhZ2UvR2VuZXJpY1BhZ2VDb250cm9sbGVyLmpzIn0=
