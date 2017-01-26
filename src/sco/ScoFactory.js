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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY28vU2NvRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi9TY29cIiwgXCIuLi9kaVwiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIFNjb18xLCBkaV8xLCBTY29GYWN0b3J5LCBTY29GYWN0b3J5XzE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKFNjb18xXzEpIHtcbiAgICAgICAgICAgICAgICBTY29fMSA9IFNjb18xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRpXzFfMSkge1xuICAgICAgICAgICAgICAgIGRpXzEgPSBkaV8xXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFNjb0ZhY3RvcnkgPSBTY29GYWN0b3J5XzEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFNjb0ZhY3RvcnkoKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNjb0ZhY3RvcnkuY3JlYXRlU2NvID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIFNjb0NvbnRyb2xsZXJGYWN0b3J5ID0gZGlfMS5JbmplY3Rvci5nZXRJbnN0YW5jZShTY29GYWN0b3J5XzEpLmdldChTY29fMS5TY29Db250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjbyA9IFNjb0NvbnRyb2xsZXJGYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNjby5hY3RpdmF0ZShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjbztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNjb0ZhY3RvcnkucmVnaXN0ZXJTY28gPSBmdW5jdGlvbiAoc2NvQ29udHJvbGxlciwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgU2NvQ29udHJvbGxlckZhY3RvcnkgPSBkaV8xLkluamVjdG9yLmdldEluc3RhbmNlKFNjb0ZhY3RvcnlfMSkuZ2V0KHNjb0NvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvID0gU2NvQ29udHJvbGxlckZhY3RvcnkuaW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvLmFjdGl2YXRlKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNjb0ZhY3Rvcnk7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgU2NvRmFjdG9yeSA9IFNjb0ZhY3RvcnlfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGRpXzEuQ29yZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU2NvRmFjdG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIFNjb0ZhY3RvcnkpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiU2NvRmFjdG9yeVwiLCBTY29GYWN0b3J5KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJmaWxlIjoic2NvL1Njb0ZhY3RvcnkuanMifQ==
