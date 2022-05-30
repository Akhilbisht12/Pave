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
import ProfileDetails from './ProfileDetails';
import OTPVerify from './OTPVerify';
import AnimControl from '../../../utils/AnimControl';
import ProgressContext from '../ProgressContext';
const ProfileMain = () => {
  const {height} = Dimensions.get('window');
  const formheight = useRef(new Animated.Value(80)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const {state, dispatch} = useContext(ProgressContext);
  // removes view on otp verification
  useEffect(() => {
    if (state.progress === 3) {
      AnimControl.AnimTiming(bottom, height, 500);
    }
  }, [bottom, height, state]);
  // form height increase animation
  const viewForm = () => {
    dispatch({type: 'increment'});
    const value = 0.88 * height;
    AnimControl.AnimTiming(formheight, value, 1000);
  };

  // shrinks form view when keyboard opens
  Keyboard.addListener('keyboardDidShow', () => {
    const value = 0.6 * height;
    AnimControl.AnimTiming(formheight, value, 500);
  });
  // expands form again to normal height when keyboard opens
  Keyboard.addListener('keyboardDidHide', () => {
    const value = 0.88 * height;
    AnimControl.AnimTiming(formheight, value, 1000);
  });
  const styles = StyleSheet.create({
    height: {height: formheight, position: 'absolute', bottom: bottom},
  });
  return (
    <Animated.View
      style={[silly.bg2, silly.br20, silly.w100p, silly.p2, styles.height]}>
      <TouchableOpacity
        onPress={viewForm}
        style={[
          silly.jcc,
          silly.aic,
          state.progress === 0 ? silly.df : silly.dn,
        ]}>
        <Ionicon name="chevron-up" size={35} color="gray" />
        <Ionicon style={silly.mt2M} name="chevron-up" size={35} color="gray" />
      </TouchableOpacity>
      <ProfileDetails />
      <OTPVerify />
    </Animated.View>
  );
};

export default ProfileMain;
