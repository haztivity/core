import {Service} from "../src/core";
import {Injector} from "../src/di";

@Service({
    name:"Test",
    dependencies:[
        "$"
    ]
})
class test{
    constructor(protected $:JQueryStatic){
        debugger;
    }
}
Injector.getInstance().get("Test");