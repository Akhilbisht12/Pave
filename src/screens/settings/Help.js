import {View, Linking, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyOverlay,
} from '../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {clr1, clr3, clr4, clr5} from '../../config/globals';
import Contact from './Contact';

const Help = ({navigation}) => {
  const [contact, setContact] = useState(false);
  return (
    <View style={[silly.f1, silly.p1]}>
      <View style={[silly.mt1, silly.mb3, silly.fr, silly.jcbtw, silly.aic]}>
        <SillyText color={clr1} size={30} family="SemiBold">
          Help
        </SillyText>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" color={clr1} size={35} />
        </TouchableOpacity>
      </View>
      {/* faqs */}
      <SillyView my={20} py={15}>
        <TouchableOpacity onPress={() => navigation.navigate('Faqs')}>
          <View style={[silly.fr, silly.jcbtw, silly.aic]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Frequently asked questions
            </SillyText>
            <Icon name="chevron-forward-outline" size={35} color={clr1} />
          </View>
        </TouchableOpacity>
        <SillyView bg={clr5} py={0.6} />
        <SillyText my={10} size={17} color={clr5}>
          We may already have the answer you're looking for, save time and check
          them out!
        </SillyText>
      </SillyView>
      {/* contact */}
      <SillyView my={20} py={15}>
        <TouchableOpacity onPress={() => setContact(true)}>
          <View style={[silly.fr, silly.jcbtw, silly.aic]}>
            <SillyText family="SemiBold" size={20} color={clr1}>
              Tell us in detail
            </SillyText>
            <Icon name="chevron-forward-outline" size={35} color={clr1} />
          </View>
        </TouchableOpacity>

        <SillyView bg={clr5} py={0.6} />
        <SillyText my={10} size={17} color={clr5}>
          Some problems are harder to solve, so you can drop a message to us and
          we will get in touch to resolve it with you
        </SillyText>
      </SillyView>
      {/* contact details */}
      <SillyView my={20} py={15}>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <SillyText my={10} family="SemiBold" size={20} color={clr1}>
            Connect with us
          </SillyText>
        </View>
        <SillyView bg={clr5} py={0.6} />
        <TouchableOpacity onPress={() => Linking.openURL('tel:+911234567890')}>
          <SillyText my={10} size={20} color={clr4}>
            +91 1234567890
          </SillyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:help@pave.money')}>
          <SillyText my={10} size={20} color={clr4}>
            help@pave.money
          </SillyText>
        </TouchableOpacity>
      </SillyView>
      <Contact setContact={setContact} contact={contact} />
      <SillyOverlay style={[contact ? {} : silly.dn]} />
    </View>
  );
};

export default Help;
