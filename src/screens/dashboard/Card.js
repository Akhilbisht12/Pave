import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path, Text as SvgText} from 'react-native-svg';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyAvatar,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr5} from '../../config/globals';
import axios from 'axios';
const {height} = Dimensions.get('window');
import {server} from '../../config/server_url';
import AuthContext from '../../navigations/AuthContext';
const Card = () => {
  const [nots, setNots] = useState(false);
  const [name, setName] = useState('');
  const [earnings, setEarnings] = useState({badges: [], points: 0});
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
  useEffect(() => {
    const pointsreq = async () => {
      try {
        const pointsres = await axios.get(
          `${server}/earning/overview/${user_id}/`,
        );
        setEarnings(pointsres.data);
        console.log(pointsres.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    pointsreq();
  }, [user_id]);

  return (
    <View>
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.ph]}>
        <View style={[silly.fr, silly.aic]}>
          <SillyAvatar
            mx={0.01}
            round={28}
            hgt={55}
            wdt={55}
            source={{
              uri: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
            }}
          />
          <View>
            <SillyText mx={10} color={clr1} size={22} family="SemiBold">
              {name}
            </SillyText>
            <SillyText mx={10} color={clr5}>
              {earnings.badges.length} badges earned
            </SillyText>
          </View>
        </View>
        <SillyView bg={`${clr1}50`}>
          <View style={[silly.jcc, silly.aic, silly.pxh]}>
            <Ionicons name="star" color={clr1} size={18} />
            <SillyText color={clr1} size={20}>
              {earnings.points ? `${Math.round(earnings.points / 1000)}K` : 0}
            </SillyText>
          </View>
        </SillyView>
      </View>
      {/* <SillyView round={5} py={10} px={10} bg={`${clr1}25`}>
        <TouchableOpacity
          onPress={() => setNots(!nots)}
          style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText color={clr1} size={18}>
            Your Notifications are here!
          </SillyText>
          <Ionicons name="chevron-down" size={20} color={clr1} />
        </TouchableOpacity>
        <View style={[silly.my1, nots ? {} : silly.dn]}>
          {[
            {name: 'You earned a batch', icon: 'medal'},
            {name: 'You earned a batch', icon: 'medal'},
          ].map((item, i) => {
            return (
              <View key={i}>
                <View style={[silly.fr, silly.jcbtw, silly.aic]}>
                  <SillyText color={clr1} size={18}>
                    {item.name}
                  </SillyText>
                  <Ionicons name={item.icon} size={25} color={clr1} />
                </View>
                <SillyView py={0.5} my={8} />
              </View>
            );
          })}
        </View>
      </SillyView> */}
    </View>
  );
};

export default Card;
