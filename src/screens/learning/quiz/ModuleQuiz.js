import {View, Image, FlatList, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr5, clr2} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import art from '../../../assets/stories/stories-1.png';
const {width} = Dimensions.get('window');
const ques = [
  {
    id: 0,
    ques: 'How long would you like to hold your Mutual Funds investments',
    options: [
      '1 to 3 years',
      '4 to 6 years',
      '7 to 10 years',
      'More than 10 years',
    ],
    ans: 3,
    tip: 'first tip',
  },
  {
    id: 1,
    ques: 'How long would you like to hold your Mutual Funds investments',
    options: [
      '1 to 3 years',
      '4 to 6 years',
      '7 to 10 years',
      'More than 10 years',
    ],
    ans: 3,
    tip: 'first tip',
  },
  {
    id: 2,
    ques: 'How long would you like to hold your Mutual Funds investments',
    options: [
      '1 to 3 years',
      '4 to 6 years',
      '7 to 10 years',
      'More than 10 years',
    ],
    ans: 3,
    tip: 'first tip',
  },
];
const ModuleQuiz = ({navigation}) => {
  const flatlist = useRef(null);
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    if (ques[index + 1]) {
      setIndex(index + 1);
      flatlist.current.scrollToIndex({index: index + 1});
    }
  };
  const handlePrev = () => {
    if (ques[index - 1]) {
      setIndex(index - 1);
      flatlist.current.scrollToIndex({index: index - 1});
    }
  };
  const renderQues = ({item}) => {
    return (
      <View style={{width: width - 40}}>
        <SillyText family="SemiBold" size={30}>
          {item.ques}
        </SillyText>
        <View style={[silly.my5]}>
          {item.options.map((option, i) => {
            return (
              <SillyButton my={15} py={15} key={i} bg={`${clr2}33`}>
                <SillyText size={20}>{option}</SillyText>
              </SillyButton>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={[silly.f1]}>
      <View style={[silly.m1]}>
        <Icon name="chevron-back-outline" size={30} color={clr1} />
      </View>
      <View style={[silly.fr, silly.jcbtw, silly.aic]}>
        <View style={[silly.px1, silly.ais]}>
          <SillyText color={clr1} family="SemiBold" size={30}>
            Mutual Funds 101
          </SillyText>
          <SillyView
            style={[silly.fr, silly.aic, silly.bw1, silly.bc5]}
            px={20}
            my={10}
            bg="transparent">
            <Icon name="star" color="orange" size={20} />
            <SillyText color={clr5} mx={5}>
              10/30 points earned
            </SillyText>
          </SillyView>
          {/* progress */}
          <View style={[silly.w60p, silly.bg5, silly.bg3, silly.my1]}>
            <View style={[silly.w20p, silly.h5, silly.bg1, silly.br5]} />
          </View>
        </View>
        <Image source={art} style={[silly.w30p, silly.rmcon, silly.h15p]} />
      </View>
      <SillyView
        my={0.01}
        bg={clr1}
        py={50}
        px={20}
        style={[silly.fg1, silly.mt2]}>
        <FlatList
          ref={flatlist}
          pagingEnabled
          horizontal
          data={ques}
          keyExtractor={item => item.id}
          renderItem={renderQues}
        />
        <View style={[silly.fr, silly.jcbtw]}>
          <SillyButton
            onPress={handlePrev}
            style={[silly.bw1, silly.bc2, silly.w40p]}>
            <SillyText center size={20}>
              Back
            </SillyText>
          </SillyButton>
          {index === ques.length - 1 ? (
            <SillyButton
              onPress={() => navigation.navigate('QuizEnd')}
              style={[silly.w40p]}
              bg={clr2}>
              <SillyText center color={clr1} size={20}>
                Complete
              </SillyText>
            </SillyButton>
          ) : (
            <SillyButton onPress={handleNext} style={[silly.w40p]} bg={clr2}>
              <SillyText center color={clr1} size={20}>
                Next
              </SillyText>
            </SillyButton>
          )}
        </View>
      </SillyView>
    </View>
  );
};

export default ModuleQuiz;
