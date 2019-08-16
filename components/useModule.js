'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _getDisplayName = require('../utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props, inputModuleName) {
  var extensionParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!inputModuleName) {
    throw new Error('Module name required');
  }
  var storeKey = options.storeKey || 'store';
  var rrc = (0, _react.useContext)(_reactRedux.ReactReduxContext);

  var _useState = (0, _react.useState)(props[storeKey] || rrc[storeKey]),
      _useState2 = _slicedToArray(_useState, 1),
      store = _useState2[0];

  var _useState3 = (0, _react.useState)(function () {
    // console.log('props :', props);
    // console.log('extensionParams :', extensionParams);
    var moduleName = inputModuleName || (0, _getDisplayName2.default)(Component);
    var extensionStates = store.rrwmDispatch('willMount', {
      moduleName: moduleName,
      options: options,
      extensionParams: extensionParams
    });
    return {
      moduleName: moduleName,
      extensionStates: extensionStates
    };
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      _useState4$ = _useState4[0],
      moduleName = _useState4$.moduleName,
      extensionStates = _useState4$.extensionStates;

  (0, _react.useEffect)(function () {
    return function () {
      store.rrwmDispatch('willUnmount', {
        moduleName: moduleName,
        options: options,
        extensionParams: extensionParams,
        extensionStates: extensionStates
      }, true);
      // extensionStates = {};
    };
  }, []);
};