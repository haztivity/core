/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Page as PageDecorator,InjectorService} from "../di";
import {$} from "../jquery";
import {PageController} from "./PageController";

@PageDecorator({
    name:"GenericPageController",
    dependencies:[
        $,
        InjectorService
    ]
})
export class GenericPageController extends PageController{

    protected _render(template){
        let $element = super._render(template);
        $element.hide();
        return $element;
    }
    protected _show($oldPage,oldPageRelativePosition):JQueryPromise{
        let defer = $.Deferred();
        if($oldPage){
            $oldPage.fadeOut(400,()=>{
                this.$element.fadeIn(400,()=>{
                    defer.resolve();
                })
            });
        }else{
            this.$element.fadeIn(400,()=>{
                defer.resolve();
            });
        }

        return defer.promise();
    }
}