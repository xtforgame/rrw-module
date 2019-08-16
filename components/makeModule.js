'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _getDisplayName = require('../utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _useModule = require('./useModule');

var _useModule2 = _interopRequireDefault(_useModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// static contextTypes = {
//   [storeKey]: PropTypes.shape({
//     subscribe: PropTypes.func.isRequired,
//     dispatch: PropTypes.func.isRequired,
//     getState: PropTypes.func.isRequired,

//     getStaticReducers: PropTypes.func.isRequired,
//     getExtensions: PropTypes.func.isRequired,
//     getReversedExtensions: PropTypes.func.isRequired,
//     registerExtension: PropTypes.func.isRequired,
//     rrwmDispatch: PropTypes.func.isRequired,
//   }),
// };

exports.default = function (inputModuleName) {
  var extensionParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (Component) {
    var MakeModuleHoc = function MakeModuleHoc(props) {
      (0, _useModule2.default)(props, inputModuleName, extensionParams, options);
      return _react2.default.createElement(Component, props);
    };

    MakeModuleHoc.displayName = 'makeModule(' + (0, _getDisplayName2.default)(Component) + ')';
    return MakeModuleHoc;
  };
};