import { call, all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import RrwExtension from '../lib/RrwExtension';

export default class RrwExSaga extends RrwExtension {
  static $name = 'saga';

  getReduxMiddlewares() {
    this.middleware = createSagaMiddleware();
    return this.middleware;
  }

  start(){
    this.middleware.run(this.options.staticSaga);
  }

  // remove(moduleName, task){
  //   if(this.injectMap[moduleName] === task){
  //     this.injectMap[moduleName] = null;
  //   }
  //   return (task && task.cancel());
  // }

  // inject(moduleName, _saga){
  //   let saga = _saga;
    
  //   if(Array.isArray(saga)){
  //     saga = function* () {
  //       yield all(_saga.map(saga => call(saga)));
  //     }
  //   }

  //   if(this.injectMap[moduleName]){
  //     this.remove(moduleName, this.injectMap[moduleName]);
  //   }
  //   return (this.injectMap[moduleName] = this.middleware.run(saga));
  // }

  inject(moduleName, _saga){
    if(this.refCounters[moduleName] > 1){
      return ;
    }
    let saga = _saga;

    if(Array.isArray(saga)){
      saga = function* () {
        yield all(_saga.map(saga => call(saga)));
      }
    }
    return (this.injectMap[moduleName] = this.middleware.run(saga));
  }

  remove(moduleName, task){
    if(!this.refCounters[moduleName]){
      task && task.cancel();
      this.injectMap[moduleName] && this.injectMap[moduleName].cancel();
      this.injectMap[moduleName] = null;
    }
  }
}
