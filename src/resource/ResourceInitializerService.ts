/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ResourceInitializer,IResourceInitializer} from "./ResourceInitializer";
import {Service} from "../di";
import {ResourceController} from "./ResourceController";
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
            "initialize",
            "getResources",
            "getResourcesControllers"
        ];
        for (let method of publish) {
            this[method] = ResourceInitializer[method].bind(ResourceInitializer);
        }
    }
    public initialize($context:JQuery):ResourceController[]{
        return undefined;
    }
    public getResources($context: JQuery, initState?: number): JQuery {
        return undefined;
    }

    public getResourcesControllers($context): ResourceController[] {
        return undefined;
    }
}