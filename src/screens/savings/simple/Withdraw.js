import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
  SillyAccordian,
} from '../../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr4, clr5} from '../../../config/globals';
import art from '../../../assets/stories/stories-1.png';
const {width, height} = Dimensions.get('window');
const withdrawls = [
  {
    ques: '$200 on 2022-03-23',
    ans: 'status : processed, payment settleted to band accout : HDFC*****9897',
  },
  {
    ques: '$200 on 2022-03-23',
    ans: 'status : processed, payment settleted to band accout : HDFC*****9897',
  },
  {
    ques: '$200 on 2022-03-23',
    ans: 'status : processed, payment settleted to band accout : HDFC*****9897',
  },
  {
    ques: '$200 on 2022-03-23',
    ans: 'status : processed, payment settleted to band accout : HDFC*****9897',
  },
];

const Withdraw = ({withdraw, setWithdraw}) => {
  const [success, setSuccess] = useState(false);
  const WithdrawSuccess = () => {
    return (
      <SillyView
        style={[
          success || withdraw ? {} : silly.dn,
          silly.bg2,
          silly.h30p,
          silly.w90p,
          silly.aic,
          silly.jcc,
          {position: 'absolute', bottom: 0.4 * height, left: 0.05 * width},
        ]}>
        <View style={[silly.aie, silly.w80p]}>
          <TouchableOpacity onPress={() => setSuccess(false)}>
            <Icon name="close-outline" color={clr5} size={30} />
          </TouchableOpacity>
        </View>
        <Image source={art} style={[silly.w20p, silly.h10p, silly.rmcon]} />
        <SillyText my={20} center color={clr1} family="SemiBold" size={22}>
          Rs. 1000 sent to bank account
        </SillyText>
        <SillyText center size={18} px={20} color={clr5}>
          The amount of Rs. 1000 should receive in your bank account in 2-3
          working days
        </SillyText>
      </SillyView>
    );
  };
  return (
    <View>
      <WithdrawSuccess />
      <View style={[success ? silly.dn : {}]}>
        <View
          style={[
            silly.pa,
            silly.b0,
            silly.w100p,
            silly.bg2,
            silly.h80p,
            withdraw ? {} : silly.dn,
          ]}>
          <SillyView
            style={[silly.fr, silly.jcbtw, silly.aic]}
            round={0.1}
            my={0.1}
            bg={clr1}>
            <SillyText py={10} size={25} family="SemiBold">
              Withdraw Money
            </SillyText>
            <TouchableOpacity onPress={() => setWithdraw(false)}>
              <Icon name="close-outline" size={35} />
            </TouchableOpacity>
          </SillyView>
          <View style={[silly.p1]}>
            <SillyText color={clr5} size={18} my={10}>
              Withdraw Savings
            </SillyText>
            <SillyInput
              placeholderTextColor={clr5}
              placeholder="Amount to withdraw"
              round={5}
              bg="transparent"
            />
            <SillyButton onPress={() => setSuccess(true)} mx={0.01} bg={clr1}>
              <SillyText my={5} center size={18}>
                Continue
              </SillyText>
            </SillyButton>
            <View style={[silly.my1]}>
              <View style={[silly.fr, silly.aic]}>
                <Icon name="timer-outline" color={clr5} size={16} />
                <SillyText mx={5} my={5} color={clr5}>
                  Last updated 2022-04-19
                </SillyText>
              </View>
              <View style={[silly.fr, silly.aic]}>
                <Icon name="timer-outline" color={clr5} size={16} />
                <SillyText mx={5} color={clr5}>
                  Next quaterly settlement between 2022-05-19 & 2022-05-26
                </SillyText>
              </View>
            </View>
            <View style={[silly.my2]}>
              <View style={[silly.fr, silly.aic, silly.my1]}>
                <Icon name="timer-outline" color={clr4} size={20} />
                <SillyText size={20} mx={5} color={clr4}>
                  Recent withdrawls
                </SillyText>
              </View>
              <ScrollView nestedScrollEnabled>
                {withdrawls.map((item, i) => {
                  return (
                    <SillyAccordian key={i} ques={item.ques} ans={item.ans} />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Withdraw;
