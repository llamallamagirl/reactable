'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = extractDataFrom;

var _stringable = require('./stringable');

var _stringable2 = _interopRequireDefault(_stringable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractDataFrom(key, column) {
    var value;
    if (typeof key !== 'undefined' && key !== null && key.__reactableMeta === true) {
        value = key.data[column];
    } else {
        value = key[column];
    }

    if (typeof value !== 'undefined' && value !== null && value.__reactableMeta === true) {
        value = typeof value.props.value !== 'undefined' && value.props.value !== null ? value.props.value : value.value;
    }

    return (0, _stringable2.default)(value) ? value : '';
}
//# sourceMappingURL=extract_data_from.js.map
