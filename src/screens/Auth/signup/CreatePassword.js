import React, {useState, useContext} from 'react';
import {View, ToastAndroid} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  site_color,
  SillyInput,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import {clr1, clr5} from '../../../config/globals';
import Storage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../../navigations/AuthContext';

const CreatePassword = ({otpScreen, id}) => {
  const {dispatch} = useContext(AuthContext);
  const [cred, setCred] = useState({
    new_password: '',
    confirm_password: '',
  });
  const navigation = useNavigation();
  const handleCreatePassword = async () => {
    try {
      if (!(cred.new_password && cred.confirm_password)) {
        ToastAndroid.show('Please fill out fields', ToastAndroid.SHORT);
        return;
      }
      if (cred.new_password !== cred.confirm_password) {
        ToastAndroid.show('Password dont match', ToastAndroid.SHORT);
        return;
      }
      console.log(cred.new_password, cred.confirm_password);
      const user = await axios.post(`${server}/iam/auth/set-password/`, {
        id,
        reset: false,
        update: false,
        new_password: cred.new_password,
        confirm_password: cred.confirm_password,
      });
      console.log(user.data);
      navigation.navigate('KYC');
      // dispatch({type: 'signin'});
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  return (
    <View style={[silly.jcbtw, otpScreen === 3 ? {} : silly.dn]}>
      <View>
        <SillyText family="SemiBold" size={24} color={clr1}>
          Create Password
        </SillyText>
        <View style={[silly.mt4]}>
          <SillyText color={clr5} size={18}>
            New Password
          </SillyText>
          <SillyInput
            value={cred.new_password}
            onChangeText={e => setCred({...cred, new_password: e})}
          />
        </View>
        <View>
          <SillyText color={clr5} size={18}>
            Email ID
          </SillyText>
          <SillyInput
            value={cred.confirm_password}
            onChangeText={e => setCred({...cred, confirm_password: e})}
          />
        </View>
      </View>
      <View>
        <SillyButton bg={clr1} my={20} onPress={handleCreatePassword}>
          <SillyText size={20} style={[silly.tc]}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default CreatePassword;
