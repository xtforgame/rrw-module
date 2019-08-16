'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.emptyEpic = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _operators = require('rxjs/operators');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emptyEpic = exports.emptyEpic = function emptyEpic() {
  return (0, _rxjs.empty)();
};

var Injectable = function () {
  function Injectable(epic) {
    var _this = this;

    _classCallCheck(this, Injectable);

    this.epic = epic;
    this.subject = new _rxjs.Subject();
    this.injectableEpic = function (action$, store) {
      return _this.subject.pipe((0, _operators.switchMap)(function (epic) {
        // console.log('epic :', epic);
        return epic(action$, store);
      }));
    };
    this.injected = false;
  }

  _createClass(Injectable, [{
    key: 'inject',
    value: function inject(newEpic) {
      this.epic = newEpic || this.epic;
      this.subject.next(this.epic);
      this.injected = true;
      return this.injectableEpic;
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.subject.next(emptyEpic);
      this.injected = false;
      return this.injectableEpic;
    }
  }]);

  return Injectable;
}();

exports.default = Injectable;