import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr3, clr4, clr5} from '../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';

const Contact = ({setContact, contact}) => {
  const [appNot, setAppNot] = useState(false);
  const [friendUpd, setFriendUpd] = useState(false);
  const [personalUpd, setPersonalUpd] = useState(false);
  const [weeklyGames, setWeeklyGames] = useState(false);
  return (
    <View
      style={[
        silly.pa,
        silly.b0,
        silly.w100p,
        silly.bg2,
        contact ? {} : silly.dn,
      ]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText py={10} size={25} family="SemiBold">
          Contact Us
        </SillyText>
        <TouchableOpacity onPress={() => setContact(false)}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.my2, silly.p1]}>
        <SillyText my={10} size={18} color={clr5}>
          Subject
        </SillyText>
        <SillyInput placeholder="Pick your issue" bg="transparent" />
        <SillyText my={10} size={18} color={clr5}>
          Describe your issue in detail
        </SillyText>
        <SillyInput placeholder="Pick your issue" bg="transparent" />
        <SillyText my={10} size={18} color={clr5}>
          Add attachments (optional)
        </SillyText>
        <SillyInput
          numberOfLines={10}
          placeholder="Pick your issue"
          bg="transparent"
        />
      </View>
      <SillyButton py={15} bg={clr1}>
        <SillyText family="SemiBold" size={22} center>
          Submit
        </SillyText>
      </SillyButton>
    </View>
  );
};

export default Contact;
