import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import Offline from 'offline-plugin/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import createStore from './store';
import routes from './routes';
import history from './history';

const store = createStore();

if (process.env.NODE_ENV === 'production') Offline.install();

export const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

const startApp = () => {
  if (!module.hot) render(<Root />, document.querySelector('react'));
  serviceWorker.unregister();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}