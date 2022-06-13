import {View} from 'react-native';
import React from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr4} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import silly from '../../../Silly/styles/silly';
import Trends from './Trends';
import {useNavigation} from '@react-navigation/native';
import GoldBalance from './GoldBalance';

const Savings = () => {
  const navigation = useNavigation();
  return (
    <View>
      {/* <SillyView my={20} mx={10} px={15} py={20} elev={2} bg={clr2}>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <View>
            <SillyText color={clr1} family="Bold" size={25}>
              Start your savings
            </SillyText>
            <SillyText my={15} color={clr4}>
              Choose your saving style and get started!
            </SillyText>
          </View>
          <SillyButton
            onPress={() => navigation.navigate('Money')}
            bg={clr1}
            round={10}
            px={10}>
            <Icon name="add" size={22} />
          </SillyButton>
        </View>
        <Trends />
      </SillyView> */}
      <GoldBalance />
    </View>
  );
};

export default Savings;
