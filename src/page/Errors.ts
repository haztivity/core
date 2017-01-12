/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al tratar de registrar una página existente
 */
export class HaztivityPageAlreadyRegistered extends BaseError {
    constructor(pageName: string) {
        super("HaztivityPageAlreadyRegistered", `'${pageName}' already exists. Pages must be uniques`);
    }
}
/**
 * Error al indicarse un nombre de página inválido
 */
export class HaztivityPageNameInvalid extends BaseError {
    constructor(pageName: string) {
        super("HaztivityPageNameInvalid", `The name '${pageName}' is invalid. Only allowed [a-zA-Z0-9_-]`);
    }
}