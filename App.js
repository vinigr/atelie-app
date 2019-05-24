import React, { Component } from 'react';
// import { StatusBar, AppRegistry } from 'react-native';
import './src/ReactotronConfig';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigators/AppNavigator';


// StatusBar.setBarStyle('light-content', true);

import store from './src/store/';


class App extends Component {
  render() {
  	return (
      <Provider store={store}>
          <AppNavigator />
      </Provider>
    );
  }
}

// AppRegistry.registerComponent('App', () => App);

export default App;