import {View, Image} from 'react-native';
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
import spin_wheel from '../../assets/illustrations/spin_wheel_daily.png';
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
          <Image source={spin_wheel} style={[silly.w40p, silly.rmcon]} />
        </View>
        <View style={[silly.ais]}>
          <SillyText mx={10} size={22} color={clr1}>
            Grand Prize
          </SillyText>
          <SillyText mx={10} size={40} family="SemiBold" color={clr1}>
            ₹2000
          </SillyText>
        </View>
      </SillyView>
      {/* spin wheel view */}
      <View style={[silly.h50p, silly.aic, silly.jcc]}>
        {/* <SpinWheel /> */}
        <FortuneWheel fortunes={fortunes} spinType={false} />
      </View>
    </View>
  );
};

export default WeeklySpin;
