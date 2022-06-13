import {View, ToastAndroid} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyRadio,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../../config/globals';
import axios from 'axios';
import {server} from '../../../config/server_url';
import Storage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../../navigations/AuthContext';

const Login = () => {
  const {dispatch} = useContext(AuthContext);
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
  const [on, SetOn] = useState(true);
  const [login, setLogin] = useState({
    mobile: '',
    password: '',
  });
  const [optsent, setotpsent] = useState(false);
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

  const handleSendOtp = async () => {
    try {
      if (!login.mobile || login.mobile.length !== 10) {
        ToastAndroid.show(
          'Please enter a valid mobile number',
          ToastAndroid.SHORT,
        );
        return;
      }
      const otp = await axios.post(`${server}/iam/auth/send-otp/`, {
        mobile: login.mobile,
        verification_type: 'LOGIN',
      });

      ToastAndroid.show(otp.data.message, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  const handleLogin = async () => {
    try {
      if (!login.mobile || login.mobile.length !== 10) {
        ToastAndroid.show('Please enter mobile number', ToastAndroid.SHORT);
        return;
      }
      if (phoneOtp.map(i => i.value).join('').length !== 6 && on) {
        ToastAndroid.show('Incorrect otp format', ToastAndroid.show);
        return;
      }
      const otp = phoneOtp.map(item => item.value).join('');
      console.log(otp);
      const loginreq = await axios.post(`${server}/iam/auth/login/`, {
        contact: login.mobile,
        '#otp': otp,
        password: login.password,
      });
      console.log(loginreq);
      await Storage.setItem('refresh', loginreq.data.refresh);
      await Storage.setItem('access', loginreq.data.access);
      await Storage.setItem('user_id', loginreq.data.user_id);
      await Storage.setItem('id', loginreq.data.id);
      // navigation.navigate('OnBoarding');
      dispatch({type: 'signin'});
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(error.response.data.detail, ToastAndroid.SHORT);
    }
  };
  return (
    <View style={[silly, silly.f1, silly.bg1]}>
      <View style={[silly.p1]}>
        <SillyText size={30} my={20}>
          Welcome Back !
        </SillyText>
      </View>
      <SillyView bg={clr2} style={[silly.f1]} px={15} py={10} my={0.01}>
        <SillyText my={20} color={clr1} family="SemiBold" size={25}>
          Enter Login Details
        </SillyText>
        <View>
          <SillyText my={5} size={18} color={clr5}>
            Mobile
          </SillyText>
          <SillyInput
            value={login.mobile}
            onChangeText={e => setLogin({...login, mobile: e})}
            keyboardType="number-pad"
            style={[silly.fs25, {color: clr1}]}
            maxLength={10}
          />
        </View>
        <View>
          <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my1]}>
            <SillyText color={clr5} size={16}>
              Login With {on ? 'OTP' : 'Password'}
            </SillyText>
            <SillyRadio on={on} off={SetOn} />
          </View>
          {on ? (
            <View>
              {/* <SillyText size={18} color={clr5}>
                OTP
              </SillyText> */}
              <View style={[silly.fr, silly.jcaround, silly.aic]}>
                {phoneOtp.map((item, i) => {
                  return <OTPPhoneInput index={i} key={item.key} />;
                })}
              </View>
              <SillyButton onPress={handleSendOtp} px={0.01}>
                <SillyText color={clr1}>send OTP</SillyText>
              </SillyButton>
            </View>
          ) : (
            <View>
              {/* <SillyText my={5} size={18} color={clr5}>
                Password
              </SillyText> */}
              <SillyInput
                value={login.password}
                onChangeText={e => setLogin({...login, password: e})}
                style={[silly.fs25, {color: clr1}]}
              />
            </View>
          )}
        </View>
        <SillyButton onPress={handleLogin} py={15} bg={clr1}>
          <SillyText color={clr2} center size={18}>
            Login
          </SillyText>
        </SillyButton>
      </SillyView>
    </View>
  );
};

export default Login;
