/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {ResourceController} from "./ResourceController";
import {InjectorService} from "../di";
import {HaztivityResourceInvalidError,HaztivityResourceAlreadyRegisteredError,HaztivityResourceNameInvalidError} from "./Errors";
import {S} from "../utils";
@Core({
    name:"ResourceManager",
    dependencies:[
        InjectorService,
        S
    ]
})
export class ResourceManager{
    //store available resources
    protected _resources:Map<string,ResourceController> = new Map<string,ResourceController>();
    constructor(protected Injector:InjectorService,protected S){

    }

    /**
     * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
     * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
     * @see Injector.registerResource
     */
    public add(resource:ResourceController){
        //resource must exists
        if(resource){
            //resource must have a name registered by the injector
            let name = (<any>resource)._resourceName;
            if(!!name){
                if(this.nameIsValid(name)) {
                    //check if already exists
                    let current = this._resources.get(name);
                    //if exists, should be equal
                    if (current != undefined) {
                        if (current != resource) {
                            throw new HaztivityResourceAlreadyRegisteredError(name);
                        }
                    } else {
                        //if not exists, register
                        this._resources.set(name, resource)
                    }
                }else{
                    throw new HaztivityResourceNameInvalidError(name);
                }
            }else{
                throw new HaztivityResourceInvalidError();
            }
        }else{
            throw new HaztivityResourceInvalidError();
        }
    }
    public nameIsValid(name:string):boolean{
        return this.S(name).camelize().s === name;
    }
    public exists(name:string):ResourceController{
        return this._resources.get(name) != undefined;
    }
    /**
     * Añade un conjunto de recursos.
     * @see ResourceManager#add
     * @param {ResourceController[]}    resources       Recursos a añadir
     */
    public addAll(resources:ResourceController[]){
        for (let resource of resources) {
            this.add(resource);
        }
    }
}

