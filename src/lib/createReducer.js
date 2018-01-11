import { combineReducers } from 'redux-immutable';

export default function createReducer(staticReducers, moduleReducers) {
  // console.log('moduleReducers :', moduleReducers);
  return combineReducers({
    ...staticReducers,
    ...moduleReducers,
  });
}
