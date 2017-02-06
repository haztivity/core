/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Page, InjectorService} from "../di";
import {$} from "../jquery";
import {PageController} from "./PageController";
import {ResourceInitializerService} from "../resource";
@Page(
    {
        name: "GenericPageController",
        dependencies: [
            $,
            InjectorService,
            ResourceInitializerService
        ]
    }
)
export class GenericPageController extends PageController {

    protected _prepareTemplate() {
        let prevented = super._prepareTemplate();
        if(!prevented) {
            this.$element.hide();
        }
    }

    protected _show($oldPage, oldPageRelativePosition): JQueryPromise<null> {
        let defer = $.Deferred();
        if ($oldPage) {
            $oldPage.fadeOut(
                400, () => {
                    this.$element.fadeIn(
                        400, () => {
                            defer.resolve();
                        }
                    )
                }
            );
        } else {
            this.$element.fadeIn(
                400, () => {
                    defer.resolve();
                }
            );
        }

        return defer.promise();
    }
}