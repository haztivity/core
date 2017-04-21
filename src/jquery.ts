/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./di";
import * as $ from "jquery";
module.exports.default = $;
module.exports.$ = $;
Injector.getInstance().registerServiceInstance("$",$);
//using global jquery
