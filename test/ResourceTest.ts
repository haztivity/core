/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource,ResourceController,$} from "../src/core";
import {EventEmitterFactory} from "../src/core";
@Resource({
    name:"btn",
    dependencies:[
        $,
        EventEmitterFactory
    ]
})
export class HzButtonResource extends ResourceController{
    init(options) {
        this._$element.on("click",{instance:this},this._onClick);
    }
    protected _onClick(e){
        let instance = e.data.instance;
        instance._markAsCompleted();
    }
    getInstance() {
    }
}