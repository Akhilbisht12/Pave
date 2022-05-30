import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyButton,
  SillyView,
} from '../../Silly/components/silly_comps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupUsers from '../../components/GroupUsers';
import {clr1, clr2, clr5, sec_color} from '../../config/globals';
import {useNavigation} from '@react-navigation/native';
const data = [
  {
    id: '0',
    title: 'Mutual Funds 101',
    desc: "Created by our in house financial experts, this is a quick begginer's guide to mutual funds to help you get started on the right financial track.",
    points: '10',
    time: '5 Min',
    status: 'Complete',
  },
  {
    id: '1',
    title: 'Goal based vs Simple Savers',
    desc: "Created by our in house financial experts, this is a quick begginer's guide to mutual funds to help you get started on the right financial track.",
    points: '10',
    time: '5 Min',
    status: 'Complete',
  },
  {
    id: '2',
    title: 'Financial Planning for the first timers',
    desc: "Created by our in house financial experts, this is a quick begginer's guide to mutual funds to help you get started on the right financial track.",
    points: '10',
    time: '5 Min',
    status: 'Ongoing',
  },
  {
    id: '3',
    title: 'Your first saving fund',
    desc: "Created by our in house financial experts, this is a quick begginer's guide to mutual funds to help you get started on the right financial track.",
    points: '10',
    time: '5 Min',
    status: 'Quiz Pending',
  },
];
const Learning = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState(0);
  const [filtereddata, setfilteredData] = useState(data);
  const handleFilterData = i => {
    setFilter(i);
    switch (i) {
      case 2:
        setfilteredData(data.filter(item => item.status.includes('Ongoing')));
        break;
      case 0:
        setfilteredData(data);
        break;
      case 1:
        setfilteredData(data.filter(item => item.status.includes('Complete')));
        break;
    }
  };

  const renderComp = ({item}) => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    const getButtonColor = () => {
      switch (item.status) {
        case 'Complete':
          return '7ab97a';
        case 'Quiz Pending':
          return '31227a';
        case 'Ongoing':
          return 'E2703A';
      }
    };
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
        <View style={[silly.m1]}>
          <View
            style={[
              silly.py2,
              silly.px1,
              silly.brt10,
              {backgroundColor: `#${randomColor}`},
            ]}>
            <SillyText family="SemiBold">{item.title}</SillyText>
          </View>
          <View style={[silly.bg2, silly.pt2, silly.px1, silly.brb10]}>
            <View>
              <SillyText size={12} color="gray">
                {item.desc}
              </SillyText>
            </View>
            <View
              style={[
                silly.jcbtw,
                silly.aic,
                silly.fr,
                silly.pyh,
                silly.mt2,
                silly.bt1,
                silly.bc3,
              ]}>
              <GroupUsers />
              <View style={[silly.fr, silly.aic]}>
                <View style={[silly.fr, silly.aic, silly.mx1]}>
                  <Ionicons color={clr1} size={18} name="timer-outline" />
                  <SillyText mx={5} color={clr1}>
                    {item.time}
                  </SillyText>
                </View>
                <View style={[silly.fr, silly.aic, silly.mx1]}>
                  <Ionicons color={clr1} size={18} name="star-outline" />
                  <SillyText mx={5} color={clr1}>
                    {item.points} points
                  </SillyText>
                </View>
              </View>
              <SillyButton bg={`#${getButtonColor()}33`}>
                <SillyText family="SemiBold" color={`#${getButtonColor()}`}>
                  {item.status}
                </SillyText>
              </SillyButton>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[silly.f1]}>
      <View style={[silly.h30p, silly.bg1, silly.jceven]}>
        <View style={[silly.px2]}>
          <SillyText
            style={[silly.px2]}
            color="white"
            size={35}
            family="Medium">
            Learning
          </SillyText>
        </View>

        {/* <View style={[silly.fr, silly.px2, silly.jcbtw]}>
          {[
            {name: '12 Modules Completed', color: '#ffc145'},
            {color: '#ff6b6c', name: '24 Ongoing'},
            {color: '5b5f97', name: '500 points earned'},
          ].map((item, i) => {
            return (
              <View
                key={i}
                style={[
                  silly.px1,
                  silly.py2,
                  silly.w30p,
                  silly.br5,
                  {backgroundColor: `${item.color}80`},
                ]}>
                <Ionicons
                  name="checkmark-circle"
                  color={item.color}
                  size={16}
                />
                <SillyText my={5} size={16}>
                  {item.name}
                </SillyText>
              </View>
            );
          })}
        </View> */}
        <SillyView
          bg={sec_color}
          py={15}
          px={30}
          mx={15}
          style={[silly.fr, silly.jcbtw, silly.aic]}>
          {[
            {name: '12 Modules Completed', color: '#ffc145'},
            {color: '#ff6b6c', name: '24 Ongoing'},
            {color: '5b5f97', name: '500 points earned'},
          ].map((item, i) => {
            return (
              <View key={i} style={[silly.aic]}>
                <Ionicons name="checkmark-circle" size={25} />
                <SillyText
                  my={5}
                  center
                  style={[silly.w20p]}
                  size={18}
                  family="SemiBold">
                  {item.name}
                </SillyText>
              </View>
            );
          })}
        </SillyView>
        <SillyView
          mx={5}
          px={2}
          py={2}
          bg={`${sec_color}`}
          round={10}
          style={[silly.fr, silly.aic, silly.jcbtw]}>
          {[
            {name: 'All', key: '', icon: 'bookmarks-outline'},
            // {name: 'Active', key: 'active', icon: 'bookmark-outline'},
            {
              name: 'Completed',
              key: 'complete',
              icon: 'checkmark-done-outline',
            },
          ].map((item, i) => {
            return (
              <SillyButton
                onPress={() => handleFilterData(i)}
                mx={0.01}
                my={0.01}
                round={10}
                bg={filter === i ? clr2 : 'transparent'}
                style={[silly.fr, silly.aic, silly.jcc, silly.w45p]}
                key={i}>
                <Ionicons
                  style={[silly.mr1]}
                  size={18}
                  name={item.icon}
                  color={filter === i ? clr1 : clr2}
                />
                <SillyText color={filter === i ? clr1 : clr2} size={16}>
                  {item.name}
                </SillyText>
              </SillyButton>
            );
          })}
        </SillyView>
      </View>
      <View style={[silly.f1]}>
        <FlatList
          scroll
          data={filtereddata.reverse()}
          keyExtractor={item => item.id}
          renderItem={item => renderComp(item)}
        />
      </View>
    </View>
  );
};
export default Learning;
