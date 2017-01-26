/// <reference types="jquery" />
import { Navigator, INavigatorService, INavigatorPageData } from "./Navigator";
export declare class NavigatorService implements INavigatorService {
    static readonly ON_DRAW_PAGE: string;
    static readonly ON_DISABLE: string;
    static readonly ON_ENABLE: string;
    static readonly ON_CHANGE_PAGE_END: string;
    static readonly ON_CHANGE_PAGE_START: string;
    constructor(_Navigator: Navigator);
    goTo(index: number): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    isDisabled(): boolean;
    setDisabled(disabled: boolean): void;
    enable(): void;
    disable(): void;
    next(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    prev(): JQueryPromise<INavigatorPageData, INavigatorPageData> | boolean;
    getCurrentPageData(): INavigatorPageData;
    /**
     * @see EventEmitter#on
     */
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator;
    one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator;
    off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator;
}
