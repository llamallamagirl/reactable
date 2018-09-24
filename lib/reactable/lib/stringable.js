'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = stringable;
function stringable(thing) {
    return thing !== null && typeof thing !== 'undefined' && _typeof(thing.toString === 'function');
}
//# sourceMappingURL=stringable.js.map
