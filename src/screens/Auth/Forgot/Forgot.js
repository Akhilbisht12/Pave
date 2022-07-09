import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyButton,
  SillyInput,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../../config/globals';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useEffect} from 'react';
const Forgot = ({navigation}) => {
  const [forgotPass, setForgotPass] = useState({
    mobile: '',
    otp: '',
    password: '',
    confirm_password: '',
    try: 0,
    step: 0,
    id: '',
  });
  const handleFirstOTP = async () => {
    try {
      setForgotPass({...forgotPass, try: 1});
      const firstotp = await axios.post(`${server}/iam/auth/send-otp/`, {
        mobile: forgotPass.mobile,
        verification_type: 'RESET',
      });
      setForgotPass({...forgotPass, step: 1, id: firstotp.data.id});
      console.log(firstotp.data);
    } catch (error) {
      ToastAndroid.show('Failed to OTP. Please Try Again!', ToastAndroid.SHORT);
      console.log(error);
    }
  };
  const handleSecondOTP = async () => {
    try {
      const secondres = await axios.post(`${server}/iam/auth/resend-otp/`, {
        id: forgotPass.id,
        verification_type: 'RESET',
      });
      console.log(secondres.data);
    } catch (error) {
      ToastAndroid.show(
        'Failed to send OTP. Please Try Again!',
        ToastAndroid.SHORT,
      );
      console.log(error.response);
    }
  };
  const changePassword = async () => {
    try {
      const passres = await axios.post(`${server}/iam/auth/set-password/`, {
        id: forgotPass.id,
        reset: true,
        update: false,
        otp: forgotPass.otp,
        new_password: forgotPass.password,
        confirm_password: forgotPass.confirm_password,
      });
      console.log(passres.data);
      ToastAndroid.show('Password Reset!', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(
        'Failed to change password. Try again!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={[silly.f1, silly.bg1]}>
      <SillyText px={10} py={10} size={30}>
        Forgot Password?
      </SillyText>
      <SillyView bg={clr2} my={0.01} style={[silly.f1]}>
        <View style={[forgotPass.step === 0 ? {} : silly.dn]}>
          <SillyText my={20} color={clr1} family="SemiBold" size={25}>
            Enter Registered Mobile Number
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
            {forgotPass.try === 0 ? (
              <SillyButton onPress={handleFirstOTP} my={20} bg={clr1}>
                <SillyText size={20} center>
                  Send OTP
                </SillyText>
              </SillyButton>
            ) : (
              <SillyButton my={20} bg={clr1}>
                <SillyText size={20} center>
                  Resend OTP
                </SillyText>
              </SillyButton>
            )}
          </View>
        </View>
        <View style={[forgotPass.step === 1 ? {} : silly.dn]}>
          <SillyText my={20} color={clr1} family="SemiBold" size={25}>
            Enter OTP
          </SillyText>
          <View>
            <SillyText my={5} size={18} color={clr5}>
              OTP
            </SillyText>
            <SillyInput
              value={forgotPass.otp}
              onChangeText={e => setForgotPass({...forgotPass, otp: e})}
              keyboardType="number-pad"
              style={[silly.fs25, {color: clr1}]}
              maxLength={6}
            />
            <SillyText my={5} size={18} color={clr5}>
              New Password
            </SillyText>
            <SillyInput
              value={forgotPass.password}
              onChangeText={e => setForgotPass({...forgotPass, password: e})}
              style={[silly.fs25, {color: clr1}]}
            />
            <SillyText my={5} size={18} color={clr5}>
              Confirm New Password
            </SillyText>
            <SillyInput
              value={forgotPass.confirm_password}
              onChangeText={e =>
                setForgotPass({...forgotPass, confirm_password: e})
              }
              style={[silly.fs25, {color: clr1}]}
            />
            <TouchableOpacity style={[silly.my1]} onPress={handleSecondOTP}>
              <SillyText color={clr1}>Resend OTP</SillyText>
            </TouchableOpacity>
            <SillyButton onPress={changePassword} my={15} bg={clr1}>
              <SillyText center size={18}>
                Change Password
              </SillyText>
            </SillyButton>
          </View>
        </View>
      </SillyView>
    </View>
  );
};

export default Forgot;
