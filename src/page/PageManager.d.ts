/// <reference types="core-js" />
import { PageRegister } from "./PageRegister";
import { PageImplementation } from "./PageImplementation";
import { EventEmitter, EventEmitterFactory } from "../utils";
export interface IPageManagerService {
}
export declare class PageManager {
    protected _ResourceManager: any;
    protected _EventEmitterFactory: EventEmitterFactory;
    protected _PageImplementationFactory: any;
    protected _pages: PageImplementation[];
    protected _pagesMap: Map<string, number>;
    protected _eventEmitter: EventEmitter;
    constructor(_ResourceManager: any, _EventEmitterFactory: EventEmitterFactory, _PageImplementationFactory: any);
    /**
     * Indica el número de páginas registradas
     * @returns {number}
     */
    count(): number;
    /**
     * Añade un conjunto de páginas.
     * @param {PageRegister[]}          pages       Conjunto de páginas a añadir
     */
    addPages(pages: PageRegister[]): void;
    /**
     * Añade una página
     * @param {Page}    page        Página a añadir
     */
    addPage(page: PageRegister): void;
    protected _validatePageName(name: string): boolean;
    /**
     * Actualiza el mapa de nombre-índice de las páginas
     */
    remapPages(): void;
    /**
     * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
     * @param {string}      name    Nombre de la página
     * @returns {number}
     */
    getPageIndex(name: string): number;
    /**
     * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
     * @param {number}  index   Índice de la página a obtener
     * @returns {PageImplementation}
     */
    getPage(index: number): PageImplementation;
    /**
     * Obtiene una página por el nombre registrado. Si no se encuentra se devuelve undefined
     * @param {string}  name    Nombre de la página a obtener
     * @returns {PageImplementation}
     * @see getPageIndex
     * @see getPage
     */
    getPageByName(name: string): PageImplementation;
    on(): void;
    off(): void;
}
