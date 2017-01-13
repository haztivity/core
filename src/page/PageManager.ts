/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {Page} from "./Page";
import {PageImplementation} from "./PageImplementation";
import {EventEmitter, EventEmitterFactory,} from "../utils";
import {HaztivityPageAlreadyRegistered, HaztivityPageNameInvalid} from "./Errors";
import {ResourceManager} from "../resource";
export interface IPageManagerService{

}
@Core(
    {
        name: "PageManager",
        public:true,//todo TEMPORAL
        dependencies: [
            ResourceManager,
            EventEmitterFactory,
            PageImplementation
        ]
    }
)
export class PageManager {
    protected pages: PageImplementation[] = [];
    protected pagesMap: Map<string,number> = new Map<string,number>();
    protected eventEmitter: EventEmitter;

    constructor(protected ResourceManager, protected EventEmitterFactory: EventEmitterFactory, protected PageImplementationFactory) {
        this.eventEmitter = EventEmitterFactory.createEmitter();
    }

    /**
     * Indica el número de páginas registradas
     * @returns {number}
     */
    public count():number {
        return this.pages.length;
    }

    /**
     * Añade un conjunto de páginas.
     * @param {Page[]}          pages       Conjunto de páginas a añadir
     */
    public addPages(pages: Page[]) {
        for (let page of pages) {
            this.addPage(page);
        }
    }

    /**
     * Añade una página
     * @param {Page}    page        Página a añadir
     */
    public addPage(page: Page) {
        let pageName = page.getName();
        if (this.getPageIndex(pageName) === -1) {
            if (this._validatePageName(pageName)) {
                this.ResourceManager.addAll(page.getResources());
                let pageImplementation: PageImplementation = this.PageImplementationFactory.instance();
                pageImplementation.activate(page);
                this.pages.push(pageImplementation);
                this.pagesMap.set(pageName, this.pages.length - 1);
            } else {
                throw new HaztivityPageNameInvalid(pageName);
            }
        } else {
            throw new HaztivityPageAlreadyRegistered(pageName);
        }
    }

    protected _validatePageName(name: string) {
        return name.search(/[^\w|-]/g) == -1;
    }

    /**
     * Actualiza el mapa de nombre-índice de las páginas
     */
    public remapPages() {
        this.pagesMap.clear();
        let pages = this.pages;
        for (let pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
            let currentPage = pages[pageIndex];
            this.pagesMap.set(currentPage.getPageName(), pageIndex);
        }
    }

    /**
     * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
     * @param {string}      name    Nombre de la página
     * @returns {number}
     */
    public getPageIndex(name: string):number {
        let result = this.pagesMap.get(name);
        result = result != undefined
            ? result
            : -1;
        return result;
    }

    /**
     * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
     * @param {number}  index   Índice de la página a obtener
     * @returns {PageImplementation}
     */
    public getPage(index: number) {
        return this.pages[index];
    }
    /**
     * Obtiene una página por el nombre registrado. Si no se encuentra se devuelve undefined
     * @param {string}  name    Nombre de la página a obtener
     * @returns {PageImplementation}
     * @see getPageIndex
     * @see getPage
     */
    public getPageByName(name: string) {
        return this.getPage(this.getPageIndex(name));
    }

    public on() {

    }

    public off() {

    }
}