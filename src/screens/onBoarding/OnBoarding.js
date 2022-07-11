import {StyleSheet, View, Image, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import SillyButton from '../../Silly/components/SillyButton';
import globals, {clr1, clr2, clr4} from '../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';
const OnBoarding = ({navigation}) => {
  const ob_data = [
    {
      id: 0,
      imageUri: require('../../assets/illustrations/quiz.png'),
      text: 'Learn while you earn',
    },
    {
      id: 1,
      imageUri: require('../../assets/illustrations/ob_two.png'),
      text: 'Effortless Investing that works for you',
    },
    {
      id: 2,
      imageUri: require('../../assets/illustrations/ob_three.png'),
      text: 'Reward for building a habit',
    },
  ];

  const fRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderComp = ({item}) => {
    return (
      <View style={[silly.w100p, silly.jcaround, silly.aic]} center>
        <Image
          style={[silly.my5, silly.w90p, silly.h40p, silly.rmcon]}
          source={item.imageUri}
        />
        <SillyText
          family="SemiBold"
          center
          color={clr1}
          style={[silly.px5, silly.my5, silly.tc]}
          size={36}>
          {item.text}
        </SillyText>
        <View style={[silly.fr, silly.jcc]}>
          {ob_data.map((obItem, i) => {
            return (
              <View
                key={obItem.id}
                style={[
                  silly.bg1,
                  silly.ph,
                  silly.mx1,
                  silly.br10,
                  i === currentIndex ? silly.w20p : silly.w5,
                ]}
              />
            );
          })}
        </View>
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
    <View style={[silly.f1]}>
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
      <View>
        <View style={[silly.fr, silly.jcc, silly.w100p, silly.aic, silly.mt2]}>
          {/* <SillyButton mx={20} onPress={() => navigation.navigate('Signup')}>
            <SillyText color={clr1} size={18}>
              Skip
            </SillyText>
          </SillyButton> */}
          <SillyButton onPress={handleFlatNext} mx={20} bg={clr1} px={40}>
            {/* <SillyText color={clr2} size={20} style={[silly.fwb]}>
              Next
            </SillyText> */}
            <Ionicon color={clr2} name="arrow-forward" size={20} />
          </SillyButton>
        </View>
        <View style={[silly.fr, silly.aic, silly.jcc, silly.my2]}>
          <SillyText color={clr4}>Already have an account?</SillyText>
          <SillyButton onPress={() => navigation.navigate('Login')}>
            <SillyText family="Medium" color={clr1}>
              Log In.
            </SillyText>
          </SillyButton>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgb(49,34,122)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
