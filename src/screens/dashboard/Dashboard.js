import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import Activity from './Activity';
import silly from '../../Silly/styles/silly';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import Savings from './Savings/Savings';
import Games from './Games';
import Referal from './Referal';
import MoneyTalks from './MoneyTalks/MoneyTalks';
const {height} = Dimensions.get('window');
const Dashboard = ({navigation}) => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.menuHolder}>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <Ionicons name="notifications-outline" color="white" size={30} />
          <TouchableOpacity onPress={() => navigation.navigate('Stories')}>
            <SillyView
              bg="transparent"
              round={25}
              py={8}
              style={{borderColor: 'tomato', borderWidth: 2}}>
              <Ionicons name="ellipse-outline" size={25} color="white" />
              <SillyView
                px={7}
                py={3}
                bg="tomato"
                style={[silly.pa, {top: -10}]}>
                <SillyText size={10}>2</SillyText>
              </SillyView>
            </SillyView>
          </TouchableOpacity>
        </View>
        <Card />
      </View>
      <Savings />
      {/* <SpinWidget /> */}
      <Games />
      {/* <GoalsSlider /> */}
      <Activity />
      <MoneyTalks />
      <Referal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgb(240,240,240)',
  },
  menuHolder: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(49,34,122)',
    height: height * 0.3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  mv2: {
    marginVertical: 30,
  },
});

export default Dashboard;
