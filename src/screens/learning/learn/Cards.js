import {View, Animated, PanResponder, Dimensions, Image} from 'react-native';
import React, {useRef} from 'react';
import silly from '../../../Silly/styles/silly';
import quesImg from '../../../assets/images/ques.png';
import {SillyText, SillyButton} from '../../../Silly/components/silly_comps';
import {clr1, clr4} from '../../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const Cards = ({ques, quesIndex, setQuesIndex}) => {
  const SingleCard = ({item, index}) => {
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
          if (gesture.vx < -0.2 && ques[quesIndex - 1]) {
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
        <View
          style={[
            {
              backgroundColor:
                index === quesIndex
                  ? 'rgb(250,250,250)'
                  : `rgba(250,250,250,${index * 0.6 + 0.2})`,
            },
            {
              width:
                index === quesIndex
                  ? 0.9 * width
                  : 0.9 * width - (quesIndex - index) * 0.05 * width,
            },
            {
              marginHorizontal:
                index === quesIndex ? 10 : 10 + (quesIndex - index) * 10,
            },
            silly.h60p,
            silly.br10,
            silly.bs,
            silly.jcbtw,
          ]}>
          <Image
            style={[
              {
                width:
                  index === quesIndex
                    ? 0.9 * width
                    : 0.9 * width - (quesIndex - index) * 0.05 * width,
              },
              silly.h15p,
              silly.br10,
              {resizeMode: 'cover'},
            ]}
            source={quesImg}
          />
          <View style={[silly.p2]}>
            <SillyText color={clr1} size={40} family="SemiBold">
              {item.ques}
            </SillyText>
            <SillyText color={clr4} my={20} size={16}>
              {item.ans}
            </SillyText>
          </View>
          <View style={[silly.px2, silly.mb5]}>
            <SillyButton
              round={15}
              py={1}
              px={10}
              style={[silly.fr, silly.aic]}
              bg="rgba(49,34,122,0.2)">
              <Ionicon
                name="bulb-outline"
                size={25}
                style={[silly.mxh]}
                color={clr1}
              />
              <SillyText color={clr1} family="SemiBold" my={20} size={16}>
                Bonus tip goes here
              </SillyText>
            </SillyButton>
          </View>
        </View>
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
