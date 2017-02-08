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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuL1Jlc291cmNlU2VxdWVuY2VcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBkaV8xLCBSZXNvdXJjZVNlcXVlbmNlXzEsIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5O1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChSZXNvdXJjZVNlcXVlbmNlXzFfMSkge1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2VfMSA9IFJlc291cmNlU2VxdWVuY2VfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2VTZXF1ZW5jZUZhY3RvcnkoX1Jlc291cmNlU2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fUmVzb3VyY2VTZXF1ZW5jZSA9IF9SZXNvdXJjZVNlcXVlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDcmVhIHVuYSBzZWN1ZW5jaWFcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ29udHJvbGxlcltdfFJlc291cmNlU2VxdWVuY2VbXX0gaXRlbXMgICBDb25qdW50byBkZSBSZWN1cnNvcyBvIFNlY3VlbmNpYXMgYVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBpZFxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZVNlcXVlbmNlfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVTZXF1ZW5jZSA9IGZ1bmN0aW9uIChpdGVtcywgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gdGhpcy5fUmVzb3VyY2VTZXF1ZW5jZS5pbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZS5hY3RpdmF0ZShpdGVtcywgaWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VxdWVuY2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VTZXF1ZW5jZUZhY3Rvcnk7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZUZhY3RvcnkgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBkaV8xLlNlcnZpY2Uoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlU2VxdWVuY2VGYWN0b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZV8xLlJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSk7XG4gICAgICAgICAgICBleHBvcnRzXzEoXCJSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeVwiLCBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5LmpzIn0=
