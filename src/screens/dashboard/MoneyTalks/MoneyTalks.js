import {View, FlatList, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr4, sec_color} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
const {width} = Dimensions.get('window');
const talks = [
  {
    index: 0,
    text: "After its recent $52 Mn fundraise, Licious a benguluru based startup that deals in meat became India's 1st D2C unicorn.",
  },
  {
    index: 1,
    text: "After its recent $52 Mn fundraise, Licious a benguluru based startup that deals in meat became India's 1st D2C unicorn.",
  },
  {
    index: 2,
    text: "After its recent $52 Mn fundraise, Licious a benguluru based startup that deals in meat became India's 1st D2C unicorn.",
  },
];
const MoneyTalks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fRef = useRef(null);

  const renderTalks = ({item}) => {
    return (
      <View style={{width: width - 50}}>
        <SillyText color={clr1} size={18} style={[silly.w60p]}>
          {item.text}
        </SillyText>
        <View style={[silly.fr, silly.my2]}>
          {talks.map((item, i) => {
            return (
              <View
                key={i}
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

  const onViewRef = useRef(flat => {
    console.log(flat.viewableItems[0]);
    setCurrentIndex(flat.viewableItems[0].index);
  });
  return (
    <View style={[silly.p1]}>
      {/* <SillyView
        my={0.01}
        py={10}
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.01}
        bg={sec_color}>
        <SillyText>1/2</SillyText>
      </SillyView> */}
      <SillyView elev={2} px={15} my={0.01} bg={clr2}>
        <SillyText size={22} color={clr1} my={10} family="SemiBold">
          Money Talks
        </SillyText>
        <FlatList
          ref={fRef}
          horizontal
          data={talks}
          keyExtractor={item => item.index}
          renderItem={renderTalks}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={true}
          onViewableItemsChanged={onViewRef.current}
        />
      </SillyView>
    </View>
  );
};

export default MoneyTalks;
