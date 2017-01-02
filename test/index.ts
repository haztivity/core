import {ScoFactory,IScoOptions,ScoController, Sco,PageFactory,IPageOptions} from "../src/core";
debugger;
PageFactory.createPage({

});
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
    name:"test",
    pages:[],
    components:[]
});