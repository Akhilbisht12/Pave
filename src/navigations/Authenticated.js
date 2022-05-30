import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeBottomTabs from './HomeBottomTabs';
import Spin from '../screens/spin/Spin';
import Stories from '../screens/stories/Stories';
import Learn from '../screens/learning/learn/Learn';
import ModuleQuiz from '../screens/learning/quiz/ModuleQuiz';
import QuizIndex from '../screens/learning/quiz/QuizIndex';
import Quiz from '../screens/learning/quiz/Quiz';
import SettingsNav from '../screens/settings/SettingsNav';
import QuizEnd from '../screens/learning/quiz/QuizEnd';
import Profile from '../screens/settings/Profile';
import PointsGuide from '../screens/Profile/PointsGuide';
import KYC from '../screens/Auth/signup/KYC';

const Authenticated = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeBottomTabs} />
      <Stack.Screen name="Spin" component={Spin} />
      <Stack.Screen name="Stories" component={Stories} />
      <Stack.Screen name="Learn" component={Learn} />
      <Stack.Screen name="ModuleQuiz" component={ModuleQuiz} />
      <Stack.Screen name="QuizIndex" component={QuizIndex} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="QuizEnd" component={QuizEnd} />
      <Stack.Screen name="Settings" component={SettingsNav} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PointsGuide" component={PointsGuide} />
    </Stack.Navigator>
  );
};

export default Authenticated;
