import {View, Text, ToastAndroid} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SillyText,
  SillyButton,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, sec_clr_opac} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import {Circle, Svg, Text as SvgText} from 'react-native-svg';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useContext} from 'react';
import AuthContext from '../../../navigations/AuthContext';

const GoldBalance = () => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const {size, strokeWidth} = {size: 45, strokeWidth: 2};
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - 10;
  const [gold_price, set_gold_price] = useState({gold_sell: 0, id: ''});

  const [inves, setInves] = useState({});
  useEffect(() => {
    const getGoldPrice = async () => {
      try {
        const get_gold = await axios.get(
          `${server}/investment/precious-metal/rates/`,
        );
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
  return (
    <View style={[silly.fr, silly.aic, silly.jceven]}>
      <SillyView
        bg={clr2}
        elev={2}
        style={[silly.w45p, silly.h20p, silly.jceven]}>
        <SillyText my={6} family="SemiBold" size={22} color={clr1}>
          Savings
        </SillyText>
        <SillyText family="SemiBold" size={30} color={'orange'}>
          {inves.net} gms
        </SillyText>
        <SillyText color={'orange'}>
          Invested in 24K | 99.95 % Pure Gold
        </SillyText>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText my={6} size={22} color={'green'}>
            ≈ ₹ {parseFloat(inves.net * gold_price.gold_sell).toFixed(2)}
          </SillyText>
          <SillyButton my={0.01} bg={clr1} px={4} py={4}>
            <Icon name="add-outline" color={clr2} size={25} />
          </SillyButton>
        </View>
      </SillyView>
      <SillyView
        bg={clr2}
        elev={2}
        style={[silly.w45p, silly.h20p, silly.jceven]}>
        <SillyText my={6} family="SemiBold" size={22} color={clr1}>
          Goals
        </SillyText>
        <View style={[silly.fr, silly.aic, silly.jcbtw]}>
          <View>
            <SillyText family="SemiBold" size={22} color={'orange'}>
              Travel Goal
            </SillyText>
            <SillyText color={'green'}>3 Month Goal</SillyText>
          </View>

          <View>
            <Svg width={size} height={size}>
              {/* Background Circle */}
              <Circle
                stroke={clr1}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                {...{strokeWidth}}
              />

              {/* Progress Circle */}
              <Circle
                stroke={clr2}
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
                fontSize={16}
                x={size / 2}
                y={size / 2 + 5}
                textAnchor="middle"
                fill={clr1}>
                {'90%'}
              </SvgText>
            </Svg>
          </View>
        </View>

        <View style={[silly.aic, silly.fr]}>
          <Icon name={'arrow-up-outline'} size={18} color={'#B20600'} />
          <SillyText color={'#B20600'}>Investing lower than usual</SillyText>
        </View>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText my={6} size={22} color={'green'}>
            ₹ 7895 saved
          </SillyText>
          <SillyButton my={0.01} bg={clr1} px={4} py={4}>
            <Icon name="add-outline" color={clr2} size={25} />
          </SillyButton>
        </View>
      </SillyView>
    </View>
  );
};

export default GoldBalance;
