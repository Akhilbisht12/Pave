import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyInput,
  SillyOverlay,
} from '../../Silly/components/silly_comps';
import {clr1, clr4} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import ResetPassword from './ResetPassword';

const Profile = ({navigation}) => {
  const [editPassword, setEditPassword] = useState(false);

  return (
    <View style={[silly.p1, silly.f1]}>
      <View style={[silly.fr, silly.my1, silly.aic, silly.jcbtw]}>
        <SillyText color={clr1} size={30} family="SemiBold">
          Profile
        </SillyText>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={40} color={clr1} />
        </TouchableOpacity>
      </View>
      {/* change profile */}
      <View style={[silly.my2]}>
        <View style={[silly.fr, silly.jcbtw, silly.mb1]}>
          <SillyText color={clr4} family="SemiBold" size={25}>
            User Details
          </SillyText>
          <Icon size={25} name="create-outline" color={clr1} />
        </View>
        <SillyView style={[silly.fr, silly.jcbtw]} py={10} round={10}>
          <Image
            style={[silly.w40, silly.h40, silly.br20]}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2022/02/26/07/06/butterfly-7035308_960_720.jpg',
            }}
          />
          <SillyButton px={0.1}>
            <SillyText family="SemiBold" size={18} color={clr1}>
              Change Photo
            </SillyText>
          </SillyButton>
        </SillyView>
      </View>
      {/* user details */}
      <View>
        <View>
          <SillyText my={10} color="gray">
            Name
          </SillyText>
          <SillyInput round={8} bg="transparent" />
        </View>
        <View>
          <SillyText my={10} color="gray">
            Email
          </SillyText>
          <SillyInput round={8} bg="transparent" />
        </View>
        <View>
          <SillyText my={10} color="gray">
            Mobile No.
          </SillyText>
          <SillyInput round={8} bg="transparent" />
        </View>
      </View>
      {/* account details */}
      <View>
        <View style={[silly.fr, silly.jcbtw, silly.my2]}>
          <SillyText color={clr4} family="SemiBold" size={25}>
            Edit Account Details
          </SillyText>
          {/* <TouchableOpacity onPress={() => setEditPassword(true)}>
            <Icon size={25} name="create-outline" color={clr1} />
          </TouchableOpacity> */}
        </View>
        <View>
          {/* <SillyText my={10} color="gray">
            Password
          </SillyText>
          <SillyInput round={8} bg="transparent" /> */}
          <SillyButton
            onPress={() => setEditPassword(true)}
            py={15}
            style={[silly.fr, silly.aic]}
            bg="#25195E40">
            <Icon size={20} color={clr1} name="create-outline" />
            <SillyText mx={5} my={10} family="SemiBold" size={20} color={clr1}>
              Change password
            </SillyText>
          </SillyButton>
        </View>
      </View>
      {/* change password popup */}
      <ResetPassword
        setEditPassword={setEditPassword}
        editPassword={editPassword}
      />
      <SillyOverlay
        style={[editPassword ? {} : silly.dn]}
        onPress={() => setEditPassword(false)}
      />
    </View>
  );
};

export default Profile;
