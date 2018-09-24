'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isReactComponent;
// this is a bit hacky - it'd be nice if React exposed an API for this
function isReactComponent(thing) {
    return thing !== null && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object' && typeof thing.props !== 'undefined';
}
//# sourceMappingURL=is_react_component.js.map
