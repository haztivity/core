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
            sco = Sco.instance();
            sco.setOptions(options);
            sco.init();
        }
        return sco;
    }
}