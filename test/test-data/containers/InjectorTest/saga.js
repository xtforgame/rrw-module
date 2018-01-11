import { take, takeEvery, call, put, select, all } from 'redux-saga/effects';

import {
  PING,
} from './constants';

import {
  ping,
  pong,
} from './actions';

function* pingWatcher() {
  yield takeEvery(PING, function* foo(action) {
    yield put(pong());
  });
}

export default pingWatcher;
