import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useContext} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import silly from '../../../Silly/styles/silly';
import AnimControl from '../../../utils/AnimControl';
import ProgressContext from '../ProgressContext';
import VerifyKYC from './VerifyKYC';
import Signature from './Signature';
const VerificationMain = () => {
  const {height} = Dimensions.get('window');
  const verifyheight = useRef(new Animated.Value(0)).current;
  const verifybottom = useRef(new Animated.Value(-40)).current;
  const {state, dispatch} = useContext(ProgressContext);
  // removes view on otp verification
  useEffect(() => {
    if (state.progress === 8) {
      AnimControl.AnimTiming(verifybottom, height, 500);
    }
  }, [verifybottom, height, state]);
  useEffect(() => {
    if (state.progress === 5) {
      AnimControl.AnimTiming(verifyheight, 80, 1000);
      AnimControl.AnimTiming(verifybottom, 0, 500);
    }
  });
  // form height increase animation
  const viewForm = () => {
    dispatch({type: 'increment'});
    const value = 0.88 * height;
    AnimControl.AnimTiming(verifyheight, value, 1000);
  };

  // shrinks form view when keyboard opens
  Keyboard.addListener('keyboardDidShow', () => {
    const value = 0.6 * height;
    AnimControl.AnimTiming(verifyheight, value, 500);
  });
  // expands form again to normal height when keyboard opens
  Keyboard.addListener('keyboardDidHide', () => {
    const value = 0.88 * height;
    AnimControl.AnimTiming(verifyheight, value, 1000);
  });
  const styles = StyleSheet.create({
    height: {height: verifyheight, position: 'absolute', bottom: verifybottom},
  });
  return (
    <Animated.View
      style={[
        silly.bg2,
        silly.br20,
        silly.w100p,
        silly.p2,
        styles.height,
        state.progress < 5 ? silly.dn : silly.df,
      ]}>
      <TouchableOpacity
        onPress={viewForm}
        style={[
          silly.jcc,
          silly.aic,
          state.progress === 5 ? silly.df : silly.dn,
        ]}>
        <Ionicon name="chevron-up" size={35} color="gray" />
        <Ionicon style={silly.mt2M} name="chevron-up" size={35} color="gray" />
      </TouchableOpacity>
      <VerifyKYC />
      <Signature />
    </Animated.View>
  );
};

export default VerificationMain;
