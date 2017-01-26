import { IPageOptions } from "./PageRegister";
/**
 * Factory para crear páginas genéricas
 * @class PageFactory
 */
export declare class PageFactory {
    /**
     * Genera una página genérica
     * @static
     * @param {IPageOptions}    options     Opciones para la creación de la página
     * @returns {Page}
     */
    static createPage(options: IPageOptions): any;
}
