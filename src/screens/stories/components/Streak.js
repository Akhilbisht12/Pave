import {View, Text} from 'react-native';
import React from 'react';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Streak = () => {
  return (
    <SillyView style={[silly.fr, silly.aic]} bg="rgb(17,12,43)">
      <View style={[silly.w30p, silly.p2, silly.aic]}>
        <Text>streak icon</Text>
      </View>
      <View style={[silly.w30p, silly.p2, silly.aic]}>
        <View style={[silly.fr, silly.aic]}>
          <SillyText mx={5} size={25}>
            100
          </SillyText>
          <Ionicons name="star" size={25} />
        </View>
        <SillyText>Points Earned</SillyText>
      </View>
    </SillyView>
  );
};

export default Streak;
