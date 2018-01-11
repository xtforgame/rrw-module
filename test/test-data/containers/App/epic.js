import { combineEpics } from 'redux-observable';
import {
  SYN_TICK,
  TICK,
} from './constants';

import {
  tock,
} from './actions';

const synTickEpic = (action$, store) => {
  return action$.ofType(SYN_TICK)
  .mergeMap(action => [tock()])
};

const tickEpic = (action$, store) => {
  return action$.ofType(TICK)
  .mergeMap(action =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(tock()); // Should be canceled by dynamic epic loading
      }, 0);
    })
  )
};

export default combineEpics(
  synTickEpic,
  tickEpic
);
