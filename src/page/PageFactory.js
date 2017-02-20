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
        define(["require", "exports", "../di", "./PageRegister", "./GenericPageController"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var di_1 = require("../di");
    var PageRegister_1 = require("./PageRegister");
    var GenericPageController_1 = require("./GenericPageController");
    /**
     * Factory para crear páginas genéricas
     * @class PageFactory
     */
    var PageFactory = PageFactory_1 = (function () {
        function PageFactory() {
        }
        /**
         * Genera una página genérica
         * @static
         * @param {IPageOptions}    options     Opciones para la creación de la página
         * @returns {Page}
         */
        PageFactory.createPage = function (options) {
            var PageDIFactory = di_1.Injector.getInstance(PageFactory_1).get(PageRegister_1.PageRegister);
            var page = PageDIFactory.instance();
            //Set PageController as default
            if (!options.controller) {
                options.controller = "GenericPageController";
            }
            page.activate(options);
            return page;
        };
        return PageFactory;
    }());
    PageFactory = PageFactory_1 = __decorate([
        di_1.Core({
            name: "PageFactory",
            dependencies: [
                GenericPageController_1.GenericPageController
            ]
        })
    ], PageFactory);
    exports.PageFactory = PageFactory;
    var PageFactory_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlL1BhZ2VGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiLi4vZGlcIiwgXCIuL1BhZ2VSZWdpc3RlclwiLCBcIi4vR2VuZXJpY1BhZ2VDb250cm9sbGVyXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBkaV8xID0gcmVxdWlyZShcIi4uL2RpXCIpO1xuICAgIHZhciBQYWdlUmVnaXN0ZXJfMSA9IHJlcXVpcmUoXCIuL1BhZ2VSZWdpc3RlclwiKTtcbiAgICB2YXIgR2VuZXJpY1BhZ2VDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9HZW5lcmljUGFnZUNvbnRyb2xsZXJcIik7XG4gICAgLyoqXG4gICAgICogRmFjdG9yeSBwYXJhIGNyZWFyIHDDoWdpbmFzIGdlbsOpcmljYXNcbiAgICAgKiBAY2xhc3MgUGFnZUZhY3RvcnlcbiAgICAgKi9cbiAgICB2YXIgUGFnZUZhY3RvcnkgPSBQYWdlRmFjdG9yeV8xID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUGFnZUZhY3RvcnkoKSB7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYSB1bmEgcMOhZ2luYSBnZW7DqXJpY2FcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0lQYWdlT3B0aW9uc30gICAgb3B0aW9ucyAgICAgT3BjaW9uZXMgcGFyYSBsYSBjcmVhY2nDs24gZGUgbGEgcMOhZ2luYVxuICAgICAgICAgKiBAcmV0dXJucyB7UGFnZX1cbiAgICAgICAgICovXG4gICAgICAgIFBhZ2VGYWN0b3J5LmNyZWF0ZVBhZ2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIFBhZ2VESUZhY3RvcnkgPSBkaV8xLkluamVjdG9yLmdldEluc3RhbmNlKFBhZ2VGYWN0b3J5XzEpLmdldChQYWdlUmVnaXN0ZXJfMS5QYWdlUmVnaXN0ZXIpO1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBQYWdlRElGYWN0b3J5Lmluc3RhbmNlKCk7XG4gICAgICAgICAgICAvL1NldCBQYWdlQ29udHJvbGxlciBhcyBkZWZhdWx0XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IFwiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdlLmFjdGl2YXRlKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQYWdlRmFjdG9yeTtcbiAgICB9KCkpO1xuICAgIFBhZ2VGYWN0b3J5ID0gUGFnZUZhY3RvcnlfMSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBkaV8xLkNvcmUoe1xuICAgICAgICAgICAgbmFtZTogXCJQYWdlRmFjdG9yeVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgR2VuZXJpY1BhZ2VDb250cm9sbGVyXzEuR2VuZXJpY1BhZ2VDb250cm9sbGVyXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgUGFnZUZhY3RvcnkpO1xuICAgIGV4cG9ydHMuUGFnZUZhY3RvcnkgPSBQYWdlRmFjdG9yeTtcbiAgICB2YXIgUGFnZUZhY3RvcnlfMTtcbn0pO1xuIl0sImZpbGUiOiJwYWdlL1BhZ2VGYWN0b3J5LmpzIn0=
