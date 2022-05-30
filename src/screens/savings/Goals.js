import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr3, clr4} from '../../config/globals';

const Goals = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={[silly.f1]}>
      <View style={[silly.f1, silly.jcbtw]}>
        <View style={[silly.bg1, silly.px2, silly.py3, silly.mb2]}>
          <SillyText>SAVING FUND</SillyText>
          <SillyText my={10} size={25} family="SemiBold">
            How do you want to {'\n'}start saving?
          </SillyText>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('AddGoal')}>
            <SillyView
              my={20}
              mx={10}
              style={[silly.h25p, silly.jcc, silly.p1, silly.bg2]}>
              <SillyText
                style={[silly.mb1]}
                family="SemiBold"
                size={25}
                color={clr1}>
                Goal Based
              </SillyText>
              <SillyText style={[silly.w60p]} color={clr4}>
                Save with a specific goal and we will automatically adjust your
                savings habit to help you achieve it.
              </SillyText>
            </SillyView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddSaving')}>
            <SillyView
              my={20}
              mx={10}
              style={[silly.h25p, silly.jcc, silly.p1, silly.bg1]}>
              <SillyText style={[silly.mb1]} size={18} color={clr3}>
                SELECTED
              </SillyText>
              <SillyText
                style={[silly.mb1]}
                family="SemiBold"
                size={25}
                color={clr3}>
                Simple Saver
              </SillyText>

              <SillyText style={[silly.w60p]} color={clr3}>
                Save without a goal and let your wealth grow without
                limitations, simply set it and forget it!
              </SillyText>
            </SillyView>
          </TouchableOpacity>
        </View>
        <SillyButton bg={clr1}>
          <SillyText size={20} center>
            Start Saving
          </SillyText>
        </SillyButton>
      </View>
    </ScrollView>
  );
};

export default Goals;
