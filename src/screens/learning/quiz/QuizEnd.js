import {View, Image} from 'react-native';
import React from 'react';
import silly from '../../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr5} from '../../../config/globals';
import art from '../../../assets/stories/stories-1.png';

const QuizEnd = ({navigation}) => {
  return (
    <View style={[silly.bg1, silly.f1, silly.aic, silly.jce]}>
      <Image source={art} style={[silly.w80p, silly.h30p, silly.rmcon]} />
      <SillyText my={20} color="orange" size={35} family="SemiBold">
        Congratulations!
      </SillyText>
      <SillyText center style={[silly.w70p]}>
        You have fully completed the module and quiz and have earnt 20 reward
        points!
      </SillyText>
      {/* summary card */}
      <SillyView
        round={5}
        px={0.01}
        py={0.01}
        my={40}
        style={[silly.w90p]}
        bg={clr2}>
        <SillyView round={5} bg="orange" mx={0.01} my={0.01}>
          <SillyText my={10} color={clr2} family="Medium" size={24}>
            Mutual Funds 101
          </SillyText>
        </SillyView>
        <View style={[silly.px2]}>
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
          <View style={[silly.fr, silly.aic, silly.jcbtw, silly.my1]}>
            <SillyText color={clr5}>Quiz</SillyText>
            <View style={[silly.aic, silly.fr]}>
              <SillyText color={clr5} mx={5} size={18}>
                10
              </SillyText>
              <Ionicons name="star-outline" color="orange" size={20} />
            </View>
          </View>
        </View>
      </SillyView>
      {/* summary card end */}
      <View style={[silly.fr, silly.jcbtw, silly.my2]}>
        <SillyButton
          bg="transparent"
          style={[silly.w40p, silly.bw1, silly.bc2, silly.jcc]}
          onPress={() => navigation.navigate('Home')}
          my={20}>
          <SillyText color={clr2} center>
            Go Home
          </SillyText>
        </SillyButton>
        <SillyButton my={20} py={20} bg={clr2} style={[silly.w40p]}>
          <SillyText center family="SemiBold" color={clr1}>
            Next Module
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default QuizEnd;
