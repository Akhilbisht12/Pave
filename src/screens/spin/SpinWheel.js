import {
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {PieChart} from 'react-native-chart-kit';
import {SillyButton, SillyText} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import {clr1, clr2} from '../../config/globals';
import {Svg, Circle, Text, G} from 'react-native-svg';
const SpinWheel = () => {
  const data = [
    {
      name: 'Seoul',
      area: 100,
      color: 'blue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      area: 100,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      area: 100,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      area: 100,
      color: 'maroon',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      area: 100,
      color: 'lightblue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscowa',
      area: 100,
      color: 'orange',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const {width, height} = Dimensions.get('window');
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const startSpin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const cf = width * 0.4 * 3.14;
  const sw = cf / data.length;
  const theta = ((sw / (width * 0.2)) * 180) / 3.14;
  return (
    <View style={[silly.pr, {height: width * 0.8, width: width * 0.8}]}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        {/* <PieChart
          data={data}
          width={width * 0.9}
          height={width * 0.9}
          chartConfig={chartConfig}
          accessor={'area'}
          backgroundColor={'transparent'}
          paddingLeft={'0'}
          center={[width * 0.225, 0]}
          hasLegend={false}
          absolute
        /> */}
        <Svg height={width * 0.8} width={width * 0.8}>
          <Circle
            r={width * 0.4}
            fill="white"
            cx={width * 0.4}
            cy={width * 0.4}
          />
          {data.map((item, index) => {
            return (
              <G>
                <Circle
                  key={item.name}
                  r={width * 0.2}
                  stroke={item.color}
                  strokeWidth={width * 0.4}
                  strokeDasharray={`${sw} ${cf}`}
                  cx={width * 0.4}
                  cy={width * 0.4}
                  transform={`rotate(${-90 + index * theta},${width * 0.4},${
                    width * 0.4
                  })`}
                />
                <Text
                  fontSize={40}
                  x={width * 0.6}
                  stroke="black"
                  strokeWidth={2}
                  y={width * 0.4}>
                  {item.name}
                </Text>
              </G>
            );
          })}
          {/* <Circle
            r={width * 0.2}
            stroke={'blue'}
            strokeWidth={width * 0.4}
            strokeDasharray={`${sw} ${cf}`}
            cx={width * 0.4}
            cy={width * 0.4}
            transform={`rotate(-90) translate(${width * 0.8 * -1})`}
          />
          <Circle
            r={width * 0.2}
            stroke={'red'}
            strokeWidth={width * 0.4}
            strokeDasharray={`${sw} ${cf}`}
            cx={width * 0.4}
            cy={width * 0.4}
            transform={`rotate(${-180},${width * 0.4},${width * 0.4})`}
          /> */}
        </Svg>
      </Animated.View>

      <TouchableOpacity
        onPress={startSpin}
        style={[
          silly.pa,
          {
            top: width * 0.4 - 25,
            left: width * 0.4 - 25,
            height: 50,
            width: 50,
            backgroundColor: 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <SillyText color={clr1}>Spin</SillyText>
      </TouchableOpacity>
    </View>
  );
};

export default SpinWheel;
