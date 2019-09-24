/* eslint-disable no-console */
import React from 'react';
import { Provider } from 'react-redux';

import './config/Text'; // Global Text Config
import './config/ReactotronConfig';
import './config/StatusBarConfig';
import Routes from '~/routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

const TheApp = __DEV__ ? console.tron.overlay(App) : App;

export default TheApp;
