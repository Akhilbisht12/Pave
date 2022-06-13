import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Image,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
  SillyAccordian,
  SillyRadio,
} from '../../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr4, clr5} from '../../../config/globals';
import art from '../../../assets/stories/stories-1.png';
import axios from 'axios';
import {server} from '../../../config/server_url';
import AuthContext from '../../../navigations/AuthContext';
const {width, height} = Dimensions.get('window');

const Withdraw = ({withdraw, setWithdraw}) => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const [gold_price, set_gold_price] = useState({gold_sell: 0, id: ''});
  const [withd, setWithd] = useState({
    amount: 0,
    bank: 0,
  });
  const [banks, setBanks] = useState([]);
  const [sell, setSell] = useState({qty: 0, amount: 0});
  const [inves, setInves] = useState({});
  useEffect(() => {
    const getGoldPrice = async () => {
      try {
        const get_gold = await axios.get(
          `${server}/investment/precious-metal/rates/`,
        );
        const details = await axios.get(`${server}/profile/${user_id}/banks/`);
        console.log(details.data.results);
        setBanks(details.data.results);
        const totalInvestres = await axios.get(
          `${server}/investment/precious-metal/${user_id}/investment-overview/`,
        );
        setInves(totalInvestres.data);
        set_gold_price(get_gold.data);
      } catch (error) {
        console.log(error.response.data);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    getGoldPrice();
  }, [user_id]);

  const handleSell = async () => {
    try {
      if (
        withd.amount >
        Math.round(inves.net * gold_price.gold_sell || width.amount === 0)
      ) {
        ToastAndroid.show('Invalid Amount', ToastAndroid.SHORT);
        return;
      }
      console.info(
        gold_price.id,
        banks[withd.bank].id,
        parseFloat(withd.amount / gold_price.gold_sell).toFixed(5),
      );
      const sellres = await axios.post(
        `${server}/investment/precious-metal/sell/`,

        {
          rate_id: gold_price.id,
          bank_id: banks[withd.bank].id,
          quantity: parseFloat(withd.amount / gold_price.gold_sell).toFixed(4),
        },
      );
      console.log(sellres.data);
      setSell({
        qty: sellres.data.quantity,
        amount: sellres.data.transaction_details.amount,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };
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
          {sell.qty} gms of gold has been sold
        </SillyText>
        <SillyText center size={18} px={20} color={clr5}>
          The amount of Rs. {sell.amount} should receive in your bank account in
          2-3 working days
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
          {/* header */}
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
          {/* body */}
          <View style={[silly.p1]}>
            <SillyText color={clr5} size={20}>
              You Own
            </SillyText>
            <SillyText my={5} color={clr1} size={25}>
              {inves.net} gms
            </SillyText>
            <SillyText color="green" size={18}>
              equivalent to {Math.round(inves.net * gold_price.gold_sell)} INR
            </SillyText>
            <View style={[silly.my2]}>
              <SillyText color={clr5} size={18}>
                Enter amount to withdraw
              </SillyText>
              <SillyInput
                value={withd.amount.toString()}
                onChangeText={amount => setWithd({...withd, amount})}
                placeholderTextColor={clr5}
                keyboardType="number-pad"
                placeholder="Amount to withdraw"
                round={5}
                bg="transparent"
              />
              <View>
                <SillyText size={20} color={clr5} my={10}>
                  Select Back Account To Withdraw Money
                </SillyText>
              </View>
              {banks
                ? banks.map((item, i) => {
                    return (
                      <SillyButton
                        onPress={() => setWithd({...withd, bank: i})}
                        style={[silly.fr, silly.aic]}
                        bg={withd.bank === i ? clr1 : `${clr1}33`}
                        key={i}>
                        <Icon
                          color={withd.bank === i ? clr2 : clr1}
                          size={25}
                          name="card"
                        />
                        <View style={[silly.ml1]}>
                          <SillyText
                            size={20}
                            color={withd.bank === i ? clr2 : clr1}>
                            {item.bank_name}
                          </SillyText>
                          <SillyText style={[withd.bank === i ? {} : silly.dn]}>
                            selected
                          </SillyText>
                        </View>
                      </SillyButton>
                    );
                  })
                : null}
              <SillyButton my={10} onPress={handleSell} mx={0.01} bg={clr1}>
                <SillyText my={5} center size={18}>
                  Continue
                </SillyText>
              </SillyButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Withdraw;
