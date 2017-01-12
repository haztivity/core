/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al intentar registrar un componente inválido
 */
export class HaztivityComponentInvalidError extends BaseError{
    constructor(){
        super("HaztivityComponentInvalidError",`Invalid component`);
    }
}
/**
 * Error al intentar registrar un componente inválido
 */
export class HaztivityComponentAlreadyRegisteredError extends BaseError{
    constructor(component:string){
        super("HaztivityComponentInvalidError",`Component '${component}' already registered with another controller.`);
    }
}
/**
 * Error al intentar registrar un componente inválido
 */
export class HaztivityComponentNameInvalidError extends BaseError{
    constructor(component:string){
        //todo LINK
        super("HaztivityComponentNameInvalidError",`Invalid component name '${component}'. Please use camelCase nomenclature.`);
    }
}
/**
 * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
 */
export class HaztivityComponentNameRequiredError extends BaseError{
    constructor($element:string){
        super("HaztivityComponentNameRequiredError",`Component name not provider in data-* attribute. ${$element}`);
    }
}
/**
 * Error al intentar inicializar un componente no registrado
 */
export class HaztivityComponentNotRegisteredError extends BaseError{
    constructor(component:string){
        super("HaztivityComponentNotRegisteredError",`Attempt to initialize ${component} but is not registered`);
    }
}

/**
 * Error de controlador invalido
 */
export class HaztivityInvalidComponentControllerError extends BaseError{
    constructor(component:string){
        super("HaztivityInvalidComponentControllerError",`Invalid controller for ${component} component`);
    }
}
