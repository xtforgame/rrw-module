'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createReducer;

var _reduxImmutable = require('redux-immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReducer(staticReducers, moduleReducers) {
  // console.log('moduleReducers :', moduleReducers);
  return (0, _reduxImmutable.combineReducers)((0, _extends3.default)({}, staticReducers, moduleReducers));
}