/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core,Injector} from "../di";
import {Page,IPageOptions} from "./Page";
@Core({
    name:"PageFactory",
    dependencies:[]
})
export class PageFactory{
    public static createPage(options:IPageOptions){
        let PageDIFactory = Injector.getInstance(PageFactory).get("Page");
        let page = PageDIFactory.instance();
        page.activate(options);
        return page;
    }
}