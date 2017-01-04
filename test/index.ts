import {ScoFactory,Page,PageController,PageFactory} from "../src/core";
import template from "./test.html!text";
import css from "./test.css!css";
css;
let page:Page = PageFactory.createPage({
    name:"page",
    resources:[],
    template:template
});
page.on(PageController.ON_RENDERING,null,(event,$page,pageController)=>{
    debugger;
});
ScoFactory.createSco({
    name:"sco",
    pages:[
        page
    ],
    components:[]
}).run();
console.timeEnd("Page");
console.timeEnd("Complete");