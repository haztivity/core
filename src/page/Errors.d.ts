/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { BaseError } from "../base/BaseError";
/**
 * Error al tratar de registrar una página existente
 */
export declare class HaztivityPageAlreadyRegistered extends BaseError {
    constructor(pageName: string);
}
/**
 * Error al indicarse un nombre de página inválido
 */
export declare class HaztivityPageNameInvalid extends BaseError {
    constructor(pageName: string);
}
/**
 * Error al no generarse elemento en la página
 */
export declare class HaztivityPageElementError extends BaseError {
    constructor(pageName: string);
}
