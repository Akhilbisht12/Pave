import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Goals from './Goals';
import AddGoal from './goalbased/AddGoal';
import SimpleSaving from './simple/SimpleSaving';
import WhereSaved from './WhereSaved';
import GoalOverview from './goalbased/GoalOverview';
import SimpleOverview from './simple/SimpleOverview';
const SavingsNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Goals" component={Goals} />
      <Stack.Screen name="AddGoal" component={AddGoal} />
      <Stack.Screen name="AddSaving" component={SimpleSaving} />
      <Stack.Screen name="WhereSaved" component={WhereSaved} />
      <Stack.Screen name="GoalOverview" component={GoalOverview} />
      <Stack.Screen name="SimpleOverview" component={SimpleOverview} />
    </Stack.Navigator>
  );
};

export default SavingsNav;
