'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendRootEpic;

var _Subject = require('rxjs/Subject');

var subject = new _Subject.Subject();
var mergedEpic = function mergedEpic(action$, store) {
  return subject.mergeMap(function (epic) {
    // console.log('epic :', epic);
    return epic(action$, store);
  });
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