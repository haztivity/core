(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./component/ComponentController", "./component/ComponentManager", "./component/ComponentInitializer"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var ComponentController_1 = require("./component/ComponentController");
    exports.ComponentController = ComponentController_1.ComponentController;
    var ComponentManager_1 = require("./component/ComponentManager");
    exports.ComponentManager = ComponentManager_1.ComponentManager;
    var ComponentInitializer_1 = require("./component/ComponentInitializer");
    exports.ComponentInitializer = ComponentInitializer_1.ComponentInitializer;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL2NvbXBvbmVudC9Db21wb25lbnRDb250cm9sbGVyXCIsIFwiLi9jb21wb25lbnQvQ29tcG9uZW50TWFuYWdlclwiLCBcIi4vY29tcG9uZW50L0NvbXBvbmVudEluaXRpYWxpemVyXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBDb21wb25lbnRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnQvQ29tcG9uZW50Q29udHJvbGxlclwiKTtcbiAgICBleHBvcnRzLkNvbXBvbmVudENvbnRyb2xsZXIgPSBDb21wb25lbnRDb250cm9sbGVyXzEuQ29tcG9uZW50Q29udHJvbGxlcjtcbiAgICB2YXIgQ29tcG9uZW50TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50L0NvbXBvbmVudE1hbmFnZXJcIik7XG4gICAgZXhwb3J0cy5Db21wb25lbnRNYW5hZ2VyID0gQ29tcG9uZW50TWFuYWdlcl8xLkNvbXBvbmVudE1hbmFnZXI7XG4gICAgdmFyIENvbXBvbmVudEluaXRpYWxpemVyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnQvQ29tcG9uZW50SW5pdGlhbGl6ZXJcIik7XG4gICAgZXhwb3J0cy5Db21wb25lbnRJbml0aWFsaXplciA9IENvbXBvbmVudEluaXRpYWxpemVyXzEuQ29tcG9uZW50SW5pdGlhbGl6ZXI7XG59KTtcbiJdLCJmaWxlIjoiY29tcG9uZW50LmpzIn0=
