/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory,PageRegister,PageController,ScormService} from "@haztivity/core";
import template from "./page.pug";
import {HzButton} from "../../../resources/hzButton/hzButton"
import "./page.scss";
export let page:PageRegister = PageFactory.createPage({
    name:"6611",
    resources:[
        HzButton
    ],
    template:template
});