"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var PageController_1 = require("./PageController");
var resource_1 = require("../resource");
var GenericPageController = (function (_super) {
    __extends(GenericPageController, _super);
    function GenericPageController(_$, _InjectorService, _ResourceInitializerService, _ResourceSequenceFactory) {
        var _this = _super.call(this, _$, _InjectorService, _ResourceInitializerService) || this;
        _this._sequences = [];
        _this._ResourceSequenceFactory = _ResourceSequenceFactory;
        return _this;
    }
    /**
     * Crea una secuencia
     * @param items
     * @returns {ResourceSequence}
     * @see ResourceSequenceFactory
     */
    GenericPageController.prototype.createResourceSequence = function (items) {
        var sequence = this._ResourceSequenceFactory.createSequence(items);
        this._sequences.push(sequence);
        return sequence;
    };
    GenericPageController.prototype._render = function (template) {
        var render = _super.prototype._render.call(this, template);
        render.hide();
        return render;
    };
    GenericPageController.prototype._initializeResources = function () {
        _super.prototype._initializeResources.call(this);
        if (this.options.autoSequence != false) {
            this.createResourceSequence(this._resources).run();
        }
        return this._resources;
    };
    GenericPageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
        var _this = this;
        var defer = this._$.Deferred();
        if ($oldPage) {
            $oldPage.fadeOut(400, function () {
                _this.$element.fadeIn(400, function () {
                    defer.resolve();
                });
            });
        }
        else {
            this.$element.fadeIn(400, function () {
                defer.resolve();
            });
        }
        return defer.promise();
    };
    return GenericPageController;
}(PageController_1.PageController));
GenericPageController = __decorate([
    di_1.Page({
        name: "GenericPageController",
        dependencies: [
            jquery_1.$,
            di_1.InjectorService,
            resource_1.ResourceInitializerService,
            resource_1.ResourceSequenceFactory
        ]
    })
], GenericPageController);
exports.GenericPageController = GenericPageController;
