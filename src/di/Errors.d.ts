/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { BaseError } from "../base/BaseError";
/**
 * Error al intentar obtener una dependencia no registrada
 */
export declare class HaztivityDependencyNotRegisteredError extends BaseError {
    constructor(dependency: string, target?: string);
}
/**
 * Error al intentar registrar una dependencia ya registrada
 */
export declare class HaztivityDependencyAlreadyRegistered extends BaseError {
    constructor(dependency: string);
}
/**
 * Error al no indicarse un parámetro obligatorio
 */
export declare class HaztivityDependencyOptionRequired extends BaseError {
    constructor(parameterName: any);
}
/**
 * Error al definir una clase como dependencia de ella misma
 */
export declare class HaztivityDependencyHasItsOwnAsDependency extends BaseError {
    constructor(dependency: string);
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export declare class HaztivityDependencyAccessDenied extends BaseError {
    constructor(target: string, dependency: string);
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export declare class HaztivityDependencyNotValid extends BaseError {
    constructor(target: string, dependencies: any);
}
