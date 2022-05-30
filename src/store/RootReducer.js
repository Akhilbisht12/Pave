import {combineReducers} from 'redux';
import storyReducer from './reducres/StoryReducers';
const RootReducer = combineReducers({
  story: storyReducer,
});
export default RootReducer;
