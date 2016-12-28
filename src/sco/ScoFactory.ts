/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {IScoOptions,Sco} from "./Sco";
import {Injector} from "../di";
let sco;
export class ScoFactory{
    public static createSco(options:IScoOptions){
        debugger;
        if(!sco){
            let dependencies = Injector.getFor(Sco);
            sco = new Sco(dependencies);
            sco.setOptions(options);
            sco.init();
        }
        return sco;
    }
}