"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
var jquery_1 = require("jquery");
exports.$ = jquery_1.default;
di_1.Injector.getInstance().registerServiceInstance("$", jquery_1.default);
//# sourceMappingURL=jquery.js.map