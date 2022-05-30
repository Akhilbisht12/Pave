import {View, Text} from 'react-native';
import React from 'react';
import FortuneWheel from './FortuneWheel';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr3} from '../../config/globals';
const fortunes = [
  {
    prize: '10',
    area: 100,
    color: 'blue',
    type: 'cash',
    top: true,
  },
  {
    prize: '15',
    area: 100,
    color: 'violet',
    type: 'cash',
    top: false,
  },
  {
    prize: '25',
    area: 100,
    color: 'green',
    type: 'points',
    top: false,
  },
  {
    prize: '50',
    area: 100,
    color: 'maroon',
    type: 'cash',
    top: false,
  },
  {
    prize: '100',
    area: 100,
    color: 'lightblue',
    type: 'points',
    top: false,
  },
  {
    prize: '0',
    area: 100,
    color: 'orange',
    type: 'points',
    top: false,
  },
];
const WeeklySpin = () => {
  return (
    <View style={[silly.f1, silly.jcaround]}>
      <SillyView px={20} style={[silly.fr, silly.jcbtw, silly.aic, silly.h15p]}>
        <View>
          <Ionicons size={50} name="cash-outline" />
        </View>
        <View style={[silly.aic]}>
          <SillyText color={clr1}>Grand Prize</SillyText>
          <SillyText mx={10} size={45} family="SemiBold" color={clr1}>
            ₹2000
          </SillyText>
        </View>
        <View>
          <Ionicons size={50} name="cash-outline" />
        </View>
      </SillyView>

      {/* spin wheel view */}
      <View style={[silly.h50p, silly.aic, silly.jcc]}>
        {/* <SpinWheel /> */}
        <FortuneWheel fortunes={fortunes} spinType={false} />
      </View>
      {/* spins left view */}
      <SillyView
        py={20}
        style={[silly.fr, silly.jcbtw, silly.aic]}
        bg="rgb(17,12,43)">
        <View style={[silly.aic]}>
          <Ionicons name="people-outline" color="white" size={40} />
          <SillyText size={25}>200+</SillyText>
          <SillyText>users playing live</SillyText>
        </View>
        <View
          style={[
            silly.aic,
            silly.w30p,
            {
              borderRightWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: 'lightgray',
            },
          ]}>
          <Ionicons name="cash-outline" color="white" size={40} />
          <SillyText size={25}>5000+</SillyText>
          <SillyText>won so far</SillyText>
        </View>
        <View style={[silly.aic]}>
          <Ionicons name="timer-outline" color="white" size={40} />
          <SillyText size={25}>04h 20m</SillyText>
          <SillyText>left</SillyText>
        </View>
      </SillyView>
    </View>
  );
};

export default WeeklySpin;
