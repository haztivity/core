import {IPage,ScoFactory,PageFactory} from "../src/core";
//import template from "./test.html!text";
//import css from "./test.css!css";
//css;
let page:IPage = PageFactory.createPage({
    name:"page",
    resources:[],
    template:""
});
page.on();
ScoFactory.createSco({
    name:"sco",
    pages:[
        page
    ],
    components:[]
}).run();
console.timeEnd("Page");
console.timeEnd("Complete");