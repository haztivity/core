System.register(["./page/PageRegister", "./page/PageController", "./page/GenericPageController", "./page/PageFactory", "./page/PageImplementation", "./page/PageManager"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PageRegister_1_1) {
                exports_1({
                    "PageRegister": PageRegister_1_1["PageRegister"]
                });
            },
            function (PageController_1_1) {
                exports_1({
                    "PageController": PageController_1_1["PageController"]
                });
            },
            function (GenericPageController_1_1) {
                exports_1({
                    "GenericPageController": GenericPageController_1_1["GenericPageController"]
                });
            },
            function (PageFactory_1_1) {
                exports_1({
                    "PageFactory": PageFactory_1_1["PageFactory"]
                });
            },
            function (PageImplementation_1_1) {
                exports_1({
                    "PageImplementation": PageImplementation_1_1["PageImplementation"]
                });
            },
            function (PageManager_1_1) {
                exports_1({
                    "PageManager": PageManager_1_1["PageManager"]
                });
            }
        ],
        execute: function () {
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbXCIuL3BhZ2UvUGFnZVJlZ2lzdGVyXCIsIFwiLi9wYWdlL1BhZ2VDb250cm9sbGVyXCIsIFwiLi9wYWdlL0dlbmVyaWNQYWdlQ29udHJvbGxlclwiLCBcIi4vcGFnZS9QYWdlRmFjdG9yeVwiLCBcIi4vcGFnZS9QYWdlSW1wbGVtZW50YXRpb25cIiwgXCIuL3BhZ2UvUGFnZU1hbmFnZXJcIl0sIGZ1bmN0aW9uIChleHBvcnRzXzEsIGNvbnRleHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChQYWdlUmVnaXN0ZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlUmVnaXN0ZXJcIjogUGFnZVJlZ2lzdGVyXzFfMVtcIlBhZ2VSZWdpc3RlclwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChQYWdlQ29udHJvbGxlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIlBhZ2VDb250cm9sbGVyXCI6IFBhZ2VDb250cm9sbGVyXzFfMVtcIlBhZ2VDb250cm9sbGVyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKEdlbmVyaWNQYWdlQ29udHJvbGxlcl8xXzEpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzXzEoe1xuICAgICAgICAgICAgICAgICAgICBcIkdlbmVyaWNQYWdlQ29udHJvbGxlclwiOiBHZW5lcmljUGFnZUNvbnRyb2xsZXJfMV8xW1wiR2VuZXJpY1BhZ2VDb250cm9sbGVyXCJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKFBhZ2VGYWN0b3J5XzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiUGFnZUZhY3RvcnlcIjogUGFnZUZhY3RvcnlfMV8xW1wiUGFnZUZhY3RvcnlcIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoUGFnZUltcGxlbWVudGF0aW9uXzFfMSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHNfMSh7XG4gICAgICAgICAgICAgICAgICAgIFwiUGFnZUltcGxlbWVudGF0aW9uXCI6IFBhZ2VJbXBsZW1lbnRhdGlvbl8xXzFbXCJQYWdlSW1wbGVtZW50YXRpb25cIl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoUGFnZU1hbmFnZXJfMV8xKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0c18xKHtcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlTWFuYWdlclwiOiBQYWdlTWFuYWdlcl8xXzFbXCJQYWdlTWFuYWdlclwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6InBhZ2UuanMifQ==
