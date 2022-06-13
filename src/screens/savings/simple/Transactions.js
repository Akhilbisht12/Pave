import {View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import {clr1, clr3, clr4, clr5} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useContext} from 'react';
import AuthContext from '../../../navigations/AuthContext';
import moment from 'moment';

const Transactions = ({setTrans, trans}) => {
  const [investments, setInvestments] = useState([]);
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const investmentreq = async () => {
      try {
        const investmentres = await axios.get(
          `${server}/investment/precious-metal/${user_id}/investments/?ordering=-created_at`,
        );
        setInvestments(investmentres.data.results);
      } catch (error) {
        console.log(error.response);
      }
    };
    investmentreq();
  }, [user_id]);
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
      <ScrollView style={[silly.p1, silly.my1, silly.h60p]}>
        {investments.map((item, i) => {
          return (
            <View key={i}>
              <View style={[silly.aic, silly.jcbtw, silly.fr, silly.my1]}>
                <View>
                  <SillyText family="SemiBold" size={20} color={clr4}>
                    {item.metal_type} {item.investment_type_label}
                  </SillyText>
                  <SillyText color={clr5} my={5}>
                    {moment(item.created_at).format('DD MMM YYYY')}
                  </SillyText>
                </View>

                <View style={[silly.aie]}>
                  <SillyText family="SemiBold" size={25} color={clr4}>
                    ₹ {item.transaction_details.amount}
                  </SillyText>
                  <SillyText color={clr5} my={5}>
                    INV No. {item.transaction_details.invoice_number}
                  </SillyText>
                </View>
              </View>

              <SillyView bg={clr3} py={0.5} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Transactions;
