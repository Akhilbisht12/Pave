import {View, Text} from 'react-native';
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

const Games = () => {
  const navigation = useNavigation();
  return (
    <SillyView my={15} py={0.01} px={0.01} mx={10} bg="#ffc237">
      <SillyView style={[silly.ais]} py={30} my={0.01} bg={clr1}>
        <SillyText>You have 4 spins remaining</SillyText>
        <SillyText my={10} family="SemiBold" size={22}>
          Stand a chance to win{'\n'}prizes upto ₹100 per try!
        </SillyText>
        <SillyButton
          onPress={() => navigation.navigate('Spin')}
          my={10}
          px={30}
          round={20}
          mx={0.01}
          bg={clr2}>
          <SillyText color={clr1}>Play</SillyText>
        </SillyButton>
      </SillyView>
      <View style={[silly.p1, silly.fr, silly.jcbtw, silly.aic]}>
        <View style={[silly.w50p]}>
          <SillyText color={clr1} family="SemiBold" size={20}>
            The weekly game is{'\n'}almost here!
          </SillyText>
          <SillyText color={clr1} my={5}>
            Play for the mystery prize (revealed when live)
          </SillyText>
        </View>
        <SillyButton px={10} style={[silly.fr, silly.jcc, silly.aic]} bg={clr1}>
          <Icon name="timer-outline" size={22} />
          <SillyText mx={5} family="SemiBold" size={22}>
            4h 18m 15s
          </SillyText>
        </SillyButton>
      </View>
    </SillyView>
  );
};

export default Games;
