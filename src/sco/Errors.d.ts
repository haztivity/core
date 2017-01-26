/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { BaseError } from "../base/BaseError";
/**
 * Error al no indicarse contexto para la aplicación
 */
export declare class HaztivityAppContextNotFound extends BaseError {
    constructor();
}
/**
 * Error al no indicarse contexto para las páginas
 */
export declare class HaztivityPagesContextNotFound extends BaseError {
    constructor();
}
