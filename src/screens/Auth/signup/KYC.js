import {View, ScrollView, ToastAndroid} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
import silly from '../../../Silly/styles/silly';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {clr1, clr2, clr3, clr5} from '../../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {server} from '../../../config/server_url';
import AuthContext from '../../../navigations/AuthContext';
import moment from 'moment';
import Storage from '@react-native-async-storage/async-storage';
import curlirize from 'axios-curlirize';

const KYC = () => {
  curlirize(axios);
  const [step, setStep] = useState(1);
  const {dispatch} = useContext(AuthContext);
  const [store, setStore] = useState({
    access: null,
    user_id: null,
    id: null,
    refresh: null,
  });
  useEffect(() => {
    const getAccess = async () => {
      const get_access = await Storage.getItem('access');
      const get_user = await Storage.getItem('user_id');
      const id = await Storage.getItem('id');
      const refresh = await Storage.getItem('refresh');
      setStore({access: get_access, user_id: get_user, id, refresh});
    };
    getAccess();
  }, []);

  const temp = new Date();
  // step array for explanation
  const stepinfo = [
    'Add Personal Information',
    'Add a Nominee',
    'Add Pan Details',
  ];

  // Screen to be showed in step 1
  const Info = () => {
    //Pincode
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
          px={0.01}
          ref={el => (inputRef.current[index] = el)}
          style={[silly.fs25, silly.tc]}
          keyboardType="number-pad"
          maxLength={1}
          onChange={handleChangeOTP}
          onKeyPress={handleChangeOTP}
          width={'13%'}
        />
      );
    };
    const [info, setInfo] = useState({
      gender: '',
      date_of_birth: new Date(),
      father_name: '',
      occupation: '',
      address: '',
    });
    // handle submit Screen 1
    const infoSubmit = async () => {
      try {
        if (
          !(
            info.address &&
            info.date_of_birth &&
            info.father_name &&
            info.gender &&
            info.occupation
          )
        ) {
          ToastAndroid.show('Fill Out All Fields', ToastAndroid.SHORT);
          return;
        }
        const pincode = phoneOtp.map(item => item.value).join('');
        const dob = moment(info.date_of_birth).format('YYYY-MM-DD');
        const infoPost = await axios.post(
          `${server}/profile/create/`,
          {
            user: store.user_id,
            date_of_birth: dob,
            pincode: pincode,
            father_name: info.father_name,
            address: info.address,
            occupation: info.occupation,
            gender: info.gender,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + store.access,
            },
          },
        );
        console.log(infoPost);
        // ToastAndroid.show(infoPost.response.message, ToastAndroid.SHORT);
        setStep(2);
      } catch (error) {
        console.log(error.response);
        // ToastAndroid.show(error.response.message, ToastAndroid.SHORT);
      }
    };

    return (
      <View>
        <View style={[silly.my1]}>
          <SillyText my={5} size={18} color={clr5}>
            Gender
          </SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'MALE', icon: 'man-outline'},
              {name: 'FEMALE', icon: 'woman-outline'},
            ].map((item, i) => {
              return (
                <SillyButton
                  key={i}
                  onPress={() => setInfo({...info, gender: item.name})}
                  style={[silly.aic, silly.jcc, silly.fr, silly.w25p]}
                  bg={info.gender === item.name ? clr1 : clr3}>
                  <Icon size={20} color={clr2} name={item.icon} />
                  <SillyText color={clr2} mx={5}>
                    {item.name}
                  </SillyText>
                </SillyButton>
              );
            })}
          </View>
        </View>

        <View>
          <SillyText my={5} size={18} color={clr5}>
            Date Of Birth
          </SillyText>
          <View>
            <DatePicker
              mode="date"
              date={info.date_of_birth}
              onDateChange={date => setInfo({...info, date_of_birth: date})}
            />
          </View>
        </View>
        <View style={[silly.my1]}>
          <SillyText my={5} size={18} color={clr5}>
            Father's Name
          </SillyText>
          <View>
            <SillyInput
              onChangeText={e => setInfo({...info, father_name: e})}
              value={info.father_name}
            />
          </View>
        </View>
        <View>
          <SillyText my={5} size={18} color={clr5}>
            Occupation
          </SillyText>
          <View>
            <SillyInput
              value={info.occupation}
              onChangeText={e => setInfo({...info, occupation: e})}
            />
          </View>
        </View>
        <View style={[silly.my1]}>
          <SillyText my={5} size={18} color={clr5}>
            Address
          </SillyText>
          <View>
            <SillyInput
              value={info.address}
              onChangeText={e => setInfo({...info, address: e})}
            />
          </View>
        </View>
        <View>
          <SillyText my={5} size={18} color={clr5}>
            Pincode
          </SillyText>
          <View style={[silly.fr, silly.jcbtw]}>
            {phoneOtp.map((item, i) => {
              return <OTPPhoneInput index={i} key={i} />;
            })}
          </View>
        </View>
        <SillyButton onPress={infoSubmit} my={20} bg={clr1}>
          <SillyText my={5} center size={18}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    );
  };

  // Screen to show in step 2
  const Nominee = () => {
    const [nominee, setNominee] = useState({
      name: '',
      date_of_birth: temp,
      relationship: '',
    });
    const nomineeSubmit = async () => {
      try {
        if (!(nominee.date_of_birth && nominee.name && nominee.relationship)) {
          ToastAndroid.show('Please Fill Out All Fields');
          return;
        }
        const infoPost = await axios.post(
          `${server}/profile/create/nominee/`,
          {
            user: store.user_id,
            date_of_birth: moment(nominee.date_of_birth).format('YYYY-MM-DD'),
            name: nominee.name,
            relationship: nominee.relationship.toUpperCase(),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + store.access,
            },
          },
        );
        console.log(infoPost);
        // ToastAndroid.show(infoPost, ToastAndroid.SHORT);
        setStep(3);
      } catch (error) {
        console.log(error.response);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    return (
      <View>
        <View style={[silly.myh]}>
          <SillyText my={5} size={18} color={clr5}>
            Name of Nominee
          </SillyText>
          <View>
            <SillyInput
              value={nominee.name}
              onChangeText={e => setNominee({...nominee, name: e})}
            />
          </View>
        </View>
        <View style={[silly.myh]}>
          <SillyText my={5} size={18} color={clr5}>
            Date of Birth
          </SillyText>
          <View>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              date={nominee.date_of_birth}
              onDateChange={e => setNominee({...nominee, date_of_birth: e})}
              mode="date"
            />
          </View>
        </View>
        <View style={[silly.myh]}>
          <SillyText my={5} size={18} color={clr5}>
            Relationship
          </SillyText>
          <View>
            <SillyInput
              value={nominee.relationship}
              onChangeText={e => setNominee({...nominee, relationship: e})}
            />
          </View>
        </View>
        <SillyButton onPress={nomineeSubmit} bg={clr1}>
          <SillyText my={10} center color={clr2} size={18}>
            Next
          </SillyText>
        </SillyButton>
      </View>
    );
  };

  // Screen to Show in step3
  const Pan = () => {
    const [pan, setPan] = useState({
      name: '',
      number: '',
      panDoc: null,
    });
    const handlePanUpload = async () => {
      try {
        const panDocUpload = await DocumentPicker.pickSingle({
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
        });
        setPan({...pan, panDoc: panDocUpload});
        console.log(panDocUpload);
      } catch (error) {
        console.log(error);
      }
    };

    const panSubmit = async () => {
      try {
        const panFormData = new FormData();
        panFormData.append('user', store.user_id);
        panFormData.append('name', pan.name.toUpperCase());
        panFormData.append('number', pan.number);
        panFormData.append('document', {
          uri: pan.panDoc.uri,
          type: pan.panDoc.type,
          name: pan.panDoc.name,
        });
        const panPost = await axios.post(
          `${server}/profile/create/pan/`,
          panFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + store.access,
            },
          },
        );
        // const panPost = await fetch(`${server}/profile/create/pan/`, {
        //   method: 'post',
        //   body: panFormData,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: 'Bearer ' + store.access,
        //   },
        // });
        console.log(panPost.data);
        ToastAndroid.show('Pan Uploaded', ToastAndroid.SHORT);
        dispatch({
          type: 'setuser',
          access: store.access,
          id: store.id,
          refresh: store.refresh,
          user_id: store.user_id,
        });
      } catch (error) {
        console.log(error.response);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    return (
      <View>
        <View style={[silly.myh]}>
          <SillyText my={5} size={18} color={clr5}>
            Name in Pan
          </SillyText>
          <View>
            <SillyInput onChangeText={e => setPan({...pan, name: e})} />
          </View>
        </View>
        <View style={[silly.myh]}>
          <SillyText my={5} size={18} color={clr5}>
            Pan Number
          </SillyText>
          <View>
            <SillyInput
              autoCapitalize="characters"
              value={pan.number}
              onChangeText={e => setPan({...pan, number: e})}
            />
          </View>
        </View>
        <View>
          <SillyButton
            onPress={handlePanUpload}
            style={[
              silly.fr,
              silly.jcbtw,
              silly.bg3,
              silly.aic,
              silly.p1,
              silly.my1,
            ]}>
            <SillyText family="Medium" size={18} color={clr1} fw={700}>
              {pan.pan ? pan.pan.name : 'Upload Pan Card'}
            </SillyText>
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          </SillyButton>
        </View>
        <View style={[silly.myh]}>
          <SillyButton onPress={panSubmit} bg={clr1}>
            <SillyText center my={5} color={clr2}>
              Submit
            </SillyText>
          </SillyButton>
        </View>
      </View>
    );
  };

  // returns Screen based on step
  const getStep = () => {
    switch (step) {
      case 1:
        return <Info />;
      case 2:
        return <Nominee />;
      case 3:
        return <Pan />;
      default:
        break;
    }
  };
  return (
    <View style={[silly.bg1, silly.f1]}>
      <SillyText my={20} color={clr2} center size={30} family="SemiBold">
        Almost There!
      </SillyText>
      <SillyView px={15} py={10} bg={clr2} style={[silly.f1]}>
        <ScrollView>
          <SillyText my={10} color={clr1} size={25} family="SemiBold">
            Step {step}: {stepinfo[step - 1]}
          </SillyText>
          {getStep()}
        </ScrollView>
      </SillyView>
    </View>
  );
};

export default KYC;
