import {IPage,ScoFactory,PageFactory} from "../src/core";
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
console.timeEnd("Time");