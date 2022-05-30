import {
  View,
  StatusBar,
  Animated,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import {clr1, clr4, clr5} from '../../config/globals';
import img1 from '../../assets/images/ob1.png';
import img2 from '../../assets/images/ob2.png';
import img3 from '../../assets/images/ob3.png';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimControl from '../../utils/AnimControl';
const {height} = Dimensions.get('window');
const PointsGuide = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const points = [
    {
      name: 'Profile',
      icon: 'person-outline',
      data: [
        {
          name: 'Create profile',
          points: '100',
        },
      ],
    },
    {
      name: 'Friends',
      icon: 'person-outline',
      data: [
        {
          name: 'Add 1 friend',
          points: '100',
        },
        {
          name: 'Add 3 friend',
          points: '200',
        },
        {
          name: 'Import Contacts',
          points: '1100',
        },
        ,
        {
          name: 'Add 10 friends',
          points: '1000',
        },
      ],
    },
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
    {
      name: 'Learning',
      icon: 'person-outline',
      data: [
        {
          name: 'Completed module',
          points: '40',
        },
        {
          name: 'Completed quiz',
          points: '60',
        },
      ],
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Save frequently',
      desc: 'Your saving fund is your most valuable asset, and you have complete control over it! Save with consistency to earn badge and points',
      image: img1,
    },
    {
      id: 2,
      name: 'Save frequently',
      desc: 'Your saving fund is your most valuable asset, and you have complete control over it! Save with consistency to earn badge and points',
      image: img2,
    },
    {
      id: 3,
      name: 'Save frequently',
      desc: 'Your saving fund is your most valuable asset, and you have complete control over it! Save with consistency to earn badge and points',
      image: img3,
    },
  ];
  const pan = useRef(new Animated.Value(80)).current;
  const flatlistProgress = useRef(new Animated.Value(0)).current;
  const flatRef = useRef().current;
  const flatlistChangedItems = useCallback(
    ({viewableItems}) => {
      flatlistProgress.setValue(viewableItems[0].key);
    },
    [flatlistProgress],
  );

  const progressInterpolation = flatlistProgress.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 100],
  });
  const renderWidget = ({item}) => {
    return (
      <SillyView
        px={15}
        py={15}
        mx={5}
        style={[silly.w80p, silly.h40p, silly.jcbtw]}
        bg={clr1}>
        <Image
          source={item.image}
          style={[silly.w40p, silly.h25p, {resizeMode: 'contain'}]}
        />
        <SillyText size={30} family="SemiBold">
          {item.name}
        </SillyText>
        <SillyText my={10}>{item.desc}</SillyText>
      </SillyView>
    );
  };

  return (
    <SillyView px={0.1} my={0.01} round={0.01} bg="#ffc237" style={[silly.f1]}>
      <StatusBar backgroundColor="#ffc237" />
      <View style={[silly.aie, silly.px1]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons color={clr4} name="close-outline" size={35} />
        </TouchableOpacity>
      </View>
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my3, silly.px1]}>
        <View>
          <SillyText color={clr1} size={32} family="SemiBold">
            How to earn {'\n'}points?
          </SillyText>
          <SillyView my={15} py={0.1} px={0.1}>
            <Animated.View
              style={[
                silly.bg1,
                silly.pyh,
                silly.br5,
                {width: progressInterpolation},
              ]}
            />
          </SillyView>
        </View>
        <Ionicons name="ribbon" size={100} color={clr1} />
      </View>
      <FlatList
        ref={flatRef}
        data={data}
        horizontal
        renderItem={renderWidget}
        keyExtractor={item => item.id}
        onViewableItemsChanged={flatlistChangedItems}
      />
      <Animated.View
        style={[
          silly.pa,
          silly.b0,
          silly.w100p,
          silly.br10,
          silly.bg1,
          silly.p1,
          {height: pan},
          ,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            AnimControl.AnimTiming(pan, height, 500);
          }}
          style={[open ? silly.dn : {}]}>
          <SillyText size={18} center>
            Points List
          </SillyText>
          <View style={[silly.aic]}>
            <Icon size={30} name="chevron-up" />
            <Icon size={30} style={{marginTop: -20}} name="chevron-up" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[open ? {} : silly.dn]}
          onPress={() => {
            setOpen(false);
            AnimControl.AnimTiming(pan, -100, 500);
          }}>
          <View style={[silly.aic]}>
            <Icon size={30} name="chevron-down" />
            <Icon size={30} style={{marginTop: -20}} name="chevron-down" />
          </View>
        </TouchableOpacity>
        <ScrollView style={[open ? {} : silly.dn]}>
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
        </ScrollView>
      </Animated.View>
    </SillyView>
  );
};

export default PointsGuide;
