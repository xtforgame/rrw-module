'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _RrwExtension2 = require('../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RrwExSaga = (_temp = _class = function (_RrwExtension) {
  _inherits(RrwExSaga, _RrwExtension);

  function RrwExSaga() {
    _classCallCheck(this, RrwExSaga);

    return _possibleConstructorReturn(this, (RrwExSaga.__proto__ || Object.getPrototypeOf(RrwExSaga)).apply(this, arguments));
  }

  _createClass(RrwExSaga, [{
    key: 'getReduxMiddlewares',
    value: function getReduxMiddlewares() {
      this.middleware = (0, _reduxSaga2.default)();
      return this.middleware;
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.options.staticSaga) {
        if (Array.isArray(this.options.staticSaga)) {
          var sagas = this.options.staticSaga;
          this.staticSaga = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _effects.all)(sagas.map(function (saga) {
                      return (0, _effects.call)(saga);
                    }));

                  case 2:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          });
        } else {
          this.staticSaga = this.options.staticSaga;
        }
        this.middleware.run(this.staticSaga);
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
        saga = /*#__PURE__*/regeneratorRuntime.mark(function saga() {
          return regeneratorRuntime.wrap(function saga$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _effects.all)(_saga.map(function (saga) {
                    return (0, _effects.call)(saga);
                  }));

                case 2:
                case 'end':
                  return _context2.stop();
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