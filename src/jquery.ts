/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./di";
import * as $ from "jquery";
Injector.getInstance().registerServiceInstance("$",$);
export {$ as $};
