/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "../di";
import {IPageOptions} from "./Page";
export class PageFactory{
    public static createPage(options:IPageOptions){
        let page = Injector.getInstance().get("Page").instance();
        page._config(options);
        return page;
    }
}