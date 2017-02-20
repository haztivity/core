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
        define(["require", "exports", "./Sco", "../di"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var Sco_1 = require("./Sco");
    var di_1 = require("../di");
    var ScoFactory = ScoFactory_1 = (function () {
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
    exports.ScoFactory = ScoFactory;
    var ScoFactory_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vU2NvRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4vU2NvXCIsIFwiLi4vZGlcIl0sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQGxpY2Vuc2VcbiAgICAgKiBDb3B5cmlnaHQgRGF2aW5jaGkuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gICAgICovXG4gICAgdmFyIFNjb18xID0gcmVxdWlyZShcIi4vU2NvXCIpO1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBTY29GYWN0b3J5ID0gU2NvRmFjdG9yeV8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU2NvRmFjdG9yeSgpIHtcbiAgICAgICAgfVxuICAgICAgICBTY29GYWN0b3J5LmNyZWF0ZVNjbyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgU2NvQ29udHJvbGxlckZhY3RvcnkgPSBkaV8xLkluamVjdG9yLmdldEluc3RhbmNlKFNjb0ZhY3RvcnlfMSkuZ2V0KFNjb18xLlNjb0NvbnRyb2xsZXIpO1xuICAgICAgICAgICAgdmFyIHNjbyA9IFNjb0NvbnRyb2xsZXJGYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICBzY28uYWN0aXZhdGUob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gc2NvO1xuICAgICAgICB9O1xuICAgICAgICBTY29GYWN0b3J5LnJlZ2lzdGVyU2NvID0gZnVuY3Rpb24gKHNjb0NvbnRyb2xsZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBTY29Db250cm9sbGVyRmFjdG9yeSA9IGRpXzEuSW5qZWN0b3IuZ2V0SW5zdGFuY2UoU2NvRmFjdG9yeV8xKS5nZXQoc2NvQ29udHJvbGxlcik7XG4gICAgICAgICAgICB2YXIgc2NvID0gU2NvQ29udHJvbGxlckZhY3RvcnkuaW5zdGFuY2UoKTtcbiAgICAgICAgICAgIHNjby5hY3RpdmF0ZShvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBzY287XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTY29GYWN0b3J5O1xuICAgIH0oKSk7XG4gICAgU2NvRmFjdG9yeSA9IFNjb0ZhY3RvcnlfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJTY29GYWN0b3J5XCIsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtdXG4gICAgICAgIH0pXG4gICAgXSwgU2NvRmFjdG9yeSk7XG4gICAgZXhwb3J0cy5TY29GYWN0b3J5ID0gU2NvRmFjdG9yeTtcbiAgICB2YXIgU2NvRmFjdG9yeV8xO1xufSk7XG4iXSwiZmlsZSI6InNjby9TY29GYWN0b3J5LmpzIn0=
