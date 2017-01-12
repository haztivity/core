/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al no indicarse contexto para la aplicación
 */
export class HaztivityAppContextNotFound extends BaseError {
    constructor() {
        super("HaztivityAppContextNotFound", `not context found for the application. Please visit LINK TO HELP`);
    }
}
/**
 * Error al no indicarse contexto para las páginas
 */
export class HaztivityPagesContextNotFound extends BaseError {
    constructor() {
        super("HaztivityPagesContextNotFound", `not context found for pages. Please visit LINK TO HELP`);
    }
}