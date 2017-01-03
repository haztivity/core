/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core,Injector} from "../di";
import {Page,IPageOptions} from "./Page";
import {PageController} from "./PageController";
/**
 * Factory para crear páginas genéricas
 * @class PageFactory
 */
@Core({
    name:"PageFactory",
    dependencies:[]
})
export class PageFactory{
    /**
     * Genera una página genérica
     * @static
     * @param {IPageOptions}    options     Opciones para la creación de la página
     * @returns {Page}
     */
    public static createPage(options:IPageOptions){
        let PageDIFactory = Injector.getInstance(PageFactory).get("Page");
        let page = PageDIFactory.instance();
        //Set PageController as default
        if(!options.controller){
            options.controller="PageController";
        }
        page.activate(options);
        return page;
    }
}