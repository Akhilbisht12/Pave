import {View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyOverlay,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr4, clr5, sec_color} from '../../../config/globals';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import Transactions from './Transactions';
import BoostSavings from '../BoostSavings';
import Withdraw from './Withdraw';
import axios from 'axios';
import {server} from '../../../config/server_url';
import AuthContext from '../../../navigations/AuthContext';
import moment from 'moment';

const SimpleOverview = ({navigation}) => {
  const [trans, setTrans] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [totalIn, setTotalIn] = useState({net: '', net_amount: ''});
  const [boost, setBoost] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const {size, strokeWidth} = {size: 60, strokeWidth: 5};
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100;

  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const investmentreq = async () => {
      try {
        const investmentres = await axios.get(
          `${server}/investment/precious-metal/${user_id}/investments/?ordering=-created_at`,
        );
        const totalInvestres = await axios.get(
          `${server}/investment/precious-metal/${user_id}/investment-overview/`,
        );
        console.log(investmentres.data);
        setTotalIn(totalInvestres.data);
        setInvestments(investmentres.data.results);
      } catch (error) {
        console.log(error.response);
      }
    };
    investmentreq();
  }, [user_id]);

  return (
    <View style={[silly.f1]}>
      <ScrollView style={[silly.bg1]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[silly.m1]}>
          <Icon color={clr2} name="chevron-back-outline" size={35} />
        </TouchableOpacity>
        <View style={[silly.p1]}>
          <View>
            <SillyText size={20}>Your Savings</SillyText>
          </View>
          <View style={[silly.fr, silly.aic, silly.jcs]}>
            <SillyText family="SemiBold" size={35}>
              {totalIn.net} gms
            </SillyText>
            <SillyView
              style={[silly.fr, silly.aic]}
              round={20}
              bg={sec_color}
              px={15}
              mx={10}
              py={10}>
              <SillyText mx={5} size={18} color={clr2}>
                ₹{totalIn.net_amount}
              </SillyText>
              {/* <Icon color={'yellow'} name="star" size={20} /> */}
            </SillyView>
          </View>
          <View style={[silly.fr]}>
            <SillyView py={10} px={20} style={[silly.jcc]} bg="#28a74526">
              <SillyText
                family="SemiBold"
                my={0.01}
                py={0.01}
                size={25}
                color="#28a745">
                +4.25%
              </SillyText>
            </SillyView>
          </View>

          {/* <SillyView
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
          </SillyView> */}
          {/* streak section */}
          {/* <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyView
              style={[silly.fr, silly.jcbtw, silly.aic, silly.w60p, silly.h15p]}
              px={10}
              bg={sec_color}>
              <View style={[silly.fr, silly.aic]}>
                <View>
                  <Svg width={size} height={size}>
                    <Circle
                      stroke={'#f2f2f2'}
                      fill="none"
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      {...{strokeWidth}}
                    />

                    <Circle
                      stroke={'#3b5998'}
                      fill="none"
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      strokeDasharray={`${circum} ${circum}`}
                      strokeDashoffset={
                        radius * Math.PI * 2 * (svgProgress / 100)
                      }
                      strokeLinecap="round"
                      transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                      {...{strokeWidth}}
                    />

                    <SvgText
                      fontSize={18}
                      x={size / 2}
                      y={size / 2}
                      textAnchor="middle"
                      fill={'white'}>
                      4
                    </SvgText>
                    <SvgText
                      fontSize={10}
                      x={size / 2}
                      y={size / 2 + 10}
                      textAnchor="middle"
                      fill={'white'}>
                      Streaks
                    </SvgText>
                  </Svg>
                </View>
                <SillyText style={[silly.w40p, silly.ml1]} size={16}>
                  You have saved 4days in a row! Keep it going for better
                  rewards!
                </SillyText>
              </View>
            </SillyView>
            <SillyView
              style={[silly.w30p, silly.h15p, silly.jcc]}
              px={10}
              bg={sec_color}>
              <SillyText my={5} size={40} family="SemiBold">
                ₹ 100
              </SillyText>
              <SillyText my={5}>won in rewards so far!</SillyText>
            </SillyView>
          </View> */}

          <SillyButton
            onPress={() => setWithdraw(true)}
            style={[silly.fr, silly.jcbtw, silly.aic]}
            bg={`${clr5}26`}>
            <SillyText my={15} size={18}>
              Withdraw your money
            </SillyText>
            <Icon color={clr2} name="chevron-forward" size={25} />
          </SillyButton>
        </View>
        <SillyView
          my={0.01}
          round={15}
          bg={clr2}
          style={[silly.f1, silly.h60p]}>
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
            <View style={[silly.fr, silly.jcbtw, silly.aic]}>
              <SillyText family="SemiBold" size={20} color={clr4}>
                Transactions
              </SillyText>
              <TouchableOpacity onPress={() => setTrans(true)}>
                <Icon color={clr4} name="chevron-forward" size={35} />
              </TouchableOpacity>
            </View>
            <SillyView bg={clr5} py={0.4} />
            <View style={[silly.f1]}>
              {investments.slice(0, 4).map((item, i) => {
                return (
                  <View
                    style={[silly.fr, silly.jcbtw, silly.aic, silly.my1]}
                    key={i}>
                    <View>
                      <SillyText my={5} color={clr4} size={20}>
                        {item.metal_type} {item.investment_type_label}
                      </SillyText>
                      <SillyText color={clr5}>
                        {moment(item.created_at).format('DD MMM YYYY')}
                      </SillyText>
                    </View>
                    <View style={[silly.aie]}>
                      <SillyText color={clr4} family="SemiBold" size={30}>
                        ₹{item.transaction_details.amount}
                      </SillyText>
                      <SillyText color={clr5}>
                        INV No. {item.transaction_details.invoice_number}
                      </SillyText>
                    </View>
                  </View>
                );
              })}
            </View>
          </SillyView>
          {/* transaction end */}
        </SillyView>
      </ScrollView>
      <View style={[silly.aic]}>
        <SillyButton
          onPress={() => navigation.navigate('AddSaving', {overview: true})}
          style={[silly.w90p]}
          bg={clr1}>
          <SillyText center color={clr2} family="SemiBold" size={22}>
            Add Money
          </SillyText>
        </SillyButton>
      </View>

      {/* Popups */}
      <Transactions trans={trans} setTrans={setTrans} />
      <BoostSavings boost={boost} setBoost={setBoost} />
      <Withdraw withdraw={withdraw} setWithdraw={setWithdraw} />
      <SillyOverlay style={[trans || boost || withdraw ? {} : silly.dn]} />
    </View>
  );
};

export default SimpleOverview;
