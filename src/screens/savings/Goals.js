import React, {useContext} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr3, clr4} from '../../config/globals';
import savings_art from '../../assets/illustrations/savings.png';
import axios from 'axios';
import {server} from '../../config/server_url';
import AuthContext from '../../navigations/AuthContext';

const Goals = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const handleSaving = async () => {
    try {
      const investmentreq = await axios.get(
        `${server}/investment/precious-metal/${user_id}/investments/?ordering=-created_at`,
      );
      console.log(investmentreq.data);
      investmentreq.data.count > 0
        ? navigation.navigate('SimpleOverview')
        : navigation.navigate('AddSaving');
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ScrollView contentContainerStyle={[silly.f1]}>
      <View style={[silly.f1]}>
        <View style={[silly.bg1, silly.px2, silly.py3]}>
          <SillyText>SAVING FUND</SillyText>
          <SillyText my={10} size={25} family="SemiBold">
            How do you want to {'\n'}start saving?
          </SillyText>
        </View>
        <View style={[silly.my3]}>
          <TouchableOpacity onPress={() => navigation.navigate('AddGoal')}>
            <SillyView
              my={5}
              mx={10}
              style={[
                silly.h25p,
                silly.fr,
                silly.jcbtw,
                silly.aic,
                silly.p1,
                silly.bg2,
              ]}>
              <View>
                <SillyText
                  style={[silly.mb1]}
                  family="SemiBold"
                  size={25}
                  color={clr1}>
                  Goal Based
                </SillyText>
                <SillyText style={[silly.w60p]} color={clr4}>
                  Save with a specific goal and we will automatically adjust
                  your savings habit to help you achieve it.
                </SillyText>
              </View>
              <Image
                source={{
                  uri: 'https://storytale-public2.b-cdn.net/2021/08/16/b49640bc-85bf-4b50-87fa-a6678204fae2-Prize.png',
                }}
                style={[silly.w40p, silly.h25p, silly.rmcon, silly.mr1]}
              />
            </SillyView>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaving}>
            <SillyView
              my={20}
              mx={10}
              style={[
                silly.h25p,
                silly.fr,
                silly.aic,
                silly.jcbtw,
                silly.p1,
                silly.bg1,
              ]}>
              <View>
                <SillyText style={[silly.mb1]} size={18} color={clr3}>
                  SELECTED
                </SillyText>
                <SillyText
                  style={[silly.mb1]}
                  family="SemiBold"
                  size={25}
                  color={clr3}>
                  Simple Saver
                </SillyText>

                <SillyText style={[silly.w60p]} color={clr3}>
                  Save without a goal and let your wealth grow without
                  limitations, simply set it and forget it!
                </SillyText>
              </View>
              <Image
                source={savings_art}
                style={[silly.w40p, silly.h25p, silly.rmcon, silly.mr1]}
              />
            </SillyView>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Goals;
