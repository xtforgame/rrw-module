import wraning from 'warning';
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
      const state = extensionStates[extensionName];
      if(extensionName in extensionParams && extension[method]){
        const params = extensionParams[extensionName];
        if(params === undefined){
          wraning(!!params, `An RrwModule \`${moduleName}\` was bound with an extension \`${extensionName}\` with undefined value (skipped)`);
          return;
        }
        resultExtensionStates[extensionName] = extension[method]({moduleName, options, params, state});
      }
    });
    return resultExtensionStates;
  }
  return store;
}
