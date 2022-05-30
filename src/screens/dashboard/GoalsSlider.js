import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SillyText from '../../Silly/components/SillyText';
import {Circle, Svg, Text as SvgText} from 'react-native-svg';
import silly from '../../Silly/styles/silly';
const {width} = Dimensions.get('window');
const GoalsSlider = () => {
  const data = [
    {
      name: 'Travel Goal 1',
      timeLeft: '10 weeks left',
      save: 4200,
      savePercent: '90%',
      icon: 'suitcase',
    },
    {
      name: 'Goal 2',
      timeLeft: '3 weeks left',
      save: 1400,
      savePercent: '90%',
      icon: 'suitcase',
    },
    {
      name: 'Goal 3',
      timeLeft: '12 weeks left',
      save: 5300,
      savePercent: '40%',
      icon: 'suitcase',
    },
  ];

  const {size, strokeWidth} = {size: 50, strokeWidth: 2};
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - 10;

  const renderGoalCard = ({item}) => {
    const text = item.savePercent;
    return (
      <View style={styles.cardMain}>
        <View style={styles.nameView}>
          <View style={[silly.fr, silly.jcs]} center>
            <View style={styles.iconView}>
              <Ionicons
                name="briefcase-outline"
                size={20}
                color="rgb(49,34,122)"
              />
            </View>
            <View>
              <SillyText style={styles.title}>{item.name}</SillyText>
              <SillyText style={styles.title}>{item.timeLeft}</SillyText>
            </View>
          </View>
        </View>
        <View style={styles.SavingView}>
          <View style={[silly.fr, silly.jcbtw]}>
            <View style={[silly.jcc]}>
              <SillyText color="white">₹ {item.save}</SillyText>
              <SillyText color="gray">saved</SillyText>
            </View>
            <View>
              <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                  stroke={'#f2f2f2'}
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  {...{strokeWidth}}
                />

                {/* Progress Circle */}
                <Circle
                  stroke={'#3b5998'}
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
                  fill={'white'}>
                  {text}
                </SvgText>
              </Svg>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <SillyText style={styles.title} size={25}>
        Goals
      </SillyText>
      <FlatList
        data={data}
        renderItem={item => renderGoalCard(item)}
        keyExtractor={item => item.name}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingLeft: 20,
    marginVertical: 15,
  },
  cardMain: {
    width: 0.55 * width,
    marginRight: 20,
  },
  nameView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    marginVertical: 5,
  },
  SavingView: {
    backgroundColor: 'rgb(49,34,122)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconView: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default GoalsSlider;
