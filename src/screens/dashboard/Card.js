import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path, Text as SvgText} from 'react-native-svg';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyAvatar,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr4, clr5, sec_color} from '../../config/globals';
const {height} = Dimensions.get('window');

const Card = () => {
  const [nots, setNots] = useState(false);
  return (
    <View>
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.ph]}>
        <View style={[silly.fr, silly.aic]}>
          <SillyAvatar
            mx={0.01}
            round={28}
            hgt={55}
            wdt={55}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
            }}
          />
          <View>
            <SillyText mx={10} color={clr1} size={22} family="SemiBold">
              Dylan Roberts
            </SillyText>
            <SillyText mx={10} color={clr5}>
              5 Added Goals
            </SillyText>
          </View>
        </View>
        <SillyView bg={`${clr1}50`}>
          <View style={[silly.jcc, silly.aic, silly.pxh]}>
            <Ionicons name="star" color={clr1} size={18} />
            <SillyText color={clr1} size={20}>
              0
            </SillyText>
          </View>
        </SillyView>
      </View>
      <SillyView round={5} py={10} px={10} bg={`${clr1}25`}>
        <TouchableOpacity
          onPress={() => setNots(!nots)}
          style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText color={clr1} size={18}>
            Your Notifications are here!
          </SillyText>
          <Ionicons name="chevron-down" size={20} color={clr1} />
        </TouchableOpacity>
        <View style={[silly.my1, nots ? {} : silly.dn]}>
          {[
            {name: 'You earned a batch', icon: 'medal'},
            {name: 'You earned a batch', icon: 'medal'},
          ].map((item, i) => {
            return (
              <View key={i}>
                <View style={[silly.fr, silly.jcbtw, silly.aic]}>
                  <SillyText color={clr1} size={18}>
                    {item.name}
                  </SillyText>
                  <Ionicons name={item.icon} size={25} color={clr1} />
                </View>
                <SillyView py={0.5} my={8} />
              </View>
            );
          })}
        </View>
      </SillyView>
    </View>
  );
};

export default Card;
