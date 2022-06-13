import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SpinWidget = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Spin')}>
      <SillyView
        py={10}
        px={20}
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={5}
        mx={10}
        my={10}
        bg="#ffc237">
        <View>
          <SillyText my={5} size={24} family="SemiBold" color={clr1}>
            Play the {'\n'}weekly game!
          </SillyText>
          <SillyText my={5} color={clr1}>
            Stand to win prizes upto ₹100 in a try!
          </SillyText>
        </View>
        <Ionicons name="trophy" size={80} color="#407bff" />
      </SillyView>
    </TouchableOpacity>
  );
};

export default SpinWidget;
