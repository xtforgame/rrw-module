'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = createInjectableEpic;

var _reduxObservable = require('redux-observable');

var _makeEpicInjectable = require('./makeEpicInjectable');

var _makeEpicInjectable2 = _interopRequireDefault(_makeEpicInjectable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootInjectable = null;

function createInjectableEpic(staticEpic) {
  var moduleInjectables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!rootInjectable) {
    rootInjectable = (0, _makeEpicInjectable2.default)(staticEpic);
  }
  rootInjectable.inject(_reduxObservable.combineEpics.apply(undefined, [staticEpic].concat((0, _toConsumableArray3.default)(moduleInjectables))));
  return rootInjectable;
}