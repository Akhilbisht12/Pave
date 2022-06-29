import {View, TouchableOpacity, Animated, Dimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import silly from '../../Silly/styles/silly';
import {SillyText, SillyView} from '../../Silly/components/silly_comps';
import {clr1, clr3} from '../../config/globals';
import DailySpin from './DailySpin';
import AnimControl from '../../utils/AnimControl';
import WeeklySpin from './WeeklySpin';
const {width} = Dimensions.get('window');
const Spin = () => {
  const [spinType, setSpinType] = useState(true);
  const daily = useRef(new Animated.Value(0)).current;
  const weekly = useRef(new Animated.Value(width)).current;
  useEffect(() => {
    if (spinType) {
      AnimControl.AnimTiming(daily, 0, 350);
      AnimControl.AnimTiming(weekly, width, 350);
    } else {
      AnimControl.AnimTiming(daily, -width, 350);
      AnimControl.AnimTiming(weekly, 0, 350);
    }
  }, [spinType, daily, weekly]);
  return (
    <View style={[silly.f1, silly.jcaround, silly.p1]}>
      {/* timer view */}
      <SillyText my={10} color={clr1} size={30} family="Bold">
        Try Your Luck
      </SillyText>
      {/* <SillyView mx={0.1} px={0.01} bg="transparent" style={[silly.fr]}>
        <TouchableOpacity
          onPress={() => setSpinType(true)}
          style={[
            silly.w45p,
            {
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              backgroundColor: spinType ? clr1 : clr3,
            },
          ]}>
          <SillyText center size={18} py={14} color={spinType ? clr3 : clr1}>
            YOUR GAME
          </SillyText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setSpinType(false)}
          style={[
            silly.w50p,
            {
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: spinType ? clr3 : clr1,
            },
          ]}>
          <SillyText center size={18} py={14} color={spinType ? clr1 : clr3}>
            WEEKLY GAME
          </SillyText>
        </TouchableOpacity>
      </SillyView> */}
      {/* spin sections */}
      <Animated.View
        style={[
          silly.f1,
          spinType ? silly.df : silly.dn,
          {
            transform: [{translateX: daily}],
          },
        ]}>
        <DailySpin />
      </Animated.View>
      {/* <Animated.View
        style={[
          silly.f1,
          spinType ? silly.dn : silly.df,
          {transform: [{translateX: weekly}]},
        ]}>
         <WeeklySpin />
      </Animated.View> */}
    </View>
  );
};

export default Spin;
