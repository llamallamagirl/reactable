'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomFactories = require('react-dom-factories');

var _reactDomFactories2 = _interopRequireDefault(_reactDomFactories);

var _td = require('./td');

var _to_array = require('./lib/to_array');

var _filter_props_from = require('./lib/filter_props_from');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tr = function (_React$Component) {
    _inherits(Tr, _React$Component);

    function Tr() {
        _classCallCheck(this, Tr);

        return _possibleConstructorReturn(this, (Tr.__proto__ || Object.getPrototypeOf(Tr)).apply(this, arguments));
    }

    _createClass(Tr, [{
        key: 'render',
        value: function render() {
            var children = (0, _to_array.toArray)(_react2.default.Children.children(this.props.children));

            if (this.props.data && this.props.columns && typeof this.props.columns.map === 'function') {
                children = children.concat(this.props.columns.map(function (_ref, i) {
                    var _ref$props = _ref.props,
                        props = _ref$props === undefined ? {} : _ref$props,
                        column = _objectWithoutProperties(_ref, ['props']);

                    if (this.props.data.hasOwnProperty(column.key)) {
                        var value = this.props.data[column.key];

                        if (typeof value !== 'undefined' && value !== null && value.__reactableMeta === true) {
                            props = value.props;
                            value = value.value;
                        }

                        return _react2.default.createElement(
                            _td.Td,
                            _extends({ column: column, key: column.key }, props),
                            value
                        );
                    }
                }.bind(this)));
            }

            // Manually transfer props
            var props = (0, _filter_props_from.filterPropsFrom)(this.props);

            return _reactDomFactories2.default.tr(props, children);
        }
    }]);

    return Tr;
}(_react2.default.Component);

exports.default = Tr;
;

Tr.childNode = _td.Td;
Tr.dataType = 'object';
//# sourceMappingURL=tr.js.map
