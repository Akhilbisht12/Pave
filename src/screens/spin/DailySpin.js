import {View, Image} from 'react-native';
import React from 'react';
import FortuneWheel from './FortuneWheel';
import {
  SillyButton,
  SillyText,
  SillyView,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr5, sec_clr_opac} from '../../config/globals';
import art from '../../assets/stories/stories-1.png';
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
const DailySpin = () => {
  return (
    <View style={[silly.f1, silly.jcaround]}>
      <SillyView
        bg={`${clr1}40`}
        px={20}
        style={[silly.fr, silly.jcaround, silly.aic, silly.h15p]}>
        <View>
          <Image source={art} style={[silly.w25p, silly.rmcon]} />
        </View>
        <View>
          <SillyText color={clr1}>WIN UPTO</SillyText>
          <SillyText size={45} family="SemiBold" color={clr1}>
            ₹700
          </SillyText>
        </View>
      </SillyView>
      <View style={[silly.aic]}>
        {/* spins left view */}
        <SillyView
          bg="transparent"
          style={[
            silly.fr,
            silly.jcaround,
            silly.aic,
            silly.bc3,
            silly.bw2,
            silly.w70p,
          ]}>
          <View style={[silly.fr, silly.aic]}>
            <Ionicons name="timer" color={clr5} size={20} />
            <SillyText mx={5} color={clr5} size={18}>
              Spins left
            </SillyText>
          </View>
          <SillyView px={1} py={15} />
          <View style={[silly.fr, silly.aic]}>
            <Ionicons name="star" color={clr5} size={20} />

            <SillyText color={clr5} size={18} mx={5}>
              1500 tokens
            </SillyText>
          </View>
        </SillyView>
      </View>

      {/* spin wheel view */}
      <View style={[silly.h50p, silly.aic, silly.jcc]}>
        {/* <SpinWheel /> */}
        <FortuneWheel fortunes={fortunes} spinType={true} />
      </View>
    </View>
  );
};

export default DailySpin;
