'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getDisplayName = require('../utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      (0, _inherits3.default)(MakeModuleHoc, _React$Component);

      function MakeModuleHoc(props, context) {
        (0, _classCallCheck3.default)(this, MakeModuleHoc);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MakeModuleHoc.__proto__ || Object.getPrototypeOf(MakeModuleHoc)).call(this, props, context));

        _this.store = props[storeKey] || context[storeKey];
        return _this;
      }

      (0, _createClass3.default)(MakeModuleHoc, [{
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
    }(_react2.default.Component), _class.displayName = 'makeModule(' + (0, _getDisplayName2.default)(Component) + ')', _class.contextTypes = (0, _defineProperty3.default)({}, storeKey, _propTypes2.default.shape({
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