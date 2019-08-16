import React, { useState, useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import getDisplayName from '../utils/getDisplayName';
import useModule from './useModule';

// static contextTypes = {
//   [storeKey]: PropTypes.shape({
//     subscribe: PropTypes.func.isRequired,
//     dispatch: PropTypes.func.isRequired,
//     getState: PropTypes.func.isRequired,

//     getStaticReducers: PropTypes.func.isRequired,
//     getExtensions: PropTypes.func.isRequired,
//     getReversedExtensions: PropTypes.func.isRequired,
//     registerExtension: PropTypes.func.isRequired,
//     rrwmDispatch: PropTypes.func.isRequired,
//   }),
// };

export default (inputModuleName, extensionParams = {}, options = {}) => (Component) => {
  const MakeModuleHoc = (props) => {
    useModule(props, inputModuleName, extensionParams, options);
    return (<Component {...props} />);
  }

  MakeModuleHoc.displayName = `makeModule(${getDisplayName(Component)})`;
  return MakeModuleHoc;
}