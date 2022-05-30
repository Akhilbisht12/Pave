import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyRadio,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr3, clr4} from '../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';

const Notifications = ({setEditNot, editNot}) => {
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
        editNot ? {} : silly.dn,
      ]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText py={10} size={25} family="SemiBold">
          Notifications
        </SillyText>
        <TouchableOpacity onPress={() => setEditNot(false)}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.p1, silly.my1]}>
        {/* app notifications */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              App notifications
            </SillyText>
            <SillyRadio on={appNot} off={setAppNot} />
          </View>
        </SillyView>
        {/* frients updates */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Friend's updates
            </SillyText>
            <SillyRadio on={friendUpd} off={setFriendUpd} />
          </View>
        </SillyView>
        {/* personal updates */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Personal updates
            </SillyText>
            <SillyRadio on={personalUpd} off={setPersonalUpd} />
          </View>
        </SillyView>
        {/* weekly games */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Weekly games
            </SillyText>
            <SillyRadio on={weeklyGames} off={setWeeklyGames} />
          </View>
        </SillyView>
      </View>
      <SillyButton py={15} bg={clr1}>
        <SillyText family="SemiBold" size={22} center>
          Save
        </SillyText>
      </SillyButton>
    </View>
  );
};

export default Notifications;
