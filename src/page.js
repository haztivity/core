(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./page/PageRegister", "./page/PageController", "./page/GenericPageController", "./page/PageFactory", "./page/PageImplementation", "./page/PageManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var PageRegister_1 = require("./page/PageRegister");
    exports.PageRegister = PageRegister_1.PageRegister;
    var PageController_1 = require("./page/PageController");
    exports.PageController = PageController_1.PageController;
    var GenericPageController_1 = require("./page/GenericPageController");
    exports.GenericPageController = GenericPageController_1.GenericPageController;
    var PageFactory_1 = require("./page/PageFactory");
    exports.PageFactory = PageFactory_1.PageFactory;
    var PageImplementation_1 = require("./page/PageImplementation");
    exports.PageImplementation = PageImplementation_1.PageImplementation;
    var PageManager_1 = require("./page/PageManager");
    exports.PageManager = PageManager_1.PageManager;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi9wYWdlL1BhZ2VSZWdpc3RlclwiLCBcIi4vcGFnZS9QYWdlQ29udHJvbGxlclwiLCBcIi4vcGFnZS9HZW5lcmljUGFnZUNvbnRyb2xsZXJcIiwgXCIuL3BhZ2UvUGFnZUZhY3RvcnlcIiwgXCIuL3BhZ2UvUGFnZUltcGxlbWVudGF0aW9uXCIsIFwiLi9wYWdlL1BhZ2VNYW5hZ2VyXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBQYWdlUmVnaXN0ZXJfMSA9IHJlcXVpcmUoXCIuL3BhZ2UvUGFnZVJlZ2lzdGVyXCIpO1xuICAgIGV4cG9ydHMuUGFnZVJlZ2lzdGVyID0gUGFnZVJlZ2lzdGVyXzEuUGFnZVJlZ2lzdGVyO1xuICAgIHZhciBQYWdlQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vcGFnZS9QYWdlQ29udHJvbGxlclwiKTtcbiAgICBleHBvcnRzLlBhZ2VDb250cm9sbGVyID0gUGFnZUNvbnRyb2xsZXJfMS5QYWdlQ29udHJvbGxlcjtcbiAgICB2YXIgR2VuZXJpY1BhZ2VDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9wYWdlL0dlbmVyaWNQYWdlQ29udHJvbGxlclwiKTtcbiAgICBleHBvcnRzLkdlbmVyaWNQYWdlQ29udHJvbGxlciA9IEdlbmVyaWNQYWdlQ29udHJvbGxlcl8xLkdlbmVyaWNQYWdlQ29udHJvbGxlcjtcbiAgICB2YXIgUGFnZUZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL3BhZ2UvUGFnZUZhY3RvcnlcIik7XG4gICAgZXhwb3J0cy5QYWdlRmFjdG9yeSA9IFBhZ2VGYWN0b3J5XzEuUGFnZUZhY3Rvcnk7XG4gICAgdmFyIFBhZ2VJbXBsZW1lbnRhdGlvbl8xID0gcmVxdWlyZShcIi4vcGFnZS9QYWdlSW1wbGVtZW50YXRpb25cIik7XG4gICAgZXhwb3J0cy5QYWdlSW1wbGVtZW50YXRpb24gPSBQYWdlSW1wbGVtZW50YXRpb25fMS5QYWdlSW1wbGVtZW50YXRpb247XG4gICAgdmFyIFBhZ2VNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wYWdlL1BhZ2VNYW5hZ2VyXCIpO1xuICAgIGV4cG9ydHMuUGFnZU1hbmFnZXIgPSBQYWdlTWFuYWdlcl8xLlBhZ2VNYW5hZ2VyO1xufSk7XG4iXSwiZmlsZSI6InBhZ2UuanMifQ==
