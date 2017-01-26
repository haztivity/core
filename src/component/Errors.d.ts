/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { BaseError } from "../base/BaseError";
/**
 * Error al intentar registrar un componente inválido
 */
export declare class HaztivityComponentInvalidError extends BaseError {
    constructor();
}
/**
 * Error al intentar registrar un componente inválido
 */
export declare class HaztivityComponentAlreadyRegisteredError extends BaseError {
    constructor(component: string);
}
/**
 * Error al intentar registrar un componente inválido
 */
export declare class HaztivityComponentNameInvalidError extends BaseError {
    constructor(component: string);
}
/**
 * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
 */
export declare class HaztivityComponentNameRequiredError extends BaseError {
    constructor($element: string);
}
/**
 * Error al intentar inicializar un componente no registrado
 */
export declare class HaztivityComponentNotRegisteredError extends BaseError {
    constructor(component: string);
}
/**
 * Error de controlador invalido
 */
export declare class HaztivityInvalidComponentControllerError extends BaseError {
    constructor(component: string);
}
