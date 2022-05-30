import {View, Image} from 'react-native';
import React from 'react';
import SillyText from '../../Silly/components/SillyText';
import silly from '../../Silly/styles/silly';
import profileImg from '../../assets/images/ob1.png';
import documents from '../../assets/images/documents.png';
import verify from '../../assets/images/verify.png';
import {useContext, useEffect, useState} from 'react/cjs/react.development';
import ProgressContext from './ProgressContext';

const BodyInfo = () => {
  const [body, setBody] = useState({
    head: 'Create Profile',
    text: ' The profile enables you to save money, earn rewards and share activities with your friends in the pave community.',
    image: profileImg,
  });
  const {state} = useContext(ProgressContext);
  useEffect(() => {
    if (state.progress === 3) {
      setBody({
        head: 'Upload Documents',
        text: 'Upload your PAN and address proof for KYC so you can start using the savings fund',
        image: documents,
      });
    }
    if (state.progress === 5) {
      setBody({
        head: 'Verify your ID',
        text: 'The last step of the verification helps create a secure account for you to save money from',
        image: verify,
      });
    }
  }, [state]);
  return (
    <View style={[silly.aic, silly.jcs, silly.f2, silly.my5]}>
      <Image style={silly.my3} source={body.image} />
      <SillyText family="SemiBold" style={[silly.my2]} size={32} color="white">
        {body.head}
      </SillyText>
      <SillyText size={16} my={15} style={[silly.w60p, silly.tc]}>
        {body.text}
      </SillyText>
    </View>
  );
};

export default BodyInfo;
