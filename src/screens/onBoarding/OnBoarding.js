import {StyleSheet, View, Image, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import SillyButton from '../../Silly/components/SillyButton';
import globals, {clr1, clr2} from '../../config/globals';
const OnBoarding = ({navigation}) => {
  const ob_data = [
    {
      id: 0,
      imageUri: require('../../assets/illustrations/ob_one.png'),
      text: 'Create your \n account',
    },
    {
      id: 1,
      imageUri: require('../../assets/illustrations/ob_two.png'),
      text: 'Smartly save and \n grow your money',
    },
    {
      id: 2,
      imageUri: require('../../assets/illustrations/ob_three.png'),
      text: 'Share your growth and \n rewards with friends',
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
        renderItem={item => renderComp(item)}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={[silly.my5, silly.fr, silly.jcbtw, silly.w100p, silly.aic]}>
        <SillyButton mx={20} onPress={() => navigation.navigate('Signup')}>
          <SillyText color={clr1} size={18}>
            Skip
          </SillyText>
        </SillyButton>
        <SillyButton onPress={handleFlatNext} mx={20} bg={clr1} px={40}>
          <SillyText color={clr2} size={20} style={[silly.fwb]}>
            Next
          </SillyText>
        </SillyButton>
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
