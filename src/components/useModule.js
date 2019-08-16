import { useState, useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux'
import getDisplayName from '../utils/getDisplayName';

export default (props, inputModuleName, extensionParams = {}, options = {}) => {
  if(!inputModuleName){
    throw new Error('Module name required');
  }
  const storeKey = options.storeKey || 'store';
  const rrc = useContext(ReactReduxContext);
  const [store] = useState(props[storeKey] || rrc[storeKey]);

  const [{
    moduleName,
    extensionStates,
  }] = useState(() => {
    // console.log('props :', props);
    // console.log('extensionParams :', extensionParams);
    const moduleName = inputModuleName || getDisplayName(Component);
    const extensionStates = store.rrwmDispatch('willMount', {
      moduleName,
      options,
      extensionParams,
    });
    return {
      moduleName,
      extensionStates,
    }
  });

  useEffect(() => () => {
    store.rrwmDispatch('willUnmount', {
      moduleName,
      options,
      extensionParams,
      extensionStates,
    }, true);
    // extensionStates = {};
  }, []);
}
