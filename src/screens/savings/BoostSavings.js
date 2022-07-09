import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import img from '../../assets/stories/stories-1.png';
import {
  SillyView,
  SillyText,
  SillyRadio,
  SillyButton,
} from '../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr2, clr5} from '../../config/globals';
const points = [
  {
    name: 'Investments',
    icon: 'person-outline',
    data: [
      {
        name: 'Complete KYC',
        points: '3500',
      },
      {
        name: '1st Investment',
        points: '3500',
      },
      {
        name: '10th Investment',
        points: '500',
      },
      {
        name: '50th Investment',
        points: '100',
      },
      {
        name: '100th Investment',
        points: '1000',
      },
      {
        name: 'Goal Created',
        points: '10000',
      },
      {
        name: 'Create profile',
        points: '100000',
      },
      {
        name: 'Goal achieved',
        points: '100',
      },
      {
        name: 'SIP Created',
        points: '1000',
      },
      {
        name: 'Daily streak',
        points: '1000',
      },
      {
        name: '5 Daily streak',
        points: '20',
      },
      {
        name: '10 Daily streak',
        points: '120',
      },
      {
        name: '20 Daily streak',
        points: '280',
      },
      {
        name: '40 Daily streak',
        points: '600',
      },
    ],
  },
];
const BoostSavings = ({boost, setBoost}) => {
  return (
    <View
      style={[
        silly.pa,
        silly.b0,
        silly.w100p,
        silly.bg1,
        boost ? {} : silly.dn,
      ]}>
      <TouchableOpacity
        style={[silly.aie, silly.p2]}
        onPress={() => setBoost(false)}>
        <Icon color={clr2} name="close-outline" size={35} />
      </TouchableOpacity>
      <ScrollView nestedScrollEnabled style={[silly.h80p]}>
        <View style={[silly.aic]}>
          <Image source={img} style={[silly.w60p, {resizeMode: 'contain'}]} />
          <SillyText>EARN POINTS</SillyText>
          <SillyText size={25} family="SemiBold" my={15}>
            Save Frequently
          </SillyText>
          <SillyText mx={50} center>
            Your saving fund is most valuable asset, and you have complete
            control over it! Save with consistency to earn badges and points!
          </SillyText>
          <View style={[silly.w100p, silly.my2]}>
            {points.map((item, i) => {
              return (
                <View key={i} style={[silly.p1]}>
                  <View style={[silly.fr, silly.aic]}>
                    <SillyView px={5} py={5} bg={clr5}>
                      <Icon name={item.icon} size={18} />
                    </SillyView>
                    <SillyText mx={5} family="SemiBold" size={22}>
                      {item.name}
                    </SillyText>
                  </View>
                  {item.data.map((pnt, pi) => {
                    return (
                      <View key={pi}>
                        <View
                          style={[silly.fr, silly.aic, silly.jcbtw, silly.my1]}>
                          <SillyText size={18}>{pnt.name}</SillyText>
                          <View style={[silly.fr, silly.aic]}>
                            <SillyText mx={5} family="SemiBold" size={25}>
                              {pnt.points}
                            </SillyText>
                            <Icon name="star" color="#ffc237" size={20} />
                          </View>
                        </View>
                        <SillyView py={0.4} bg={clr5} />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BoostSavings;
