/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ScoController, IScoOptions} from "./Sco";
import {TYPES,Injector,Core} from "../di";

@Core({
    name:"ScoFactory",
    dependencies:[]
})
export class ScoFactory{
    public static createSco(options:IScoOptions):ScoController{
        let ScoControllerFactory = Injector.getInstance(ScoFactory).get("ScoController");
        let sco = ScoControllerFactory.instance();
        sco.activate(options);
        return sco;
    }
    public static registerSco(scoController,options:IScoOptions){
        let ScoControllerFactory = Injector.getInstance(ScoFactory).get(scoController.name);
        let sco = ScoControllerFactory.instance();
        sco.activate(options);
        return sco;
    }
}