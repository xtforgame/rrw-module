import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import RrwExtension from '../../lib/RrwExtension';
import appendRootEpic from './appendRootEpic';
import Injectable, { emptyEpic } from './Injectable';

export default class RrwExEpic extends RrwExtension {
  static $name = 'epic';

  getReduxMiddlewares() {
    // this.mergedEpic = appendRootEpic(emptyEpic);
    this.staticEpic = this.options.staticEpic || emptyEpic;
    if(Array.isArray(this.staticEpic)){
      this.staticEpic = combineEpics(...this.staticEpic);
    }
    this.middleware = createEpicMiddleware();
    return this.middleware;
  }

  start(){
    this.mergedEpic = appendRootEpic();
    this.middleware.run(this.mergedEpic);
    appendRootEpic(this.staticEpic);
  }

  inject(moduleName, _epic){
    if(this.refCounters[moduleName] > 1){
      return ;
    }

    let epic = _epic;
    if(Array.isArray(epic)){
      epic = combineEpics(..._epic);
    }

    let injectable = this.injectMap[moduleName];
    if(injectable){
      injectable.inject(epic);
    }else{
      injectable = this.injectMap[moduleName] = new Injectable(epic);
      appendRootEpic(injectable.injectableEpic);
      injectable.inject();
    }

    return injectable;
  }

  remove(moduleName, injectable){
    if(!this.refCounters[moduleName]){
      injectable && injectable.remove();
      this.injectMap[moduleName] && this.injectMap[moduleName].remove();
    }
  }
}
