/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, Navigator, Component, ComponentController,EventEmitterFactory} from "../../src/core";
@Component(
    {
        name: "hzNavbar",
        dependencies: [
            $,
            EventEmitterFactory,
            Navigator
        ]
    }
)
export class HzNavbarComponent extends ComponentController {
    public static readonly NAMESPACE = "hzNavbar";
    protected static readonly PREFIX = "hz-navbar";
    protected _$nextBtn: JQuery;
    protected _$prevBtn: JQuery;
    constructor(_$: JQueryStatic, _EventEmitterFactory, protected _Navigator: Navigator) {
        super(_$,_EventEmitterFactory);
    }

    init(options) {
        this._$nextBtn = this._$element.find(`[data-${HzNavbarComponent.PREFIX}-next]`);
        this._$prevBtn = this._$element.find(`[data-${HzNavbarComponent.PREFIX}-prev]`);
        this._assignEvents();
    }
    protected _assignEvents() {
        this._$nextBtn.on(`click.${HzNavbarComponent.NAMESPACE}`, {instance: this}, this._onNextClick);
        this._$prevBtn.on(`click.${HzNavbarComponent.NAMESPACE}`, {instance: this}, this._onPrevClick);
        this._Navigator.on(Navigator.ON_DISABLE, {instance: this}, this._onDisabled);
        this._Navigator.on(Navigator.ON_ENABLE, {instance: this}, this._onEnabled);
        this._Navigator.on(Navigator.ON_CHANGE_PAGE_END, {instance: this}, this._onPageChange);
    }

    protected _onNextClick(e) {
        let instance = e.data.instance;
        instance._Navigator.next();
    }

    protected _onPrevClick(e) {
        let instance = e.data.instance;
        instance._Navigator.prev();
    }

    protected _onPageChange(e, newPage, oldPage) {

    }
    protected _onDisabled(e) {
        let instance = e.data.instance;
    }

    protected _onEnabled(e) {
        let instance = e.data.instance;
    }

    public enable() {
        this._Navigator.enable();
    }

    public disable() {
        this._Navigator.disable();
    }
}
