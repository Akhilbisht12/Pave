import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyRadio,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import {clr1, clr3, clr4, sec_clr_opac} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
const Tdata = [
  {
    type: 'Manual Deposit',
    date: '24dec2022',
    deposit: 250,
    amount: 1000,
  },
  {
    type: 'Manual Deposit',
    date: '24dec2022',
    deposit: 250,
    amount: 1000,
  },
  {
    type: 'Manual Deposit',
    date: '24dec2022',
    deposit: 250,
    amount: 1000,
  },
];
const Transactions = ({setTrans, trans}) => {
  return (
    <View
      style={[
        silly.pa,
        silly.b0,
        silly.w100p,
        silly.bg2,
        trans ? {} : silly.dn,
      ]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText py={10} size={25} family="SemiBold">
          Transactions
        </SillyText>
        <TouchableOpacity onPress={() => setTrans(false)}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.p1, silly.my1]}>
        {Tdata.map((item, i) => {
          return (
            <View key={i}>
              <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
                <View>
                  <SillyText family="SemiBold" size={20} color={clr4}>
                    {item.type}
                  </SillyText>
                  <SillyText my={5}>{item.date}</SillyText>
                </View>

                <View style={[silly.aie]}>
                  <SillyText family="SemiBold" size={25} color={clr4}>
                    ₹ {item.deposit}
                  </SillyText>
                  <SillyText my={5}>Balance: ₹ {item.amount}</SillyText>
                </View>
              </View>
              {i === 0 ? (
                <SillyButton bg={`${clr1}4d`}>
                  <SillyText center family="SemiBold" color={clr1}>
                    Invest Again
                  </SillyText>
                </SillyButton>
              ) : null}
              <SillyView bg={clr3} py={0.5} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Transactions;
