/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
export class BaseError extends Error {
    constructor(name,message: string) {
        super(message);
        this.name = name;
    }
}