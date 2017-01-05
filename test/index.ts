import {ScoFactory,Page,PageController,PageFactory} from "../src/core";
let page:Page = PageFactory.createPage({
    name:"page",
    resources:[],
    template:"<p>page 1</p>"
});
page.on(PageController.ON_RENDERING,null,<PageController>(event,$page,pageController:PageController)=>{
    let navigator = pageController.InjectorService.get("Navigator");
    window.n = navigator;
});
let page2:Page = PageFactory.createPage({
    name:"page2",
    resources:[],
    template:"<p>page 2</p>"
});
let page3:Page = PageFactory.createPage({
    name:"page3",
    resources:[],
    template:"<p>page 3</p>"
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