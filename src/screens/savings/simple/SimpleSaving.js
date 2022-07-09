import {View, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {cashfree_api, clr1, clr2} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {server} from '../../../config/server_url';
import AuthContext from '../../../navigations/AuthContext';
import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk/bridge';
import SillyLoad from '../../../Silly/components/SillyLoad';

const SimpleSaving = ({navigation, route}) => {
  const {state} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {user_id} = state;
  const [principal, setPrincipal] = useState(100);
  const [amount, setAmount] = useState(0);
  const [gold_price, set_gold_price] = useState(null);
  const [totalIn, setTotalIn] = useState({net: '', net_amount: ''});
  const rate = 10;
  useEffect(() => {
    setAmount(Math.round(principal * 365 * Math.pow(1 + rate * 0.01, 10)));
  }, [principal, amount]);

  const investmentreq = async () => {
    try {
      const totalInvestres = await axios.get(
        `${server}/investment/precious-metal/${user_id}/investment-overview/`,
      );
      console.log(totalInvestres.data);
      setTotalIn(totalInvestres.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getGoldPrice = useCallback(async () => {
    try {
      const get_gold = await axios.get(
        `${server}/investment/precious-metal/rates/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.access,
          },
        },
      );
      set_gold_price(get_gold.data);
      console.log(get_gold.data);
    } catch (error) {
      console.log(error.response.data);
      ToastAndroid.show('Failed to fetch gold price', ToastAndroid.SHORT);
    }
  }, [state.access]);

  useEffect(() => {
    getGoldPrice();
    investmentreq();
  }, []);

  setInterval(() => {
    getGoldPrice();
  }, 180000);

  const handlePg = async () => {
    try {
      const pgres = await axios.post(
        `${server}/investment/payment/generate-token/`,
        {
          user: user_id,
          amount: principal,
        },
      );
      console.log(pgres.data);
      if (pgres.data) {
        const checkout = new Map();
        checkout.set('orderId', pgres.data.id); // orderId here
        checkout.set('orderAmount', JSON.stringify(pgres.data.amount)); // orderAmount here
        checkout.set('appId', cashfree_api); // apiKey here
        checkout.set('tokenData', pgres.data.cashfree_token); // cfToken here
        checkout.set('orderCurrency', pgres.data.currency);
        checkout.set('orderNote', `${Date.now()} payment`);
        checkout.set('customerName', pgres.data.customer.name);
        checkout.set('customerPhone', pgres.data.customer.mobile);
        checkout.set('customerEmail', pgres.data.customer.email);
        checkout.set('hideOrderId', 'true');
        checkout.set('color1', clr1);
        checkout.set('color2', clr2);
        RNPgReactNativeSdk.startPaymentWEB(checkout, 'TEST', async result => {
          const pgstatus = JSON.parse(result);
          if (pgstatus.txStatus === 'SUCCESS') {
            setLoading(true);
            await handleBuyGold(pgstatus);
          } else {
            ToastAndroid.show('Payment Failed', ToastAndroid.LONG);
          }
        });
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('payment failed', ToastAndroid.SHORT);
    }
  };

  const handleBuyGold = async pg => {
    try {
      const buy_gold = await axios.post(
        `${server}/investment/precious-metal/buy/`,
        {
          rate_id: gold_price.id,
          amount: principal.toString(),
          payment_id: pg.orderId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.access,
          },
        },
      );
      setLoading(false);
      console.log(buy_gold.data);
      ToastAndroid.show('Transaction Successful', ToastAndroid.SHORT);
      navigation.navigate('SimpleOverview');
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      ToastAndroid.show('Failed request', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[silly.f1, silly.bg1]}>
      <View style={[silly.px1, silly.py2]}>
        <SillyView style={[silly.h20p, silly.jcc]} px={20}>
          <SillyText size={35} family="SemiBold">
            {route.params.overview ? `${totalIn.net} gm` : `₹ ${amount}`}
          </SillyText>
          <SillyText color="#28a745" size={20} family="SemiBold" my={5}>
            {route.params.overview
              ? `₹ ${totalIn.net_amount}`
              : `+${(amount - principal) * 0.01}%`}
          </SillyText>
          <SillyText>
            {route.params.overview
              ? 'You are saving great. keep Going!!'
              : 'savings after 10 years, if current amount invested daily'}
          </SillyText>
        </SillyView>
      </View>

      <SillyView
        my={-10}
        bg={clr2}
        py={15}
        round={15}
        style={[silly.f1, silly.jcbtw]}>
        <View style={[silly.p1]}>
          <SillyText color={clr1} family="SemiBold" my={10}>
            How much do you want to save now?
          </SillyText>
          <SillyInput
            value={principal.toString()}
            onChangeText={setPrincipal}
            family="SemiBold"
            keyboardType="number-pad"
            style={{fontSize: 25, color: clr1}}
            bg="transparent"
          />
          <View style={[silly.fr, silly.jcbtw]}>
            {[50, 100, 200, 500, 2000].map(item => {
              return (
                <SillyButton
                  key={item}
                  onPress={() => setPrincipal(item)}
                  py={5}
                  px={15}
                  mx={1}
                  bg={clr1}>
                  <SillyText color={clr2}>Rs {item}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </View>
        <View>
          <View style={[silly.fr, silly.jcc, silly.aic]}>
            <Icon name="shield-checkmark" color={'green'} size={25} />
            <SillyText mx={5} color={'green'} center>
              Your saving are safely invested in Gold
            </SillyText>
          </View>
          <SillyText mx={5} color={'orange'} center>
            Current Gold Price Per Gram: {gold_price ? gold_price.gold_buy : ''}
          </SillyText>
        </View>
        <View>
          <SillyButton onPress={handlePg} bg={clr1} my={20}>
            <SillyText center size={18} py={8}>
              Confirm
            </SillyText>
          </SillyButton>
          <View>
            <SillyButton
              py={5}
              my={0.01}
              onPress={() => navigation.navigate('WhereSaved')}>
              <SillyText center color={clr1}>
                Where is your money saved?
              </SillyText>
            </SillyButton>
            <SillyButton py={5} my={0.01}>
              <SillyText center color={clr1}>
                Terms & Conditions
              </SillyText>
            </SillyButton>
          </View>
        </View>
      </SillyView>
      <SillyLoad show={loading} />
    </View>
  );
};

export default SimpleSaving;
