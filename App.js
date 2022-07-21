import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import StackNav from './src/navigations/StackNav';
import {Provider} from 'react-redux';
import Store from './src/store/Store';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
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
  async function buildLink() {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: 'https://referrals.pave.money/user=akhil',
        android: {
          packageName: 'com.pave',
        },
        domainUriPrefix: 'https://referrals.pave.money',
      });
      console.log(link);
      return link;
    } catch (error) {
      console.log(error);
    }
  }
  const getLinks = async () => {
    try {
      const link = await dynamicLinks().getInitialLink();
      console.log(link, 'link from get');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // buildLink();
    getLinks();
    messaging()
      .getToken()
      .then(token => {
        console.log('firebase ' + token);
        sendFirebaseToken(token);
      });

    //method one from firebase
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state: method 1',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state: method2 ',
            remoteMessage.notification,
          );
        }
      });
    //update server token whenever firebase token is updated
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
