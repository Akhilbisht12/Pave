import {View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr3, clr2, clr4, sec_clr_opac} from '../../config/globals';
import silly from '../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Points = () => {
  const navigation = useNavigation();
  const history = [
    {
      name: 'Completed learning module',
      date: '24/12/21',
      points: '20',
      icon: 'school-outline',
    },
    {
      name: 'Added to savings',
      date: '24/12/21',
      points: '20',
      icon: 'cash-outline',
    },
    {
      name: 'Won a weekly game',
      date: '24/12/21',
      points: '20',
      icon: 'medal-outline',
    },
    {
      name: 'Completed learning module',
      date: '24/12/21',
      points: '20',
      icon: 'school-outline',
    },
    {
      name: 'Added to savings',
      date: '24/12/21',
      points: '20',
      icon: 'cash-outline',
    },
    {
      name: 'Won a weekly game',
      date: '24/12/21',
      points: '20',
      icon: 'medal-outline',
    },
  ];
  return (
    <SillyView my={0.1} px={0.1} py={0.1} bg={clr3} style={[silly.f1]}>
      <View style={[silly.p1]}>
        {/* how points work widget */}
        <TouchableOpacity onPress={() => navigation.navigate('PointsGuide')}>
          <SillyView
            py={20}
            px={20}
            style={[silly.fr, silly.jcbtw, silly.aic]}
            round={5}
            bg="#ffc237">
            <View style={[silly.w50p]}>
              <SillyText my={5} size={24} family="SemiBold" color={clr1}>
                How do points {'\n'}work?
              </SillyText>
              <SillyText my={5} color={clr1}>
                Earning and redeeming points on pave is extremely simple, see
                how!
              </SillyText>
            </View>
            <Ionicons name="trophy" size={80} color="#407bff" />
          </SillyView>
        </TouchableOpacity>
        {/* menu to multiple screens */}
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyButton
            round={12}
            style={[silly.fr, silly.aic, silly.jcaround, silly.w30p]}
            py={15}
            bg={sec_clr_opac}>
            <Ionicons name="school-outline" color={clr1} size={25} />
            <SillyText size={18} color={clr1}>
              Learn
            </SillyText>
          </SillyButton>
          <SillyButton
            round={12}
            style={[silly.fr, silly.aic, silly.jcaround, silly.w30p]}
            py={15}
            bg={sec_clr_opac}>
            <Ionicons name="cash-outline" color={clr1} size={25} />
            <SillyText size={18} color={clr1}>
              Save
            </SillyText>
          </SillyButton>
          <SillyButton
            round={12}
            style={[silly.fr, silly.aic, silly.jcaround, silly.w30p]}
            py={15}
            px={10}
            bg={sec_clr_opac}>
            <Ionicons name="people-outline" color={clr1} size={25} />
            <SillyText size={16} color={clr1}>
              Add Friends
            </SillyText>
          </SillyButton>
        </View>
      </View>

      <SillyView my={0.1} bg={clr2} style={[silly.f1]}>
        <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my1]}>
          <SillyText size={22} family="SemiBold" color={clr4}>
            History
          </SillyText>
          <TouchableOpacity>
            <Ionicons color={clr4} name="chevron-forward" size={30} />
          </TouchableOpacity>
        </View>
        <SillyView py={0.4} />
        <ScrollView>
          {history.map((item, i) => {
            return (
              <View key={i}>
                <View style={[silly.fr, silly.jcbtw, silly.aic, silly.my1]}>
                  <View style={[silly.fr, silly.jcs, silly.aic]}>
                    <SillyView py={8} bg={sec_clr_opac}>
                      <Ionicons name={item.icon} size={20} color={clr1} />
                    </SillyView>
                    <View style={[silly.mx1]}>
                      <SillyText color={clr4} family="SemiBold" size={18}>
                        {item.name}
                      </SillyText>
                      <SillyText>{item.date}</SillyText>
                    </View>
                  </View>
                  <View style={[silly.fr, silly.jcc, silly.aic]}>
                    <SillyText mx={5} color={clr4} family="SemiBold" size={22}>
                      {item.points}
                    </SillyText>
                    <Ionicons name="star-outline" size={20} color={clr4} />
                  </View>
                </View>
                <SillyView py={0.4} />
              </View>
            );
          })}
        </ScrollView>
      </SillyView>
    </SillyView>
  );
};

export default Points;
