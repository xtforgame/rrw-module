import React from 'react';
import PropTypes from 'prop-types'
import getDisplayName from '../utils/getDisplayName';

export default (moduleName, extensionParams = {}, options = {}) => (Component) => {
  if(!moduleName){
    throw new Error('Module name required');
  }
  
  const storeKey = options.storeKey || 'store';
  const MakeModuleHoc = class MakeModuleHoc extends React.Component {
    static displayName = `makeModule(${getDisplayName(Component)})`;
    static contextTypes = {
      [storeKey]: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,

        getStaticReducers: PropTypes.func.isRequired,
        getExtensions: PropTypes.func.isRequired,
        getReversedExtensions: PropTypes.func.isRequired,
        registerExtension: PropTypes.func.isRequired,
        rrwmDispatch: PropTypes.func.isRequired,
      }),
    };

    constructor(props, context) {
      super(props, context);
      this.store = props[storeKey] || context[storeKey]
    }

    componentWillMount(){
      // console.log('this.props :', this.props);
      // console.log('extensionParams :', extensionParams);
      this.moduleName = moduleName || getDisplayName(Component);
      this.extensionStates = this.store.rrwmDispatch('willMount', {
        moduleName: this.moduleName,
        options,
        extensionParams,
      });
    }

    componentWillUnmount(){
      this.store.rrwmDispatch('willUnmount', {
        moduleName: this.moduleName,
        options,
        extensionParams,
        extensionStates: this.extensionStates,
      }, true);
      this.extensionStates = {};
    }

    render(){
      return (<Component {...this.props} />);
    }
  }
  return MakeModuleHoc;
}