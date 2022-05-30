import {
  View,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef} from 'react';
import silly from '../../../Silly/styles/silly';
import {SillyText} from '../../../Silly/components/silly_comps';
import profileImg from '../../../assets/images/ob1.png';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AnimControl from '../../../utils/AnimControl';
import ProfileDetails from './ProfileDetails';
import OTPVerify from './OtpVerify';
import CreatePassword from './CreatePassword';
const {height} = Dimensions.get('window');
const Signup = () => {
  const formheight = useRef(new Animated.Value(80)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const [otpScreen, setOtpScreen] = useState(0);
  const [authData, setAuthData] = useState({
    name: '',
    phone: '',
    email: '',
    id: '',
  });
  const viewForm = () => {
    setOtpScreen(otpScreen + 1);
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
    <View style={[silly.f1, silly.bg1]}>
      {/* progess state */}
      <View style={[silly.fr, silly.jcaround, silly.my2]}>
        <View style={[silly.aic]}>
          <SillyText size={18}>Profile</SillyText>
          <View style={[silly.w40p, silly.bggray, silly.br5, silly.my1]}>
            <View
              style={[
                otpScreen >= 2 ? silly.w40p : silly.w20p,
                silly.h5,
                silly.bg2,
                silly.br5,
              ]}
            />
          </View>
        </View>
        <View style={[silly.aic]}>
          <SillyText size={18}>Verification</SillyText>
          <View style={[silly.w40p, silly.bggray, silly.br5, silly.my1]}>
            <View
              style={[
                otpScreen >= 2 ? silly.w20p : silly.w0,
                silly.h5,
                silly.bg2,
                silly.br5,
              ]}
            />
          </View>
        </View>
      </View>
      {/* image view */}
      <View style={[silly.aic, silly.jcs, silly.f2, silly.my5]}>
        <Image style={silly.my3} source={profileImg} />
        <SillyText
          family="SemiBold"
          style={[silly.my2]}
          size={32}
          color="white">
          Create Profile
        </SillyText>
        <SillyText size={16} my={15} style={[silly.w60p, silly.tc]}>
          The profile enables you to save money, earn rewards and share
          activities with your friends in the pave community.
        </SillyText>
      </View>
      {/* Animated Area */}
      <Animated.View
        style={[silly.bg2, silly.br20, silly.w100p, silly.p2, styles.height]}>
        <TouchableOpacity
          onPress={viewForm}
          style={[silly.jcc, silly.aic, otpScreen === 0 ? silly.df : silly.dn]}>
          <Ionicon name="chevron-up" size={35} color="gray" />
          <Ionicon
            style={silly.mt2M}
            name="chevron-up"
            size={35}
            color="gray"
          />
        </TouchableOpacity>
        <ProfileDetails
          setAuthData={setAuthData}
          setOtpScreen={setOtpScreen}
          otpScreen={otpScreen}
        />
        <OTPVerify
          authData={authData}
          setOtpScreen={setOtpScreen}
          otpScreen={otpScreen}
        />
        <CreatePassword id={authData.id} otpScreen={otpScreen} />
      </Animated.View>
    </View>
  );
};

export default Signup;
