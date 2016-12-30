/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Injector} from "./di";
import $ from "jquery";
Injector.getInstance().registerServiceInstance("$",$);