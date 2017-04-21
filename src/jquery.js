"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
var $ = require("jquery");
exports.$ = $;
di_1.Injector.getInstance().registerServiceInstance("$", $);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
//using global jquery
