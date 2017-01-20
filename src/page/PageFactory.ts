/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core, Injector} from "../di";
import {PageRegister, IPageOptions} from "./PageRegister";
import {GenericPageController} from "./GenericPageController";
/**
 * Factory para crear páginas genéricas
 * @class PageFactory
 */
@Core(
    {
        name: "PageFactory",
        dependencies: [
            GenericPageController
        ]
    }
)
export class PageFactory {
    /**
     * Genera una página genérica
     * @static
     * @param {IPageOptions}    options     Opciones para la creación de la página
     * @returns {Page}
     */
    public static createPage(options: IPageOptions) {
        let PageDIFactory = Injector.getInstance(PageFactory).get(PageRegister);
        let page = PageDIFactory.instance();
        //Set PageController as default
        if (!options.controller) {
            options.controller = "GenericPageController";
        }
        page.activate(options);
        return page;
    }
}