import React from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path, Text as SvgText} from 'react-native-svg';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyAvatar,
} from '../../Silly/components/silly_comps';
import {clr2, clr5, sec_color} from '../../config/globals';
const {height} = Dimensions.get('window');

const Card = () => {
  return (
    <SillyView px={0.01} round={0.01} bg={sec_color}>
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.p1]}>
        <View style={[silly.fr, silly.aic]}>
          <SillyAvatar
            round={25}
            hgt={50}
            wdt={50}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
            }}
          />
          <SillyText size={20} family="SemiBold">
            Dylan{'\n'}Roberts
          </SillyText>
        </View>
        <SillyView bg={`${clr5}80`}>
          <View style={[silly.fr, silly.jcc, silly.aic]}>
            <SillyText py={5} mx={10} size={20}>
              0
            </SillyText>
            <Ionicons name="star-outline" size={18} />
          </View>
        </SillyView>
      </View>
      <SillyView bg={clr5} py={0.4} />
      <TouchableOpacity>
        <View style={[silly.fr, silly.jcbtw, silly.aic, silly.p1]}>
          <SillyText size={18}>Get started on your account!</SillyText>
          <Ionicons name="chevron-down" size={25} color={clr2} />
        </View>
      </TouchableOpacity>
    </SillyView>
  );
};

export default Card;
