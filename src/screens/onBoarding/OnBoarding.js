import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import SillyButton from '../../Silly/components/SillyButton';
import {clr1, clr2, clr4, clr5, clr6} from '../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';
const OnBoarding = ({navigation}) => {
  const ob_data = [
    {
      id: 0,
      imageUri: require('../../assets/illustrations/ob_first.png'),
      text: 'Effortless Investing that works for you',
      desc: 'Start investing with as little as INR 10, without having to spend months researching how to get started. ',
    },
    {
      id: 1,
      imageUri: require('../../assets/illustrations/quiz.png'),
      text: 'Independence  🤝 financial literacy',
      desc: 'For the first time, you can get personalized bite-sized insights and modules to better prepare you for your interactions with money. ',
    },
    {
      id: 2,
      imageUri: require('../../assets/illustrations/ob_third.png'),
      text: 'Rewards for building better money habits',
      desc: 'Consistency is made easier when you are rewarded for learning and maintaining investing streaks.',
    },
  ];

  const fRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderComp = ({item}) => {
    return (
      <View style={[silly.w100p, silly.aic, silly.p3]} center>
        <Image
          style={[silly.w90p, silly.h40p, silly.rmcon]}
          source={item.imageUri}
        />
        <SillyText
          family="SemiBold"
          center
          color={clr1}
          px={20}
          style={[silly.tc]}
          size={25}>
          {item.text}
        </SillyText>
        <SillyText center color={clr5}>
          {item.desc}
        </SillyText>
      </View>
    );
  };

  const handleFlatNext = () => {
    if (currentIndex === 2) {
      navigation.navigate('Signup');
    } else {
      setCurrentIndex(currentIndex + 1);
      let cIndex = currentIndex + 1;
      fRef.current.scrollToIndex({index: cIndex});
    }
  };

  const onViewRef = useRef(flat => {
    setCurrentIndex(flat.viewableItems[0].index);
  });

  return (
    <View style={[silly.f1, silly.jcaround]}>
      <View>
        <FlatList
          ref={fRef}
          data={ob_data}
          showsHorizontalScrollIndicator={false}
          renderItem={item => renderComp(item)}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          onViewableItemsChanged={onViewRef.current}
        />
      </View>
      <View>
        <View>
          <View style={[silly.fr, silly.jcc, silly.w100p, silly.aic]}>
            {/* <SillyButton mx={20} onPress={() => navigation.navigate('Signup')}>
            <SillyText color={clr1} size={18}>
              Skip
            </SillyText>
          </SillyButton> */}
            <SillyButton onPress={handleFlatNext} mx={20} bg={clr6} px={40}>
              {/* <SillyText color={clr2} size={20} style={[silly.fwb]}>
              Next
            </SillyText> */}
              {currentIndex === ob_data.length - 1 ? (
                <SillyText color={clr1} size={16}>
                  Get Started
                </SillyText>
              ) : (
                <Ionicon color={clr1} name="arrow-forward" size={20} />
              )}
            </SillyButton>
          </View>
          <View style={[silly.fr, silly.aic, silly.jcc, silly.my1]}>
            <SillyText color={clr4}>Already have an account? </SillyText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <SillyText family="Medium" color={clr1}>
                Log In.
              </SillyText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[silly.fr, silly.jcaround, silly.mt4]}>
          {ob_data.map((obItem, i) => {
            return (
              <View
                key={obItem.id}
                style={[
                  currentIndex >= i ? silly.bg6 : silly.bg5,
                  silly.mx1,
                  silly.br10,
                  silly.w25p,
                  {padding: 2},
                  ,
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
