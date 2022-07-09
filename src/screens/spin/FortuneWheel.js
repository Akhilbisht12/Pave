import {
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import * as d3Shape from 'd3-shape';
import {Svg, G, Path, Text, TSpan} from 'react-native-svg';
import {snap} from '@popmotion/popcorn';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import {clr1} from '../../config/globals';
import Sound from 'react-native-sound';
import {server} from '../../config/server_url';
import axios from 'axios';
import SillyModal from '../../Silly/components/SillyModal';
const {width} = Dimensions.get('window');
const wheelSize = width * 1.8;
Sound.setCategory('Playback');

const FortuneWheel = ({spinType, fortunes, handleOpenModel}) => {
  const [winner, setWinner] = useState();
  // sound logic
  const whoosh = new Sound('spin.wav', Sound.MAIN_BUNDLE);
  const winnerSound = new Sound('winner.wav', Sound.MAIN_BUNDLE);
  const fail = new Sound('fail.wav', Sound.MAIN_BUNDLE);
  const angleBySegment = 360 / fortunes.length;
  const angleOffSet = angleBySegment / 2;
  const rotate = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   console.log('rotate' + rotate._value);
  // }, [rotate]);

  const makeWheel = () => {
    const data = Array.from({length: fortunes.length}).fill(1);
    const arcs = d3Shape.pie()(data);

    return arcs.map((arc, index) => {
      const instance = d3Shape
        .arc()
        .padAngle(0.01)
        .outerRadius(width / 2)
        .innerRadius(20);
      return {
        path: instance(arc),
        color: index % 2 === 0 ? clr1 : '#5b5f97',
        value: fortunes[index].name,
        centroid: instance.centroid(arc),
      };
    });
  };
  const getWinner = async () => {
    try {
      const winnerres = await axios.post(`${server}/earning/spin-wheel/`);
      const winner_index = fortunes.findIndex(
        item => item.name === winnerres.data.name,
      );
      setWinner(winnerres.data);

      console.log(winnerres.data.name, fortunes[winner_index]);
      return {index: winner_index, name: winnerres.data.name};
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show('Failed to spin. Please try again', ToastAndroid.SHORT);
      return null;
    }
  };
  const spinWheel = async () => {
    rotate.setValue(0);
    await getWinner().then(res => {
      console.log(typeof res + 'winner');
      whoosh.play(success => {
        if (success) {
          console.log('successfully played');
        } else {
          console.log('failed to play sound');
        }
      });
      Animated.timing(rotate, {
        toValue: 9 - res.index,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        whoosh.stop();
        if (res.index === 0) {
          fail.play();
        } else {
          winnerSound.play();
        }
        handleOpenModel(res.index === 0 ? 0 : res.name);
        // const snapTo = snap(angleBySegment);
        // Animated.timing(rotate, {
        //   toValue: snapTo(rotate._value),
        //   duration: 300,
        //   useNativeDriver: false,
        // }).start(() => {
        //   winnerSound.stop();
        // });
      });
    });
  };

  return (
    <View style={[silly.aic, {position: 'absolute', bottom: -width + 30}]}>
      <Ionicons
        name="caret-down-outline"
        size={120}
        color="orange"
        style={{position: 'absolute', top: -60, zIndex: 1}}
      />
      <View style={[silly.aic]}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotate.interpolate({
                  inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                  outputRange: [
                    '0deg',
                    '720deg',
                    '765deg',
                    '810deg',
                    '855deg',
                    '900deg',
                    '945deg',
                    '990deg',
                    '1035deg',
                  ],
                }),
              },
            ],
          }}>
          <Svg
            style={{transform: [{rotate: `-${angleOffSet}deg`}]}}
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}>
            <G y={width / 2} x={width / 2}>
              {makeWheel().map((arc, i) => {
                const [x, y] = arc.centroid;
                return (
                  <G key={`arc-${i}`}>
                    <Path
                      stroke="white"
                      strokeWidth={5}
                      d={arc.path}
                      fill={arc.color}
                    />
                    <G
                      originX={x}
                      originY={y}
                      rotation={angleOffSet + (i * 360) / fortunes.length}>
                      {fortunes[i].name.split(' ').map((word, i) => {
                        return (
                          <Text
                            key={i}
                            fontFamily="Outfit-SemiBold"
                            x={x}
                            y={y - 60 + i * 20}
                            fill={i % 2 === 0 ? 'white' : 'white'}
                            textAnchor="middle"
                            fontSize={14}>
                            {word}
                          </Text>
                        );
                      })}
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
        <TouchableOpacity
          onPress={spinWheel}
          style={{
            position: 'absolute',
            top: (wheelSize * 3) / 8 - 7,
            left: (wheelSize * 3) / 8,
          }}>
          <SillyView
            bg="white"
            round={width / 2}
            style={[
              silly.aic,
              silly.pt3,
              {
                width: wheelSize / 4,
                height: wheelSize / 4,
                borderWidth: 15,
                borderColor: 'orange',
              },
            ]}>
            <SillyText family="SemiBold" size={40} center color={clr1}>
              Tap
            </SillyText>
            <SillyText center color="black">
              for 500 tokens
            </SillyText>
          </SillyView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FortuneWheel;
