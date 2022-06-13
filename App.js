import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import StackNav from './src/navigations/StackNav';
import {Provider} from 'react-redux';
import Store from './src/store/Store';
import axios from 'axios';
import silly from './src/Silly/styles/silly';
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StatusBar backgroundColor="rgb(49,34,122)" />
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
