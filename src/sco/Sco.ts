/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitterFactory} from "../utils";
import {Sco} from "../di";
EventEmitterFactory;
export interface ISco{
    on():void;
    run():void;
}
export interface IScoConfig{

}
@Sco({
    name:"ScoController",
    dependencies:[
        "EventEmitterFactory"
    ]
})
export class ScoController implements ISco{
    protected eventEmitter:EventEmitter2;
    constructor (protected EventEmitterFactory:EventEmitterFactory){
        this.eventEmitter = EventEmitterFactory.createEmitter();
    }
    public activate(config:IScoConfig):ScoController{
        return this;
    }
    public on():ScoController{
        return this;
    }
    public run():ScoController{
        return this;
    }
}