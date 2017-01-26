/// <reference types="jquery" />
import { PageController } from "./PageController";
export declare class GenericPageController extends PageController {
    protected _render(template: any): JQuery;
    protected _show($oldPage: any, oldPageRelativePosition: any): JQueryPromise<null>;
}
