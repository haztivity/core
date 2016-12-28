/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {BaseHaztivity} from "../base";
import {Injectable} from "../di";
import {PageImplementation} from "./PageImplementation";
import {Page} from "./Page";
@Injectable({
    name:"PageManager",
    dependencies:[
        "PageImplementation"
    ]
})
export class PageManager extends BaseHaztivity{
    protected pages:PageImplementation[];
    protected pagesMap:{[name:string]:number};
    protected PageImplementation:PageImplementation;
    public on(){

    }
    public off(){

    }
    public addPage(page:Page){
        if(page.options.name) {
            if(this._getPageIndex(page.options.name)==-1){
                let pageImplementation = this.PageImplementation.instance();
                pageImplementation._config(page)._init();
                this.pages.push(pageImplementation);
                this.pagesMap[page.options.name] = this.pages.length - 1;
            }else{

            }
        }else{

        }
    }

    /**
     * @description Obtiene una página por su nombre
     * @param name
     * @returns {PageImplementation}
     */
    protected _getPageIndex(name:string):number{
        return this.pagesMap[name] || -1;
    }

    /**
     * @description Obtiene una página por su índice
     * @param index
     * @returns {PageImplementation}
     */
    protected _getPageByIndex(index:number):PageImplementation{
        return this.pages[index];
    }
}