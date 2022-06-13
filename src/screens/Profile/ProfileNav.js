import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';
import ProfileOverview from './ProfileOverview';
import MyProfile from './MyProfile';
import Nominee from './Nominee';
import Pan from './Pan';
import Bank from './Bank';
import Address from './Address';
const Stack = createNativeStackNavigator();
const ProfileNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileOverview" component={ProfileOverview} />
      <Stack.Screen name="EditProfile" component={Profile} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="Nominee" component={Nominee} />
      <Stack.Screen name="Pan" component={Pan} />
      <Stack.Screen name="Bank" component={Bank} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
