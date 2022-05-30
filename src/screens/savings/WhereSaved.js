import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr2, clr4, clr1} from '../../config/globals';

const WhereSaved = ({navigation}) => {
  const slider = [
    {
      id: 0,
      icon: 'trending-up-outline',
      desc: '2X returns than your savings account',
    },
    {
      id: 1,
      icon: 'cash-outline',
      desc: '2X returns than your savings account',
    },
    {
      id: 2,
      icon: 'cash-outline',
      desc: '2X returns than your savings account',
    },
  ];

  const renderSlider = ({item}) => {
    return (
      <SillyView
        bg={clr1}
        py={20}
        mx={10}
        style={[silly.h20p, silly.w40p, silly.jceven]}>
        <Icon size={40} name={item.icon} />
        <SillyText size={20}>{item.desc}</SillyText>
      </SillyView>
    );
  };
  return (
    <ScrollView contentContainerStyle={[silly.bg1]}>
      <View style={[silly.f1]}>
        <View style={[silly.p1, silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText size={25}>Where is you money saved?</SillyText>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close-outline" size={35} />
          </TouchableOpacity>
        </View>
        <SillyView px={0.01} mx={0.01} bg={clr2} style={[silly.f1]}>
          <View style={[silly.p1]}>
            <View style={[silly.mt2, silly.fr, silly.jcs, silly.aic]}>
              <Image
                source={{
                  uri: 'https://www.icicipruamc.com/assets/images/logo.png',
                }}
                style={[silly.w20p, silly.h5p]}
              />
              <SillyText color={clr4} family="SemiBold" size={24} mx={10}>
                ICICI Prudential Liquid Fund
              </SillyText>
            </View>
            <SillyView my={20} py={0.4} />
            <SillyText size={18} color={clr4}>
              This scheme aims to provide reasonable returns commensurate with
              low risk and providing a high level liquidity, through investments
              made primarily in money market and debt intruments. However, there
              can be no assurance or guarantee that the investment objective of
              the Scheme would be achieved
            </SillyText>
            <SillyView py={0.4} my={15} />
            <View>
              <SillyText size={20} family="SemiBold" my={10} color={clr4}>
                Key Stats
              </SillyText>
              <View style={[silly.fr, silly.jcbtw, silly.aic]}>
                <SillyView
                  style={[silly.h15p, silly.jceven, silly.w45p]}
                  bg={`${clr1}40`}>
                  <SillyText color={clr1}>CAGR</SillyText>
                  <SillyText family="SemiBold" size={50} color={clr1}>
                    7.25%
                  </SillyText>
                </SillyView>
                <SillyView
                  style={[silly.h15p, silly.jceven, silly.w45p]}
                  bg={`${clr1}40`}>
                  <SillyText color={clr1}>AUM</SillyText>
                  <SillyText family="SemiBold" size={30} color={clr1}>
                    32833.72CR
                  </SillyText>
                </SillyView>
              </View>
              <View style={[silly.fr, silly.jcbtw, silly.aic]}>
                <SillyView
                  style={[silly.h15p, silly.jceven, silly.w45p]}
                  bg={`${clr1}40`}>
                  <SillyText color={clr1}>NAV</SillyText>
                  <SillyText family="SemiBold" size={40} color={clr1}>
                    ₹311.47
                  </SillyText>
                </SillyView>
                <SillyView
                  style={[silly.h15p, silly.jceven, silly.w45p]}
                  bg={`${clr1}40`}>
                  <SillyText color={clr1}>AGE</SillyText>
                  <SillyText family="SemiBold" size={40} color={clr1}>
                    16y 2m
                  </SillyText>
                </SillyView>
              </View>
            </View>
            <SillyText my={15} color={clr4} family="SemiBold" size={20}>
              Highlights
            </SillyText>
          </View>

          <FlatList
            data={slider}
            horizontal
            renderItem={renderSlider}
            keyExtractor={item => item.id}
          />
          <View>
            <SillyButton mx={10} bg={clr1}>
              <SillyText py={10} family="SemiBold" size={20} center>
                View fund details
              </SillyText>
            </SillyButton>
          </View>
        </SillyView>
      </View>
    </ScrollView>
  );
};

export default WhereSaved;
