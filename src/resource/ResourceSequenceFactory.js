var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../di", "./ResourceSequence"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var ResourceSequence_1 = require("./ResourceSequence");
    var ResourceSequenceFactory = (function () {
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
    exports.ResourceSequenceFactory = ResourceSequenceFactory;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4uL2RpXCIsIFwiLi9SZXNvdXJjZVNlcXVlbmNlXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBSZXNvdXJjZVNlcXVlbmNlXzEgPSByZXF1aXJlKFwiLi9SZXNvdXJjZVNlcXVlbmNlXCIpO1xuICAgIHZhciBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5KF9SZXNvdXJjZVNlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9SZXNvdXJjZVNlcXVlbmNlID0gX1Jlc291cmNlU2VxdWVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWEgdW5hIHNlY3VlbmNpYVxuICAgICAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ29udHJvbGxlcltdfFJlc291cmNlU2VxdWVuY2VbXX0gaXRlbXMgICBDb25qdW50byBkZSBSZWN1cnNvcyBvIFNlY3VlbmNpYXMgYVxuICAgICAgICAgKiBAcGFyYW0gaWRcbiAgICAgICAgICogQHJldHVybnMge1Jlc291cmNlU2VxdWVuY2V9XG4gICAgICAgICAqL1xuICAgICAgICBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlU2VxdWVuY2UgPSBmdW5jdGlvbiAoaXRlbXMsIGlkKSB7XG4gICAgICAgICAgICB2YXIgc2VxdWVuY2UgPSB0aGlzLl9SZXNvdXJjZVNlcXVlbmNlLmluc3RhbmNlKCk7XG4gICAgICAgICAgICBzZXF1ZW5jZS5hY3RpdmF0ZShpdGVtcywgaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHNlcXVlbmNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VTZXF1ZW5jZUZhY3Rvcnk7XG4gICAgfSgpKTtcbiAgICBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLlNlcnZpY2Uoe1xuICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXF1ZW5jZV8xLlJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLCBSZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSk7XG4gICAgZXhwb3J0cy5SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeSA9IFJlc291cmNlU2VxdWVuY2VGYWN0b3J5O1xufSk7XG4iXSwiZmlsZSI6InJlc291cmNlL1Jlc291cmNlU2VxdWVuY2VGYWN0b3J5LmpzIn0=
