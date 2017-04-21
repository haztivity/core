/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
"use strict";
var core_1 = require("@haztivity/core");
var Navbar_1 = require("../components/Navbar");
var page_1 = require("./pages/6611/page");
var page_2 = require("./pages/6612/page");
var sco_html_1 = require("./sco.html");
var sco = core_1.ScoFactory.createSco({
    name: "sco1221",
    template: sco_html_1.default,
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
//# sourceMappingURL=index.js.map