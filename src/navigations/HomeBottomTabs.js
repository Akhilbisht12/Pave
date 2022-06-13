import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Dashboard from '../screens/dashboard/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import Learning from '../screens/learning/Learning';
import SavingsNav from '../screens/savings/SavingsNav';
import ProfileNav from '../screens/Profile/ProfileNav';
import {clr1} from '../config/globals';
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
          backgroundColor: 'white',
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: clr1,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Money" component={SavingsNav} />
      <Tab.Screen name="Learning" component={Learning} />
      <Tab.Screen name="Profile" component={ProfileNav} />
      {/* <Tab.Screen name="Settings" component={SettingsNav} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabNav: {},
});

export default HomeBottomTabs;
