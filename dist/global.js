"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Haztivity_1 = require("./global/Haztivity");
var di_1 = require("./di");
exports.haztivity = di_1.Injector.getInstance(Haztivity_1.Haztivity).get("Haztivity");
window.haztivity = exports.haztivity;
//# sourceMappingURL=global.js.map