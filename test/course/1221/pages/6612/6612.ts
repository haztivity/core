/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, GenericPageController} from "../../../../../src/index";
import {HzButton} from "../../../../resources/hzButton/hzButton";
import template from "./6612.html!text";
let page: PageRegister = PageFactory.createPage(
    {
        name: "6612",
        resources: [
            HzButton
        ],
        template: template,
        autoSequence:false
    }
);
page.on(
    GenericPageController.ON_RENDERING, null, (eventObject, template, pageController:GenericPageController) => {
        console.log(`${pageController.options.name} rendering`);
    }
);
page.on(
    GenericPageController.ON_RENDERED, null, (eventObject, $page, pageController) => {
        console.log(`${pageController.options.name} rendered`);
        let groups = $page.find(".group");
        groups.hide();
        groups.first().show();
        let sequences = [];
        for (let groupIndex = 0, groupsLength = groups.length; groupIndex < groupsLength; groupIndex++) {
            let $item = $(groups[groupIndex]);
            let sequence = pageController.createResourceSequence($item.find("[data-hz-resource]"));
            sequence.getCompletePromise().then(()=>{
                let index = groups.index($item);
                if(index < groups.length -1){
                    $(groups.get(index+1)).show();
                }
            });
            sequences.push(sequence);
        }
        pageController.createResourceSequence(sequences).run().then(()=>{
            console.log("All sequences completed");
        });
    }
);
page.on(
    GenericPageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show start`);
    }
);
page.on(
    GenericPageController.ON_SHOWN, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show end`);
    }
);

export {page as page6612};

