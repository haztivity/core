/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource,ResourceController,$} from "../src/core";
@Resource({
    name:"btn",
    dependencies:[
        $
    ]
})
export class HzButtonResource extends ResourceController{
    init(options) {
        this.$element.on("click",{instance:this},this._onClick);
    }
    protected _onClick(e){
        let instance = e.data.instance;
        instance._markAsCompleted();
    }
    getInstance() {
    }
}