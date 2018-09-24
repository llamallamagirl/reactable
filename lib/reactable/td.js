'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_react_component = require('./lib/is_react_component');

var _is_react_component2 = _interopRequireDefault(_is_react_component);

var _stringable = require('./lib/stringable');

var _stringable2 = _interopRequireDefault(_stringable);

var _unsafe = require('./unsafe');

var _filter_props_from = require('./lib/filter_props_from');

var _filter_props_from2 = _interopRequireDefault(_filter_props_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Td = function (_React$Component) {
    _inherits(Td, _React$Component);

    function Td() {
        _classCallCheck(this, Td);

        return _possibleConstructorReturn(this, (Td.__proto__ || Object.getPrototypeOf(Td)).apply(this, arguments));
    }

    _createClass(Td, [{
        key: 'stringifyIfNotReactComponent',
        value: function stringifyIfNotReactComponent(object) {
            if (!(0, _is_react_component2.default)(object) && (0, _stringable2.default)(object) && typeof object !== 'undefined') {
                return object.toString();
            }
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            // Attach any properties on the column to this Td object to allow things like custom event handlers
            var mergedProps = (0, _filter_props_from2.default)(this.props);
            if (_typeof(this.props.column) === 'object') {
                for (var key in this.props.column) {
                    if (key !== 'key' && key !== 'name') {
                        mergedProps[key] = this.props.column[key];
                    }
                }
            }
            // handleClick aliases onClick event
            mergedProps.onClick = this.props.handleClick;

            var stringifiedChildProps;

            if (typeof this.props.data === 'undefined') {
                stringifiedChildProps = this.stringifyIfNotReactComponent(this.props.children);
            }

            if ((0, _unsafe.isUnsafe)(this.props.children)) {
                return _react2.default.createElement('td', _extends({}, mergedProps, {
                    dangerouslySetInnerHTML: { __html: this.props.children.toString() } }));
            } else {
                return _react2.default.createElement(
                    'td',
                    mergedProps,
                    stringifiedChildProps || this.props.children
                );
            }
        }
    }]);

    return Td;
}(_react2.default.Component);

exports.default = Td;
;
//# sourceMappingURL=td.js.map
