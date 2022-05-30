import {View, FlatList} from 'react-native';
import React from 'react';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
const data = [
  {
    key: 0,
    icon: 'arrow-up-outline',
    title: "You're saving more",
    desc: 'You are saving 30% more than last week! Keep it up!',
    color: '#4E944F',
  },
  {
    key: 1,
    icon: 'arrow-down-outline',
    title: "You're earning less",
    desc: 'You are saving 30% more than last week! Keep it up!',
    color: '#B20600',
  },
  {
    key: 2,
    icon: 'remove-outline',
    title: "You're saving more",
    desc: 'You are saving 30% more than last week! Keep it up!',
    color: '#4B7BE5',
  },
];
const Trends = () => {
  const renderTrends = ({item}) => {
    return (
      <SillyView
        mx={0.01}
        py={10}
        px={10}
        bg={`${item.color}66`}
        style={[silly.aic, silly.w60p, silly.mr1, silly.fr]}>
        <Icon name={item.icon} size={22} color={item.color} />
        <SillyText mx={5} style={[silly.w45p]} color={item.color}>
          {item.desc}
        </SillyText>
      </SillyView>
    );
  };
  return (
    <View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderTrends}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Trends;
