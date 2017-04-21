"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
require("jquery");
di_1.Injector.getInstance().registerServiceInstance("$", $);
//using global jquery
module.exports.default = $;
module.exports.$ = $;
//# sourceMappingURL=jquery.js.map