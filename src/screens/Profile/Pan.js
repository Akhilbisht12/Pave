import {View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../config/globals';
import AuthContext from '../../navigations/AuthContext';
import axios from 'axios';
import {server} from '../../config/server_url';
import Icon from 'react-native-vector-icons/Ionicons';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
const Pan = () => {
  const [UpPan, setUpPan] = useState({
    name: '',
    number: '',
    document: '',
  });
  const [edit, setEdit] = useState(false);
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const getUserPan = async () => {
      try {
        const profileData = await axios.get(
          `${server}/profile/${user_id}/pan/`,
        );
        console.log(profileData);
        setUpPan({
          name: profileData.data.name,
          number: profileData.data.number,
          document: profileData.data.document,
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getUserPan();
  }, [user_id]);

  const handlePanUpload = async () => {
    try {
      const panDocUpload = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setUpPan({...UpPan, document: panDocUpload});
      console.log(panDocUpload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={[silly.f1, silly.p1]}>
        <SillyText my={10} color={clr1} size={30}>
          Pan
        </SillyText>
        <View>
          {/* <View style={[silly.aie]}>
            <SillyView>
              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Icon
                  name={edit ? 'close-outline' : 'create-outline'}
                  size={25}
                  color={clr1}
                />
              </TouchableOpacity>
            </SillyView>
          </View> */}

          {[
            {name: 'Name on Document', value: UpPan.name},
            {name: 'Pan Number', value: UpPan.number},
          ].map((item, i) => {
            return (
              <SillyView py={10} key={i}>
                <SillyText size={16} family="SemiBold" color={clr5}>
                  {item.name}
                </SillyText>
                <SillyText
                  style={[edit ? silly.dn : {}]}
                  size={22}
                  color={clr1}>
                  {item.value}
                </SillyText>
                <SillyInput
                  color={clr1}
                  style={[edit ? {} : silly.dn]}
                  brclr={clr1}
                  value={item.value}
                />
              </SillyView>
            );
          })}
          <SillyView py={10} style={[silly.ais]}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Uploaded Document
            </SillyText>
            <SillyButton
              onPress={() => Linking.openURL(UpPan.document)}
              mx={0.01}
              my={5}
              style={[edit ? silly.dn : {}]}
              bg={clr1}>
              <SillyText>View Document</SillyText>
            </SillyButton>
            <SillyButton
              style={[
                silly.fr,
                silly.jcbtw,
                silly.bg3,
                silly.aic,
                silly.p1,
                silly.my1,
                edit ? {} : silly.dn,
              ]}
              onPress={handlePanUpload}>
              <SillyText family="Medium" size={18} color={clr1} fw={700}>
                {UpPan.pan ? UpPan.pan.name : 'Upload Pan Card'}
              </SillyText>
              <Icon
                style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
                name="add-outline"
                size={15}
                color="white"
              />
            </SillyButton>
          </SillyView>

          <SillyButton style={[edit ? {} : silly.dn]} bg={clr1}>
            <SillyText center my={5}>
              Save Changes
            </SillyText>
          </SillyButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default Pan;
