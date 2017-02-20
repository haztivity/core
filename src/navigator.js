(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./navigator/Navigator", "./navigator/NavigatorService"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var Navigator_1 = require("./navigator/Navigator");
    exports.Navigator = Navigator_1.Navigator;
    var NavigatorService_1 = require("./navigator/NavigatorService");
    exports.NavigatorService = NavigatorService_1.NavigatorService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYXZpZ2F0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL25hdmlnYXRvci9OYXZpZ2F0b3JcIiwgXCIuL25hdmlnYXRvci9OYXZpZ2F0b3JTZXJ2aWNlXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBOYXZpZ2F0b3JfMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRvci9OYXZpZ2F0b3JcIik7XG4gICAgZXhwb3J0cy5OYXZpZ2F0b3IgPSBOYXZpZ2F0b3JfMS5OYXZpZ2F0b3I7XG4gICAgdmFyIE5hdmlnYXRvclNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRvci9OYXZpZ2F0b3JTZXJ2aWNlXCIpO1xuICAgIGV4cG9ydHMuTmF2aWdhdG9yU2VydmljZSA9IE5hdmlnYXRvclNlcnZpY2VfMS5OYXZpZ2F0b3JTZXJ2aWNlO1xufSk7XG4iXSwiZmlsZSI6Im5hdmlnYXRvci5qcyJ9
