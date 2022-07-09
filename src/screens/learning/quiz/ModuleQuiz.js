import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr5, clr2} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import art from '../../../assets/illustrations/quiz.png';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useContext} from 'react';
const {width} = Dimensions.get('window');
import AuthContext from '../../../navigations/AuthContext';

const ModuleQuiz = ({navigation, route}) => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const quiz = route.params.quiz;
  const flatlist = useRef(null);
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState({name: '', score: ''});
  const [ques, setQues] = useState([]);

  useEffect(() => {
    const quizreq = async () => {
      try {
        const quizres = await axios.get(`${server}/learning/quiz/${quiz}/`);
        console.log(quizres.data);
        setQues(quizres.data.questions);
        setInfo({name: quizres.data.name, score: quizres.data.score});
      } catch (error) {
        console.log(error.response.data);
      }
    };
    quizreq();
  }, [quiz]);
  const handleNext = () => {
    if (!ques[index].selected) {
      ToastAndroid.show('Answer First', ToastAndroid.SHORT);
      return;
    }
    if (ques[index + 1]) {
      setIndex(index + 1);
      flatlist.current.scrollToIndex({index: index + 1});
    }
  };
  const handlePrev = () => {
    if (ques[index - 1]) {
      setIndex(index - 1);
      flatlist.current.scrollToIndex({index: index - 1});
    }
  };
  const handleSubmitQuiz = async () => {
    try {
      const quiz_submit = await axios.post(`${server}/learning/quiz/submit/`, {
        user: user_id,
        quiz: quiz,
      });
      console.log(quiz_submit);
      navigation.navigate('QuizEnd', {info});
    } catch (error) {
      console.log(error);
    }
  };
  const RenderQues = ({item}) => {
    const handleSubmitOption = async choice => {
      setQues(prev => {
        const i = prev.findIndex(val => val.id === item.id);
        prev[i].selected = choice;
        prev[i].answered = true;
        return [...prev];
      });
      const checkres = await axios.post(
        `${server}/learning/question/${item.id}/submit/`,
        {user: user_id, choice},
      );
      console.log(checkres.data);
      setQues(prev => {
        const i = prev.findIndex(val => val.id === item.id);
        prev[i].success = checkres.data.valid_answer;
        prev[i].correct_choice = checkres.data.correct_choice;
        return [...prev];
      });
    };
    return (
      <View style={{width: width - 40}}>
        <SillyText family="SemiBold" size={20}>
          {item.title}
        </SillyText>
        <SillyText>{item.description}</SillyText>
        <View style={[silly.my2]}>
          {item.choices.map((option, i) => {
            return (
              <SillyButton
                onPress={() => handleSubmitOption(option.id)}
                my={10}
                py={10}
                key={i}
                bg={
                  item.selected && item.correct_choice === option.id
                    ? 'green'
                    : !item.success && item.selected === option.id
                    ? 'red'
                    : `${clr2}33`
                }>
                <SillyText size={18}>{option.title}</SillyText>
              </SillyButton>
            );
          })}
        </View>
      </View>
    );
  };
  const onViewRef = useRef(flat => {
    setIndex(flat.viewableItems[0].index);
  });
  return (
    <View style={[silly.f1]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[silly.m1]}>
        <Icon name="chevron-back-outline" size={30} color={clr1} />
      </TouchableOpacity>
      <View style={[silly.fr, silly.jcbtw, silly.aic]}>
        <View style={[silly.px1, silly.ais]}>
          <SillyText color={clr1} family="SemiBold" size={30}>
            {info.name}
          </SillyText>
          <SillyView
            style={[silly.fr, silly.aic, silly.bw1, silly.bc5]}
            px={20}
            my={5}
            bg="transparent">
            <Icon name="star" color={clr5} size={20} />
            <SillyText color={clr5} mx={5}>
              {info.score} points to be earned{' '}
            </SillyText>
          </SillyView>
        </View>
        <Image source={art} style={[silly.w30p, silly.rmcon, silly.h15p]} />
      </View>
      <ScrollView contentContainerStyle={[silly.fg1]}>
        <SillyView
          my={0.01}
          bg={clr1}
          py={50}
          px={20}
          style={[silly.fg1, silly.mt2]}>
          <FlatList
            ref={flatlist}
            pagingEnabled
            horizontal
            data={ques}
            keyExtractor={item => item.id}
            renderItem={RenderQues}
            onViewableItemsChanged={onViewRef.current}
          />
          <View style={[silly.fr, silly.jcbtw]}>
            <SillyButton
              onPress={handlePrev}
              style={[silly.bw1, silly.bc2, silly.w40p]}>
              <SillyText center size={20}>
                Back
              </SillyText>
            </SillyButton>
            {index === ques.length - 1 ? (
              <SillyButton
                onPress={handleSubmitQuiz}
                style={[silly.w40p]}
                bg={clr2}>
                <SillyText center color={clr1} size={20}>
                  Complete
                </SillyText>
              </SillyButton>
            ) : (
              <SillyButton onPress={handleNext} style={[silly.w40p]} bg={clr2}>
                <SillyText center color={clr1} size={20}>
                  Next
                </SillyText>
              </SillyButton>
            )}
          </View>
        </SillyView>
      </ScrollView>
    </View>
  );
};

export default ModuleQuiz;
