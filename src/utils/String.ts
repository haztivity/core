/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
/**
 * Exporta StringJS.
 */
//SystemJS al utilizar el formato es6 de módulos devuelve siempre un objeto, String.js exporta una función por lo que al importarse en System como un Object no es posible utilizarlo
//Ha sido necesario extraer String.js al proyecto y modificar la exportación
import {S} from "../libs/String";
import {Injector} from "../di";
Injector.getInstance().registerServiceInstance("S", S);
export {S as S};