'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _RrwExtension2 = require('../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RrwExSaga = (_temp = _class = function (_RrwExtension) {
  (0, _inherits3.default)(RrwExSaga, _RrwExtension);

  function RrwExSaga() {
    (0, _classCallCheck3.default)(this, RrwExSaga);
    return (0, _possibleConstructorReturn3.default)(this, (RrwExSaga.__proto__ || Object.getPrototypeOf(RrwExSaga)).apply(this, arguments));
  }

  (0, _createClass3.default)(RrwExSaga, [{
    key: 'getReduxMiddlewares',
    value: function getReduxMiddlewares() {
      this.middleware = (0, _reduxSaga2.default)();
      return this.middleware;
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.options.staticSaga) {
        this.middleware.run(this.options.staticSaga);
      }
    }

    // remove(moduleName, task){
    //   if(this.injectMap[moduleName] === task){
    //     this.injectMap[moduleName] = null;
    //   }
    //   return (task && task.cancel());
    // }

    // inject(moduleName, _saga){
    //   let saga = _saga;

    //   if(Array.isArray(saga)){
    //     saga = function* () {
    //       yield all(_saga.map(saga => call(saga)));
    //     }
    //   }

    //   if(this.injectMap[moduleName]){
    //     this.remove(moduleName, this.injectMap[moduleName]);
    //   }
    //   return (this.injectMap[moduleName] = this.middleware.run(saga));
    // }

  }, {
    key: 'inject',
    value: function inject(moduleName, _saga) {
      if (this.refCounters[moduleName] > 1) {
        return;
      }
      var saga = _saga;

      if (Array.isArray(saga)) {
        saga = /*#__PURE__*/_regenerator2.default.mark(function saga() {
          return _regenerator2.default.wrap(function saga$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _effects.all)(_saga.map(function (saga) {
                    return (0, _effects.call)(saga);
                  }));

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, saga, this);
        });
      }
      return this.injectMap[moduleName] = this.middleware.run(saga);
    }
  }, {
    key: 'remove',
    value: function remove(moduleName, task) {
      if (!this.refCounters[moduleName]) {
        task && task.cancel();
        this.injectMap[moduleName] && this.injectMap[moduleName].cancel();
        this.injectMap[moduleName] = null;
      }
    }
  }]);
  return RrwExSaga;
}(_RrwExtension3.default), _class.$name = 'saga', _temp);
exports.default = RrwExSaga;