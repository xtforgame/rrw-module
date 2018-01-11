"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store, staticReducers, extensions) {
  var reversedExtensions = [].concat((0, _toConsumableArray3.default)(extensions)).reverse();
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
      var params = extensionParams[extensionName];
      var state = extensionStates[extensionName];
      if (params && extension[method]) {
        resultExtensionStates[extensionName] = extension[method]({ moduleName: moduleName, options: options, params: params, state: state });
      }
    });
    return resultExtensionStates;
  };
  return store;
};