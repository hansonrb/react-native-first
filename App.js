import { AppRegistry } from 'react-native';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigatior from './app-navigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigatior />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('showcase-app', () => App);
