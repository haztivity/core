/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as StringJS from "string";
import {Injector} from "./di";
Injector.getInstance().registerServiceInstance("StringJS",StringJS);
export const S:StringJS=StringJS;