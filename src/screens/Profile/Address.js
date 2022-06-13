import {View, Text, ToastAndroid, ScrollView} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyButton,
  SillyInput,
  SillyText,
  SillyView,
} from '../../Silly/components/silly_comps';
import {clr1} from '../../config/globals';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../config/server_url';
import {useContext} from 'react';
import AuthContext from '../../navigations/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Address = () => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const [add, setAdd] = useState([]);
  const [showadd, setShowAdd] = useState(false);

  const [newAdd, setNewAdd] = useState({
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    pincode: 0,
  });
  useEffect(() => {
    const addressreq = async () => {
      try {
        const addressres = await axios.get(
          `${server}/profile/${user_id}/address/`,
        );
        console.log(addressres.data.results);
        setAdd(addressres.data.results);
      } catch (error) {
        console.log(error.response);
        ToastAndroid.show(
          'Error fetching addresses, Try Again!',
          ToastAndroid.SHORT,
        );
      }
    };
    addressreq();
  }, [user_id, showadd]);
  const createAddress = async () => {
    try {
      const addressres = await axios.post(`${server}/profile/create/address/`, {
        user: user_id,
        ...newAdd,
      });
      console.log(addressres.data);
      ToastAndroid.show('Address added successfull', ToastAndroid.SHORT);
      setShowAdd(false);
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show('Failed to submit address', ToastAndroid.SHORT);
    }
  };
  const handleDelete = async id => {
    try {
      const deleteres = await axios.delete(
        `${server}/profile/${user_id}/address/${id}/`,
      );
      console.log(deleteres.data);
      ToastAndroid.show('Address deleted successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.response);
      ToastAndroid.show(
        'Failed to delete address, Try Again!',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={[silly.p1]}>
      <View>
        <SillyText color={clr1} family="SemiBold" size={30}>
          Address
        </SillyText>
      </View>
      <ScrollView>
        <View>
          {add.map((item, i) => {
            return (
              <SillyView px={10} py={20} key={i}>
                <SillyButton
                  onPress={() => handleDelete(item.id)}
                  style={[silly.pa, silly.r0]}
                  px={8}
                  py={8}>
                  <Icon name="trash-outline" size={20} color={'red'} />
                </SillyButton>
                <SillyText size={18} color={clr1}>
                  {item.address_1} {item.address_2} {item.city} {item.state}{' '}
                  {item.pincode}
                </SillyText>
              </SillyView>
            );
          })}
        </View>
        <View>
          <SillyButton
            onPress={() => setShowAdd(!showadd)}
            style={[silly.fr, silly.aic, silly.jcbtw]}
            bg={`${clr1}33`}>
            <SillyText color={clr1} size={18}>
              Add New Address
            </SillyText>
            <Icon
              name={showadd ? 'close-outline' : 'add-outline'}
              size={20}
              color={clr1}
            />
          </SillyButton>
          <View style={[showadd ? {} : silly.dn]}>
            {[
              {name: 'Address Line 1', code: 'address_1'},
              {name: 'Address Line 2', code: 'address_2'},
              {name: 'City', code: 'city'},
              {name: 'State', code: 'state'},
              {name: 'Pincode', code: 'pincode', type: 'number-pad'},
            ].map((item, i) => {
              return (
                <SillyView key={i}>
                  <SillyText size={18} color={clr1}>
                    {item.name}
                  </SillyText>
                  <SillyInput
                    value={newAdd[item.code]}
                    onChangeText={text =>
                      setNewAdd(prev => {
                        let newState = {...prev};
                        newState[item.code] = text;
                        return newState;
                      })
                    }
                    keyboardType={item.type ? item.type : null}
                    brclr={clr1}
                    placeholder={item.name}
                  />
                </SillyView>
              );
            })}
            <SillyButton onPress={createAddress} bg={clr1}>
              <SillyText my={5} size={18} center>
                Submit Address
              </SillyText>
            </SillyButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Address;
