/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {Page} from "../page";
EventEmitterFactory;
export interface ISco{
    on():void;
    run():void;
}
export interface IScoOptions{
    name:string;
    pages:Page[];
    components:Component[];
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
    public activate(config:IScoOptions):ScoController{
        return this;
    }
    public on():ScoController{
        return this;
    }
    public run():ScoController{
        return this;
    }
}