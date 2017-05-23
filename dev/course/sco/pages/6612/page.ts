/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, GenericPageController} from "@haztivity/core";
import template from "./page.pug";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6612",
        resources: [
        ],
        template: template,
        autoSequence:false//disable the auto creation of sequences
    }
);
