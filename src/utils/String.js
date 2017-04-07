"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
/**
 * Exporta StringJS.
 */
//SystemJS al utilizar el formato es6 de módulos devuelve siempre un objeto, String.js exporta una función por lo que al importarse en System como un Object no es posible utilizarlo
//Ha sido necesario extraer String.js al proyecto y modificar la exportación
var String_1 = require("../libs/String");
exports.S = String_1.S;
var di_1 = require("../di");
di_1.Injector.getInstance().registerServiceInstance("S", String_1.S);
//# sourceMappingURL=String.js.map