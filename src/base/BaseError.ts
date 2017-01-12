/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Logger} from "../debug";
Logger;
export class BaseError extends Error {
    constructor(name, message: string) {
        super(message);
        this.name = name;
        this.message = message;
        Logger.error(name, message);
    }
}