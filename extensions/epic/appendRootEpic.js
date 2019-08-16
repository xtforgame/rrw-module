'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendRootEpic;

var _rxjs = require('rxjs');

var _operators = require('rxjs/operators');

var subject = new _rxjs.Subject();
var mergedEpic = function mergedEpic(action$, state$) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return subject.pipe((0, _operators.mergeMap)(function (epic) {
    // console.log('epic :', epic);
    return epic.apply(undefined, [action$, state$].concat(args));
  }));
};

function appendRootEpic() {
  for (var _len2 = arguments.length, epics = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    epics[_key2] = arguments[_key2];
  }

  epics.forEach(function (epic) {
    return subject.next(epic);
  });
  return mergedEpic;
}