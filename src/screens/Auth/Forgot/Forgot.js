import {View, Text} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyInput,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../../config/globals';

const Forgot = () => {
  const [forgotPass, setForgotPass] = useState({
    mobile: '',
    otp: '',
    password: '',
    confirm_password: '',
  });
  return (
    <View style={[silly.f1, silly.bg1]}>
      <SillyText px={10} py={10} size={30}>
        Forgot Password?
      </SillyText>
      <SillyView bg={clr2} my={0.01} style={[silly.f1]}>
        <SillyText my={20} color={clr1} family="SemiBold" size={25}>
          Enter Login Details
        </SillyText>
        <View>
          <SillyText my={5} size={18} color={clr5}>
            Mobile
          </SillyText>
          <SillyInput
            value={forgotPass.mobile}
            onChangeText={e => setForgotPass({...forgotPass, mobile: e})}
            keyboardType="number-pad"
            style={[silly.fs25, {color: clr1}]}
            maxLength={10}
          />
        </View>
      </SillyView>
    </View>
  );
};

export default Forgot;
