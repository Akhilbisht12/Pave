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
import Signup from '../screens/Auth/signup/Signup';
import AxiosCurlirize from 'axios-curlirize';
import {useNavigation} from '@react-navigation/native';
import QuizList from '../screens/learning/quiz/QuizList';
import {ScrollView, RefreshControl} from 'react-native';
import silly from '../Silly/styles/silly';

const Authenticated = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(AuthContext);
  const {access, refresh, user_id, id} = state;
  console.log('acce  ' + access);
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
    async error => {
      const originalRequest = error.config;
      if (error.response.data.code === 'token_not_valid') {
        console.info(error.response.data);
        const axiosApi = axios.create();
        originalRequest._retry = true;
        AxiosCurlirize(axiosApi);
        const getNewToken = async () => {
          try {
            const access_token = await axiosApi.post(
              `${server}/iam/auth/token/refresh/`,
              {refresh},
            );
            console.info(access_token.data);
            await Storage.setItem('access', access_token.data.access);
            // CodePush.restartApp();
            dispatch({type: 'update_token', token: access_token.data.access});
            // axios.defaults.headers.common.Authorization = `Bearer ${access_token.data.access}`;
            // axiosApi.defaults.headers.common.Authorization = `Bearer ${access_token.data.access}`;
            originalRequest.headers.Authorization = `Bearer ${access_token.data.access}`;
            return originalRequest;
            // return axiosApi(originalRequest);
          } catch (ref_error) {
            console.log(ref_error.response);
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
