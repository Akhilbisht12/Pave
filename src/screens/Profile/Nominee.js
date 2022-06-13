import {View, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import {clr1, clr2, clr5} from '../../config/globals';
import AuthContext from '../../navigations/AuthContext';
import axios from 'axios';
import {server} from '../../config/server_url';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const Nominee = () => {
  const [nom, setNom] = useState({
    name: '',
    date_of_birth: '',
    relationship: '',
  });
  const [edit, setEdit] = useState(false);
  const temp = new Date();
  const [dob, setDob] = useState(temp);
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profileData = await axios.get(
          `${server}/profile/${user_id}/nominee/`,
        );
        console.log(profileData);
        setDob(moment(profileData.data.date_of_birth).toDate());
        setNom({
          name: profileData.data.name,
          date_of_birth: profileData.data.date_of_birth,
          relationship: profileData.data.relationship_label,
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getUserProfile();
  }, [user_id, edit]);

  const updateNominee = async () => {
    try {
      const tempdob = moment(dob).format('YYYY-MM-DD');
      const update = await axios.patch(
        `${server}/profile/${user_id}/nominee/`,
        {
          name: nom.name,
          date_of_birth: tempdob,
          relationship: nom.relationship.toUpperCase(),
        },
      );
      console.log(update.data);
      ToastAndroid.show('Nominee Updated', ToastAndroid.SHORT);
      setEdit(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ScrollView>
      <View style={[silly.f1, silly.p1]}>
        <SillyText my={10} color={clr1} family="SemiBold" size={30}>
          Nominee
        </SillyText>
        <View style={[]}>
          <View style={[silly.aie]}>
            <SillyView>
              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Icon
                  name={edit ? 'close-outline' : 'create-outline'}
                  size={25}
                  color={clr1}
                />
              </TouchableOpacity>
            </SillyView>
          </View>

          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Name
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {nom.name}
            </SillyText>
            <SillyInput
              color={clr1}
              style={[edit ? {} : silly.dn]}
              brclr={clr1}
              value={nom.name}
              onChangeText={name => setNom({...nom, name})}
            />
          </SillyView>
          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Date of birth
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {nom.date_of_birth}
            </SillyText>
            <DatePicker
              style={[silly.my1, edit ? {} : silly.dn]}
              mode="date"
              date={dob}
              onDateChange={date => setDob(date)}
            />
          </SillyView>
          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Relationship
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {nom.relationship}
            </SillyText>
            <SillyInput
              color={clr1}
              style={[edit ? {} : silly.dn]}
              brclr={clr1}
              value={nom.relationship}
              onChangeText={relationship => setNom({...nom, relationship})}
            />
          </SillyView>
          <SillyButton
            onPress={updateNominee}
            style={[edit ? {} : silly.dn]}
            bg={clr1}>
            <SillyText center my={5}>
              Save Changes
            </SillyText>
          </SillyButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default Nominee;
