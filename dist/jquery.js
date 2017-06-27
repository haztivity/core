"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
var $ = require("jquery");
exports.$ = $;
di_1.Injector.getInstance().registerServiceInstance("$", $);
exports.default = $;
//using global jquery
//# sourceMappingURL=jquery.js.map