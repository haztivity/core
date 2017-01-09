/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al intentar registrar un recurso inválido
 */
export class HaztivityResourceInvalidError extends BaseError{
    constructor(){
        super("HaztivityResourceInvalidError",`Invalid resource`);
    }
}
/**
 * Error al intentar registrar un recurso inválido
 */
export class HaztivityResourceAlreadyRegisteredError extends BaseError{
    constructor(resource:string){
        super("HaztivityResourceInvalidError",`Resource '${resource}' already registered with another controller.`);
    }
}
/**
 * Error al intentar registrar un recurso inválido
 */
export class HaztivityResourceNameInvalidError extends BaseError{
    constructor(resource:string){
        //todo LINK
        super("HaztivityResourceNameInvalidError",`Invalid name '${resource}'. Please use camelCase nomenclature. For more details go to LINK`);
    }
}