import { combineReducers } from 'redux';
import RrwExtension from '../lib/RrwExtension';
import createReducer from '../lib/createReducer';

export default class RrwExReducer extends RrwExtension {
  static $name = 'reducer';

  inject(moduleName, _reducer) {
    if(this.injectMap[moduleName]){
      return ;
    }

    let reducer = _reducer;
    if(!(reducer instanceof Function)){
      reducer = combineReducers(_reducer);
    }

    this.injectMap[moduleName] = reducer;
    this.store.replaceReducer(createReducer(this.options.staticReducers, this.injectMap));
    return reducer;
  };
}
