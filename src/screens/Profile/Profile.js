import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyOverlay,
} from '../../Silly/components/silly_comps';
import {clr1, clr4} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import ResetPassword from '../settings/ResetPassword';

const Profile = ({navigation}) => {
  const [editPassword, setEditPassword] = useState(false);
  return (
    <ScrollView contentContainerStyle={[silly.f1]}>
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

        <View>
          <View style={[silly.fr, silly.jcbtw, silly.my2]}>
            <SillyText color={clr4} family="SemiBold" size={25}>
              My Details
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
            {[
              {
                name: 'Profile',
                icon: 'person-outline',
                onPress: () => navigation.navigate('MyProfile'),
              },
              {
                name: 'Nominee',
                icon: 'people-outline',
                onPress: () => navigation.navigate('Nominee'),
              },
              {
                name: 'Pan',
                icon: 'documents-outline',
                onPress: () => navigation.navigate('Pan'),
              },
              {
                name: 'Account Details',
                icon: 'card-outline',
                onPress: () => navigation.navigate('Bank'),
              },
              {
                name: 'Address',
                icon: 'reader-outline',
                onPress: () => navigation.navigate('Address'),
              },
              {
                name: 'Change Password',
                icon: 'create-outline',
                onPress: () => setEditPassword(true),
              },
            ].map((item, i) => {
              return (
                <SillyButton
                  key={i}
                  onPress={item.onPress}
                  py={15}
                  style={[silly.fr, silly.aic, silly.jcbtw]}
                  bg="#25195E33">
                  <View style={[silly.fr, silly.aic]}>
                    <Icon size={20} color={clr1} name={item.icon} />
                    <SillyText
                      mx={5}
                      my={10}
                      family="SemiBold"
                      size={20}
                      color={clr1}>
                      {item.name}
                    </SillyText>
                  </View>
                  <Icon size={20} color={clr1} name="chevron-forward-outline" />
                </SillyButton>
              );
            })}
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
    </ScrollView>
  );
};

export default Profile;
