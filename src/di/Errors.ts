/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseError} from "../base/BaseError";
/**
 * Error al intentar obtener una dependencia no registrada
 */
export class HaztivityDependencyNotRegisteredError extends BaseError{
    constructor(dependency:string,target?:string){
        super("HaztivityDependencyNotRegisteredError",target ? `could not inject ${dependency} into ${target} because is not registered` : `${dependency} is not registered in the Injector.`);
    }
}
/**
 * Error al intentar registrar una dependencia ya registrada
 */
export class HaztivityDependencyAlreadyRegistered extends BaseError{
    constructor(dependency:string){
        super("HaztivityDependencyAlreadyRegistered",`${dependency} is already registered`);
    }
}
/**
 * Error al no indicarse un parámetro obligatorio
 */
export class HaztivityDependencyOptionRequired extends BaseError{
    constructor(parameterName){
        super("HaztivityDependencyOptionRequired",`The parameter '${parameterName}' is required`);
    }
}
/**
 * Error al definir una clase como dependencia de ella misma
 */
export class HaztivityDependencyHasItsOwnAsDependency extends BaseError{
    constructor(dependency:string){
        super("HaztivityDependencyHasItsOwnAsDependency",`${dependency} has its own as dependency`);
    }
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export class HaztivityDependencyAccessDenied extends BaseError{
    constructor(target:string,dependency:string){
        super("HaztivityDependencyAccessDenied",`${target} has not access to ${dependency}`)
    }
}
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
export class HaztivityDependencyNotValid extends BaseError{
    constructor(target:string,dependencies){
        super("HaztivityDependencyNotValid",`Some dependency for ${target} is undefined.`)
    }
}