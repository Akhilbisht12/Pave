import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import SillyText from '../../../Silly/components/SillyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Progress from './Progress';
import Cards from './Cards';
import SillyButton from '../../../Silly/components/SillyButton';
import {clr1, clr2} from '../../../config/globals';
const Learn = ({navigation}) => {
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
      <View style={[silly.ais, silly.p1]}>
        <SillyText size={32} family="Medium">
          Mutual Funds 101
        </SillyText>
        {/* header */}
        <View
          style={[
            silly.pyh,
            silly.br10,
            silly.bw1,
            silly.bc2,
            silly.fr,
            silly.aic,
            silly.my1,
            silly.px3,
          ]}>
          <Ionicons name="star" color="orange" size={22} />
          <SillyText mx={5} size={16}>
            10/30 Points earned
          </SillyText>
        </View>
        {/* progress */}

        <View style={[silly.w60p, silly.bg5, silly.bg5, silly.my1, silly.br5]}>
          <View style={[silly.w20p, silly.h5, silly.bg2, silly.br5]} />
        </View>
      </View>
      <Cards ques={ques} quesIndex={quesIndex} setQuesIndex={setQuesIndex} />
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.px1]}>
        {quesIndex === ques.length - 1 ? (
          <View />
        ) : (
          <SillyButton
            py={18}
            bg="transparent"
            style={[silly.w40p, silly.bw1, silly.bc2]}
            onPress={() => setQuesIndex(quesIndex + 1)}>
            <SillyText center color={clr2} family="SemiBold">
              Back
            </SillyText>
          </SillyButton>
        )}

        {quesIndex + ques.length === ques.length ? (
          <SillyButton
            onPress={() => navigation.navigate('QuizIndex')}
            py={18}
            px={silly.w40p}
            bg={clr2}>
            <SillyText family="SemiBold" center color={clr1}>
              Complete
            </SillyText>
          </SillyButton>
        ) : (
          <SillyButton
            py={18}
            bg={clr2}
            style={[silly.w40p]}
            onPress={() => setQuesIndex(quesIndex - 1)}>
            <SillyText center color={clr1} family="SemiBold">
              Next
            </SillyText>
          </SillyButton>
        )}
      </View>
    </View>
  );
};

export default Learn;
