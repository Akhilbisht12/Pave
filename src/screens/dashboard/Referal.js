import {View, Share, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr4} from '../../config/globals';
import Icons from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import axios from 'axios';
import {server} from '../../config/server_url';
import AuthContext from '../../navigations/AuthContext';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Referal = () => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const [referal, setReferal] = useState('');
  const handleShare = async () => {
    try {
      const link = await dynamicLinks().buildLink({
        link: `https://referrals.pave.money/?${referal}`,
        android: {
          packageName: 'com.pave',
        },
        domainUriPrefix: 'https://referrals.pave.money',
      });
      await Share.share({
        message: `Start investing with as little as ₹10 with Pave while you level up your personal finance game. Join with this link: ${link}`,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const getUser = async () => {
    const user = await axios.get(`${server}/profile/${user_id}/`);
    setReferal(user.data.user_details.referral_code);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <TouchableOpacity onPress={handleShare}>
      <SillyView elev={2} px={15} py={25} bg={clr2} mx={10}>
        <SillyText family="SemiBold" size={22} color={clr1}>
          Add a friend
        </SillyText>
        <View style={[silly.fr, silly.jcs, silly.aic, silly.myh]}>
          <SillyText color={clr4}>and win upto </SillyText>
          <SillyText color="#ffc237">200 </SillyText>
          <Icons color="#ffc237" name="star" size={20} />
        </View>
      </SillyView>
    </TouchableOpacity>
  );
};

export default Referal;
