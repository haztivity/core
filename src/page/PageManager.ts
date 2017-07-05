/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {PageRegister} from "./PageRegister";
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
    protected _pages: PageImplementation[] = [];
    protected _pagesMap: Map<string,number> = new Map<string,number>();
    protected _eventEmitter: EventEmitter;

    constructor(protected _ResourceManager, protected _EventEmitterFactory: EventEmitterFactory, protected _PageImplementationFactory) {
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }

    /**
     * Indica el número de páginas registradas
     * @returns {number}
     */
    public count():number {
        return this._pages.length;
    }

    /**
     * Añade un conjunto de páginas.
     * @param {PageRegister[]}          pages       Conjunto de páginas a añadir
     */
    public addPages(pages: PageRegister[]) {
        for (let page of pages) {
            this.addPage(page);
        }
    }

    /**
     * Devuelve un array con los ids o índices de las páginas completadas.
     * @param {boolean} [returnName=false]      Indica si devolver los ids de las páginas o los índices
     * @returns {String[]|Number[]}
     */
    public getCompleted(returnName?:boolean):String[]|Number[]{
        let pages = this._pages,
            completed = [];
        for (let pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
            let currentPage = pages[pageIndex];
            if(currentPage.isCompleted()){
                completed.push(returnName === true ? currentPage.getPageName() : pageIndex);
            }
        }
        return completed;
    }
    /**
     * Añade una página
     * @param {Page}    page        Página a añadir
     */
    public addPage(page: PageRegister) {
        let pageName = page.getName();
        if (this.getPageIndex(pageName) === -1) {
            if (this._validatePageName(pageName)) {
                this._ResourceManager.addAll(page.getResources());
                let pageImplementation: PageImplementation = this._PageImplementationFactory.instance();
                pageImplementation.activate(page);
                this._pages.push(pageImplementation);
                this._pagesMap.set(pageName, this._pages.length - 1);
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
        this._pagesMap.clear();
        let pages = this._pages;
        for (let pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
            let currentPage = pages[pageIndex];
            this._pagesMap.set(currentPage.getPageName(), pageIndex);
        }
    }

    /**
     * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
     * @param {string}      name    Nombre de la página
     * @returns {number}
     */
    public getPageIndex(name: string):number {
        let result = this._pagesMap.get(name);
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
        return this._pages[index];
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