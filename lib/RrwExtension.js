'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RrwExtension = function () {
  _createClass(RrwExtension, null, [{
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
    _classCallCheck(this, RrwExtension);

    this.options = options;
    this.refCounters = {};
    this.injectMap = {};
  }

  _createClass(RrwExtension, [{
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