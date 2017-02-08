System.register(["./Sco", "../di"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var Sco_1, di_1, ScoFactory, ScoFactory_1;
    return {
        setters: [
            function (Sco_1_1) {
                Sco_1 = Sco_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }
        ],
        execute: function () {
            ScoFactory = ScoFactory_1 = (function () {
                function ScoFactory() {
                }
                ScoFactory.createSco = function (options) {
                    var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(Sco_1.ScoController);
                    var sco = ScoControllerFactory.instance();
                    sco.activate(options);
                    return sco;
                };
                ScoFactory.registerSco = function (scoController, options) {
                    var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(scoController);
                    var sco = ScoControllerFactory.instance();
                    sco.activate(options);
                    return sco;
                };
                return ScoFactory;
            }());
            ScoFactory = ScoFactory_1 = __decorate([
                di_1.Core({
                    name: "ScoFactory",
                    dependencies: []
                })
            ], ScoFactory);
            exports_1("ScoFactory", ScoFactory);
        }
    };
});
//# sourceMappingURL=ScoFactory.js.map