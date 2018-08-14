'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Filterer = exports.FiltererInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FiltererInput = exports.FiltererInput = function (_React$Component) {
    _inherits(FiltererInput, _React$Component);

    function FiltererInput() {
        _classCallCheck(this, FiltererInput);

        return _possibleConstructorReturn(this, (FiltererInput.__proto__ || Object.getPrototypeOf(FiltererInput)).apply(this, arguments));
    }

    _createClass(FiltererInput, [{
        key: 'onChange',
        value: function onChange() {
            this.props.onFilter(_reactDom2.default.findDOMNode(this).value);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('input', { type: 'text',
                className: this.props.className,
                placeholder: this.props.placeholder,
                value: this.props.value,
                onKeyUp: this.onChange.bind(this),
                onChange: this.onChange.bind(this) });
        }
    }]);

    return FiltererInput;
}(_react2.default.Component);

;

var Filterer = exports.Filterer = function (_React$Component2) {
    _inherits(Filterer, _React$Component2);

    function Filterer() {
        _classCallCheck(this, Filterer);

        return _possibleConstructorReturn(this, (Filterer.__proto__ || Object.getPrototypeOf(Filterer)).apply(this, arguments));
    }

    _createClass(Filterer, [{
        key: 'render',
        value: function render() {
            if (typeof this.props.colSpan === 'undefined') {
                throw new TypeError('Must pass a colSpan argument to Filterer');
            }

            return _react2.default.createElement(
                'tr',
                { className: 'reactable-filterer' },
                _react2.default.createElement(
                    'td',
                    { colSpan: this.props.colSpan },
                    _react2.default.createElement(FiltererInput, { onFilter: this.props.onFilter,
                        value: this.props.value,
                        placeholder: this.props.placeholder,
                        className: this.props.className ? 'reactable-filter-input ' + this.props.className : 'reactable-filter-input' })
                )
            );
        }
    }]);

    return Filterer;
}(_react2.default.Component);

;
//# sourceMappingURL=filterer.js.map
