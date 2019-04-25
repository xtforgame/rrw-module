'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createReducer;

var _reduxImmutable = require('redux-immutable');

var defaultRootReducerCreator = function defaultRootReducerCreator(rootReducer) {
  return function (state, action) {
    return rootReducer(state, action);
  };
};

function createReducer(staticReducers, moduleReducers) {
  var rootReducerCreator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultRootReducerCreator;

  // console.log('moduleReducers :', moduleReducers);
  return rootReducerCreator((0, _reduxImmutable.combineReducers)(_extends({}, staticReducers, moduleReducers)));
}