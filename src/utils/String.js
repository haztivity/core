(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../libs/String", "../di"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    /**
     * Exporta StringJS.
     */
    //SystemJS al utilizar el formato es6 de módulos devuelve siempre un objeto, String.js exporta una función por lo que al importarse en System como un Object no es posible utilizarlo
    //Ha sido necesario extraer String.js al proyecto y modificar la exportación
    var String_1 = require("../libs/String");
    exports.S = String_1.S;
    var di_1 = require("../di");
    di_1.Injector.getInstance().registerServiceInstance("S", String_1.S);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy9TdHJpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuLi9saWJzL1N0cmluZ1wiLCBcIi4uL2RpXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEV4cG9ydGEgU3RyaW5nSlMuXG4gICAgICovXG4gICAgLy9TeXN0ZW1KUyBhbCB1dGlsaXphciBlbCBmb3JtYXRvIGVzNiBkZSBtw7NkdWxvcyBkZXZ1ZWx2ZSBzaWVtcHJlIHVuIG9iamV0bywgU3RyaW5nLmpzIGV4cG9ydGEgdW5hIGZ1bmNpw7NuIHBvciBsbyBxdWUgYWwgaW1wb3J0YXJzZSBlbiBTeXN0ZW0gY29tbyB1biBPYmplY3Qgbm8gZXMgcG9zaWJsZSB1dGlsaXphcmxvXG4gICAgLy9IYSBzaWRvIG5lY2VzYXJpbyBleHRyYWVyIFN0cmluZy5qcyBhbCBwcm95ZWN0byB5IG1vZGlmaWNhciBsYSBleHBvcnRhY2nDs25cbiAgICB2YXIgU3RyaW5nXzEgPSByZXF1aXJlKFwiLi4vbGlicy9TdHJpbmdcIik7XG4gICAgZXhwb3J0cy5TID0gU3RyaW5nXzEuUztcbiAgICB2YXIgZGlfMSA9IHJlcXVpcmUoXCIuLi9kaVwiKTtcbiAgICBkaV8xLkluamVjdG9yLmdldEluc3RhbmNlKCkucmVnaXN0ZXJTZXJ2aWNlSW5zdGFuY2UoXCJTXCIsIFN0cmluZ18xLlMpO1xufSk7XG4iXSwiZmlsZSI6InV0aWxzL1N0cmluZy5qcyJ9
