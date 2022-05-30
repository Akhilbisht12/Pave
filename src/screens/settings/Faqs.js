import {View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {
  SillyAccordian,
  SillyView,
  SillyText,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1} from '../../config/globals';

const faq = [
  {
    ques: 'What is the saving account in Pave?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'How is it different from a bank account?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'What is the ICICI preduential liquid fund?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'How do i create account?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'Is my money safe?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'How do i redeem money?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'How does the point system work?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
  {
    ques: 'Where do i get the money from the games?',
    ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula ipsum vulputate, ultricies sem vitae, mattis augue. Praesent massa nisl, molestie varius velit eu, euismod dapibus risus.',
  },
];

const Faqs = ({navigation}) => {
  return (
    <ScrollView style={[silly.f1]}>
      <SillyView
        style={[silly.fr, silly.jcbtw, silly.aic]}
        round={0.1}
        my={0.1}
        bg={clr1}>
        <SillyText family="SemiBold" size={22}>
          FAQs
        </SillyText>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={35} />
        </TouchableOpacity>
      </SillyView>
      <View style={[silly.p1]}>
        {faq.map((item, i) => {
          return <SillyAccordian key={i} ques={item.ques} ans={item.ans} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Faqs;
