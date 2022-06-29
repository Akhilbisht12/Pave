import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../screens/onBoarding/OnBoarding';
import CreateProfile from '../screens/createProfile/CreateProfile';
import Signup from '../screens/Auth/signup/Signup';
import Login from '../screens/Auth/Login/Login';
import KYC from '../screens/Auth/signup/KYC';
import Forgot from '../screens/Auth/Forgot/Forgot';

const Unauthenticated = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="KYC" component={KYC} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};

export default Unauthenticated;
