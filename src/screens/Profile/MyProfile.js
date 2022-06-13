import {View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyText,
  SillyView,
  SillyInput,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr5} from '../../config/globals';
import axios from 'axios';
import {server} from '../../config/server_url';
import AuthContext from '../../navigations/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
const MyProfile = () => {
  const [phoneOtp, setPhoneOtp] = useState([
    {
      value: '',
      key: 1,
    },
    {
      value: '',
      key: 2,
    },
    {
      value: '',
      key: 3,
    },
    {
      value: '',
      key: 4,
    },
    {
      value: '',
      key: 5,
    },
    {
      value: '',
      key: 6,
    },
  ]);
  const inputRef = useRef([]);
  const OTPPhoneInput = ({index}) => {
    const handleChangeOTP = e => {
      if (e.nativeEvent.key) {
        if (e.nativeEvent.key === 'Backspace') {
          const temp = phoneOtp;
          phoneOtp[index].value = '';
          setPhoneOtp(temp);
          if (inputRef.current[index - 1]) {
            inputRef.current[index - 1].focus();
          }
        }
      } else if (e.nativeEvent.text) {
        const temp = phoneOtp;
        phoneOtp[index].value = e.nativeEvent.text;
        setPhoneOtp(temp);
        if (inputRef.current[index + 1]) {
          inputRef.current[index + 1].focus();
        }
      }
    };
    return (
      <SillyInput
        color={clr1}
        px={0.01}
        ref={el => (inputRef.current[index] = el)}
        style={[silly.fs25, silly.tc]}
        keyboardType="number-pad"
        maxLength={1}
        brclr={clr1}
        onChange={handleChangeOTP}
        onKeyPress={handleChangeOTP}
        width={'13%'}
      />
    );
  };
  const [Profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    gender_label: '',
    father_name: '',
    occupation: '',
    address: '',
    pincode: '',
  });
  const [edit, setEdit] = useState(false);
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profileData = await axios.get(`${server}/profile/${user_id}/`);
        console.log(profileData);
        setProfile({
          name: profileData.data.user_details.name,
          email: profileData.data.user_details.email,
          mobile: profileData.data.user_details.mobile,
          gender: profileData.data.gender,
          gender_label: profileData.data.gender_label,
          father_name: profileData.data.father_name,
          occupation: profileData.data.occupation,
          address: profileData.data.address,
          pincode: profileData.data.pincode,
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getUserProfile();
  }, [user_id, edit]);

  const handleUpdateProfile = async () => {
    try {
      const update = await axios.patch(`${server}/profile/${user_id}/`, {
        gender: Profile.gender,
        gender_label: Profile.gender_label,
        father_name: Profile.father_name,
        occupation: Profile.occupation,
        address: Profile.address,
        pincode: phoneOtp.map(item => item.value).join(''),
      });
      console.log(update.data);
      setEdit(false);
      ToastAndroid.show('user updated', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ScrollView>
      <View style={[silly.f1, silly.p1]}>
        <SillyText my={10} family="SemiBold" color={clr1} size={30}>
          Profile
        </SillyText>
        <View>
          {[
            {name: 'Full Name', value: Profile.name},
            {name: 'Email', value: Profile.email},
            {name: 'Mobile', value: Profile.mobile},
          ].map((item, i) => {
            return (
              <SillyView py={10} my={5} key={i} style={[]}>
                <SillyText size={16} family="SemiBold" color={clr5}>
                  {item.name}
                </SillyText>
                <SillyText size={22} color={clr1}>
                  {item.value}
                </SillyText>
              </SillyView>
            );
          })}
        </View>
        <View style={[silly.my1, silly.py1]}>
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
              Gender
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {Profile.gender_label}
            </SillyText>
            <View style={[silly.fr, silly.my1, edit ? {} : silly.dn]}>
              {[
                {name: 'MALE', icon: 'man-outline'},
                {name: 'FEMALE', icon: 'woman-outline'},
              ].map((item, i) => {
                return (
                  <SillyButton
                    key={i}
                    onPress={() => setProfile({...Profile, gender: item.name})}
                    style={[silly.aic, silly.jcc, silly.fr, silly.w25p]}
                    bg={Profile.gender === item.name ? clr1 : clr3}>
                    <Icon size={20} color={clr2} name={item.icon} />
                    <SillyText color={clr2} mx={5}>
                      {item.name}
                    </SillyText>
                  </SillyButton>
                );
              })}
            </View>
          </SillyView>

          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Father Name
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {Profile.father_name}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[edit ? {} : silly.dn]}
              brclr={clr1}
              value={Profile.father_name}
              onChangeText={father_name =>
                setProfile({...Profile, father_name})
              }
            />
          </SillyView>
          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Occupation
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {Profile.occupation}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[edit ? {} : silly.dn]}
              brclr={clr1}
              value={Profile.occupation}
              onChangeText={occupation => setProfile({...Profile, occupation})}
            />
          </SillyView>
          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Address
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {Profile.address}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[edit ? {} : silly.dn]}
              brclr={clr1}
              value={Profile.address}
              onChangeText={address => setProfile({...Profile, address})}
            />
          </SillyView>

          <SillyView py={10} my={5}>
            <SillyText size={16} family="SemiBold" color={clr5}>
              Pincode
            </SillyText>
            <SillyText style={[edit ? silly.dn : {}]} size={22} color={clr1}>
              {Profile.pincode}
            </SillyText>
            <View
              style={[silly.fr, silly.jcbtw, silly.my1, edit ? {} : silly.dn]}>
              {phoneOtp.map((item, i) => {
                return <OTPPhoneInput index={i} key={i} />;
              })}
            </View>
          </SillyView>
          <SillyButton
            onPress={handleUpdateProfile}
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

export default MyProfile;
