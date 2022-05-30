import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import silly from '../Silly/styles/silly';
import {site_color} from '../config/globals';
import {
  SillyInput,
  SillyButton,
  SillyText,
} from '../Silly/components/silly_comps';
const OTP = () => {
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
  const inputRef = useRef([]);
  const OTPPhoneInput = ({index}) => {
    const handleChangeOTP = e => {
      if (e.nativeEvent.key) {
        if (e.nativeEvent.key === 'Backspace') {
          if (inputRef.current[index - 1]) {
            inputRef.current[index - 1].focus();
            const temp = phoneOtp;
            phoneOtp[index].value = '';
            setPhoneOtp(temp);
          }
        }
      } else if (e.nativeEvent.text) {
        if (inputRef.current[index + 1]) {
          inputRef.current[index + 1].focus();
          const temp = phoneOtp;
          phoneOtp[index].value = e.nativeEvent.text;
          setPhoneOtp(temp);
        }
      }
    };
    return (
      <SillyInput
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
        if (emailRef.current[index + 1]) {
          emailRef.current[index + 1].focus();
          const temp = emailOtp;
          temp[index].value = e.nativeEvent.text;
          setEmailOtp(temp);
        }
      }
    };
    return (
      <SillyInput
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
  return (
    <View style={[silly.jcbtw]}>
      <View>
        <View style={[silly.my2]}>
          <SillyText size={16}>Code sent to +91 9123456789</SillyText>
          <View style={[silly.fr, silly.jcbtw, silly.my1]}>
            {phoneOtp.map((item, i) => {
              return <OTPPhoneInput index={i} key={item.key} />;
            })}
          </View>
          <TouchableOpacity>
            <SillyText color={site_color} size={16}>
              Resend Code
            </SillyText>
          </TouchableOpacity>
        </View>
        <View style={[silly.my2]}>
          <SillyText size={16}>Code sent to test@pave.io</SillyText>
          <View style={[silly.fr, silly.jcbtw, silly.my1]}>
            {emailOtp.map((item, i) => {
              return <OTPEmailInput index={i} key={item.key} />;
            })}
          </View>
          <TouchableOpacity>
            <SillyText color={site_color} size={16}>
              Resend Code
            </SillyText>
          </TouchableOpacity>
        </View>
      </View>
      <SillyButton bg={site_color}>
        <SillyText size={20} style={[silly.tc]}>
          Next
        </SillyText>
      </SillyButton>
    </View>
  );
};

export default OTP;
