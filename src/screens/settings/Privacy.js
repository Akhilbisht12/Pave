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

const Privacy = ({setEditPri, editPri}) => {
  const [profile, setProfile] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [learning, setLearning] = useState(false);
  return (
    <View
      style={[
        silly.pa,
        silly.b0,
        silly.w100p,
        silly.bg2,
        editPri ? {} : silly.dn,
      ]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText py={10} size={25} family="SemiBold">
          Privacy
        </SillyText>
        <TouchableOpacity onPress={() => setEditPri(false)}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.p1, silly.my1]}>
        {/* app notifications */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Make your profile public
            </SillyText>
            <SillyRadio on={profile} off={setProfile} />
          </View>
        </SillyView>
        {/* frients updates */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Make all your updates public
            </SillyText>
            <SillyRadio on={updates} off={setUpdates} />
          </View>
        </SillyView>
        {/* personal updates */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Make your transaction public
            </SillyText>
            <SillyRadio on={transaction} off={setTransaction} />
          </View>
        </SillyView>
        {/* weekly games */}
        <SillyView>
          <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Make your learning progress public
            </SillyText>
            <SillyRadio on={learning} off={setLearning} />
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

export default Privacy;
