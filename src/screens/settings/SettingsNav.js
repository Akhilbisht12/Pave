import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './Settings';
// import Profile from '../Profile/Profile';
import Help from './Help';
import Faqs from './Faqs';
const Stack = createNativeStackNavigator();
const SettingsNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings-Home" component={Settings} />
      {/* <Stack.Screen name="ProfileEdit" component={Profile} /> */}
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Faqs" component={Faqs} />
    </Stack.Navigator>
  );
};

export default SettingsNav;
