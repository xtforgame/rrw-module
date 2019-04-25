'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (store, staticReducers, extensions) {
  var reversedExtensions = [].concat(_toConsumableArray(extensions)).reverse();
  store.rrwModule = {};
  store.rrwModule.staticReducers = staticReducers;
  store.rrwModule.extensions = extensions;
  store.rrwModule.reversedExtensions = reversedExtensions;
  store.rrwModule.extensionMap = {};
  store.rrwModule.extensions.forEach(function (extension) {
    store.rrwModule.extensionMap[extension.constructor.$name] = extension;
  });

  store.getStaticReducers = function () {
    return staticReducers;
  };

  store.getExtensions = function () {
    return extensions;
  };

  store.getReversedExtensions = function () {
    return reversedExtensions;
  };

  store.registerExtension = function (extension) {
    var extensionName = extension.constructor.$name;
  };

  store.rrwmDispatch = function (method, _ref) {
    var moduleName = _ref.moduleName,
        options = _ref.options,
        extensionParams = _ref.extensionParams,
        _ref$extensionStates = _ref.extensionStates,
        extensionStates = _ref$extensionStates === undefined ? {} : _ref$extensionStates;
    var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var resultExtensionStates = {};
    var extArray = reverse ? reversedExtensions : extensions;
    extArray.forEach(function (extension) {
      var extensionName = extension.constructor.$name;
      var state = extensionStates[extensionName];
      if (extensionName in extensionParams && extension[method]) {
        var params = extensionParams[extensionName];
        if (params === undefined) {
          (0, _warning2.default)(!!params, 'An RrwModule `' + moduleName + '` was bound with an extension `' + extensionName + '` with undefined value (skipped)');
          return;
        }
        resultExtensionStates[extensionName] = extension[method]({ moduleName: moduleName, options: options, params: params, state: state });
      }
    });
    return resultExtensionStates;
  };
  return store;
};