/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory,PageRegister,PageController,ScormService} from "../../../../../src/core";
import {HzButton} from "../../../../resources/hzButton/hzButton";
import template from "./6611.html!text";
let page:PageRegister = PageFactory.createPage({
    name:"6611",
    resources:[
        HzButton
    ],
    template:template
});
page.on(PageController.ON_RENDERING,null,(eventObject,template,pageController)=>{
    console.log(`${pageController.options.name} rendering`);
});
page.on(PageController.ON_RENDERED,null,(eventObject,$page:JQuery,pageController:PageController)=>{
    console.log(`${pageController.options.name} rendered`);
    if(pageController.isCompleted()) {
        $page.find("#myResource").data("hzResourceInstance").disable();
    }
});
page.on(PageController.ON_SHOW,null,(eventObject,$page,$oldPage,oldPageRelativePosition,pageController)=>{
    console.log(`${pageController.options.name} show start`);
});
page.on(PageController.ON_SHOWN,null,(eventObject,$page,$oldPage,oldPageRelativePosition,pageController)=>{
    console.log(`${pageController.options.name} show end`);
    let scormService = pageController.InjectorService.get("ScormService");
});
page.on(PageController.ON_COMPLETE_CHANGE,null,(eventObject,isCompleted,$page,pageController)=>{
    console.log(`${pageController.options.name} complete change`);
});
page.on(PageController.ON_DESTROY,null,(eventObject,$page,pageController)=>{
    console.log(`${pageController.options.name} destroy`);
});
export {page as page6611};