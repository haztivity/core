System.register(["../di", "../jquery", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var di_1, jquery_1, utils_1, ComponentController;
    return {
        setters: [
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            ComponentController = (function () {
                /**
                 * Controlador base para los recursos
                 * @param {JQueryStatic}            _$
                 * @param {EventEmitterFactory}     _EventEmitterFactory
                 */
                function ComponentController(_$, _EventEmitterFactory) {
                    this._$ = _$;
                    this._EventEmitterFactory = _EventEmitterFactory;
                    this._destroyed = false;
                    this._options = {};
                }
                /**
                 * Invocado al obtenerse el factory del DI para establecer las opciones
                 * @param {JQuery}  $element        Elemento del componente
                 */
                ComponentController.prototype.activate = function ($element) {
                    this._$element = $element;
                    this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
                };
                /**
                 * Indica si se ha invocado al método destroy
                 * @returns {boolean}
                 */
                ComponentController.prototype.isDestroyed = function () {
                    return this._destroyed;
                };
                /**
                 * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
                 */
                ComponentController.prototype.destroy = function () {
                    this._destroyed = true;
                };
                ComponentController.prototype.on = function (events, data, handler) {
                    this._eventEmitter.on(events, data, handler);
                    return this;
                };
                ;
                ComponentController.prototype.one = function (events, data, handler) {
                    this._eventEmitter.one(events, data, handler);
                    return this;
                };
                ;
                ComponentController.prototype.off = function (events, handler) {
                    this._eventEmitter.off(events, handler);
                    return this;
                };
                ;
                return ComponentController;
            }());
            ComponentController = __decorate([
                di_1.Dependencies({
                    dependencies: [
                        jquery_1.default,
                        utils_1.EventEmitterFactory
                    ]
                })
            ], ComponentController);
            exports_1("ComponentController", ComponentController);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnQvQ29tcG9uZW50Q29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiLi4vZGlcIiwgXCIuLi9qcXVlcnlcIiwgXCIuLi91dGlsc1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbW9kdWxlTmFtZSA9IGNvbnRleHRfMSAmJiBjb250ZXh0XzEuaWQ7XG4gICAgdmFyIGRpXzEsIGpxdWVyeV8xLCB1dGlsc18xLCBDb21wb25lbnRDb250cm9sbGVyO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkaV8xXzEpIHtcbiAgICAgICAgICAgICAgICBkaV8xID0gZGlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChqcXVlcnlfMV8xKSB7XG4gICAgICAgICAgICAgICAganF1ZXJ5XzEgPSBqcXVlcnlfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICh1dGlsc18xXzEpIHtcbiAgICAgICAgICAgICAgICB1dGlsc18xID0gdXRpbHNfMV8xO1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDb250cm9sYWRvciBiYXNlIHBhcmEgbG9zIHJlY3Vyc29zXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtKUXVlcnlTdGF0aWN9ICAgICAgICAgICAgXyRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0V2ZW50RW1pdHRlckZhY3Rvcnl9ICAgICBfRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudENvbnRyb2xsZXIoXyQsIF9FdmVudEVtaXR0ZXJGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyQgPSBfJDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeSA9IF9FdmVudEVtaXR0ZXJGYWN0b3J5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnZvY2FkbyBhbCBvYnRlbmVyc2UgZWwgZmFjdG9yeSBkZWwgREkgcGFyYSBlc3RhYmxlY2VyIGxhcyBvcGNpb25lc1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAgJGVsZW1lbnQgICAgICAgIEVsZW1lbnRvIGRlbCBjb21wb25lbnRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gdGhpcy5fRXZlbnRFbWl0dGVyRmFjdG9yeS5jcmVhdGVFbWl0dGVyKHRoaXMuXyRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEluZGljYSBzaSBzZSBoYSBpbnZvY2FkbyBhbCBtw6l0b2RvIGRlc3Ryb3lcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS5pc0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc3Ryb3llZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlc3RydXllIGVsIGNvbXBvbmVudGUuIFNlIGhhIGRlIGV4dGVuZGVyIGVuIGNhZGEgY29tcG9uZW50ZSBjb24gbGFzIGFjY2lvbmVzIHBlcnRpbmVudGVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24oZXZlbnRzLCBkYXRhLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgZGF0YSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub25lKGV2ZW50cywgZGF0YSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihldmVudHMsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50Q29udHJvbGxlcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBDb21wb25lbnRDb250cm9sbGVyID0gX19kZWNvcmF0ZShbXG4gICAgICAgICAgICAgICAgZGlfMS5EZXBlbmRlbmNpZXMoe1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpxdWVyeV8xLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLkV2ZW50RW1pdHRlckZhY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCBDb21wb25lbnRDb250cm9sbGVyKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkNvbXBvbmVudENvbnRyb2xsZXJcIiwgQ29tcG9uZW50Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwiZmlsZSI6ImNvbXBvbmVudC9Db21wb25lbnRDb250cm9sbGVyLmpzIn0=
