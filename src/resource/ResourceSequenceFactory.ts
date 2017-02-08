/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {ResourceSequence} from "./ResourceSequence";
import {ResourceController} from "./ResourceController";
@Service(
    {
        name:"ResourceSequenceFactory",
        dependencies:[
            ResourceSequence
        ]
    }
)
export class ResourceSequenceFactory{
    protected _ResourceSequence:ResourceSequence;
    constructor(_ResourceSequence){
        this._ResourceSequence = _ResourceSequence;
    }

    /**
     * Crea una secuencia
     * @param {ResourceController[]|ResourceSequence[]} items   Conjunto de Recursos o Secuencias a
     * @param id
     * @returns {ResourceSequence}
     */
    public createSequence(items:ResourceController[]|ResourceSequence[]|JQuery,id?){
        let sequence:ResourceSequence = (<any>this._ResourceSequence).instance();
        sequence.activate(items,id);
        return sequence;
    }
}