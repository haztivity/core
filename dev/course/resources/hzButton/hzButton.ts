/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$,EventEmitterFactory,ResourceController,Resource,IResourceParams} from "@haztivity/core";
@Resource(<IResourceParams>{
    name:"HzButton",
    dependencies:[
        $,
        EventEmitterFactory
    ]
})
export class HzButton extends ResourceController{
    protected _hasScore =true;
    protected _score = 0;
    init(options, config?) {
        this._options = options;
        this._$element.text(this._options.content);
        this._$element.one("click",{instance:this},this._onClick);
    }
    protected _onClick(e){
        let instance = e.data.instance;
        instance.disable();
        instance._score = 100;
        instance._markAsCompleted();
    }
    public disable():boolean{
        if(super.disable()) {
            this._$element.attr("disabled", "disabled");
            return true;
        }else{
            return false;
        }
    }
    public enable(){
        if(super.enable()) {
            this._$element.removeAttr("disabled");
            return true;
        }else{
            return false;
        }
    }
    getInstance() {
        return this;
    }

}