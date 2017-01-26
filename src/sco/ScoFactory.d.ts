/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { ScoController, IScoOptions } from "./Sco";
export declare class ScoFactory {
    static createSco(options: IScoOptions): ScoController;
    static registerSco(scoController: any, options: IScoOptions): any;
}
