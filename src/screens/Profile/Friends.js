import {View, ScrollView} from 'react-native';
import React from 'react';
import {
  SillyView,
  SillyText,
  SillyAvatar,
  SillyButton,
} from '../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import {clr1, clr2, clr4, clr5, sec_clr_opac} from '../../config/globals';

const Friends = () => {
  const data = [
    {
      name: 'Leanardo Oliveria',
      ago: '2d ago',
      success: true,
      image:
        'https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662_960_720.jpg',
    },
    {
      name: 'Leanne Simpson',
      ago: '2d ago',
      success: false,
      image:
        'https://cdn.pixabay.com/photo/2022/03/10/15/48/flower-7060129_960_720.jpg',
    },
    {
      name: 'Leanardo Oliveria',
      ago: '2d ago',
      success: true,
      image:
        'https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662_960_720.jpg',
    },
    {
      name: 'Leanne Simpson',
      ago: '2d ago',
      success: false,
      image:
        'https://cdn.pixabay.com/photo/2022/03/10/15/48/flower-7060129_960_720.jpg',
    },
    {
      name: 'Leanardo Oliveria',
      ago: '2d ago',
      success: true,
      image:
        'https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662_960_720.jpg',
    },
    {
      name: 'Leanne Simpson',
      ago: '2d ago',
      success: false,
      image:
        'https://cdn.pixabay.com/photo/2022/03/10/15/48/flower-7060129_960_720.jpg',
    },
    {
      name: 'Leanne Simpson',
      ago: '2d ago',
      success: false,
      image:
        'https://cdn.pixabay.com/photo/2022/03/10/15/48/flower-7060129_960_720.jpg',
    },
  ];
  return (
    <SillyView bg={clr2} my={0.1} style={[silly.f1]}>
      <ScrollView>
        <SillyView style={[silly.fr, silly.jcbtw, silly.aic]} bg={sec_clr_opac}>
          <SillyText color={clr1} size={20} my={10}>
            Earn points by adding friends!
          </SillyText>
          <SillyView px={12} py={12} bg={clr1}>
            <Icon name="star" size={20} color="yellow" />
          </SillyView>
        </SillyView>
        {data.map((item, i) => {
          return (
            <View key={i}>
              <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my2]}>
                <View style={[silly.fr, silly.aic]}>
                  <SillyAvatar
                    source={{
                      uri: item.image,
                    }}
                  />
                  <View>
                    <SillyText color={clr4} family="SemiBold" size={18}>
                      {item.name}
                    </SillyText>
                    <SillyText color={clr5}>{item.ago}</SillyText>
                  </View>
                </View>

                <SillyView
                  bg={item.success ? '#7ab97a' : '#E2703A'}
                  round={5}
                  py={10}
                  style={[silly.fr, silly.aic, silly.jceven]}>
                  <Icon
                    color={item.success ? 'green' : '#D44000'}
                    name="ellipse"
                  />
                  <SillyText color={item.success ? 'green' : '#D44000'} mx={5}>
                    {item.success ? 'Success' : 'Pending'}
                  </SillyText>
                </SillyView>
              </View>
              <SillyView my={0.1} py={0.5} />
            </View>
          );
        })}
      </ScrollView>
      <View style={[silly.p1]}>
        <SillyText color={clr5} center>
          Add more friends for exclusive rewards
        </SillyText>
        <View style={[silly.my1, silly.fr, silly.jcbtw, silly.aic]}>
          <SillyButton bg={clr1}>
            <SillyText size={18} center>
              Refer a friend
            </SillyText>
          </SillyButton>
          <SillyButton bg={clr1}>
            <SillyText size={18} center>
              Import Contacts
            </SillyText>
          </SillyButton>
        </View>
      </View>
    </SillyView>
  );
};

export default Friends;
