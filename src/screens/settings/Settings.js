import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyOverlay,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import {clr1, clr3, clr4, clr5} from '../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import Notifications from './Notifications';
import Privacy from './Privacy';

const Settings = ({navigation}) => {
  const [editNot, setEditNot] = useState(false);
  const [editPri, setEditPri] = useState(false);
  return (
    <View style={[silly.p1, silly.f1]}>
      <View style={[silly.fr, silly.aic]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color={clr1} size={35} />
        </TouchableOpacity>
        <SillyText my={15} size={35} family="SemiBold" color={clr1}>
          Settings
        </SillyText>
      </View>

      <View style={[silly.my2]}>
        <SillyButton
          py={15}
          style={[silly.fr, silly.aic]}
          bg="#25195E40"
          onPress={() => navigation.navigate('ProfileEdit')}>
          <Icon size={20} color={clr1} name="person-outline" />
          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Profile
          </SillyText>
        </SillyButton>
        <SillyButton
          py={15}
          style={[silly.fr, silly.aic]}
          bg="#25195E40"
          onPress={() => setEditNot(true)}>
          <Icon size={20} color={clr1} name="notifications-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Notifications
          </SillyText>
        </SillyButton>
        <SillyButton
          py={15}
          style={[silly.fr, silly.aic]}
          bg="#25195E40"
          onPress={() => setEditPri(true)}>
          <Icon size={20} color={clr1} name="shield-checkmark-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Privacy
          </SillyText>
        </SillyButton>
        <SillyButton
          py={15}
          style={[silly.fr, silly.aic]}
          bg="#25195E40"
          onPress={() => navigation.navigate('Help')}>
          <Icon size={20} color={clr1} name="call-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Help & Support
          </SillyText>
        </SillyButton>
        <SillyButton py={15} style={[silly.fr, silly.aic]} bg="#25195E40">
          <Icon size={20} color={clr1} name="document-text-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Terms of service
          </SillyText>
        </SillyButton>
        <SillyButton py={15} style={[silly.fr, silly.aic]} bg="#25195E40">
          <Icon size={20} color={clr1} name="information-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            Privacy policy
          </SillyText>
        </SillyButton>
        <SillyButton py={15} style={[silly.fr, silly.aic]} bg="#25195E40">
          <Icon size={20} color={clr1} name="documents-outline" />

          <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
            About us
          </SillyText>
        </SillyButton>
        <SillyButton py={15} style={[silly.fr, silly.aic]} bg="#25195E40">
          <Icon size={20} color={clr1} name="log-out-outline" />

          <SillyText
            mx={5}
            my={10}
            family="SemiBold"
            size={20}
            color={'maroon'}>
            Logout
          </SillyText>
        </SillyButton>
      </View>
      {/* notification panel */}
      <Notifications setEditNot={setEditNot} editNot={editNot} />
      <Privacy setEditPri={setEditPri} editPri={editPri} />
      <SillyOverlay style={[editNot || editPri ? {} : silly.dn]} />
    </View>
  );
};

export default Settings;
