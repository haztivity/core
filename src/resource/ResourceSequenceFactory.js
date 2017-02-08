System.register(["../di", "./ResourceSequence"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, ResourceSequence_1, ResourceSequenceFactory;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ResourceSequence_1_1) {
                ResourceSequence_1 = ResourceSequence_1_1;
            }
        ],
        execute: function () {
            ResourceSequenceFactory = (function () {
                function ResourceSequenceFactory(_ResourceSequence) {
                    this._ResourceSequence = _ResourceSequence;
                }
                /**
                 * Crea una secuencia
                 * @param {ResourceController[]|ResourceSequence[]} items   Conjunto de Recursos o Secuencias a
                 * @param id
                 * @returns {ResourceSequence}
                 */
                ResourceSequenceFactory.prototype.createSequence = function (items, id) {
                    var sequence = this._ResourceSequence.instance();
                    sequence.activate(items, id);
                    return sequence;
                };
                return ResourceSequenceFactory;
            }());
            ResourceSequenceFactory = __decorate([
                di_1.Service({
                    name: "ResourceSequenceFactory",
                    dependencies: [
                        ResourceSequence_1.ResourceSequence
                    ]
                })
            ], ResourceSequenceFactory);
            exports_1("ResourceSequenceFactory", ResourceSequenceFactory);
        }
    };
});
//# sourceMappingURL=ResourceSequenceFactory.js.map