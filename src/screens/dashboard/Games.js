import {View, Image} from 'react-native';
import React from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr2} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import spin_wheel from '../../assets/illustrations/spin_wheel_daily.png';

const Games = () => {
  const navigation = useNavigation();
  return (
    <SillyView my={15} py={0.01} px={0.01} mx={10} bg="#ffc237">
      <SillyView
        style={[silly.aic, silly.jcbtw, silly.fr]}
        py={10}
        my={0.01}
        bg={clr1}>
        <View style={[silly.ais]}>
          <SillyText my={10} family="SemiBold" size={20}>
            Stand a chance to win{'\n'}prizes upto ₹100 per try!
          </SillyText>
          <SillyText>Each Spin costs 500 points</SillyText>

          <SillyButton
            onPress={() => navigation.navigate('Spin')}
            my={10}
            px={30}
            round={20}
            mx={0.01}
            bg={clr2}>
            <SillyText color={clr1}>Play</SillyText>
          </SillyButton>
        </View>
        <Image
          source={spin_wheel}
          style={[silly.w30p, silly.h15p, silly.rmcon]}
        />
      </SillyView>
      <View style={[silly.p1, silly.fr, silly.jcbtw, silly.aic]}>
        <View style={[silly.w50p]}>
          <SillyText color={clr1} family="SemiBold" size={18}>
            The weekly game is{'\n'}almost here!
          </SillyText>
          <SillyText color={clr1} my={5}>
            Play for the mystery prize (revealed when live)
          </SillyText>
        </View>
        <SillyButton
          py={6}
          px={8}
          style={[silly.fr, silly.jcc, silly.aic]}
          bg={clr1}>
          <Icon name="timer-outline" color={clr2} size={16} />
          <SillyText mx={5} family="SemiBold" size={14}>
            Almost Here!
          </SillyText>
        </SillyButton>
      </View>
    </SillyView>
  );
};

export default Games;
