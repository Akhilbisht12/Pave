import {View, ScrollView, ToastAndroid} from 'react-native';
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, sec_color} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {server} from '../../../config/server_url';
import AuthContext from '../../../navigations/AuthContext';

const SimpleSaving = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const [principal, setPrincipal] = useState(100);
  const [amount, setAmount] = useState(0);
  const [gold_price, set_gold_price] = useState(null);
  const rate = 10;
  useEffect(() => {
    setAmount(Math.round(principal * 365 * Math.pow(1 + rate * 0.01, 10)));
  }, [principal, amount]);

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
      console.log(get_gold);
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }, [state.access]);

  useEffect(() => {
    getGoldPrice();
  }, [getGoldPrice]);

  setInterval(() => {
    getGoldPrice();
  }, 180000);

  const handleBuyGold = async () => {
    try {
      const buy_gold = await axios.post(
        `${server}/investment/precious-metal/buy/`,
        {
          rate_id: gold_price.id,
          amount: principal.toString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.access,
          },
        },
      );
      console.log(buy_gold);
      ToastAndroid.show('Transaction Successful', ToastAndroid.SHORT);
      navigation.navigate('SimpleOverview');
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[silly.f1, silly.bg1]}>
      <View style={[silly.px1, silly.py2]}>
        <SillyView style={[silly.h20p, silly.jcc]} px={20}>
          <SillyText size={35} family="SemiBold">
            ₹ {amount}
          </SillyText>
          <SillyText color="#28a745" size={20} family="SemiBold" my={5}>
            +(
            {(amount - principal) * 0.01}
            )%
          </SillyText>
          <SillyText>
            savings after 10 years, if current amount invested daily
          </SillyText>
        </SillyView>
      </View>

      <SillyView
        my={0.01}
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
          <SillyButton onPress={handleBuyGold} bg={clr1} my={20}>
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
    </View>
  );
};

export default SimpleSaving;
