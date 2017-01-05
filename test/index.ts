import {ScoFactory,Page,PageController,PageFactory} from "../src/core";
let page:Page = PageFactory.createPage({
    name:"page",
    resources:[],
    template:"<p>page 1</p>"
});
page.on(PageController.ON_RENDERING,null,(event:JQueryEventObject,template:String,pageController:PageController)=>{
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
page2.on(PageController.ON_SHOW,null,(event:JQueryEventObject,$page:JQuery,$oldPage:JQuery,oldPageRelativePosition,pageController:PageController)=>{
    event.preventDefault();
    return (defer:JQueryDeferred)=> {
        if ($oldPage) {
            if (oldPageRelativePosition === -1) {
                $page.css({
                    "position":"absolute",
                    "top":"0",
                    "left":"100%",
                    "width":"100%"
                }).show();
                $oldPage.css({
                    "position":"absolute",
                    "top":"0",
                    "left":"0",
                    "width":"100%"
                });
                $oldPage.animate({
                    "left": "-100%"
                },4000);
                $page.animate({
                    "left": "0"
                },4000,()=>{
                    $page.css("position","");
                    defer.resolve();
                })
            } else {
                $page.css({
                    "position":"absolute",
                    "left":"-100%",
                    "top":"0",
                    "width":"100%"
                }).show();
                $oldPage.css({
                    "position":"absolute",
                    "top":"0",
                    "left":"0",
                    "width":"100%"
                });
                $oldPage.animate({
                    "left": "100%"
                },4000);
                $page.animate({
                    "left": "0"
                },4000,()=>{
                    $page.css("position","");
                    defer.resolve();
                })
            }
        } else {
            $page.css({
                "position":"relative",
                "left":"-100%"
            }).show();
            $page.animate({
                "transform": "0"
            },400,()=>{
                $page.css("position","");
                defer.resolve();
            })
        }

    }
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
