import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clr1, clr2, clr4} from '../../config/globals';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import image from '../../assets/images/ob1.png';
import img1 from '../../assets/images/learn.png';
import img2 from '../../assets/images/learn_2.png';
import axios from 'axios';
import {server} from '../../config/server_url';

const {width, height} = Dimensions.get('window');
const Activity = () => {
  const navigation = useNavigation();
  const [modules, setModules] = useState([]);
  useEffect(() => {
    const getModules = async () => {
      try {
        const modulesres = await axios.get(`${server}/learning/modules/`);
        setModules(modulesres.data.results);
        console.log(modulesres.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getModules();
  }, []);
  const data = [
    {
      name: 'Financial planning For the first timers',
      time: '5',
      point: 10,
      img: img1,
      text: 'Lucas completed a learning module',
      status: 'On Going',
      color: 'orange',
    },
    {
      name: 'Basics of stock market',
      time: '12',
      point: 5,
      img: img2,
      text: 'Jhon enrolled himself in a new course',
      status: 'Completed',
      color: 'green',
    },
    {
      name: 'Short Terms Goals',
      time: '3',
      point: 20,
      img: img1,
      text: 'May min completed a short term goal',
      status: 'On Going',
      color: 'orange',
    },
  ];

  const renderGoalCard = ({item}) => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return (
      <SillyView
        elev={4}
        px={15}
        py={15}
        round={20}
        bg={clr2}
        style={[silly.h35p, silly.w60p, silly.jcbtw, silly.f1, silly.mr1]}>
        <View style={[silly.aic]}>
          <Image
            source={img1}
            style={[silly.h15p, silly.w50p, {resizeMode: 'contain'}]}
          />
        </View>
        {/* <View style={[silly.ais]}>
          <SillyView
            style={[silly.bw1, {borderColor: item.color}]}
            bg="transparent">
            <SillyText color={item.color}>{item.status}</SillyText>
          </SillyView>
        </View> */}

        <SillyText family="SemiBold" color={clr4} size={20}>
          {item.name}
        </SillyText>
        <ScrollView nestedScrollEnabled contentContainerStyle={[silly.hmax10p]}>
          <SillyText color={clr4} size={16}>
            {item.description}
          </SillyText>
        </ScrollView>

        {/* <View style={[silly.fr, silly.w50p]}>
          <View center style={[silly.fr, silly.jcs, silly.mr1]}>
            <Ionicons color={clr4} name="time-outline" size={18} />
            <SillyText size={18} color={clr4}>
              {' '}
              {item.time} Minutes{' '}
            </SillyText>
          </View>
          <View center style={[silly.fr, silly.jcs]}>
            <Ionicons color={'orange'} name="star" size={18} />
            <SillyText size={18} color={'orange'}>
              {' '}
              {item.point} Points
            </SillyText>
          </View>
        </View> */}
        <SillyButton
          onPress={() => navigation.navigate('Learn', {id: item.id})}
          style={[silly.bw1, silly.bc1]}
          round={25}>
          <SillyText size={17} center color={clr1}>
            Continue
          </SillyText>
        </SillyButton>
      </SillyView>
    );
  };

  return (
    <View style={[silly.pl2]}>
      <View style={[silly.fr, silly.jcbtw, silly.aic]}>
        <View>
          <SillyText my={6} family="SemiBold" color={clr4} size={22}>
            Learning Activity
          </SillyText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Learning')}>
          <SillyText family="SemiBold" size={18} color={clr1} mx={15}>
            SEE ALL
          </SillyText>
        </TouchableOpacity>
      </View>

      <FlatList
        style={silly.my2}
        data={modules}
        renderItem={item => renderGoalCard(item)}
        keyExtractor={item => item.name}
        horizontal
      />
    </View>
  );
};

export default Activity;
