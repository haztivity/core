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
        super("HaztivityResourceNameInvalidError",`Invalid name '${resource}'. Please use camelCase nomenclature.`);
    }
}
/**
 * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
 */
export class HaztivityResourceNameRequiredError extends BaseError{
    constructor($element:string){
        super("HaztivityResourceNameRequiredError",`Resource name not provider in data-* attribute. ${$element}`);
    }
}
/**
 * Error al intentar inicializar un recurso no registrado
 */
export class HaztivityResourceNotRegisteredError extends BaseError{
    constructor(resource:string){
        super("HaztivityResourceNotRegisteredError",`Attempt to initialize ${resource} but is not registered`);
    }
}

/**
 * Error de controlador invalido
 */
export class HaztivityInvalidResourceControllerError extends BaseError{
    constructor(resource:string){
        super("HaztivityInvalidResourceControllerError",`Invalid controller for ${resource} resource`);
    }
}
