import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import StackNav from './src/navigations/StackNav';
import {Provider} from 'react-redux';
import Store from './src/store/Store';
import axios from 'axios';
import silly from './src/Silly/styles/silly';
import messaging from '@react-native-firebase/messaging';
import {server} from './src/config/server_url';

const App = () => {
  const sendFirebaseToken = async token => {
    try {
      const sendtoken = await axios.post(`${server}/iam/firebase/devices/`, {
        registration_id: token,
        type: 'android',
      });
      console.log(sendtoken.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('firebase ' + token);
        sendFirebaseToken(token);
      });
    return messaging().onTokenRefresh(token => {
      sendFirebaseToken(token);
    });
  }, []);
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
