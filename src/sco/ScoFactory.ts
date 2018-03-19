/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ScoController, IScoOptions} from "./Sco";
import {TYPES, Injector, Core} from "../di";

@Core(
    {
        name: "ScoFactory",
        dependencies: []
    }
)
export class ScoFactory {
    protected static readonly SCO:ScoController;
    public static createSco(options: IScoOptions): ScoController {
        if(!ScoFactory.SCO){
            let ScoControllerFactory = Injector.getInstance(ScoFactory).get(ScoController);
            let sco = ScoControllerFactory.instance();
            sco.activate(options);
            ScoFactory.SCO = sco;
            return sco;
        }else{
            throw "[ScoFactory] Error, only 1 sco is allowed";
        }
    }

    public static registerSco(scoController, options: IScoOptions) {
        if(!ScoFactory.SCO){
            let ScoControllerFactory = Injector.getInstance(ScoFactory).get(scoController);
            let sco = ScoControllerFactory.instance();
            sco.activate(options);
            ScoFactory.SCO = sco;
            return sco;
        }else{
            throw "[ScoFactory] Error, only 1 sco is allowed";
        }
    }
    public static getCurrentSco ():ScoController{
        return ScoFactory.SCO;
    } ;
}