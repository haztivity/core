/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Haztivity} from "./global/Haztivity";
import {Injector} from "./di"
export const haztivity = Injector.getInstance(Haztivity).get("Haztivity");