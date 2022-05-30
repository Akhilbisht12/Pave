import React, {useContext} from 'react';
import {View} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {site_color} from '../../../config/globals';
import SillyText from '../../../Silly/components/SillyText';
import {SillyButton} from '../../../Silly/components/silly_comps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ProgressContext from '../ProgressContext';
import {useNavigation} from '@react-navigation/native';
const Signature = () => {
  const {state} = useContext(ProgressContext);
  const navigation = useNavigation();
  return (
    <View style={[state.progress === 7 ? silly.f3 : silly.dn, silly.jcbtw]}>
      <View>
        <SillyText family="SemiBold" size={24} color={site_color}>
          Signature
        </SillyText>

        <View style={[silly.my2]}>
          <SillyText my={5} size={16}>
            Make a signature
          </SillyText>
          <View style={[silly.aic]}>
            <View style={[silly.w90p, silly.h30p, silly.bg3, silly.br10]} />
          </View>
          <SillyText my={14} size={16}>
            OR
          </SillyText>
          <View
            style={[
              silly.fr,
              silly.jcbtw,
              silly.bg3,
              silly.br10,
              silly.aic,
              silly.p1,
            ]}>
            <SillyText family="Medium" size={18} color={site_color} fw={700}>
              Upload Signature
            </SillyText>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          </View>
        </View>
      </View>
      <SillyButton onPress={() => navigation.navigate('Home')} bg={site_color}>
        <SillyText size={20} style={[silly.tc]}>
          Next
        </SillyText>
      </SillyButton>
    </View>
  );
};

export default Signature;
