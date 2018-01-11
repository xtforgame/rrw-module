'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RrwExtension = function () {
  (0, _createClass3.default)(RrwExtension, null, [{
    key: 'create',
    value: function create(extDescription) {
      var ExtClass = null;
      var options = null;

      if (extDescription && extDescription.prototype instanceof RrwExtension) {
        ExtClass = extDescription;
        options = {};
      } else {
        ExtClass = extDescription.extension;
        options = extDescription.options || {};
      }
      if (!ExtClass) {
        throw Error('No valid Rrw extension provided.');
      }
      return new ExtClass(options);
    }
  }]);

  function RrwExtension(options) {
    (0, _classCallCheck3.default)(this, RrwExtension);

    this.options = options;
    this.refCounters = {};
    this.injectMap = {};
  }

  (0, _createClass3.default)(RrwExtension, [{
    key: 'getReduxMiddlewares',
    value: function getReduxMiddlewares() {
      return null;
    }
  }, {
    key: 'init',
    value: function init(store) {
      this.store = store;
    }
  }, {
    key: 'start',
    value: function start() {}
  }, {
    key: 'willMount',
    value: function willMount(_ref) {
      var moduleName = _ref.moduleName,
          options = _ref.options,
          value = _ref.params;

      this.refCounters[moduleName] = (this.refCounters[moduleName] || 0) + 1;
      return this.inject(moduleName, value, options);
    }
  }, {
    key: 'willUnmount',
    value: function willUnmount(_ref2) {
      var moduleName = _ref2.moduleName,
          options = _ref2.options,
          value = _ref2.params,
          handle = _ref2.state;

      this.refCounters[moduleName]--;
      return this.remove(moduleName, handle, options);
    }
  }, {
    key: 'inject',
    value: function inject() {}
  }, {
    key: 'remove',
    value: function remove() {}
  }]);
  return RrwExtension;
}();

exports.default = RrwExtension;