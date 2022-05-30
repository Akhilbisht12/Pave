import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import SillyText from '../../../Silly/components/SillyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Progress from './Progress';
import Cards from './Cards';
import {SillyButton, SillyView} from '../../../Silly/components/silly_comps';
import {clr1, clr2} from '../../../config/globals';
const Quiz = ({navigation}) => {
  const ques = [
    {
      id: 1,
      ques: 'What is a mutual fund?',
      ans: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      tip: 'first tip',
    },
    {
      id: 2,
      ques: 'Why mutual fund?',
      ans: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      tip: 'second tip',
    },
    {
      id: 3,
      ques: 'What risks are involved?',
      ans: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      tip: 'third tip',
    },
  ];
  const [quesIndex, setQuesIndex] = useState(ques.length - 1);
  return (
    <View style={[silly.bg1, silly.f1, silly.jcaround, silly.p1]}>
      <View style={[silly.fr, silly.jcbtw]}>
        <SillyText size={32} family="Medium">
          Mutual{'\n'}Funds 101
        </SillyText>
        {/* header */}
        <SillyView
          bg="#25195E"
          style={[silly.w40p, silly.h60, silly.fr, silly.aic, silly.jcbtw]}>
          <View>
            <SillyText size={20}>10/30</SillyText>
            <SillyText size={12}>Points Earned</SillyText>
          </View>
          <View style={[silly.h60, silly.w40]}>
            <View
              style={[
                silly.h60,
                silly.pa,
                silly.t0,
                silly.aic,
                silly.jcc,
                silly.w40,
              ]}>
              <Ionicons name="star-outline" color="white" size={40} />
            </View>
            <View
              style={[
                silly.h60,
                silly.pa,
                silly.t0,
                silly.aic,
                silly.jcc,
                silly.w40,
              ]}>
              <Ionicons
                name="star"
                color="white"
                size={
                  40 /
                  ques.length /
                  (quesIndex === 0 ? 1 / ques.length : quesIndex)
                }
              />
            </View>
          </View>
        </SillyView>
      </View>
      {/* progress */}
      <Progress length={ques.length} quesIndex={quesIndex} />
      <Cards ques={ques} quesIndex={quesIndex} setQuesIndex={setQuesIndex} />
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.px1]}>
        <TouchableOpacity
          onPress={() => setQuesIndex(quesIndex + 1)}
          style={[silly.p1, silly.br30, silly.bg2]}>
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        {quesIndex + ques.length === ques.length ? null : (
          <TouchableOpacity onPress={() => setQuesIndex(quesIndex + 1)}>
            <SillyText size={20}>Skip</SillyText>
          </TouchableOpacity>
        )}

        {quesIndex + ques.length === ques.length ? (
          <SillyButton
            onPress={() => navigation.navigate('QuizEnd')}
            py={18}
            px={silly.w70p}
            bg={clr2}>
            <SillyText family="SemiBold" center color={clr1}>
              Complete
            </SillyText>
          </SillyButton>
        ) : (
          <TouchableOpacity
            onPress={() => setQuesIndex(quesIndex - 1)}
            style={[silly.p1, silly.br30, silly.bg2]}>
            <Ionicons name="chevron-forward-outline" size={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Quiz;
