/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ResourceInitializer,IResourceInitializer} from "./ResourceInitializer";
import {Service} from "../di";
@Service({
    name:"ResourceInitializerService",
    dependencies:[
        ResourceInitializer
    ]
})
export class ResourceInitializerService implements IResourceInitializer{
    /**
     * Servicio del inicializador de recursos
     * @class
     * @param ResourceInitializer
     */
    constructor(ResourceInitializer:ResourceInitializer){
        let publish = [
            "initialize"
        ];
        for (let method of publish) {
            this[method] = ResourceInitializer[method].bind(ResourceInitializer);
        }
    }
    public initialize($context:JQuery):void{

    }
}