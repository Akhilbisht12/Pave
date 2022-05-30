import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr4} from '../../config/globals';
import Icons from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';

const Referal = () => {
  return (
    <TouchableOpacity>
      <SillyView px={15} py={25} bg={clr2} mx={10}>
        <SillyText family="SemiBold" size={22} color={clr1}>
          Add a friend
        </SillyText>
        <View style={[silly.fr, silly.jcs, silly.aic, silly.myh]}>
          <SillyText color={clr4}>and win upto </SillyText>
          <SillyText color="#ffc237">200 </SillyText>
          <Icons color="#ffc237" name="star" size={20} />
        </View>
      </SillyView>
    </TouchableOpacity>
  );
};

export default Referal;
