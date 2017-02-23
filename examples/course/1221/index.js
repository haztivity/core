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
        define(["require", "exports", "../../../src/index", "../../components/Navbar", "./pages/6611/6611", "./pages/6612/6612"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("../../../src/index");
    var Navbar_1 = require("../../components/Navbar");
    var _6611_1 = require("./pages/6611/6611");
    var _6612_1 = require("./pages/6612/6612");
    debugger;
    var sco = index_1.ScoFactory.createSco({
        name: "1221",
        pages: [
            _6611_1.page6611,
            _6612_1.page6612
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