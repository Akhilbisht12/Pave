import {View, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyInput,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {clr5, site_color} from '../../../config/globals';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {clr1} from '../../../config/globals';
import {useNavigation} from '@react-navigation/native';
import Storage from '@react-native-async-storage/async-storage';

const ProfileDetails = ({setOtpScreen, otpScreen, setAuthData}) => {
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    mobile: '',
    referee_code: 'SfRUWo',
  });
  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      if (!(signup.name && signup.email && signup.mobile)) {
        ToastAndroid.show('Please fill out details', ToastAndroid.SHORT);
        return;
      }
      const user = await axios.post(`${server}/iam/auth/register/`, signup);
      console.log(user);
      setAuthData({
        name: signup.name,
        email: signup.email,
        phone: signup.mobile,
        id: user.data.id,
      });
      setOtpScreen(otpScreen + 1);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  return (
    <View style={[silly.jcbtw, otpScreen === 1 ? {} : silly.dn]}>
      <View>
        <SillyText family="SemiBold" size={24} color={site_color}>
          Add Profile Details
        </SillyText>
        <View style={[silly.mt4]}>
          <SillyText color={clr5} size={18}>
            Name
          </SillyText>
          <SillyInput
            value={signup.name}
            onChangeText={e => setSignup({...signup, name: e})}
          />
        </View>
        <View>
          <SillyText color={clr5} size={18}>
            Email ID
          </SillyText>
          <SillyInput
            value={signup.email}
            onChangeText={e => setSignup({...signup, email: e})}
          />
        </View>
        <View style={[silly.my1]}>
          <SillyText color={clr5} size={18}>
            Mobile No.
          </SillyText>
          <SillyInput
            keyboardType="number-pad"
            value={signup.mobile}
            onChangeText={e => setSignup({...signup, mobile: e})}
          />
        </View>
        {/* <View>
          <View
            style={[
              silly.fr,
              silly.jcbtw,
              silly.bg3,
              silly.br10,
              silly.aic,
              silly.p1,
              silly.my1,
            ]}>
            <SillyText family="Medium" size={18} color={site_color} fw={700}>
              Upload profile picture
            </SillyText>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          </View>
        </View> */}
      </View>
      <View>
        <SillyButton bg={site_color} onPress={handleRegister}>
          <SillyText size={20} style={[silly.tc]}>
            Next
          </SillyText>
        </SillyButton>
        <SillyButton my={20} onPress={() => navigation.navigate('Login')}>
          <SillyText center color={clr1}>
            Already have an accoount? Login
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default ProfileDetails;
