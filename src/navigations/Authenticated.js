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
import AxiosCurlirize from 'axios-curlirize';
import QuizList from '../screens/learning/quiz/QuizList';
import {ScrollView} from 'react-native';
import silly from '../Silly/styles/silly';
import jwt_decode from 'jwt-decode';

const Authenticated = () => {
  const {state, dispatch} = useContext(AuthContext);
  const {access, refresh} = state;
  axios.interceptors.request.use(async req => {
    const decode = jwt_decode(access);
    const exp = decode.exp;
    if (exp < Date.now()) {
      try {
        const axiosApi = axios.create();
        const access_token = await axiosApi.post(
          `${server}/iam/auth/token/refresh/`,
          {refresh},
        );
        await Storage.setItem('access', access_token.data.access);
        dispatch({type: 'update_token', token: access_token.data.access});
        req.headers.Authorization = `Bearer ${access_token.data.access}`;
        return req;
      } catch (ref_error) {
        dispatch({type: 'logout'});
      }
    } else {
      console.log('this ran ');
      req.headers.Authorization = `Bearer ${access}`;
      return req;
    }
  });

  axios.interceptors.response.use(
    res => {
      return res;
    },
    async error => {
      const originalRequest = error.config;
      if (error.response.data.code === 'token_not_valid') {
        const axiosApi = axios.create();
        AxiosCurlirize(axiosApi);
        const getNewToken = async () => {
          try {
            const access_token = await axiosApi.post(
              `${server}/iam/auth/token/refresh/`,
              {refresh},
            );
            await Storage.setItem('access', access_token.data.access);
            dispatch({type: 'update_token', token: access_token.data.access});
            originalRequest.headers.Authorization = `Bearer ${access_token.data.access}`;
            return originalRequest;
          } catch (ref_error) {
            dispatch({type: 'logout'});
          }
        };
        getNewToken();
      }
      return Promise.reject(error);
    },
  );
  const Stack = createNativeStackNavigator();
  return (
    <ScrollView contentContainerStyle={[silly.fg1]}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeBottomTabs} />
        <Stack.Screen name="Spin" component={Spin} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen name="ModuleQuiz" component={ModuleQuiz} />
        <Stack.Screen name="QuizIndex" component={QuizIndex} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="QuizList" component={QuizList} />
        <Stack.Screen name="QuizEnd" component={QuizEnd} />
        <Stack.Screen name="Settings" component={SettingsNav} />
        <Stack.Screen name="PointsGuide" component={PointsGuide} />
      </Stack.Navigator>
    </ScrollView>
  );
};

export default Authenticated;
