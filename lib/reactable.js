'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./reactable/table');

var _table2 = _interopRequireDefault(_table);

var _tr = require('./reactable/tr');

var _tr2 = _interopRequireDefault(_tr);

var _td = require('./reactable/td');

var _td2 = _interopRequireDefault(_td);

var _th = require('./reactable/th');

var _th2 = _interopRequireDefault(_th);

var _tfoot = require('./reactable/tfoot');

var _tfoot2 = _interopRequireDefault(_tfoot);

var _thead = require('./reactable/thead');

var _thead2 = _interopRequireDefault(_thead);

var _sort = require('./reactable/sort');

var _sort2 = _interopRequireDefault(_sort);

var _unsafe = require('./reactable/unsafe');

var _unsafe2 = _interopRequireDefault(_unsafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_react2.default.Children.children = function (children) {
    return _react2.default.Children.map(children, function (x) {
        return x;
    }) || [];
};

// Array.prototype.find polyfill - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;
            for (var i = 0; i < length; i++) {
                if (i in list) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
            }
            return undefined;
        }
    });
}

module.exports = {
    Table: _table2.default,
    Tr: _tr2.default,
    Td: _td2.default,
    Th: _th2.default,
    Tfoot: _tfoot2.default,
    Thead: _thead2.default,
    Sort: _sort2.default,
    unsafe: _unsafe2.default
};
//# sourceMappingURL=reactable.js.map
