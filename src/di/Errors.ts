/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al intentar obtener una dependencia no registrada
 */
export class DependencyNotRegisteredError extends BaseError{
    constructor(dependency:string,target?:string){
        super("DependencyNotRegisteredError","");
        this.message = target ? `could not inject ${dependency} into ${target} because is not registered` : `${dependency} is not registered in the Injector.`;
    }
}
/**
 * Error al intentar registrar una dependencia ya registrada
 */
export class DependencyAlreadyRegistered extends BaseError{
    constructor(dependency:string){
        super("DependencyAlreadyRegistered","");
        this.message =`${dependency} is already registered`;
    }
}
/**
 * Error al no indicarse un parámetro obligatorio
 */
export class DependencyOptionRequired extends BaseError{
    constructor(parameterName){
        super("DependencyOptionRequired",`The parameter '${parameterName}' is required`);
    }
}
/**
 * Error al definir una clase como dependencia de ella misma
 */
export class DependencyHasItsOwnAsDependency extends BaseError{
    constructor(dependency:string){
        super("DependencyHasItsOwnAsDependency",`${dependency} has its own as dependency`);
    }
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export class DependencyAccessDenied extends BaseError{
    constructor(target:string,dependency:string){
        super("DependencyAccessDenied",`${target} has not access to ${dependency}`)
    }
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export class DependencyNotValid extends BaseError{
    constructor(target:string,dependencies){
        super("DependencyNotValid",`Some dependency for ${target} is undefined. Dependencies:${JSON.stringify(dependencies||{},null,4)}`)
    }
}