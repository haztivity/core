/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {EventEmitter, EventEmitterFactory} from "../utils";
import {Sco} from "../di";
import {PageRegister, PageManager} from "../page";
import {Navigator} from "../navigator";
import {HaztivityAppContextNotFound, HaztivityPagesContextNotFound} from "./Errors";
import {ResourceManager} from "../resource";
import {ComponentManager, ComponentInitializer} from "../component";
import {ComponentController} from "../component/ComponentController";
export interface ISco {
    on(): void;
    run(): void;
}
export interface IScoOptions {
    name: string;
    pages: PageRegister[];
    components?: ComponentController[];
}
@Sco(
    {
        name: "ScoController",
        dependencies: [
            Navigator,
            PageManager,
            ResourceManager,
            EventEmitterFactory,
            ComponentManager,
            ComponentInitializer
        ]
    }
)
export class ScoController implements ISco {
    public static readonly CLASS_CONTEXT = "hz-container";
    public static readonly CLASS_PAGES = "hz-pages-container";
    protected _eventEmitter: EventEmitter;
    protected _options: IScoOptions;
    protected _$context: JQuery;
    protected _$pagesContainer: JQuery;

    constructor(protected _Navigator: Navigator,
                protected _PageManager: PageManager,
                protected _ResourceManager: ResourceManager,
                protected _EventEmitterFactory: EventEmitterFactory,
                protected _ComponentManager: ComponentManager,
                protected _ComponentInitializer: ComponentInitializer) {
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }

    public activate(options: IScoOptions): ScoController {
        this._options = options;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        return this;
    }

    public on(): ScoController {
        return this;
    }

    protected _init() {
        this._$context = $("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.addClass(ScoController.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            //page contexts must exists
            if (this._$pagesContainer.length > 0) {
                return true;
            } else {
                throw new HaztivityPagesContextNotFound();
            }
        } else {
            throw new HaztivityAppContextNotFound();
        }
    }

    public run(): ScoController {
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        this._Navigator.goTo(0);
        return this;
    }
}