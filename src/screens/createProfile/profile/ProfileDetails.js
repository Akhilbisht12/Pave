import React, {useContext, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {
  SillyInput,
  SillyButton,
  SillyText,
} from '../../../Silly/components/silly_comps';
import {clr5, site_color} from '../../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ProgressContext from '../ProgressContext';
import axios from 'axios';
import {server} from '../../../config/server_url';
const ProfileDetails = () => {
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    mobile: '',
    referee_code: 'SfRUWo',
  });
  const {state, dispatch} = useContext(ProgressContext);
  const handleRegister = async () => {
    if (!(signup.name && signup.email && signup.mobile)) {
      ToastAndroid.show('Please fill out details', ToastAndroid.SHORT);
      return;
    }
    const user = await axios.post(`${server}/iam/auth/register/`, signup);
    console.log(user);
    dispatch({type: 'increment'});
  };
  return (
    <View style={[silly.jcbtw, state.progress === 1 ? silly.fg2 : silly.dn]}>
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
        <View>
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
        </View>
      </View>
      <View>
        <SillyButton bg={site_color} onPress={handleRegister}>
          <SillyText size={20} style={[silly.tc]}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default ProfileDetails;
