/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {ResourceController} from "./ResourceController";
import {InjectorService} from "../di";
import {HaztivityResourceInvalidError,HaztivityResourceAlreadyRegisteredError} from "./Errors";
@Core({
    name:"ResourceManager",
    dependencies:[
        "InjectorService"
    ]
})
export class ResourceManager{
    //store available resources
    protected resources:Map<string,ResourceController> = new Map<string,ResourceController>();
    constructor(protected Injector:InjectorService){

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
            let name = resource.prototype._injectorName;
            if(!!name){
                //check if already exists
                let current = this.resources.get(name);
                //if exists, should be equal
                if(current != undefined){
                    if(current != resource){
                        throw new HaztivityResourceAlreadyRegisteredError(name);
                    }
                }else{
                    //if not exists, register
                    this.resources.set(name,resource)
                }
            }else{
                throw new HaztivityResourceInvalidError();
            }
        }else{
            throw new HaztivityResourceInvalidError();
        }
    }
    public addAll(resources:ResourceController[]){
        for (let resource of resources) {
            this.add(resource);
        }
    }
}

