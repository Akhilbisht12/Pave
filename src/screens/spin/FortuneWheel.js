import {View, Dimensions, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import * as d3Shape from 'd3-shape';
import {Svg, G, Path, Text, TSpan} from 'react-native-svg';
import {snap} from '@popmotion/popcorn';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import {clr1} from '../../config/globals';
import Sound from 'react-native-sound';
const {width} = Dimensions.get('window');
const wheelSize = width * 1.8;
Sound.setCategory('Playback');
const FortuneWheel = ({spinType, fortunes}) => {
  // sound logic
  const whoosh = new Sound('spin.wav', Sound.MAIN_BUNDLE);
  const winnerSound = new Sound('winner.wav', Sound.MAIN_BUNDLE);
  const angleBySegment = 360 / fortunes.length;
  const angleOffSet = angleBySegment / 2;
  const rotate = useRef(new Animated.Value(-angleOffSet)).current;
  useEffect(() => {
    console.log('rotate' + rotate._value);
  }, [rotate]);
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
        color: spinType
          ? index % 2 === 0
            ? clr1
            : '#5b5f97'
          : fortunes[index].color,
        value: fortunes[index].prize,
        centroid: instance.centroid(arc),
      };
    });
  };
  const getWinner = () => {
    const deg = Math.abs(Math.round(rotate._value % 360));
    const winner = Math.floor((360 - deg) / angleBySegment);
    console.log(makeWheel()[winner === fortunes.length ? 0 : winner].value);
    return winner;
  };
  const spinWheel = () => {
    whoosh.play(success => {
      if (success) {
        console.log('successfully played');
      } else {
        console.log('failed to play');
      }
    });
    Animated.decay(rotate, {
      velocity: 1,
      deceleration: 0.999,
      useNativeDriver: false,
    }).start(() => {
      whoosh.stop();
      winnerSound.play();
      console.log(rotate._value);
      rotate.setValue(rotate._value % 360);
      const snapTo = snap(angleBySegment);
      Animated.timing(rotate, {
        toValue: snapTo(rotate._value),
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        winnerSound.stop();
        getWinner();
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
                  inputRange: [-360, 0, 360],
                  outputRange: ['-360deg', '0deg', '360deg'],
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
                      {fortunes[i].prize === '0' ? (
                        <Text
                          fontFamily="Outfit-SemiBold"
                          x={x}
                          y={y - 10}
                          fill={i % 2 === 0 ? 'white' : clr1}
                          textAnchor="middle"
                          fontSize={26}>
                          <TSpan x={x} y={y - 20}>
                            Better luck
                          </TSpan>
                          <TSpan x={x} y={y + 10}>
                            next time
                          </TSpan>
                        </Text>
                      ) : (
                        <Text
                          fontFamily="Outfit-SemiBold"
                          x={x}
                          y={y - 10}
                          fill={i % 2 === 0 ? 'white' : 'white'}
                          textAnchor="middle"
                          fontSize={26}>
                          {'₹ ' + fortunes[i].prize.toString()}
                        </Text>
                      )}
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
