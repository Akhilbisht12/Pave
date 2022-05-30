import {View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyOverlay,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  clr1,
  clr2,
  clr3,
  clr4,
  clr5,
  sec_clr_opac,
  sec_color,
} from '../../../config/globals';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import AddMoney from './AddMoney';
import BoostSavings from '../BoostSavings';
import Transactions from './Transactions';
const transactions = [
  {
    name: 'Mutual Deposit',
    amount: 250,
    date: 'Mon 24 Feb',
    balance: 24000,
  },
  {
    name: 'Mutual Deposit',
    amount: 2500,
    date: 'Mon 24 Feb',
    balance: 22500,
  },
];
const GoalOverview = ({navigation}) => {
  const [money, setMoney] = useState(false);
  const [boost, setBoost] = useState(false);
  const [trans, setTrans] = useState(false);
  const {size, strokeWidth} = {size: 60, strokeWidth: 5};
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - 10;
  return (
    <ScrollView style={[silly.bg1]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[silly.m1]}>
        <Icon name="chevron-back-outline" size={35} />
      </TouchableOpacity>
      <View style={[silly.p1]}>
        <View style={[silly.fr, silly.aic, silly.jcs]}>
          <SillyView bg={`${clr5}26`} px={15} py={10}>
            <Icon name="briefcase-outline" size={20} />
          </SillyView>
          <SillyText mx={10} size={20} color={clr2}>
            Travel Goal
          </SillyText>
          <SillyView
            style={[silly.fr, silly.aic]}
            round={20}
            bg={sec_color}
            px={15}
            py={10}>
            <SillyText mx={5} size={18} color={clr2}>
              Earn
            </SillyText>
            <Icon color={'yellow'} name="star" size={20} />
          </SillyView>
        </View>
        <View style={[silly.my2, silly.fr]}>
          <View>
            <SillyText family="SemiBold" size={35}>
              ₹ 80,000
            </SillyText>
            <SillyText size={20}>/ ₹ 1,20,000</SillyText>
          </View>
          <SillyView py={2} px={20} style={[silly.jcc]} mx={20} bg="#28a74526">
            <SillyText my={0.01} py={0.01} size={22} color="#28a745">
              4.02%
            </SillyText>
          </SillyView>
        </View>
        <SillyView
          style={[silly.fr, silly.jcbtw, silly.aic]}
          round={0.01}
          px={20}
          bg={sec_color}>
          <SillyText my={15} size={20}>
            4 weeks / 40 weeks left
          </SillyText>
          <SillyView bg={clr5} px={0.4} style={[silly.h10p]} />
          <View>
            <Svg width={size} height={size}>
              {/* Background Circle */}
              <Circle
                stroke={'#f2f2f2'}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                {...{strokeWidth}}
              />

              {/* Progress Circle */}
              <Circle
                stroke={'#3b5998'}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeDasharray={`${circum} ${circum}`}
                strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
                strokeLinecap="round"
                transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                {...{strokeWidth}}
              />

              {/* Text */}
              <SvgText
                fontSize={12}
                x={size / 2}
                y={size / 2}
                textAnchor="middle"
                fill={'white'}>
                90%
              </SvgText>
              <SvgText
                fontSize={7}
                x={size / 2}
                y={size / 2 + 8}
                textAnchor="middle"
                fill={'white'}>
                Complete
              </SvgText>
            </Svg>
          </View>
        </SillyView>
        <SillyView
          style={[silly.fr, silly.jcbtw, silly.aic]}
          px={15}
          bg={sec_color}>
          <View style={[silly.w40p, silly.mb2]}>
            <SillyText my={5} family="SemiBold" size={28}>
              2X
            </SillyText>
            <SillyText size={18}>
              Wow! you are saving 2X more than ever , keep up!
            </SillyText>
          </View>
          <SillyView px={0.4} bg={clr5} style={[silly.h15p]} />
          <View style={[silly.w40p]}>
            <Icon name="timer-outline" size={30} />
            <SillyText size={18}>
              You're on track to reach your milestone earlier
            </SillyText>
          </View>
        </SillyView>
        <SillyButton
          style={[silly.fr, silly.jcbtw, silly.aic]}
          bg={`${clr5}26`}>
          <SillyText my={15} size={18}>
            Withdraw your money
          </SillyText>
          <Icon name="chevron-forward" size={25} />
        </SillyButton>
      </View>
      <SillyView my={0.01} round={15} bg={clr2} style={[silly.f1, silly.h40p]}>
        <TouchableOpacity onPress={() => setBoost(true)}>
          <SillyView bg={clr1}>
            <SillyText my={10} size={22} family="SemiBold">
              Boost your savings
            </SillyText>
            <SillyText style={[silly.mb2]}>
              Try our return calculator for{'\n'} enhanced savings
            </SillyText>
          </SillyView>
        </TouchableOpacity>

        <SillyView style={[silly.f1]}>
          <TouchableOpacity onPress={() => setTrans(true)}>
            <View style={[silly.fr, silly.jcbtw, silly.aic]}>
              <SillyText family="SemiBold" size={20} color={clr4}>
                Transactions
              </SillyText>
              <Icon color={clr4} name="chevron-forward" size={35} />
            </View>
          </TouchableOpacity>

          <SillyView bg={clr5} py={0.4} />
          <ScrollView style={[silly.h30p]}>
            {transactions.map((item, i) => {
              return (
                <View
                  style={[silly.fr, silly.jcbtw, silly.aic, silly.my1]}
                  key={i}>
                  <View>
                    <SillyText my={5} color={clr4} size={20}>
                      {item.name}
                    </SillyText>
                    <SillyText color={clr5}>{item.date}</SillyText>
                  </View>
                  <View style={[silly.aie]}>
                    <SillyText color={clr4} family="SemiBold" size={30}>
                      ₹{item.amount}
                    </SillyText>
                    <SillyText>Balance: ₹{item.balance}</SillyText>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          {/* transaction scroll end */}
        </SillyView>
        {/* transaction end */}
        <SillyButton
          onPress={() => setMoney(true)}
          style={[silly.pa, silly.b0, silly.w90p, {left: 15}]}
          bg={clr1}>
          <SillyText center color={clr2} family="SemiBold" size={22}>
            Add Money
          </SillyText>
        </SillyButton>
      </SillyView>
      {/* savings white panel */}
      <AddMoney money={money} setMoney={setMoney} />
      <BoostSavings boost={boost} setBoost={setBoost} />
      <Transactions trans={trans} setTrans={setTrans} />
      <SillyOverlay style={[money || boost || trans ? {} : silly.dn]} />
    </ScrollView>
  );
};

export default GoalOverview;
