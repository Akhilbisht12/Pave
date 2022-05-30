import React, {useContext} from 'react';
import {View, Dimensions} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {SillyButton, SillyText} from '../../../Silly/components/silly_comps';
import {site_color} from '../../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ProgressContext from '../ProgressContext';
const {width} = Dimensions.get('window');
const VerifyKYC = () => {
  const {state, dispatch} = useContext(ProgressContext);
  return (
    <View style={[silly.jcbtw, state.progress === 6 ? silly.fg2 : silly.dn]}>
      <View>
        <SillyText
          family="SemiBold"
          style={[silly.mb3]}
          size={24}
          color={site_color}>
          Video KYC
        </SillyText>
        <View style={[silly.my1, silly.aic]}>
          <View
            style={{
              width: 0.8 * width,
              height: 0.8 * width,
              backgroundColor: 'black',
              borderRadius: 0.4 * width,
            }}
          />
        </View>
        <View style={[silly.aic, silly.bg3, silly.br10, silly.p1, silly.my1]}>
          <Ionicon
            style={[silly.ph, silly.bg1, silly.br20, silly.pa]}
            name="information-outline"
            size={15}
            color="white"
          />
          <SillyText size={14} color={site_color} center>
            Speak your name & PAN number in the video{'\n'} Ensure that you face
            is clearly visible in the frame{'\n'} The video must be atleast 14
            seconds long
          </SillyText>
        </View>
      </View>
      <View>
        <SillyButton
          bg={site_color}
          onPress={() => dispatch({type: 'increment'})}>
          <SillyText size={20} style={[silly.tc]}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default VerifyKYC;
