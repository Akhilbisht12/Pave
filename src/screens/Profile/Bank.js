import {
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../navigations/AuthContext';
import axios from 'axios';
import {server} from '../../config/server_url';
import silly from '../../Silly/styles/silly';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SillyText,
  SillyView,
  SillyInput,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1, clr2, clr5} from '../../config/globals';

const Bank = () => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const [banks, setBanks] = useState([]);
  const [addNew, setNew] = useState({
    account_name: '',
    account_number: '',
    ifsc: '',
    bank_name: '',
    show: false,
  });
  useEffect(() => {
    const getBank = async () => {
      try {
        const details = await axios.get(`${server}/profile/${user_id}/banks/`);
        setBanks(details.data.results);
        console.log(details.data.results);
      } catch (error) {
        console.log(error.response);
      }
    };
    getBank();
  }, [user_id, addNew.show]);
  const handleAddAccount = async () => {
    try {
      const upload = await axios.post(`${server}/profile/create/bank/`, {
        user: user_id,
        ...addNew,
      });
      console.log(upload.data);
      ToastAndroid.show('Bank Details Saved', ToastAndroid.SHORT);
      setNew({
        bank_name: '',
        account_name: '',
        account_number: '',
        ifsc: '',
        show: false,
      });
    } catch (error) {
      ToastAndroid.show('something went wrong', ToastAndroid.SHORT);
      console.log(error.response.data);
    }
  };
  const SingleBankDetails = ({item, i}) => {
    const [bank, setBank] = useState({...item, edit: false});
    const handleUpdateBank = async () => {
      try {
        const update = await axios.patch(
          `${server}/profile/${user_id}/bank/${item.id}/`,

          bank,
        );
        console.log(update);
      } catch (error) {
        console.log(error.response);
      }
    };
    const handleDelete = async () => {
      try {
        const deleteres = await axios.delete(
          `${server}/profile/${user_id}/bank/${item.id}/`,
        );
        console.log(deleteres.data);
        ToastAndroid.show(
          'Bank account successfully deleted',
          ToastAndroid.SHORT,
        );
      } catch (error) {
        console.log(error.response);
        ToastAndroid.show(
          'Failed to delete bank account, Try Again',
          ToastAndroid.SHORT,
        );
      }
    };
    const handleDeletePopup = () => {
      Alert.alert(
        'Delete Bank Account',
        'Are you sure you want to delete this bank account?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'YES', onPress: () => handleDelete()},
        ],
      );
    };
    return (
      <SillyView py={10} my={10}>
        <View style={[silly.aie, silly.m1, silly.pa, silly.r0, {zIndex: 2}]}>
          <View style={[silly.fr]}>
            <TouchableOpacity
              style={[silly.mx1]}
              onPress={() => setBank({...bank, edit: !bank.edit})}>
              <Icon
                name={bank.edit ? 'close-outline' : 'create-outline'}
                size={25}
                color={clr1}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[silly.mx1]} onPress={handleDeletePopup}>
              <Icon name="trash-outline" size={25} color="maroon" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[silly.my1]}>
          <SillyText color={clr5} size={16} family="SemiBold">
            Account Holder's Name
          </SillyText>
          <SillyText
            style={[bank.edit ? silly.dn : {}]}
            my={5}
            color={clr1}
            size={22}>
            {item.account_name}
          </SillyText>
          <SillyInput
            my={10}
            color={clr1}
            style={[bank.edit ? {} : silly.dn]}
            brclr={clr1}
            value={bank.account_name}
            onChangeText={account_name => setBank({...bank, account_name})}
          />
          <View>
            <SillyText color={clr5} size={16} family="SemiBold">
              Account Number
            </SillyText>
            <SillyText
              style={[bank.edit ? silly.dn : {}]}
              my={5}
              color={clr1}
              size={22}>
              {item.account_number}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[bank.edit ? {} : silly.dn]}
              brclr={clr1}
              value={bank.account_number}
              onChangeText={account_number =>
                setBank({...bank, account_number})
              }
            />
          </View>
          <View>
            <SillyText color={clr5} size={16} family="SemiBold">
              IFSC
            </SillyText>
            <SillyText
              style={[bank.edit ? silly.dn : {}]}
              my={5}
              color={clr1}
              size={22}>
              {item.ifsc}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[bank.edit ? {} : silly.dn]}
              brclr={clr1}
              value={bank.ifsc}
              onChangeText={ifsc => setBank({...bank, ifsc})}
            />
          </View>
          <View>
            <SillyText color={clr5} size={16} family="SemiBold">
              Bank Name
            </SillyText>
            <SillyText
              style={[bank.edit ? silly.dn : {}]}
              my={5}
              color={clr1}
              size={22}>
              {item.bank_name}
            </SillyText>
            <SillyInput
              my={10}
              color={clr1}
              style={[bank.edit ? {} : silly.dn]}
              brclr={clr1}
              value={bank.bank_name}
              onChangeText={bank_name => setBank({...bank, bank_name})}
            />
          </View>
          <SillyButton
            onPress={handleUpdateBank}
            style={[bank.edit ? {} : silly.dn]}
            bg={clr1}>
            <SillyText center>Save Changes</SillyText>
          </SillyButton>
        </View>
      </SillyView>
    );
  };
  return (
    <ScrollView>
      <View style={[silly.f1, silly.p1]}>
        <SillyText color={clr1} family="SemiBold" size={30}>
          Account Details
        </SillyText>
        {banks
          ? banks.map((item, i) => {
              return <SingleBankDetails i={i} item={item} key={i} />;
            })
          : null}
        <SillyView my={20}>
          <SillyButton
            onPress={() => setNew({...addNew, show: !addNew.show})}
            style={[silly.fr, silly.jcbtw, silly.aic]}>
            <SillyText color={clr1}>Add New Bank Account</SillyText>
            <Icon
              name={addNew.show ? 'close-outline' : 'add-outline'}
              color={clr1}
              size={22}
            />
          </SillyButton>
          <View style={[addNew.show ? {} : silly.dn]}>
            <View>
              <SillyText color={clr5}>Account Holder's Name</SillyText>
              <SillyInput
                color={clr1}
                placeholder="Account Holder's Name"
                my={10}
                brclr={clr1}
                value={addNew.account_name}
                onChangeText={account_name => setNew({...addNew, account_name})}
              />
            </View>
            <View>
              <SillyText color={clr5}>Account Number</SillyText>
              <SillyInput
                color={clr1}
                keyboardType="number-pad"
                placeholder="Account Number"
                my={10}
                brclr={clr1}
                value={addNew.account_number}
                onChangeText={account_number =>
                  setNew({...addNew, account_number})
                }
              />
            </View>
            <View>
              <SillyText color={clr5}>IFSC</SillyText>
              <SillyInput
                autoCapitalize="characters"
                color={clr1}
                placeholder="IFSC"
                my={10}
                brclr={clr1}
                value={addNew.ifsc}
                onChangeText={ifsc => setNew({...addNew, ifsc})}
              />
            </View>
            <View>
              <SillyText color={clr5}>Bank Name</SillyText>
              <SillyInput
                autoCapitalize="characters"
                color={clr1}
                placeholder="Bank Name"
                my={10}
                brclr={clr1}
                value={addNew.bank_name}
                onChangeText={bank_name => setNew({...addNew, bank_name})}
              />
            </View>
            <SillyButton onPress={handleAddAccount} bg={clr1}>
              <SillyText center my={5}>
                Add Account
              </SillyText>
            </SillyButton>
          </View>
        </SillyView>
      </View>
    </ScrollView>
  );
};

export default Bank;
