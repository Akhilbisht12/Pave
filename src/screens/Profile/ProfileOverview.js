import {View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr2, clr3, clr5, sec_color} from '../../config/globals';
import Badges from './Badges';
import Friends from './Friends';
import Points from './Points';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../navigations/AuthContext';
import axios from 'axios';
import {server} from '../../config/server_url';

const ProfileOverview = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const GetActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <Badges />;
      case 1:
        return <Points />;
      case 2:
        return <Friends />;
      default:
        setActiveTab(0);
        break;
    }
  };
  const [name, setName] = useState('');
  const {state} = useContext(AuthContext);
  const {user_id} = state;

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profilename = await axios.get(`${server}/profile/${user_id}/`);
        setName(profilename.data.user_details.name);
      } catch (error) {
        console.log(error.response);
        ToastAndroid.show(error.response.data.detail, ToastAndroid.SHORT);
      }
    };
    getUserProfile();
  }, [user_id]);
  return (
    <View style={[silly.f1, silly.bg1]}>
      <View style={[silly.p1]}>
        <View style={[silly.my1, silly.fr, silly.jcbtw, silly.aic]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={[silly.fr, silly.aic]}>
            <Image
              style={[silly.w40, silly.h40, silly.br20]}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662_960_720.jpg',
              }}
            />
            <SillyText mx={10} family="SemiBold" size={22}>
              {name}
            </SillyText>
            <Icon name="create-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon size={25} name="settings-outline" />
          </TouchableOpacity>
        </View>
        <SillyView
          bg={sec_color}
          py={15}
          px={30}
          style={[silly.fr, silly.jcbtw, silly.aic]}>
          <View style={[silly.aic]}>
            <Icon name="medal-outline" size={25} />
            <SillyText
              my={5}
              center
              style={[silly.w20p]}
              size={18}
              family="SemiBold">
              20 Badges Earned
            </SillyText>
          </View>
          <SillyView bg={clr5} style={[silly.h80]} px={0.4} />

          <View style={[silly.aic]}>
            <Icon name="star-outline" size={25} />
            <SillyText
              my={5}
              center
              style={[silly.w20p]}
              size={18}
              family="SemiBold">
              500 Points Earned
            </SillyText>
          </View>
          <SillyView bg={clr5} style={[silly.h80]} px={0.4} />
          <View style={[silly.aic]}>
            <Icon name="people-outline" size={25} />

            <SillyText
              my={5}
              center
              style={[silly.w20p]}
              size={18}
              family="SemiBold">
              4 Friends Added
            </SillyText>
          </View>
        </SillyView>
      </View>
      <View style={[silly.fr, silly.jcbtw, silly.aic]}>
        <SillyButton onPress={() => setActiveTab(0)} py={0.1}>
          <SillyText color={activeTab === 0 ? clr2 : clr5}>BADGES</SillyText>
          <SillyView
            style={[activeTab === 0 ? {} : silly.dn]}
            bg={clr2}
            py={2}
          />
        </SillyButton>
        <SillyButton onPress={() => setActiveTab(1)} py={0.1}>
          <SillyText color={activeTab === 1 ? clr2 : clr5}>POINTS</SillyText>
          <SillyView
            style={[activeTab === 1 ? {} : silly.dn]}
            bg={clr2}
            py={2}
          />
        </SillyButton>
        <SillyButton onPress={() => setActiveTab(2)} py={0.1}>
          <SillyText color={activeTab === 2 ? clr2 : clr5}>FRIENDS</SillyText>
          <SillyView
            style={[activeTab === 2 ? {} : silly.dn]}
            bg={clr2}
            py={2}
          />
        </SillyButton>
      </View>
      <View style={[silly.f1]}>
        <GetActiveTab />
      </View>
    </View>
  );
};

export default ProfileOverview;
