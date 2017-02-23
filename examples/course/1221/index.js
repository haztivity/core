/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../src/index", "../../components/Navbar", "./pages/6611/page", "./pages/6612/page"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("../../../src/index");
    var Navbar_1 = require("../../components/Navbar");
    var page_1 = require("./pages/6611/page");
    var page_2 = require("./pages/6612/page");
    debugger;
    var sco = index_1.ScoFactory.createSco({
        name: "1221",
        pages: [
            page_1.page,
            page_2.page
        ],
        components: [
            Navbar_1.HzNavbarComponent
        ]
    });
    //pageChangeStart
    sco.on();
    //pageChangeEnd
    sco.on();
    //pageComplete
    sco.on();
    //sco end
    sco.on();
    //error
    sco.on();
    sco.run();
});
//# sourceMappingURL=index.js.map