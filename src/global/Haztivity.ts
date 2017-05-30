/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Logger} from "../devTools/Logger";
import {DevTools} from "../devTools/DevTools";
import {Injector,Core} from "../di";
@Core(
    {
        name:"Haztivity",
        dependencies:[
            Logger
        ]
    }
)
export class Haztivity{
    /**
     * @class Haztivity
     * @description Global object
     * @param _logger
     * @param _devTools
     */
    constructor(protected _logger){

    }

    /**
     * Enables development mode
     * @see DevTools#enable
     */
    public enableDev(){
        let devTools = Injector.getInstance(Haztivity).get(DevTools);
        devTools.enable();
        return devTools;
    }
}