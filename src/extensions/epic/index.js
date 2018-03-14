import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import RrwExtension from '../../lib/RrwExtension';
import createInjectableEpic from './createInjectableEpic';
import makeEpicInjectable, { emptyEpic } from './makeEpicInjectable';

export default class RrwExEpic extends RrwExtension {
  static $name = 'epic';

  getReduxMiddlewares() {
    // this.rootInjectable = createInjectableEpic(emptyEpic);
    this.staticEpic = this.options.staticEpic || emptyEpic;
    if(Array.isArray(this.staticEpic)){
      this.staticEpic = combineEpics(...this.staticEpic);
    }
    this.rootInjectable = createInjectableEpic(this.staticEpic);
    this.middleware = createEpicMiddleware(this.rootInjectable.injectableEpic);
    return this.middleware;
  }

  start(){
    // this.rootInjectable.remove();
    this.rootInjectable.inject();
  }

  // getInjectable(moduleName){
  //   return this.injectMap[moduleName];
  // }

  // remove(moduleName, onlySpecificInjectable){
  //   const injectable = this.injectMap[moduleName];
  //   if(injectable){
  //     if(!onlySpecificInjectable || onlySpecificInjectable === injectable){
  //       injectable.remove();
  //     }
  //   }
  //   return injectable;
  // }

  // inject(moduleName, _epic){
  //   let epic = _epic;

  //   if(Array.isArray(epic)){
  //     epic = combineEpics(..._epic);
  //   }

  //   // // I think we don't really need to explicit remove the origin one
  //   // let originInjectable = this.injectMap[moduleName];
  //   // if(originInjectable){
  //   //   originInjectable.remove();
  //   // }

  //   const injectable = this.injectMap[moduleName] = makeEpicInjectable(epic);
  //   createInjectableEpic(this.staticEpic, Object.keys(this.injectMap).map(key => this.injectMap[key].injectableEpic));
  //   injectable.inject();
  //   return injectable;
  // }

  // remove(moduleName, injectable){
  //   console.log('this.refCounters[moduleName] :', this.refCounters[moduleName]);
  //   if(this.injectMap[moduleName] === injectable){
  //     this.injectMap[moduleName] = null;
  //   }
  //   return (injectable && injectable.remove());
  // }

  inject(moduleName, _epic){
    if(this.refCounters[moduleName] > 1){
      return ;
    }
    let epic = _epic;

    if(Array.isArray(epic)){
      epic = combineEpics(..._epic);
    }

    const injectable = this.injectMap[moduleName] = makeEpicInjectable(epic);
    createInjectableEpic(this.staticEpic, Object.keys(this.injectMap).map(key => this.injectMap[key].injectableEpic));
    Object.keys(this.injectMap).map(key => this.injectMap[key].inject());
    return injectable;
  }

  remove(moduleName, injectable){
    if(!this.refCounters[moduleName]){
      injectable && injectable.remove();
      this.injectMap[moduleName] && this.injectMap[moduleName].remove();
      delete this.injectMap[moduleName];
    }
  }
}
