import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import _ from 'lodash';

import { configureStore } from './store';
import App from './App';

const $rootEl = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  $rootEl,
);


if (module.hot) {
  module.hot.accept('./App', () => {
    const newConfigureStore = require('./store');
    const newStore = newConfigureStore.configureStore();
    const NewApp = require('./App').default;

    ReactDOM.render(
      <AppContainer>
        <NewApp store={newStore} />
      </AppContainer>,
      $rootEl,
    );
  });
}
