import {ScoFactory,Page,PageController,PageFactory} from "../src/core";
import template from "./test.html!text";
import template2 from "./test2.html!text";
import template3 from "./test3.html!text";
import css from "./test.css!css";
css;

function a(){

}
let page:Page = PageFactory.createPage({
    name:"page",
    resources:[],
    template:template
});
page.on(PageController.ON_RENDERING,null,<PageController>(event,$page,pageController:PageController)=>{
    let navigator = pageController.InjectorService.get("Navigator");
});
let page2:Page = PageFactory.createPage({
    name:"page2",
    resources:[],
    template:template2
});
let page3:Page = PageFactory.createPage({
    name:"page3",
    resources:[],
    template:template3
});
ScoFactory.createSco({
    name:"sco",
    pages:[
        page,
        page2,
        page3
    ],
    components:[]
}).run();
console.timeEnd("Page");
console.timeEnd("Complete");


if(true){
    var a = true;
}
console.log(a)//true