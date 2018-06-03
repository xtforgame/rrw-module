import { combineReducers } from 'redux-immutable';

const defaultRootReducerCreator = (rootReducer) => (state, action) => rootReducer(state, action);

export default function createReducer(staticReducers, moduleReducers, rootReducerCreator = defaultRootReducerCreator) {
  // console.log('moduleReducers :', moduleReducers);
  return rootReducerCreator(combineReducers({
    ...staticReducers,
    ...moduleReducers,
  }));
}
