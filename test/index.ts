import {ScoFactory,IScoConfig,ScoController} from "../src/core";
import {Sco} from "../src/core";
@Sco({
    name:"MyScoController",
    dependencies:[]
})
class MyScoController extends ScoController{
    constructor(...dependencies){
        super(...dependencies);
    }
    activate(config){
        debugger;
        super.activate(config);
    }
}
ScoFactory.registerSco(MyScoController,{
    id:"test"
});