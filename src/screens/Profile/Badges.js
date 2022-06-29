import {View, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr4, clr5} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {server} from '../../config/server_url';
import AuthContext from '../../navigations/AuthContext';

const Badges = ({badges}) => {
  return (
    <ScrollView contentContainerStyle={[silly.fg1]}>
      <SillyView my={0.01} bg={clr3} style={[silly.f1]}>
        {badges.map((item, i) => {
          const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
          return (
            <SillyView
              py={0.1}
              style={[silly.fr, silly.jcs, silly.aic]}
              key={i}
              bg={clr2}>
              <View style={[silly.p2]}>
                <Icon color={clr1} size={30} name={'shield'} />
              </View>
              <SillyView my={0.1} style={[silly.h10p]} px={0.4} />
              <View style={[silly.p2]}>
                <SillyText size={18} color={clr4} family="Medium">
                  {item.name}
                </SillyText>
                {/* <SillyText
                  style={[silly.w60p]}
                  my={10}
                  color={clr5}
                  family="SemiBold">
                  {item.desc}
                </SillyText> */}
              </View>
            </SillyView>
          );
        })}
      </SillyView>
    </ScrollView>
  );
};

export default Badges;
