/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./di";
import "jquery";
Injector.getInstance().registerServiceInstance("$",$);
//using global jquery
module.exports.default = $;
module.exports.$ = $;
