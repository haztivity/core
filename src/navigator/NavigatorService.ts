/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "../di";
import {Navigator,INavigatorService,INavigatorPageData} from "./Navigator";
@Service(
    {
        name: "NavigatorService",
        dependencies: [
            Navigator
        ]
    }
)
export class NavigatorService implements INavigatorService{
    public static readonly ON_DRAW_PAGE = Navigator.ON_DRAW_PAGE;
    public static readonly ON_DISABLE = Navigator.ON_DISABLE;
    public static readonly ON_ENABLE = Navigator.ON_ENABLE;
    public static readonly ON_CHANGE_PAGE_END = Navigator.ON_CHANGE_PAGE_END;
    public static readonly ON_CHANGE_PAGE_START = Navigator.ON_CHANGE_PAGE_START;
    constructor(_Navigator:Navigator){
        let publish = [
            "goTo",
            "isDisabled",
            "setDisabled",
            "enable",
            "disable",
            "next",
            "prev",
            "getCurrentPageData",
            "on",
            "one",
            "off"
        ];
        for (let method of publish) {
            this[method] = _Navigator[method].bind(_Navigator);
        }
    }
    public goTo(index: number): JQueryPromise<INavigatorPageData,INavigatorPageData>|boolean {
        return undefined;
    }

    public isDisabled(): boolean {
        return undefined;
    }

    public setDisabled(disabled: boolean): void {
    }

    public enable(): void {
    }

    public disable(): void {
    }

    public next(): JQueryPromise<INavigatorPageData>|boolean {
        return undefined;
    }

    public prev(): JQueryPromise<INavigatorPageData>|boolean {
        return undefined;
    }

    public getCurrentPageData(): INavigatorPageData {
        return undefined;
    }

    /**
     * @see EventEmitter#on
     */
    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator {
        return undefined;
    }

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator {
        return undefined;
    }

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator {
        return undefined;
    }

}