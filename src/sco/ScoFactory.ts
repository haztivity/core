/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ScoController, IScoConfig} from "./Sco";
import {TYPES,Injector,Core} from "../di";

@Core({
    name:"ScoFactory",
    dependencies:[]
})
export class ScoFactory{
    public static createSco(config:IScoConfig):ScoController{
        let ScoControllerFactory = Injector.getInstance(ScoFactory).get("ScoController");
        let sco = ScoControllerFactory.instance();
        sco.activate(config);
        return sco;
    }
    public static registerSco(scoController,config:IScoConfig){
        let ScoControllerFactory = Injector.getInstance(ScoFactory).get(scoController.name);
        let sco = ScoControllerFactory.instance();
        sco.activate(config);
        return sco;
    }
}