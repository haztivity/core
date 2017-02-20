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
        define(["require", "exports", "../utils", "../di", "../page", "../navigator", "./Errors", "../resource", "../component"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var utils_1 = require("../utils");
    var di_1 = require("../di");
    var page_1 = require("../page");
    var navigator_1 = require("../navigator");
    var Errors_1 = require("./Errors");
    var resource_1 = require("../resource");
    var component_1 = require("../component");
    var ScoController = ScoController_1 = (function () {
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
    exports.ScoController = ScoController;
    var ScoController_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vU2NvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vdXRpbHNcIiwgXCIuLi9kaVwiLCBcIi4uL3BhZ2VcIiwgXCIuLi9uYXZpZ2F0b3JcIiwgXCIuL0Vycm9yc1wiLCBcIi4uL3Jlc291cmNlXCIsIFwiLi4vY29tcG9uZW50XCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBwYWdlXzEgPSByZXF1aXJlKFwiLi4vcGFnZVwiKTtcbiAgICB2YXIgbmF2aWdhdG9yXzEgPSByZXF1aXJlKFwiLi4vbmF2aWdhdG9yXCIpO1xuICAgIHZhciBFcnJvcnNfMSA9IHJlcXVpcmUoXCIuL0Vycm9yc1wiKTtcbiAgICB2YXIgcmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuLi9yZXNvdXJjZVwiKTtcbiAgICB2YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50XCIpO1xuICAgIHZhciBTY29Db250cm9sbGVyID0gU2NvQ29udHJvbGxlcl8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU2NvQ29udHJvbGxlcihfTmF2aWdhdG9yLCBfUGFnZU1hbmFnZXIsIF9SZXNvdXJjZU1hbmFnZXIsIF9FdmVudEVtaXR0ZXJGYWN0b3J5LCBfQ29tcG9uZW50TWFuYWdlciwgX0NvbXBvbmVudEluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICB0aGlzLl9OYXZpZ2F0b3IgPSBfTmF2aWdhdG9yO1xuICAgICAgICAgICAgdGhpcy5fUGFnZU1hbmFnZXIgPSBfUGFnZU1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl9SZXNvdXJjZU1hbmFnZXIgPSBfUmVzb3VyY2VNYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeSA9IF9FdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgdGhpcy5fQ29tcG9uZW50TWFuYWdlciA9IF9Db21wb25lbnRNYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fQ29tcG9uZW50SW5pdGlhbGl6ZXIgPSBfQ29tcG9uZW50SW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIgPSB0aGlzLl9FdmVudEVtaXR0ZXJGYWN0b3J5LmNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX0NvbXBvbmVudE1hbmFnZXIuYWRkQWxsKHRoaXMuX29wdGlvbnMuY29tcG9uZW50cyB8fCBbXSk7XG4gICAgICAgICAgICB0aGlzLl9QYWdlTWFuYWdlci5hZGRQYWdlcyh0aGlzLl9vcHRpb25zLnBhZ2VzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuXyRjb250ZXh0ID0gJChcIltkYXRhLWh6LWFwcF1cIik7XG4gICAgICAgICAgICAvL2NvbnRleHQgbXVzdCBleGlzdHNcbiAgICAgICAgICAgIGlmICh0aGlzLl8kY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbnRleHQuYWRkQ2xhc3MoU2NvQ29udHJvbGxlcl8xLkNMQVNTX0NPTlRFWFQpO1xuICAgICAgICAgICAgICAgIHRoaXMuXyRwYWdlc0NvbnRhaW5lciA9IHRoaXMuXyRjb250ZXh0LmZpbmQoXCJbZGF0YS1oei1wYWdlc11cIik7XG4gICAgICAgICAgICAgICAgLy9wYWdlIGNvbnRleHRzIG11c3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuXyRwYWdlc0NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eVBhZ2VzQ29udGV4dE5vdEZvdW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkhhenRpdml0eUFwcENvbnRleHROb3RGb3VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTY29Db250cm9sbGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICB0aGlzLl9OYXZpZ2F0b3IuYWN0aXZhdGUodGhpcy5fJHBhZ2VzQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMuXyRwYWdlc0NvbnRhaW5lci5hZGRDbGFzcyhTY29Db250cm9sbGVyXzEuQ0xBU1NfUEFHRVMpO1xuICAgICAgICAgICAgdGhpcy5fQ29tcG9uZW50SW5pdGlhbGl6ZXIuaW5pdGlhbGl6ZSh0aGlzLl8kY29udGV4dCk7XG4gICAgICAgICAgICAvL2luaXQgY29tcG9uZW50c1xuICAgICAgICAgICAgdGhpcy5fTmF2aWdhdG9yLmdvVG8oMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNjb0NvbnRyb2xsZXI7XG4gICAgfSgpKTtcbiAgICBTY29Db250cm9sbGVyLkNMQVNTX0NPTlRFWFQgPSBcImh6LWNvbnRhaW5lclwiO1xuICAgIFNjb0NvbnRyb2xsZXIuQ0xBU1NfUEFHRVMgPSBcImh6LXBhZ2VzLWNvbnRhaW5lclwiO1xuICAgIFNjb0NvbnRyb2xsZXIgPSBTY29Db250cm9sbGVyXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZGlfMS5TY28oe1xuICAgICAgICAgICAgbmFtZTogXCJTY29Db250cm9sbGVyXCIsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3JfMS5OYXZpZ2F0b3IsXG4gICAgICAgICAgICAgICAgcGFnZV8xLlBhZ2VNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIHJlc291cmNlXzEuUmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIHV0aWxzXzEuRXZlbnRFbWl0dGVyRmFjdG9yeSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRfMS5Db21wb25lbnRNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudF8xLkNvbXBvbmVudEluaXRpYWxpemVyXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgU2NvQ29udHJvbGxlcik7XG4gICAgZXhwb3J0cy5TY29Db250cm9sbGVyID0gU2NvQ29udHJvbGxlcjtcbiAgICB2YXIgU2NvQ29udHJvbGxlcl8xO1xufSk7XG4iXSwiZmlsZSI6InNjby9TY28uanMifQ==
