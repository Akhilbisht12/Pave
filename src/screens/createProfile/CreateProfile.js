import {
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useReducer} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import ProfileMain from './profile/ProfileMain';
import DocumentsMain from './documents/DocumentsMain';
import BodyInfo from './BodyInfo';
import ProgressContext from './ProgressContext';
import ProgressHeader from './ProgressHeader';
import VerificationMain from './verification/VerificationMain';

const CreateProfile = ({navigation}) => {
  const initialState = {progress: 0};
  const reducer = (state, action) => {
    console.log(state);
    switch (action.type) {
      case 'increment':
        return {progress: state.progress + 1};
      case 'decrement':
        return {progress: state.progress - 1};
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProgressContext.Provider value={{state, dispatch}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[silly.bg1, silly.f1]}>
          <View style={[silly.p1]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicon name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {/* header progress of creating profile */}
          <ProgressHeader />
          {/* image and text details of next step */}
          <BodyInfo />
          {/* user puts basic email and phone info */}
          <ProfileMain />
          {/* user uploads documents */}
          <DocumentsMain />
          <VerificationMain />
        </View>
      </TouchableWithoutFeedback>
    </ProgressContext.Provider>
  );
};

export default CreateProfile;
