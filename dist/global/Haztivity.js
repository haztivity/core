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
var Logger_1 = require("../devTools/Logger");
var DevTools_1 = require("../devTools/DevTools");
var di_1 = require("../di");
var Haztivity = (function () {
    /**
     * @class Haztivity
     * @description Global object
     * @param _logger
     * @param _devTools
     */
    function Haztivity(_logger) {
        this._logger = _logger;
    }
    Haztivity_1 = Haztivity;
    /**
     * Enables development mode
     * @see DevTools#enable
     */
    Haztivity.prototype.enableDev = function () {
        var devTools = di_1.Injector.getInstance(Haztivity_1).get(DevTools_1.DevTools);
        devTools.enable();
        return devTools;
    };
    Haztivity = Haztivity_1 = __decorate([
        di_1.Core({
            name: "Haztivity",
            dependencies: [
                Logger_1.Logger
            ]
        })
    ], Haztivity);
    return Haztivity;
    var Haztivity_1;
}());
exports.Haztivity = Haztivity;
//# sourceMappingURL=Haztivity.js.map