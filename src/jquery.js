"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
var $ = require("jquery");
module.exports.default = $;
module.exports.$ = $;
di_1.Injector.getInstance().registerServiceInstance("$", $);
//using global jquery
