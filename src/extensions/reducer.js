import { combineReducers } from 'redux';
import RrwExtension from '../lib/RrwExtension';
import ModuleConfigs from '../lib/ModuleConfigs';
import createReducer from '../lib/createReducer';
import getRestActionType from '../lib/getRestActionType';

export default class RrwExReducer extends RrwExtension {
  static $name = 'reducer';

  inject(moduleName, _reducer) {
    if(this.injectMap[moduleName]){
      return ;
    }

    let reducer = _reducer;
    if(reducer instanceof ModuleConfigs){
      const {
        configs: {
          reducer: r,
          resetStateBeforeUnmount,
          getResetState,
        },
      } = reducer;
      reducer = r;
      this.resetStateBeforeUnmount = resetStateBeforeUnmount;
      this.getResetState = getResetState !== undefined ? getResetState : () => ({});
    }
    
    if(!(reducer instanceof Function)){
      reducer = combineReducers(_reducer);
    }

    this.resetAction = getRestActionType(moduleName);

    const wrappedReducer = (state, action, ...rest) => {
      if (action.type === this.resetAction) {
        return this.getResetState(state, action, ...rest);
      }
      return reducer(state, action, ...rest);
    }

    this.injectMap[moduleName] = wrappedReducer;
    this.store.replaceReducer(createReducer(this.options.staticReducers, this.injectMap, this.options.createRootReducer));
    return reducer;
  };

  remove(moduleName){
    if(!this.refCounters[moduleName] && this.resetStateBeforeUnmount){
      setTimeout(() => {
        this.store.dispatch({ type: this.resetAction });
      });
      // delete this.injectMap[moduleName];
      // this.store.replaceReducer(createReducer(this.options.staticReducers, this.injectMap, this.options.createRootReducer));
    }
  }
}
