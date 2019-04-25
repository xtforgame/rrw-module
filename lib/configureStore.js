'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _RrwExtension = require('./RrwExtension');

var _RrwExtension2 = _interopRequireDefault(_RrwExtension);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _reducer = require('../extensions/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _storeMixin = require('../utils/storeMixin');

var _storeMixin2 = _interopRequireDefault(_storeMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var store = null;

exports.default = function (staticReducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref = arguments[2];
  var _ref$reducerOptions = _ref.reducerOptions,
      reducerOptions = _ref$reducerOptions === undefined ? {} : _ref$reducerOptions,
      _ref$extensions = _ref.extensions,
      inExtDescriptions = _ref$extensions === undefined ? [] : _ref$extensions,
      _ref$middlewares = _ref.middlewares,
      customMiddlewares = _ref$middlewares === undefined ? [] : _ref$middlewares,
      _ref$compose = _ref.compose,
      compose = _ref$compose === undefined ? _redux.compose : _ref$compose;

  var extDescriptions = [{
    extension: _reducer2.default,
    options: _extends({
      staticReducers: staticReducers
    }, reducerOptions)
  }].concat(_toConsumableArray(inExtDescriptions));

  var extensions = extDescriptions.map(function (extDescription) {
    var inst = _RrwExtension2.default.create(extDescription);
    return inst;
  });

  var middlewares = [];
  extensions.forEach(function (extension) {
    var mdws = extension.getReduxMiddlewares();
    if (Array.isArray(mdws)) {
      middlewares.concat(mdws);
    } else if (mdws) {
      middlewares.push(mdws);
    }
  });

  store = (0, _redux.createStore)((0, _createReducer2.default)(staticReducers, {}, reducerOptions.createRootReducer), initialState, compose(_redux.applyMiddleware.apply(undefined, middlewares.concat(_toConsumableArray(customMiddlewares)))));

  // Extensions
  (0, _storeMixin2.default)(store, staticReducers, extensions);

  store.getExtensions().forEach(function (extension) {
    return store.registerExtension(extension);
  });
  store.getExtensions().forEach(function (extension) {
    return extension.init(store);
  });
  store.getExtensions().forEach(function (extension) {
    return extension.start();
  });

  return store;
};