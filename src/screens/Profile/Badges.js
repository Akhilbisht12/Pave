import {View, ScrollView} from 'react-native';
import React from 'react';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr4, clr5} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';

const Badges = () => {
  const badges = [
    {
      name: 'Fund creation badge earned',
      desc: 'Congratulations! you have created your first verified fund and can now start saving money daily!',
      icons: 'cash-outline',
      locked: false,
    },
    {
      name: 'Referal badge earned',
      desc: 'You have successfully added a friend to Pave, that also gives you exclusive rewards',
      icons: 'people-outline',
      locked: false,
    },
    {
      name: 'Badge locked',
      desc: 'Complete 10 continous days of depositing to earn this badge!',
      icons: 'lock-closed-outline',
      locked: true,
    },
    {
      name: 'Badge locked',
      desc: 'Complete 10 continous days of depositing to earn this badge!',
      icons: 'lock-closed-outline',
      locked: true,
    },
    {
      name: 'Badge locked',
      desc: 'Complete 10 continous days of depositing to earn this badge!',
      icons: 'lock-closed-outline',
      locked: true,
    },
    {
      name: 'Badge locked',
      desc: 'Complete 10 continous days of depositing to earn this badge!',
      icons: 'lock-closed-outline',
      locked: true,
    },
  ];
  return (
    <ScrollView style={[silly.f1]}>
      <SillyView bg={clr3}>
        {badges.map((item, i) => {
          const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
          return (
            <SillyView
              py={0.1}
              style={[silly.fr, silly.jcs, silly.aic]}
              key={i}
              bg={clr2}>
              <View style={[silly.p2]}>
                <Icon
                  color={item.locked ? clr5 : `#${randomColor}`}
                  size={30}
                  name={item.icons}
                />
              </View>
              <SillyView my={0.1} style={[silly.h10p]} px={0.4} />
              <View style={[silly.p2]}>
                <SillyText size={20} color={clr4} family="SemiBold">
                  {item.name}
                </SillyText>
                <SillyText
                  style={[silly.w60p]}
                  my={10}
                  color={clr5}
                  family="SemiBold">
                  {item.desc}
                </SillyText>
              </View>
            </SillyView>
          );
        })}
      </SillyView>
    </ScrollView>
  );
};

export default Badges;
