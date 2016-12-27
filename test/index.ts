import {Injector,Injectable,IInjectableParams} from "../src/core";
@Injectable(<IInjectableParams>{
    dependencies:[
        "Logger"
    ]
})
class Test{
    constructor(dependencies){
        debugger;
    }
}
Injector.get("Test");