'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyEpic = undefined;
exports.default = makeEpicInjectable;

var _Subject = require('rxjs/Subject');

var _rxjs = require('rxjs');

var emptyEpic = exports.emptyEpic = function emptyEpic() {
  return _rxjs.Observable.empty();
};

function makeEpicInjectable(_originalEpic) {
  var originalEpic = function originalEpic(action$, store) {
    return _originalEpic(action$, store);
  };
  // .takeUntil(action$.ofType(LOCATION_CHANGE));

  var subject = new _Subject.Subject();
  var injectableEpic = function injectableEpic(action$, store) {
    return subject.switchMap(function (epic) {
      // console.log('epic :', epic);
      return epic(action$, store);
    });
  };

  var injected = false;

  return {
    injectableEpic: injectableEpic,
    epic: originalEpic,
    subject: subject,
    inject: function inject(newEpic) {
      this.epic = newEpic || this.epic;
      subject.next(this.epic);
      injected = true;
      return injectableEpic;
    },
    remove: function remove() {
      subject.next(emptyEpic);
      injected = false;
      return injectableEpic;
    }
  };
}