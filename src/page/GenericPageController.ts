/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Page, InjectorService} from "../di";
import {$} from "../jquery";
import {IPageControllerOptions, PageController} from "./PageController";
import {ResourceInitializerService,ResourceSequenceFactory,ResourceSequence} from "../resource";
export interface IGenericPageControllerOptions extends IPageControllerOptions {
    autoSequence:boolean;
}
@Page(
    {
        name: "GenericPageController",
        dependencies: [
            $,
            InjectorService,
            ResourceInitializerService,
            ResourceSequenceFactory
        ]
    }
)
export class GenericPageController extends PageController {
    protected _ResourceSequenceFactory:ResourceSequenceFactory;
    protected _sequences:ResourceSequence[] = [];
    public options:IGenericPageControllerOptions;
    constructor(_$,_InjectorService,_ResourceInitializerService,_ResourceSequenceFactory){
        super(_$,_InjectorService,_ResourceInitializerService);
        this._ResourceSequenceFactory = _ResourceSequenceFactory;
    }

    /**
     * Crea una secuencia
     * @param items
     * @returns {ResourceSequence}
     * @see ResourceSequenceFactory
     */
    public createResourceSequence(items):ResourceSequence{
        let sequence =  this._ResourceSequenceFactory.createSequence(items);
        this._sequences.push(sequence);
        return sequence;
    }
    protected _render(template){
        let render = super._render(template);
        render.hide();
        return render;
    }
    protected _initializeResources(){
        super._initializeResources();
        if(this.options.autoSequence != false){
            this.createResourceSequence(this._resources).run();
        }
        return this._resources;
    }
    protected _show($oldPage, oldPageRelativePosition): JQueryPromise<null> {
        let defer = this._$.Deferred();
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