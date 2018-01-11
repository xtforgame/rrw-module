export default class RrwExtension {
  static create(extDescription){
    let ExtClass = null;
    let options = null;

    if(extDescription && extDescription.prototype instanceof RrwExtension){
      ExtClass = extDescription;
      options = {};
    }else{
      ExtClass = extDescription.extension;
      options = extDescription.options || {};
    }
    if(!ExtClass){
      throw Error('No valid Rrw extension provided.');
    }
    return new ExtClass(options);
  }
  
  constructor(options) {
    this.options = options;
    this.refCounters = {};
    this.injectMap = {};
  }

  getReduxMiddlewares() {
    return null;
  }

  init(store){
    this.store = store;
  }

  start(){
  }

  willMount({moduleName, options, params: value}){
    this.refCounters[moduleName] = (this.refCounters[moduleName] || 0) + 1;
    return this.inject(moduleName, value, options);
  }

  willUnmount({moduleName, options, params: value, state: handle}){
    this.refCounters[moduleName]--;
    return this.remove(moduleName, handle, options);
  }

  inject(){
  }

  remove(){
  }
}
