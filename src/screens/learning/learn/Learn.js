import {Dimensions, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import silly from '../../../Silly/styles/silly';
import SillyText from '../../../Silly/components/SillyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cards from './Cards';
import SillyButton from '../../../Silly/components/SillyButton';
import {clr1, clr2} from '../../../config/globals';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../../config/server_url';
import {useContext} from 'react';
import AuthContext from '../../../navigations/AuthContext';
import {updateLocale} from 'moment';

const Learn = ({navigation, route}) => {
  const [chaps, setChaps] = useState([]);
  const [module_info, setModule_info] = useState({name: '', description: ''});
  const [quesIndex, setQuesIndex] = useState(chaps.length + 1);
  const module_id = route.params.id;
  const {width} = Dimensions.get('window');
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const getChaps = async () => {
      try {
        const chapsres = await axios.get(
          `${server}/learning/module/${module_id}/`,
        );
        const update = await axios.post(`${server}/learning/module/complete/`, {
          user: user_id,
          module: module_id,
          completed: false,
        });
        console.log(update.data);
        setChaps(chapsres.data.chapters);
        console.log(chapsres.data);
        setModule_info({
          name: chapsres.data.name,
          description: chapsres.data.description,
        });
      } catch (error) {
        ToastAndroid.show('Failed getting chapters', ToastAndroid.SHORT);
        console.log(error.response);
      }
    };
    getChaps();
  }, [module_id, user_id]);
  return (
    <View style={[silly.bg1, silly.f1, silly.jcaround, silly.p1]}>
      <View style={[silly.ais, silly.p1]}>
        <SillyText size={32} family="Medium">
          {module_info.name}
        </SillyText>
        <SillyText>{module_info.description}</SillyText>
        <View style={[silly.w60p, silly.bg5, silly.bg5, silly.my1, silly.br5]}>
          <View
            style={[
              silly.h5,
              silly.bg2,
              silly.br5,
              {width: (chaps.length - quesIndex) * 0.2 * width},
            ]}
          />
        </View>
      </View>
      <Cards
        ques={[...chaps]}
        quesIndex={quesIndex}
        setQuesIndex={setQuesIndex}
      />
      <View style={[silly.fr, silly.jcbtw, silly.aic, silly.px1]}>
        {quesIndex === chaps.length - 1 ? (
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

        {quesIndex + chaps.length === chaps.length ? (
          <SillyButton
            onPress={() =>
              navigation.navigate('QuizIndex', {
                module: module_id,
                info: module_info,
              })
            }
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
