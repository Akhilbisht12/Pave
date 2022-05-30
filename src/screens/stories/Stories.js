import {View, Text} from 'react-native';
import React from 'react';
import StoryHead from './StoryHead';
import Story from './Story';
import silly from '../../Silly/styles/silly';

const Stories = () => {
  return (
    <View style={[silly.bg1, silly.f1]}>
      <StoryHead />
      <Story />
    </View>
  );
};

export default Stories;
