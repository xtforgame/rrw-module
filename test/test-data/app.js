import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/App';

export default ({store, child}) => (
  <Provider store={store}>
    <App child={child} />
  </Provider>
);