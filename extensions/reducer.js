'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _redux = require('redux');

var _RrwExtension2 = require('../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

var _createReducer = require('../lib/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RrwExReducer = (_temp = _class = function (_RrwExtension) {
  (0, _inherits3.default)(RrwExReducer, _RrwExtension);

  function RrwExReducer() {
    (0, _classCallCheck3.default)(this, RrwExReducer);
    return (0, _possibleConstructorReturn3.default)(this, (RrwExReducer.__proto__ || Object.getPrototypeOf(RrwExReducer)).apply(this, arguments));
  }

  (0, _createClass3.default)(RrwExReducer, [{
    key: 'inject',
    value: function inject(moduleName, _reducer) {
      if (this.injectMap[moduleName]) {
        return;
      }

      var reducer = _reducer;
      if (!(reducer instanceof Function)) {
        reducer = (0, _redux.combineReducers)(_reducer);
      }

      this.injectMap[moduleName] = reducer;
      this.store.replaceReducer((0, _createReducer2.default)(this.options.staticReducers, this.injectMap, this.options.createRootReducer));
      return reducer;
    }
  }]);
  return RrwExReducer;
}(_RrwExtension3.default), _class.$name = 'reducer', _temp);
exports.default = RrwExReducer;