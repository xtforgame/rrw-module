export default (store, staticReducers, extensions) => {
  const reversedExtensions = [...extensions].reverse();
  store.rrwModule = {};
  store.rrwModule.staticReducers = staticReducers;
  store.rrwModule.extensions = extensions;
  store.rrwModule.reversedExtensions = reversedExtensions;
  store.rrwModule.extensionMap = {};
  store.rrwModule.extensions.forEach(extension => {
    store.rrwModule.extensionMap[extension.constructor.$name] = extension;
  });

  store.getStaticReducers = function(){
    return staticReducers;
  }

  store.getExtensions = function(){
    return extensions;
  }

  store.getReversedExtensions = function(){
    return reversedExtensions;
  }

  store.registerExtension = function(extension){
    const extensionName = extension.constructor.$name;
  }

  store.rrwmDispatch = function(method, {moduleName, options, extensionParams, extensionStates = {}}, reverse = false){
    const resultExtensionStates = {};
    const extArray = reverse ? reversedExtensions : extensions;
    extArray.forEach(extension => {
      const extensionName = extension.constructor.$name;
      const params = extensionParams[extensionName];
      const state = extensionStates[extensionName];
      if(params && extension[method]){
        resultExtensionStates[extensionName] = extension[method]({moduleName, options, params, state});
      }
    });
    return resultExtensionStates;
  }
  return store;
}
