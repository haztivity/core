/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { BaseError } from "../base/BaseError";
/**
 * Error al intentar registrar un recurso inválido
 */
export declare class HaztivityResourceInvalidError extends BaseError {
    constructor();
}
/**
 * Error al intentar registrar un recurso inválido
 */
export declare class HaztivityResourceAlreadyRegisteredError extends BaseError {
    constructor(resource: string);
}
/**
 * Error al intentar registrar un recurso inválido
 */
export declare class HaztivityResourceNameInvalidError extends BaseError {
    constructor(resource: string);
}
/**
 * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
 */
export declare class HaztivityResourceNameRequiredError extends BaseError {
    constructor($element: string);
}
/**
 * Error al intentar inicializar un recurso no registrado
 */
export declare class HaztivityResourceNotRegisteredError extends BaseError {
    constructor(resource: string);
}
/**
 * Error de controlador invalido
 */
export declare class HaztivityInvalidResourceControllerError extends BaseError {
    constructor(resource: string);
}
