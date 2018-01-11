import { fromJS } from 'immutable';

import { configureStore } from '../../src';
import RrwExEpic from '../../src/extensions/epic';
import RrwExSaga from '../../src/extensions/saga';

import appReducer from './containers/App/reducer';
import appEpic from './containers/App/epic';
import appSaga from './containers/App/saga';

const staticReducers = {
  global: appReducer,
};

export default (initialState) => configureStore(staticReducers, fromJS(initialState), {
  extensions: [
    {
      extension: RrwExEpic,
      options: {
        staticEpic: appEpic,
      },
    },
    {
      extension: RrwExSaga,
      options: {
        staticSaga: appSaga,
      },
    },
  ],
});
