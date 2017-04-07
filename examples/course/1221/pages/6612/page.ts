/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, GenericPageController} from "../../../../../src/index";
import {HzButton} from "../../../../resources/hzButton/hzButton";
import * as template from "./page.html!text";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6612",
        resources: [
            HzButton
        ],
        template: template,
        autoSequence:false//disable the auto creation of sequences
    }
);
page.on(
    GenericPageController.ON_RENDERED, null, (eventObject, $page, pageController) => {
        let groups = $page.find(".group");
        groups.hide();
        groups.first().show();
        let sequences = [];
        //look for groups, each group will be a sequence
        for (let groupIndex = 0, groupsLength = groups.length; groupIndex < groupsLength; groupIndex++) {
            let $item = $(groups[groupIndex]);
            //create a sequence
            let sequence = pageController.createResourceSequence($item.find("[data-hz-resource]"));
            //when the senquence is completed, show the next group
            sequence.getCompletePromise().then(()=>{
                let index = groups.index($item);
                if(index < groups.length -1){
                    $(groups.get(index+1)).show();
                }
            });
            sequences.push(sequence);
        }
        //Create a sequence of sequences
        pageController.createResourceSequence(sequences).run().then(()=>{
            console.log("All sequences completed");
        });
    }
);
