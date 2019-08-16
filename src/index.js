import createReducer from './lib/createReducer';
import configureStore from './lib/configureStore';
import RrwExtension from './lib/RrwExtension';
import getRestActionType from './lib/getRestActionType';
import ModuleConfigs from './lib/ModuleConfigs';
import useModule from './components/useModule';
import makeModule from './components/makeModule';

export const withModule = makeModule;

export {
  createReducer,
  configureStore,
  RrwExtension,
  getRestActionType,
  ModuleConfigs,
  useModule,
  makeModule,
};
