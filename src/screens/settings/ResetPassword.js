import {View, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useContext, useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import OTP from '../../components/OTP';
import axios from 'axios';
import {server} from '../../config/server_url';
import Storage from '@react-native-async-storage/async-storage';
import AuthContext from '../../navigations/AuthContext';

const ResetPassword = ({editPassword, setEditPassword}) => {
  const {state} = useContext(AuthContext);
  const {id} = state;
  const [reset, setReset] = useState({
    current: '',
    new: '',
    confirm_new: '',
  });
  const handleUpdatePassword = async () => {
    if (!(reset.current && reset.new && reset.confirm_new)) {
      ToastAndroid.show('Fill out Empty fields', ToastAndroid.SHORT);
    }
    try {
      const update = await axios.post(`${server}/iam/auth/set-password/`, {
        id,
        reset: false,
        update: true,
        current_password: reset.current,
        new_password: reset.new,
        confirm_password: reset.confirm_new,
      });
      console.log(update);
      ToastAndroid.show('Password Updated', ToastAndroid.SHORT);
      setEditPassword(false);
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  return (
    <View
      style={[editPassword ? {} : silly.dn, silly.pa, silly.b0, silly.w100p]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        bg={clr1}>
        <SillyText family="SemiBold" my={10} size={25}>
          Change your password
        </SillyText>
        <TouchableOpacity onPress={() => setEditPassword(false)}>
          <Icon name="close-outline" size={35} color="white" />
        </TouchableOpacity>
      </SillyView>
      <View
        style={[silly.py2, silly.px1, silly.bg2, editPassword ? {} : silly.dn]}>
        <SillyText color={clr5} size={18} my={5}>
          Current Password
        </SillyText>
        <SillyInput
          value={reset.current}
          onChangeText={e => setReset({...reset, current: e})}
          style={[silly.fs18]}
        />
        <SillyText color={clr5} size={18} my={5}>
          New Password
        </SillyText>
        <SillyInput
          value={reset.new}
          onChangeText={e => setReset({...reset, new: e})}
          style={[silly.fs18]}
        />
        <SillyText color={clr5} size={18} my={5}>
          Confirm New Password
        </SillyText>
        <SillyInput
          value={reset.confirm_new}
          onChangeText={e => setReset({...reset, confirm_new: e})}
          style={[silly.fs18]}
        />
        <SillyButton onPress={handleUpdatePassword} bg={clr1}>
          <SillyText my={5} size={18} color={clr2} center>
            Save
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default ResetPassword;
