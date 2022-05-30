import {View} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr5, sec_clr_opac} from '../../../config/globals';
import {sec_color} from '../../../config/globals';

const AddGoal = ({navigation}) => {
  const [time, setTime] = useState(0);
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
    <View style={[silly.f1, silly.bg1]}>
      <View style={[silly.px1, silly.py2]}>
        <View>
          <View style={[silly.w60p]}>
            <SillyText my={10}>How much do you want to save?</SillyText>
            <SillyInput
              family="SemiBold"
              keyboardType="number-pad"
              style={{fontSize: 25, color: 'white'}}
              bg="transparent"
            />
          </View>
        </View>
        <View>
          <SillyText my={10}>When do you want to achieve this goal?</SillyText>
          <SillyView
            style={[silly.fr, silly.jcbtw, silly.aic]}
            px={0.01}
            py={0.01}
            bg={sec_color}>
            {['3M', '6M', '9M', '1Y', '2Y'].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => setTime(i)}
                  bg={time === i ? clr2 : 'transparent'}
                  key={i}
                  mx={0.01}
                  my={0.01}>
                  <SillyText
                    color={time === i ? clr1 : clr2}
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

      <SillyView bg={clr2} py={15} round={15} style={[silly.f1, silly.jcbtw]}>
        <View>
          <SillyText color={clr1}>You have to add</SillyText>
          <SillyInput
            family="SemiBold"
            keyboardType="number-pad"
            style={{fontSize: 25, color: clr1}}
            bg="transparent"
          />
          {/* frequency selector */}
          <SillyView
            px={0.05}
            py={0.05}
            my={15}
            round={10}
            bg={`${clr5}26`}
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
                    color={goal.frequency === i ? clr2 : clr5}
                    size={18}
                    center>
                    {item}
                  </SillyText>
                </SillyButton>
              );
            })}
          </SillyView>
          <SillyView bg={`${clr5}26`} py={0.4} />
          <SillyText my={10} size={20} family="SemiBold" color={clr1}>
            Name your goal (Optional)
          </SillyText>
          <SillyInput
            family="SemiBold"
            style={{fontSize: 25, color: clr1}}
            bg="transparent"
          />
          <SillyView my={10} bg={`${clr5}26`} py={0.4} />
          <View>
            <SillyButton
              onPress={() => navigation.navigate('WhereSaved')}
              py={15}
              bg={`${clr1}26`}>
              <SillyText center color={clr1} family="SemiBold" size={18}>
                Where is your money saved?
              </SillyText>
            </SillyButton>
            <SillyButton py={15} bg={`${clr1}26`}>
              <SillyText center color={clr1}>
                Terms & Conditions
              </SillyText>
            </SillyButton>
          </View>
        </View>
        <SillyButton
          onPress={() => navigation.navigate('GoalOverview')}
          bg={clr1}
          my={20}>
          <SillyText center size={18} py={8}>
            Confirm
          </SillyText>
        </SillyButton>
      </SillyView>
    </View>
  );
};

export default AddGoal;
