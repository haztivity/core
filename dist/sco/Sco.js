"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var utils_1 = require("../utils");
var di_1 = require("../di");
var page_1 = require("../page");
var navigator_1 = require("../navigator");
var Errors_1 = require("./Errors");
var resource_1 = require("../resource");
var component_1 = require("../component");
var jquery_1 = require("../jquery");
var ScoController = ScoController_1 = (function () {
    function ScoController(_Navigator, _PageManager, _ResourceManager, _EventEmitterFactory, _ComponentManager, _ComponentInitializer, _$) {
        this._Navigator = _Navigator;
        this._PageManager = _PageManager;
        this._ResourceManager = _ResourceManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._ComponentManager = _ComponentManager;
        this._ComponentInitializer = _ComponentInitializer;
        this._$ = _$;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }
    ScoController.prototype.activate = function (options) {
        this._options = options;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        return this;
    };
    ScoController.prototype.on = function () {
        return this;
    };
    ScoController.prototype._init = function () {
        this._$context = this._$("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.prepend(this._options.template);
            this._$context.addClass(ScoController_1.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            //page contexts must exists
            if (this._$pagesContainer.length > 0) {
                return true;
            }
            else {
                throw new Errors_1.HaztivityPagesContextNotFound();
            }
        }
        else {
            throw new Errors_1.HaztivityAppContextNotFound();
        }
    };
    ScoController.prototype.run = function () {
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController_1.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        this._Navigator.goTo(0);
        return this;
    };
    return ScoController;
}());
ScoController.CLASS_CONTEXT = "hz-container";
ScoController.CLASS_PAGES = "hz-pages-container";
ScoController = ScoController_1 = __decorate([
    di_1.Sco({
        name: "ScoController",
        dependencies: [
            navigator_1.Navigator,
            page_1.PageManager,
            resource_1.ResourceManager,
            utils_1.EventEmitterFactory,
            component_1.ComponentManager,
            component_1.ComponentInitializer,
            jquery_1.$
        ]
    })
], ScoController);
exports.ScoController = ScoController;
var ScoController_1;
//# sourceMappingURL=Sco.js.map