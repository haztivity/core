/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource,ResourceController,$} from "../src/core";
@Resource({
    name:"test",
    dependencies:[
        $
    ]
})
export class TestResource extends ResourceController{
    init(options) {
        this.$element.text(options.testopt);
    }

    getInstance() {
    }
}