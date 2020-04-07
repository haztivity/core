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
var Sco_1 = require("./Sco");
var di_1 = require("../di");
var ScoFactory = /** @class */ (function () {
    function ScoFactory() {
    }
    ScoFactory_1 = ScoFactory;
    ScoFactory.createSco = function (options) {
        if (!ScoFactory_1.SCO) {
            var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(Sco_1.ScoController);
            var sco = ScoControllerFactory.instance();
            sco.activate(options);
            ScoFactory_1.SCO = sco;
            return sco;
        }
        else {
            throw "[ScoFactory] Error, only 1 sco is allowed";
        }
    };
    ScoFactory.registerSco = function (scoController, options) {
        if (!ScoFactory_1.SCO) {
            var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(scoController);
            var sco = ScoControllerFactory.instance();
            sco.activate(options);
            ScoFactory_1.SCO = sco;
            return sco;
        }
        else {
            throw "[ScoFactory] Error, only 1 sco is allowed";
        }
    };
    ScoFactory.getCurrentSco = function () {
        return ScoFactory_1.SCO;
    };
    ;
    var ScoFactory_1;
    ScoFactory = ScoFactory_1 = __decorate([
        di_1.Core({
            name: "ScoFactory",
            dependencies: []
        })
    ], ScoFactory);
    return ScoFactory;
}());
exports.ScoFactory = ScoFactory;
//# sourceMappingURL=ScoFactory.js.map