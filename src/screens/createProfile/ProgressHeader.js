import {View} from 'react-native';
import React from 'react';
import silly from '../../Silly/styles/silly';
import {clr2} from '../../config/globals';
import SillyText from '../../Silly/components/SillyText';
import {useContext} from 'react/cjs/react.development';
import ProgressContext from './ProgressContext';

const ProgressHeader = () => {
  const {state} = useContext(ProgressContext);
  const getProfileWidth = () => {
    if (state.progress >= 3) {
      return silly.w100;
    }
    switch (state.progress) {
      case 0:
        return silly.w10;
      case 1:
        return silly.w50;
      case 2:
        return silly.w90;
      default:
        break;
    }
  };
  const getDocWidth = () => {
    if (state.progress < 3) {
      return silly.w0;
    }
    if (state.progress > 4) {
      return silly.w100;
    }
    switch (state.progress) {
      case 4:
        return silly.w50;
      default:
        break;
    }
  };
  const getVerifyWidth = () => {
    if (state.progress < 6) {
      return silly.w0;
    }
    switch (state.progress) {
      case 6:
        return silly.w50;
      case 7:
        return silly.w90;
      default:
        break;
    }
  };
  return (
    <View style={[silly.jcaround, silly.fr]}>
      <View style={[silly.aic]}>
        <SillyText color={clr2} size={16}>
          Profile
        </SillyText>
        <View style={[silly.w100, silly.bggray, silly.br5, silly.my1]}>
          <View style={[getProfileWidth(), silly.h5, silly.bg2, silly.br5]} />
        </View>
      </View>
      <View style={[silly.aic]}>
        <SillyText color={clr2} size={16}>
          Documents
        </SillyText>
        <View style={[silly.w100, silly.bggray, silly.br5, silly.my1]}>
          <View style={[getDocWidth(), silly.h5, silly.bg2, silly.br5]} />
        </View>
      </View>
      <View style={[silly.aic]}>
        <SillyText color={clr2} size={16}>
          Verification
        </SillyText>
        <View style={[silly.w100, silly.bggray, silly.br5, silly.my1]}>
          <View style={[getVerifyWidth(), silly.h5, silly.bg2, silly.br5]} />
        </View>
      </View>
    </View>
  );
};

export default ProgressHeader;
