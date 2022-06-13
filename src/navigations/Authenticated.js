import React, {useContext} from 'react';
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
import PointsGuide from '../screens/Profile/PointsGuide';
import AuthContext from './AuthContext';
import axios from 'axios';
import Storage from '@react-native-async-storage/async-storage';
import {server} from '../config/server_url';

const Authenticated = () => {
  const {state} = useContext(AuthContext);
  const {access, refresh} = state;
  axios.interceptors.request.use(req => {
    if (access) {
      req.headers.Authorization = `Bearer ${access}`;
    }
    return req;
  });

  axios.interceptors.response.use(
    res => {
      return res;
    },
    async function (error) {
      console.log(error.response.data.code);
      const originalRequest = error.config;
      if (error.response.data.code === 'token_not_valid') {
        console.log('this ran');
        const access_token = await fetch(`${server}/iam/auth/token/refresh/`, {
          method: 'post',
          body: refresh,
        });
        console.log(access_token.data);
        await Storage.setItem('access', access_token.data.access);
        axios.defaults.headers.common.Authorization =
          'Bearer ' + access_token.data.access;
        return axios.create(originalRequest);
      }
      return Promise.reject(error);
    },
  );
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
      <Stack.Screen name="PointsGuide" component={PointsGuide} />
    </Stack.Navigator>
  );
};

export default Authenticated;
