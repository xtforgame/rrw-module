'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendRootEpic;

var _rxjs = require('rxjs');

var _operators = require('rxjs/operators');

var subject = new _rxjs.Subject();
var mergedEpic = function mergedEpic(action$, state$) {
  return subject.pipe((0, _operators.mergeMap)(function (epic) {
    // console.log('epic :', epic);
    return epic(action$, state$);
  }));
};

function appendRootEpic() {
  for (var _len = arguments.length, epics = Array(_len), _key = 0; _key < _len; _key++) {
    epics[_key] = arguments[_key];
  }

  epics.forEach(function (epic) {
    return subject.next(epic);
  });
  return mergedEpic;
}