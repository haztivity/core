/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, Page, PageController} from "../../../../../src/core";
import {HzButton} from "../../../../resources/hzButton/hzButton";
import template from "./6612.html!text";
let page: Page = PageFactory.createPage(
    {
        name: "6612",
        resources: [
            HzButton
        ],
        template: template
    }
);
page.on(
    PageController.ON_RENDERING, null, (eventObject, template, pageController) => {
        console.log(`${pageController.options.name} rendering`);
    }
);
page.on(
    PageController.ON_RENDERED, null, (eventObject, template, pageController) => {
        console.log(`${pageController.options.name} rendered`);
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show start`);
    }
);
page.on(
    PageController.ON_SHOWN, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show end`);
    }
);
page.on(
    PageController.ON_COMPLETE, null, (eventObject, $page, pageController) => {
        console.log(`${pageController.options.name} complete`);
    }
);
page.on(
    PageController.ON_DESTROY, null, (eventObject, $page, pageController) => {
        console.log(`${pageController.options.name} destroy`);
    }
);
export {page as page6612};