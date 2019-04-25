'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _redux = require('redux');

var _RrwExtension2 = require('../lib/RrwExtension');

var _RrwExtension3 = _interopRequireDefault(_RrwExtension2);

var _ModuleConfigs = require('../lib/ModuleConfigs');

var _ModuleConfigs2 = _interopRequireDefault(_ModuleConfigs);

var _createReducer = require('../lib/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _getRestActionType = require('../lib/getRestActionType');

var _getRestActionType2 = _interopRequireDefault(_getRestActionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RrwExReducer = (_temp = _class = function (_RrwExtension) {
  _inherits(RrwExReducer, _RrwExtension);

  function RrwExReducer() {
    _classCallCheck(this, RrwExReducer);

    return _possibleConstructorReturn(this, (RrwExReducer.__proto__ || Object.getPrototypeOf(RrwExReducer)).apply(this, arguments));
  }

  _createClass(RrwExReducer, [{
    key: 'inject',
    value: function inject(moduleName, _reducer) {
      var _this2 = this;

      if (this.injectMap[moduleName]) {
        return;
      }

      var reducer = _reducer;
      if (reducer instanceof _ModuleConfigs2.default) {
        var _reducer2 = reducer,
            _reducer2$configs = _reducer2.configs,
            r = _reducer2$configs.reducer,
            resetStateBeforeUnmount = _reducer2$configs.resetStateBeforeUnmount,
            getResetState = _reducer2$configs.getResetState;

        reducer = r;
        this.resetStateBeforeUnmount = resetStateBeforeUnmount;
        this.getResetState = getResetState !== undefined ? getResetState : function () {
          return {};
        };
      }

      if (!(reducer instanceof Function)) {
        reducer = (0, _redux.combineReducers)(_reducer);
      }

      this.resetAction = (0, _getRestActionType2.default)(moduleName);

      var wrappedReducer = function wrappedReducer(state, action) {
        for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        if (action.type === _this2.resetAction) {
          return _this2.getResetState.apply(_this2, [state, action].concat(rest));
        }
        return reducer.apply(undefined, [state, action].concat(rest));
      };

      this.injectMap[moduleName] = wrappedReducer;
      this.store.replaceReducer((0, _createReducer2.default)(this.options.staticReducers, this.injectMap, this.options.createRootReducer));
      return reducer;
    }
  }, {
    key: 'remove',
    value: function remove(moduleName) {
      if (!this.refCounters[moduleName] && this.resetStateBeforeUnmount) {
        this.store.dispatch({ type: this.resetAction });
        // delete this.injectMap[moduleName];
        // this.store.replaceReducer(createReducer(this.options.staticReducers, this.injectMap, this.options.createRootReducer));
      }
    }
  }]);

  return RrwExReducer;
}(_RrwExtension3.default), _class.$name = 'reducer', _temp);
exports.default = RrwExReducer;