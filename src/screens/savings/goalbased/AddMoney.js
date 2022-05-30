import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
  SillyRadio,
  SillyOverlay,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr4, clr5, sec_color} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';

const AddMoney = ({money, setMoney}) => {
  const [time, setTime] = useState(0);
  const [automate, setAutomate] = useState(true);
  const [goal, setGoal] = useState({
    date: '',
    open: '',
    amount: '',
    frequency: 0,
  });
  const changeFrequency = freq => {
    setGoal({...goal, frequency: freq});
  };
  return (
    <View
      style={[
        silly.pa,
        silly.b0,
        silly.w100p,
        silly.bg2,
        money ? {} : silly.dn,
      ]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText py={10} size={25} family="SemiBold">
          Add Money
        </SillyText>
        <TouchableOpacity onPress={() => setMoney(false)}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.p1, silly.bg2]}>
        <View style={[silly.px1, silly.py2]}>
          <View>
            <View style={[silly.my1]}>
              <SillyInput
                family="SemiBold"
                keyboardType="number-pad"
                style={[
                  {
                    fontSize: 25,
                    color: clr1,
                    borderBottomWidth: 2,
                    borderWidth: 0,
                    textAlign: 'center',
                  },
                ]}
                bg="transparent"
              />
            </View>
          </View>
          {/* Automate payment */}
          <View style={[silly.fr, silly.jcbtw]}>
            <SillyText color={clr4} family="SemiBold">
              Automate this payment
            </SillyText>
            <SillyRadio on={automate} off={setAutomate} />
          </View>
          {/* frequency selector */}
          <SillyText>How often do you want to save?</SillyText>
          <SillyView
            px={0.05}
            py={0.05}
            my={15}
            round={10}
            bg={`${clr5}40`}
            style={[silly.fr, silly.jcbtw]}>
            {['Daily', 'Weekly', 'Monthly'].map((item, i) => {
              return (
                <SillyButton
                  key={i}
                  mx={0.5}
                  my={0.5}
                  py={15}
                  round={10}
                  bg={[goal.frequency === i ? clr1 : 'transparent']}
                  onPress={() => changeFrequency(i)}
                  style={[silly.w30p]}>
                  <SillyText
                    color={goal.frequency === i ? clr2 : clr1}
                    size={18}
                    center>
                    {item}
                  </SillyText>
                </SillyButton>
              );
            })}
          </SillyView>
          <View>
            <SillyText my={10}>
              for how long do you want to save this amount?
            </SillyText>
            <SillyView
              style={[silly.fr, silly.jcbtw, silly.aic]}
              px={0.01}
              py={0.01}
              bg={`${clr5}40`}>
              {['3M', '6M', '9M', '1Y', '2Y'].map((item, i) => {
                return (
                  <SillyButton
                    onPress={() => setTime(i)}
                    bg={time === i ? clr1 : 'transparent'}
                    key={i}
                    mx={0.01}
                    my={0.01}>
                    <SillyText
                      color={time === i ? clr2 : clr1}
                      size={20}
                      family="SemiBold">
                      {item}
                    </SillyText>
                  </SillyButton>
                );
              })}
            </SillyView>
          </View>
        </View>
        <SillyButton bg={clr1}>
          <SillyText my={5} center size={20}>
            Confirm
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default AddMoney;
