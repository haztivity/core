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
    constructor(_$: JQueryStatic, _EventEmitterFactory, protected _Navigator: Navigator) {
        super(_$,_EventEmitterFactory);
    }

    init(options) {
        debugger;
        this._assignEvents();
    }
    protected _assignEvents() {
        this._Navigator.on(Navigator.ON_DISABLE, {instance: this}, this._onDisabled);
        this._Navigator.on(Navigator.ON_ENABLE, {instance: this}, this._onEnabled);
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
