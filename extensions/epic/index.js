'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _reduxObservable = require('redux-observable');

var _RrwExtension2 = require('../../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

var _appendRootEpic = require('./appendRootEpic');

var _appendRootEpic2 = _interopRequireDefault(_appendRootEpic);

var _Injectable = require('./Injectable');

var _Injectable2 = _interopRequireDefault(_Injectable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RrwExEpic = (_temp = _class = function (_RrwExtension) {
  _inherits(RrwExEpic, _RrwExtension);

  function RrwExEpic() {
    _classCallCheck(this, RrwExEpic);

    return _possibleConstructorReturn(this, (RrwExEpic.__proto__ || Object.getPrototypeOf(RrwExEpic)).apply(this, arguments));
  }

  _createClass(RrwExEpic, [{
    key: 'getReduxMiddlewares',
    value: function getReduxMiddlewares() {
      // this.mergedEpic = appendRootEpic(emptyEpic);
      this.staticEpic = this.options.staticEpic || _Injectable.emptyEpic;
      if (Array.isArray(this.staticEpic)) {
        this.staticEpic = _reduxObservable.combineEpics.apply(undefined, _toConsumableArray(this.staticEpic));
      }
      this.middleware = (0, _reduxObservable.createEpicMiddleware)();
      return this.middleware;
    }
  }, {
    key: 'start',
    value: function start() {
      this.mergedEpic = (0, _appendRootEpic2.default)();
      this.middleware.run(this.mergedEpic);
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
        epic = _reduxObservable.combineEpics.apply(undefined, _toConsumableArray(_epic));
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