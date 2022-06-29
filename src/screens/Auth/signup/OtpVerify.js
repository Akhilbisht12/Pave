import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, ToastAndroid} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {clr5, site_color} from '../../../config/globals';
import SillyText from '../../../Silly/components/SillyText';
import {SillyInput, SillyButton} from '../../../Silly/components/silly_comps';
import Storage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useNavigation} from '@react-navigation/native';
const OTPVerify = ({otpScreen, setOtpScreen, authData}) => {
  const navigation = useNavigation();
  const [phoneOtp, setPhoneOtp] = useState([
    {
      value: '',
      key: 1,
    },
    {
      value: '',
      key: 2,
    },
    {
      value: '',
      key: 3,
    },
    {
      value: '',
      key: 4,
    },
    {
      value: '',
      key: 5,
    },
    {
      value: '',
      key: 6,
    },
  ]);
  const [emailOtp, setEmailOtp] = useState([
    {
      value: '',
      key: 1,
    },
    {
      value: '',
      key: 2,
    },
    {
      value: '',
      key: 3,
    },
    {
      value: '',
      key: 4,
    },
    {
      value: '',
      key: 5,
    },
    {
      value: '',
      key: 6,
    },
  ]);
  // handles phone otp input field
  const [resend, setResend] = useState(true);
  const inputRef = useRef([]);
  const OTPPhoneInput = ({index}) => {
    const handleChangeOTP = e => {
      if (e.nativeEvent.key) {
        if (e.nativeEvent.key === 'Backspace') {
          const temp = phoneOtp;
          phoneOtp[index].value = '';
          setPhoneOtp(temp);
          if (inputRef.current[index - 1]) {
            inputRef.current[index - 1].focus();
          }
        }
      } else if (e.nativeEvent.text) {
        const temp = phoneOtp;
        phoneOtp[index].value = e.nativeEvent.text;
        setPhoneOtp(temp);
        if (inputRef.current[index + 1]) {
          inputRef.current[index + 1].focus();
        }
      }
    };
    return (
      <SillyInput
        px={0.01}
        ref={el => (inputRef.current[index] = el)}
        style={[silly.fs25, silly.tc]}
        keyboardType="number-pad"
        maxLength={1}
        onChange={handleChangeOTP}
        onKeyPress={handleChangeOTP}
        width={'13%'}
      />
    );
  };

  // handles email otp input field
  const emailRef = useRef([]);
  const OTPEmailInput = ({index}) => {
    const handleChangeOTP = e => {
      if (e.nativeEvent.key) {
        if (e.nativeEvent.key === 'Backspace') {
          if (emailRef.current[index - 1]) {
            emailRef.current[index - 1].focus();
            const temp = emailOtp;
            temp[index].value = '';
            setEmailOtp(temp);
          }
        }
      } else if (e.nativeEvent.text) {
        const temp = emailOtp;
        temp[index].value = e.nativeEvent.text;
        setEmailOtp(temp);
        if (emailRef.current[index + 1]) {
          emailRef.current[index + 1].focus();
        }
      }
    };
    return (
      <SillyInput
        px={0.01}
        ref={el => (emailRef.current[index] = el)}
        style={[silly.fs25, silly.tc]}
        keyboardType="number-pad"
        maxLength={1}
        onChange={handleChangeOTP}
        onKeyPress={handleChangeOTP}
        width={'13%'}
      />
    );
  };
  const handleCheckOtp = async () => {
    console.log(authData);
    try {
      // mobile otp
      const mobile_otp = phoneOtp.map(item => item.value).join('');
      // email otp
      const email_otp = emailOtp.map(item => item.value).join('');
      console.log(typeof mobile_otp, typeof email_otp, typeof authData.userId); //all are of type string
      const user = await axios.post(`${server}/iam/auth/register/verify/`, {
        id: authData.id, //getting from register route
        mobile_otp, //above mentioned otps
        email_otp,
      });
      console.log(user.data);
      await Storage.setItem('refresh', user.data.refresh);
      await Storage.setItem('access', user.data.access);
      await Storage.setItem('user_id', user.data.user_id);
      await Storage.setItem('id', user.data.id);
      setOtpScreen(otpScreen + 1);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!resend) {
        return;
      }
      const otp = await axios.post(`${server}/iam/auth/resend-otp/`, {
        id: authData.id,
        resend: true,
        verification_type: 'SIGNUP',
      });
      setResend(false);
      setTimeout(() => {
        setResend(true);
      }, 1000 * 60 * 1.5);
      ToastAndroid.show(otp.data.message, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show('something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={[otpScreen === 2 ? {} : silly.dn, silly.jcbtw]}>
      <View>
        <SillyText
          family="SemiBold"
          style={silly.mb2}
          size={24}
          color={site_color}>
          Verify your profile
        </SillyText>
        <View style={[silly.my2]}>
          <SillyText color={clr5} size={16}>
            Code sent to +91 {authData.phone}
          </SillyText>
          <View style={[silly.fr, silly.jcbtw, silly.my1]}>
            {phoneOtp.map((item, i) => {
              return <OTPPhoneInput index={i} key={item.key} />;
            })}
          </View>
          {/* <TouchableOpacity onPress={handleResendOtp}>
            <SillyText color={site_color} size={16}>
              Resend Code
            </SillyText>
          </TouchableOpacity> */}
        </View>
        <View style={[silly.my2]}>
          <SillyText color={clr5} size={16}>
            Code sent to {authData.email}
          </SillyText>
          <View style={[silly.fr, silly.jcbtw, silly.my1]}>
            {emailOtp.map((item, i) => {
              return <OTPEmailInput index={i} key={item.key} />;
            })}
          </View>
          <TouchableOpacity onPress={handleResendOtp}>
            <SillyText color={resend ? site_color : clr5} size={16}>
              Resend Code
            </SillyText>
          </TouchableOpacity>
        </View>
      </View>
      <SillyButton onPress={handleCheckOtp} bg={site_color}>
        <SillyText size={20} style={[silly.tc]}>
          Verify
        </SillyText>
      </SillyButton>
    </View>
  );
};

export default OTPVerify;
