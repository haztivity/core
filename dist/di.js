"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Injector_1 = require("./di/Injector");
exports.Injector = Injector_1.Injector;
exports.TYPES = Injector_1.TYPES;
exports.InjectorRegisterService = Injector_1.InjectorRegisterService;
exports.InjectorService = Injector_1.InjectorService;
var decorators_1 = require("./di/decorators");
exports.ServiceInstance = decorators_1.ServiceInstance;
exports.Service = decorators_1.Service;
exports.Sco = decorators_1.Sco;
exports.Resource = decorators_1.Resource;
exports.Page = decorators_1.Page;
exports.Dependencies = decorators_1.Dependencies;
exports.Component = decorators_1.Component;
exports.Module = decorators_1.Module;
exports.Core = decorators_1.Core;
//# sourceMappingURL=di.js.map