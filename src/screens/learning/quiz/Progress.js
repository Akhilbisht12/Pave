import {View} from 'react-native';
import React from 'react';
import silly from '../../../Silly/styles/silly';

const Progress = ({length, quesIndex}) => {
  const getProgressWidget = () => {
    const widgets = [];
    for (let index = 0; index < length; index++) {
      widgets.push(
        <View key={index} style={[silly.w100, silly.bggray, silly.br5]}>
          <View
            style={[
              index === quesIndex
                ? silly.w50
                : index < quesIndex
                ? silly.w0
                : silly.w100,
              silly.h5,
              silly.bg2,
              silly.br5,
            ]}
          />
        </View>,
      );
    }
    return widgets;
  };
  return (
    <View style={[silly.jcaround, silly.fr]}>
      {getProgressWidget().reverse()}
    </View>
  );
};

export default Progress;
