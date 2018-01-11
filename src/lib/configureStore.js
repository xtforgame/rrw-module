import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import RrwExtension from './RrwExtension';
import createReducer from './createReducer';
import RrwExReducer from '../extensions/reducer';
import storeMixin from '../utils/storeMixin';

let store = null;
export default (staticReducers, initialState = {}, {
  extensions: inExtDescriptions = [],
  middlewares: customMiddlewares = [],
  compose = reduxCompose,
}) => {
  const extDescriptions = [
    {
      extension: RrwExReducer,
      options: {
        staticReducers,
      },
    },
    ...inExtDescriptions,
  ];

  const extensions = extDescriptions.map(extDescription => {
    const inst = RrwExtension.create(extDescription);
    return inst;
  });

  const middlewares = [];
  extensions.forEach(extension => {
    const mdws = extension.getReduxMiddlewares();
    if(Array.isArray(mdws)){
      middlewares.concat(mdws);
    }else if(mdws){
      middlewares.push(mdws);
    }
  });

  store = createStore(
    createReducer(staticReducers),
    initialState,
    compose(
      applyMiddleware(...middlewares, ...customMiddlewares)
    )
  );

  // Extensions
  storeMixin(store, staticReducers, extensions);

  store.getExtensions().forEach(extension => store.registerExtension(extension));
  store.getExtensions().forEach(extension => extension.init(store));
  store.getExtensions().forEach(extension => extension.start());

  return store;
}
