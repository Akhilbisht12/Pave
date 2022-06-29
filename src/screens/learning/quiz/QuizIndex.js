import {View, Image} from 'react-native';
import React from 'react';
import silly from '../../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr3, clr5} from '../../../config/globals';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import quizImage from '../../../assets/illustrations/quiz_comp.png';
const QuizIndex = ({navigation, route}) => {
  const {module, info} = route.params;
  return (
    <View style={[silly.f1, silly.bg1, silly.aic, silly.jce]}>
      <View style={[silly.aic]}>
        <Image
          source={quizImage}
          style={[silly.w90p, silly.rmcon, silly.h40p]}
        />
        <SillyText size={30} my={20} color="orange" family="SemiBold">
          Congratulations
        </SillyText>
        <SillyView
          round={5}
          px={0.01}
          py={0.01}
          my={40}
          style={[silly.w90p]}
          bg={clr2}>
          <SillyView round={5} bg="orange" mx={0.01} my={0.01}>
            <SillyText my={5} color={clr2} family="SemiBold" size={20}>
              {info.name}
            </SillyText>
          </SillyView>
          <View style={[silly.px2, silly.py1]}>
            <View style={[silly.fr, silly.aic, silly.jcbtw, silly.my1]}>
              <SillyText color={clr5}>Learning Module</SillyText>
              <View style={[silly.aic, silly.fr]}>
                <SillyText color={clr5} mx={5} size={18}>
                  10
                </SillyText>
                <Ionicons name="star-outline" color="orange" size={20} />
              </View>
            </View>
            <SillyView bg={clr3} py={0.5} />
            <SillyText my={10} size={14} color={clr5}>
              You have successfully completed this module. {'\n'} Earn some
              bonus points on answering a short{'\n'} quiz on this topic, if you
              like!
            </SillyText>
          </View>
        </SillyView>
      </View>
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my3]}>
        <SillyButton
          onPress={() => navigation.navigate('Learning')}
          style={[silly.w40p]}>
          <SillyText size={16} family="SemiBold" center>
            Maybe Later
          </SillyText>
        </SillyButton>
        <SillyButton
          onPress={() => navigation.navigate('QuizList', {module})}
          py={15}
          style={[silly.w40p]}
          bg={clr2}>
          <SillyText size={16} family="SemiBold" center color={clr1}>
            Start Quiz
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default QuizIndex;
