import {View, ToastAndroid, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {
  SillyButton,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1, clr4, clr5} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import quiz_img from '../../../assets/illustrations/quiz.png';

const QuizList = ({route, navigation}) => {
  const [quizes, set_quizes] = useState([]);
  const {module} = route.params;
  useEffect(() => {
    const getQuizes = async () => {
      try {
        const quiz_res = await axios.get(
          `${server}/learning/quizzes/?module=${module}`,
        );
        set_quizes(quiz_res.data.results);
        console.log(quiz_res.data);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Failed getting quizes');
      }
    };
    getQuizes();
  }, [module]);
  return (
    <View style={[silly.p1]}>
      <SillyText color={clr1} size={30} family="SemiBold">
        Module Quizes
      </SillyText>
      <View style={[silly.mt2]}>
        {quizes.map(item => {
          return (
            <SillyView
              style={[silly.aic, silly.fr]}
              elev={2}
              bg={'white'}
              key={item.id}>
              <Image
                source={quiz_img}
                style={[silly.w30p, silly.rmcon, silly.h15p]}
              />
              <View style={[silly.ais]}>
                <SillyText color={clr1} size={20}>
                  {item.name}
                </SillyText>
                <View style={[silly.fr, silly.jcs]}>
                  <Ionicons color={'orange'} name="star" size={18} />
                  <SillyText size={18} color={'orange'}>
                    {item.score} Points
                  </SillyText>
                </View>
                <View style={[silly.fr, silly.jcs]}>
                  <Ionicons color={clr5} name="timer-outline" size={16} />
                  <SillyText mx={5} color={clr5}>
                    {moment(item.start_date).format('DD MMM')} -{' '}
                    {moment(item.end_date).format('DD MMM YY')}
                  </SillyText>
                </View>

                <SillyButton
                  onPress={() =>
                    navigation.navigate('ModuleQuiz', {quiz: item.id})
                  }
                  mx={0.01}
                  py={5}
                  style={[silly.bw1, silly.bc1]}>
                  <SillyText size={16} center color={clr1}>
                    Start Quiz
                  </SillyText>
                </SillyButton>
              </View>
            </SillyView>
          );
        })}
      </View>
    </View>
  );
};

export default QuizList;
