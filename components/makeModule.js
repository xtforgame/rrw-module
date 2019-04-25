'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getDisplayName = require('../utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (moduleName) {
  var extensionParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (Component) {
    var _class, _temp;

    if (!moduleName) {
      throw new Error('Module name required');
    }

    var storeKey = options.storeKey || 'store';
    var MakeModuleHoc = (_temp = _class = function (_React$Component) {
      _inherits(MakeModuleHoc, _React$Component);

      function MakeModuleHoc(props, context) {
        _classCallCheck(this, MakeModuleHoc);

        var _this = _possibleConstructorReturn(this, (MakeModuleHoc.__proto__ || Object.getPrototypeOf(MakeModuleHoc)).call(this, props, context));

        _this.store = props[storeKey] || context[storeKey];
        return _this;
      }

      _createClass(MakeModuleHoc, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          // console.log('this.props :', this.props);
          // console.log('extensionParams :', extensionParams);
          this.moduleName = moduleName || (0, _getDisplayName2.default)(Component);
          this.extensionStates = this.store.rrwmDispatch('willMount', {
            moduleName: this.moduleName,
            options: options,
            extensionParams: extensionParams
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.store.rrwmDispatch('willUnmount', {
            moduleName: this.moduleName,
            options: options,
            extensionParams: extensionParams,
            extensionStates: this.extensionStates
          }, true);
          this.extensionStates = {};
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, this.props);
        }
      }]);

      return MakeModuleHoc;
    }(_react2.default.Component), _class.displayName = 'makeModule(' + (0, _getDisplayName2.default)(Component) + ')', _class.contextTypes = _defineProperty({}, storeKey, _propTypes2.default.shape({
      subscribe: _propTypes2.default.func.isRequired,
      dispatch: _propTypes2.default.func.isRequired,
      getState: _propTypes2.default.func.isRequired,

      getStaticReducers: _propTypes2.default.func.isRequired,
      getExtensions: _propTypes2.default.func.isRequired,
      getReversedExtensions: _propTypes2.default.func.isRequired,
      registerExtension: _propTypes2.default.func.isRequired,
      rrwmDispatch: _propTypes2.default.func.isRequired
    })), _temp);
    return MakeModuleHoc;
  };
};