import React, {useEffect, useReducer} from 'react';
import Storage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import Unauthenticated from './Unauthenticated';
import Authenticated from './Authenticated';

const StackNav = () => {
  // const [user, setUser] = useState(false);
  const initialState = {user: false, id: null, access: null, refresh: null};
  const reducer = (state, action) => {
    console.log(state);
    switch (action.type) {
      case 'signin':
        return {user: true};
      case 'signout':
        return {user: false};
      case 'setuser': {
        const {access, id, refresh, user_id} = action;
        return {user: true, access, id, refresh, user_id};
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUser = async () => {
      const access = await Storage.getItem('access');
      const id = await Storage.getItem('id');
      const refresh = await Storage.getItem('refresh');
      const user_id = await Storage.getItem('user_id');
      if (access) {
        dispatch({type: 'setuser', access, id, refresh, user_id});
      }
      await Storage.clear();
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {state.user ? <Authenticated /> : <Unauthenticated />}
    </AuthContext.Provider>
  );
};

export default StackNav;
