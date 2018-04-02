'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _reduxObservable = require('redux-observable');

var _RrwExtension2 = require('../../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

var _appendRootEpic = require('./appendRootEpic');

var _appendRootEpic2 = _interopRequireDefault(_appendRootEpic);

var _Injectable = require('./Injectable');

var _Injectable2 = _interopRequireDefault(_Injectable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RrwExEpic = (_temp = _class = function (_RrwExtension) {
  (0, _inherits3.default)(RrwExEpic, _RrwExtension);

  function RrwExEpic() {
    (0, _classCallCheck3.default)(this, RrwExEpic);
    return (0, _possibleConstructorReturn3.default)(this, (RrwExEpic.__proto__ || Object.getPrototypeOf(RrwExEpic)).apply(this, arguments));
  }

  (0, _createClass3.default)(RrwExEpic, [{
    key: 'getReduxMiddlewares',
    value: function getReduxMiddlewares() {
      // this.mergedEpic = appendRootEpic(emptyEpic);
      this.staticEpic = this.options.staticEpic || _Injectable.emptyEpic;
      if (Array.isArray(this.staticEpic)) {
        this.staticEpic = _reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(this.staticEpic));
      }
      this.mergedEpic = (0, _appendRootEpic2.default)();
      this.middleware = (0, _reduxObservable.createEpicMiddleware)(this.mergedEpic);
      return this.middleware;
    }
  }, {
    key: 'start',
    value: function start() {
      (0, _appendRootEpic2.default)(this.staticEpic);
    }
  }, {
    key: 'inject',
    value: function inject(moduleName, _epic) {
      if (this.refCounters[moduleName] > 1) {
        return;
      }

      var epic = _epic;
      if (Array.isArray(epic)) {
        epic = _reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(_epic));
      }

      var injectable = this.injectMap[moduleName];
      if (injectable) {
        injectable.inject(epic);
      } else {
        injectable = this.injectMap[moduleName] = new _Injectable2.default(epic);
        (0, _appendRootEpic2.default)(injectable.injectableEpic);
        injectable.inject();
      }

      return injectable;
    }
  }, {
    key: 'remove',
    value: function remove(moduleName, injectable) {
      if (!this.refCounters[moduleName]) {
        injectable && injectable.remove();
        this.injectMap[moduleName] && this.injectMap[moduleName].remove();
      }
    }
  }]);
  return RrwExEpic;
}(_RrwExtension3.default), _class.$name = 'epic', _temp);
exports.default = RrwExEpic;