import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Dashboard from '../screens/dashboard/Dashboard';
import Goals from '../screens/savings/Goals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import Learning from '../screens/learning/Learning';
import SettingsNav from '../screens/settings/SettingsNav';
import Profile from '../screens/Profile/Profile';
import SavingsNav from '../screens/savings/SavingsNav';
const Tab = createBottomTabNavigator();
const HomeBottomTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.tabNav}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'compass-outline';
              break;
            case 'Money':
              iconName = 'cash-outline';
              break;
            case 'Learning':
              iconName = 'school-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            // case 'Settings':
            //   iconName = 'albums-outline';
            //   break;
            default:
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: 'rgb(24,16,65)',
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Money" component={SavingsNav} />
      <Tab.Screen name="Learning" component={Learning} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Settings" component={SettingsNav} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabNav: {},
});

export default HomeBottomTabs;
