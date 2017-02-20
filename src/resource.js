(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./resource/ResourceController", "./resource/ResourceManager", "./resource/ResourceInitializerService", "./resource/ResourceSequenceFactory", "./resource/ResourceSequence"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var ResourceController_1 = require("./resource/ResourceController");
    exports.ResourceController = ResourceController_1.ResourceController;
    var ResourceManager_1 = require("./resource/ResourceManager");
    exports.ResourceManager = ResourceManager_1.ResourceManager;
    var ResourceInitializerService_1 = require("./resource/ResourceInitializerService");
    exports.ResourceInitializerService = ResourceInitializerService_1.ResourceInitializerService;
    var ResourceSequenceFactory_1 = require("./resource/ResourceSequenceFactory");
    exports.ResourceSequenceFactory = ResourceSequenceFactory_1.ResourceSequenceFactory;
    var ResourceSequence_1 = require("./resource/ResourceSequence");
    exports.ResourceSequence = ResourceSequence_1.ResourceSequence;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIi4vcmVzb3VyY2UvUmVzb3VyY2VDb250cm9sbGVyXCIsIFwiLi9yZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXJcIiwgXCIuL3Jlc291cmNlL1Jlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlXCIsIFwiLi9yZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeVwiLCBcIi4vcmVzb3VyY2UvUmVzb3VyY2VTZXF1ZW5jZVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgUmVzb3VyY2VDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9yZXNvdXJjZS9SZXNvdXJjZUNvbnRyb2xsZXJcIik7XG4gICAgZXhwb3J0cy5SZXNvdXJjZUNvbnRyb2xsZXIgPSBSZXNvdXJjZUNvbnRyb2xsZXJfMS5SZXNvdXJjZUNvbnRyb2xsZXI7XG4gICAgdmFyIFJlc291cmNlTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vcmVzb3VyY2UvUmVzb3VyY2VNYW5hZ2VyXCIpO1xuICAgIGV4cG9ydHMuUmVzb3VyY2VNYW5hZ2VyID0gUmVzb3VyY2VNYW5hZ2VyXzEuUmVzb3VyY2VNYW5hZ2VyO1xuICAgIHZhciBSZXNvdXJjZUluaXRpYWxpemVyU2VydmljZV8xID0gcmVxdWlyZShcIi4vcmVzb3VyY2UvUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2VcIik7XG4gICAgZXhwb3J0cy5SZXNvdXJjZUluaXRpYWxpemVyU2VydmljZSA9IFJlc291cmNlSW5pdGlhbGl6ZXJTZXJ2aWNlXzEuUmVzb3VyY2VJbml0aWFsaXplclNlcnZpY2U7XG4gICAgdmFyIFJlc291cmNlU2VxdWVuY2VGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9yZXNvdXJjZS9SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeVwiKTtcbiAgICBleHBvcnRzLlJlc291cmNlU2VxdWVuY2VGYWN0b3J5ID0gUmVzb3VyY2VTZXF1ZW5jZUZhY3RvcnlfMS5SZXNvdXJjZVNlcXVlbmNlRmFjdG9yeTtcbiAgICB2YXIgUmVzb3VyY2VTZXF1ZW5jZV8xID0gcmVxdWlyZShcIi4vcmVzb3VyY2UvUmVzb3VyY2VTZXF1ZW5jZVwiKTtcbiAgICBleHBvcnRzLlJlc291cmNlU2VxdWVuY2UgPSBSZXNvdXJjZVNlcXVlbmNlXzEuUmVzb3VyY2VTZXF1ZW5jZTtcbn0pO1xuIl0sImZpbGUiOiJyZXNvdXJjZS5qcyJ9
