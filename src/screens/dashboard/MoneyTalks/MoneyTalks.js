import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SillyView, SillyText} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr4, sec_color} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import img1 from '../../../assets/images/learn.png';
import img2 from '../../../assets/images/learn_2.png';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
const {width} = Dimensions.get('window');

const MoneyTalks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const fRef = useRef(null);

  useEffect(() => {
    const slidesreq = async () => {
      const slidesres = await axios.get(`${server}/money-talks/`);
      setSlides(slidesres.data.results);
      setCurrentIndex(slidesres.data.results[0].id);
    };
    slidesreq();
  }, []);

  const renderTalks = ({item}) => {
    return (
      <View style={{width: width - 50}}>
        <View style={[silly.fr, silly.jcbtw]}>
          <SillyText color={clr2} size={20} style={[silly.w60p]}>
            {item.description}
          </SillyText>
          <Image
            style={[silly.w30p, silly.h10p, silly.rmcon]}
            source={{uri: item.moneytalk_image}}
          />
        </View>

        <View style={[silly.fr, silly.my2]}>
          {slides.map((slider, i) => {
            return (
              <TouchableOpacity
                onPress={() => fRef.current.scrollToIndex({index: i})}
                key={slider.id}
                style={[
                  silly.bg2,
                  silly.ph,
                  silly.mx1,
                  silly.br10,
                  slider.id === currentIndex ? silly.w20p : silly.w5,
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const onViewRef = useRef(flat => {
    setCurrentIndex(flat.viewableItems[0].item.id);
  });
  return (
    <View style={[silly.p1]}>
      <SillyView elev={2} px={15} my={0.01} bg={clr1}>
        <SillyText size={22} color={clr2} my={10} family="SemiBold">
          Money Talks
        </SillyText>
        <FlatList
          ref={fRef}
          horizontal
          data={slides}
          keyExtractor={item => item.id}
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
