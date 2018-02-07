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

var _createInjectableEpic = require('./createInjectableEpic');

var _createInjectableEpic2 = _interopRequireDefault(_createInjectableEpic);

var _makeEpicInjectable = require('./makeEpicInjectable');

var _makeEpicInjectable2 = _interopRequireDefault(_makeEpicInjectable);

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
      // this.rootInjectable = createInjectableEpic(emptyEpic);
      this.staticEpic = this.options.staticEpic || _makeEpicInjectable.emptyEpic;
      if (Array.isArray(this.staticEpic)) {
        this.staticEpic = _reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(this.staticEpic));
      }
      this.rootInjectable = (0, _createInjectableEpic2.default)(this.staticEpic);
      this.middleware = (0, _reduxObservable.createEpicMiddleware)(this.rootInjectable.injectableEpic);
      return this.middleware;
    }
  }, {
    key: 'start',
    value: function start() {
      // this.rootInjectable.remove();
      this.rootInjectable.inject();
    }

    // getInjectable(moduleName){
    //   return this.injectMap[moduleName];
    // }

    // remove(moduleName, onlySpecificInjectable){
    //   const injectable = this.injectMap[moduleName];
    //   if(injectable){
    //     if(!onlySpecificInjectable || onlySpecificInjectable === injectable){
    //       injectable.remove();
    //     }
    //   }
    //   return injectable;
    // }

    // inject(moduleName, _epic){
    //   let epic = _epic;

    //   if(Array.isArray(epic)){
    //     epic = combineEpics(..._epic);
    //   }

    //   // // I think we don't really need to explicit remove the origin one
    //   // let originInjectable = this.injectMap[moduleName];
    //   // if(originInjectable){
    //   //   originInjectable.remove();
    //   // }

    //   const injectable = this.injectMap[moduleName] = makeEpicInjectable(epic);
    //   createInjectableEpic(this.staticEpic, Object.keys(this.injectMap).map(key => this.injectMap[key].injectableEpic));
    //   injectable.inject();
    //   return injectable;
    // }

    // remove(moduleName, injectable){
    //   console.log('this.refCounters[moduleName] :', this.refCounters[moduleName]);
    //   if(this.injectMap[moduleName] === injectable){
    //     this.injectMap[moduleName] = null;
    //   }
    //   return (injectable && injectable.remove());
    // }

  }, {
    key: 'inject',
    value: function inject(moduleName, _epic) {
      var _this2 = this;

      if (this.refCounters[moduleName] > 1) {
        return;
      }
      var epic = _epic;

      if (Array.isArray(epic)) {
        epic = _reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(_epic));
      }

      var injectable = this.injectMap[moduleName] = (0, _makeEpicInjectable2.default)(epic);
      (0, _createInjectableEpic2.default)(this.staticEpic, Object.keys(this.injectMap).map(function (key) {
        return _this2.injectMap[key].injectableEpic;
      }));
      injectable.inject();
      return injectable;
    }
  }, {
    key: 'remove',
    value: function remove(moduleName, injectable) {
      if (!this.refCounters[moduleName]) {
        injectable && injectable.remove();
        this.injectMap[moduleName] && this.injectMap[moduleName].remove();
        this.injectMap[moduleName] = null;
      }
    }
  }]);
  return RrwExEpic;
}(_RrwExtension3.default), _class.$name = 'epic', _temp);
exports.default = RrwExEpic;