import {View, Animated, PanResponder, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import silly from '../../../Silly/styles/silly';
import quesImg from '../../../assets/images/ques.png';
import {
  SillyText,
  SillyButton,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1, clr4} from '../../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const Cards = ({ques, quesIndex, setQuesIndex}) => {
  const SingleCard = ({item, index}) => {
    const [select, setSelect] = useState(null);
    const pan = useRef(
      new Animated.ValueXY({x: quesIndex < index ? -width * 2 : 0, y: 0}),
    ).current;
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gesture) => true,
        onPanResponderMove: (evt, gesture) => {
          pan.setValue({x: gesture.dx, y: 0});
        },
        onPanResponderRelease: (evt, gesture) => {
          console.log(index, quesIndex);
          if (gesture.vx < -1) {
            pan.setValue({x: -width * 2, y: 0});
            setQuesIndex(quesIndex - 1);
          } else {
            pan.setValue({x: 0, y: 0});
          }
        },
      }),
    ).current;
    const rotate = pan.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-15deg', '0deg', '15deg'],
      extrapolate: 'clamp',
    });
    const rotateAndTranslate = {
      transform: [
        {
          rotate: rotate,
        },
        ...pan.getTranslateTransform(),
      ],
    };
    return (
      <Animated.View
        style={[rotateAndTranslate, silly.pa, {top: -index * 20}]}
        {...panResponder.panHandlers}>
        <SillyView
          p={15}
          mx={index === quesIndex ? 10 : 10 + (quesIndex - index) * 10}
          bg={
            index === quesIndex
              ? 'rgb(250,250,250)'
              : `rgba(250,250,250,${index * 0.6 + 0.2})`
          }
          style={[
            {
              width:
                index === quesIndex
                  ? 0.9 * width
                  : 0.9 * width - (quesIndex - index) * 0.05 * width,
            },
            silly.h60p,
            silly.br10,
            silly.bs,
            silly.jcaround,
          ]}>
          <SillyText my={20} color={clr1} size={40} family="SemiBold">
            {item.ques}
          </SillyText>
          <SillyButton
            onPress={() => setSelect(0)}
            round={10}
            py={1}
            px={10}
            style={[silly.fr, silly.aic]}
            bg={select === 0 ? 'rgb(0,166,67)' : 'rgba(49,34,122,0.2)'}>
            <SillyText color={clr4} family="SemiBold" my={20} size={16}>
              Option 1
            </SillyText>
          </SillyButton>
          <SillyButton
            onPress={() => setSelect(1)}
            round={10}
            py={1}
            px={10}
            style={[silly.fr, silly.aic]}
            bg={select === 1 ? 'rgb(0,166,67)' : 'rgba(49,34,122,0.2)'}>
            <SillyText color={clr4} family="SemiBold" my={20} size={16}>
              Option 2
            </SillyText>
          </SillyButton>
          <SillyButton
            onPress={() => setSelect(2)}
            round={10}
            py={1}
            px={10}
            style={[silly.fr, silly.aic]}
            bg={select === 2 ? 'rgb(0,166,67)' : 'rgba(49,34,122,0.2)'}>
            <SillyText color={clr4} family="SemiBold" my={20} size={16}>
              Option 3
            </SillyText>
          </SillyButton>
          <SillyButton
            onPress={() => setSelect(3)}
            round={10}
            py={1}
            px={10}
            style={[silly.fr, silly.aic]}
            bg={select === 3 ? 'rgb(0,166,67)' : 'rgba(49,34,122,0.2)'}>
            <SillyText color={clr4} family="SemiBold" my={20} size={16}>
              Option 4
            </SillyText>
          </SillyButton>
        </SillyView>
      </Animated.View>
    );
  };
  return (
    <View style={[silly.pr, silly.h65p, silly.mt4]}>
      {ques.reverse().map((item, i) => {
        return <SingleCard key={item.id} index={i} item={item} />;
      })}
    </View>
  );
};

export default Cards;
