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
import DocumentsUpload from './DocumentsUpload';
import AnimControl from '../../../utils/AnimControl';
import ProgressContext from '../ProgressContext';
const DocumentsMain = () => {
  const {state, dispatch} = useContext(ProgressContext);
  const {height} = Dimensions.get('window');
  const docHeight = useRef(new Animated.Value(0)).current;
  const docBottom = useRef(new Animated.Value(-40)).current;
  useEffect(() => {
    if (state.progress === 5) {
      AnimControl.AnimTiming(docBottom, height, 500);
    }
  }, [docBottom, height, state]);
  useEffect(() => {
    if (state.progress === 3) {
      AnimControl.AnimTiming(docHeight, 80, 1000);
      AnimControl.AnimTiming(docBottom, 0, 500);
    }
  });

  const viewDocForm = () => {
    dispatch({type: 'increment'});
    const value = 0.88 * height;
    AnimControl.AnimTiming(docHeight, value, 1000);
  };
  const styles = StyleSheet.create({
    height: {height: docHeight, position: 'absolute', bottom: docBottom},
  });
  //   increase decrease height of view on keyboard show and hide
  Keyboard.addListener('keyboardDidShow', () => {
    const value = 0.6 * height;
    AnimControl.AnimTiming(docHeight, value, 500);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    const value = 0.88 * height;
    AnimControl.AnimTiming(docHeight, value, 1000);
  });
  return (
    <Animated.View
      style={[
        silly.bg2,
        silly.br20,
        silly.w100p,
        silly.p2,
        styles.height,
        state.progress < 3 ? silly.dn : silly.df,
      ]}>
      <TouchableOpacity
        onPress={viewDocForm}
        style={[
          silly.jcc,
          silly.aic,
          state.progress === 3 ? silly.df : silly.dn,
        ]}>
        <Ionicon name="chevron-up" size={35} color="gray" />
        <Ionicon style={silly.mt2M} name="chevron-up" size={35} color="gray" />
      </TouchableOpacity>
      <DocumentsUpload />
    </Animated.View>
  );
};

export default DocumentsMain;
