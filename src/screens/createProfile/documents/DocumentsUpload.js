import React, {useContext} from 'react';
import {View} from 'react-native';
import silly from '../../../Silly/styles/silly';
import {
  SillyInput,
  SillyButton,
  SillyText,
} from '../../../Silly/components/silly_comps';
import {site_color} from '../../../config/globals';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ProgressContext from '../ProgressContext';

const DocumentsUpload = () => {
  const {state, dispatch} = useContext(ProgressContext);
  return (
    <View style={[silly.jcbtw, state.progress === 4 ? silly.f2 : silly.dn]}>
      <View>
        <SillyText
          family="SemiBold"
          size={24}
          style={silly.mb2}
          color={site_color}>
          Add Documents
        </SillyText>
        <View style={[silly.my1]}>
          <SillyText size={20}>PAN Card No.</SillyText>
          <SillyInput />
        </View>
        <View>
          <View
            style={[
              silly.fr,
              silly.jcbtw,
              silly.bg3,
              silly.br10,
              silly.aic,
              silly.p1,
            ]}>
            <SillyText family="Medium" size={18} color={site_color}>
              Upload PAN Card Copy
            </SillyText>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          </View>
        </View>
        <View
          style={[{borderTopColor: 'lightgray', borderTopWidth: 1}, silly.mt3]}
        />
        <View style={[silly.my2]}>
          <SillyText size={20}>Name of Address proof document</SillyText>
          <SillyInput />
        </View>
        <View>
          <View
            style={[
              silly.fr,
              silly.jcbtw,
              silly.bg3,
              silly.br10,
              silly.aic,
              silly.p1,
            ]}>
            <SillyText size={18} color={site_color} family="Medium">
              Upload Address Proof
            </SillyText>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          </View>
          <View
            style={[
              silly.fr,
              silly.jcs,
              silly.bg3,
              silly.br10,
              silly.aic,
              silly.p1,
              silly.my1,
            ]}>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br20, silly.mh]}
              name="information-outline"
              size={15}
              color="white"
            />
            <SillyText size={14} color={site_color}>
              Driving license, Voter Id, Aadhaar {'\n'} Front and Back of the
              document is required
            </SillyText>
          </View>
        </View>
      </View>
      <View>
        <SillyButton
          bg={site_color}
          onPress={() => dispatch({type: 'increment'})}>
          <SillyText size={20} style={[silly.tc]}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    </View>
  );
};

export default DocumentsUpload;
