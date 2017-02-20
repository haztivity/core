(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./sco/Errors", "./sco/Sco", "./sco/ScoFactory"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    __export(require("./sco/Errors"));
    var Sco_1 = require("./sco/Sco");
    exports.ScoController = Sco_1.ScoController;
    var ScoFactory_1 = require("./sco/ScoFactory");
    exports.ScoFactory = ScoFactory_1.ScoFactory;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28uanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL3Njby9FcnJvcnNcIiwgXCIuL3Njby9TY29cIiwgXCIuL3Njby9TY29GYWN0b3J5XCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICBfX2V4cG9ydChyZXF1aXJlKFwiLi9zY28vRXJyb3JzXCIpKTtcbiAgICB2YXIgU2NvXzEgPSByZXF1aXJlKFwiLi9zY28vU2NvXCIpO1xuICAgIGV4cG9ydHMuU2NvQ29udHJvbGxlciA9IFNjb18xLlNjb0NvbnRyb2xsZXI7XG4gICAgdmFyIFNjb0ZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL3Njby9TY29GYWN0b3J5XCIpO1xuICAgIGV4cG9ydHMuU2NvRmFjdG9yeSA9IFNjb0ZhY3RvcnlfMS5TY29GYWN0b3J5O1xufSk7XG4iXSwiZmlsZSI6InNjby5qcyJ9
