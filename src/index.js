"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
__export(require("./jquery"));
var debug_1 = require("./debug");
exports.Logger = debug_1.Logger;
var di_1 = require("./di");
exports.InjectorService = di_1.InjectorService;
exports.Service = di_1.Service;
exports.ServiceInstance = di_1.ServiceInstance;
exports.Module = di_1.Module;
exports.Sco = di_1.Sco;
exports.Dependencies = di_1.Dependencies;
exports.Page = di_1.Page;
exports.Resource = di_1.Resource;
exports.Component = di_1.Component;
var Injector_1 = require("./di/Injector");
var debug_2 = require("./debug");
Injector_1.Injector.getInstance().registerServiceInstance("Logger", debug_2.Logger);
var utils_1 = require("./utils");
exports.EventEmitter = utils_1.EventEmitter;
exports.EventEmitterFactory = utils_1.EventEmitterFactory;
exports.DataOptions = utils_1.DataOptions;
exports.S = utils_1.S;
var sco_1 = require("./sco");
exports.ScoFactory = sco_1.ScoFactory;
exports.ScoController = sco_1.ScoController;
var page_1 = require("./page");
exports.PageController = page_1.PageController;
exports.PageRegister = page_1.PageRegister;
exports.PageFactory = page_1.PageFactory;
exports.PageManager = page_1.PageManager;
exports.GenericPageController = page_1.GenericPageController;
var resource_1 = require("./resource");
exports.ResourceInitializerService = resource_1.ResourceInitializerService;
exports.ResourceController = resource_1.ResourceController;
exports.ResourceManager = resource_1.ResourceManager;
exports.ResourceSequenceFactory = resource_1.ResourceSequenceFactory;
exports.ResourceSequence = resource_1.ResourceSequence;
var navigator_1 = require("./navigator");
exports.Navigator = navigator_1.Navigator;
exports.NavigatorService = navigator_1.NavigatorService;
var component_1 = require("./component");
exports.ComponentController = component_1.ComponentController;
exports.ComponentManager = component_1.ComponentManager;
exports.ComponentInitializer = component_1.ComponentInitializer;
var scorm_1 = require("./scorm");
exports.ScormService = scorm_1.ScormService;
//# sourceMappingURL=index.js.map