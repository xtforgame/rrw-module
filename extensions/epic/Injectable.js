'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.emptyEpic = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Subject = require('rxjs/Subject');

var _rxjs = require('rxjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyEpic = exports.emptyEpic = function emptyEpic() {
  return _rxjs.Observable.empty();
};

var Injectable = function () {
  function Injectable(epic) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Injectable);

    this.epic = epic;
    this.subject = new _Subject.Subject();
    this.injectableEpic = function (action$, store) {
      return _this.subject.switchMap(function (epic) {
        // console.log('epic :', epic);
        return epic(action$, store);
      });
    };
    this.injected = false;
  }

  (0, _createClass3.default)(Injectable, [{
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