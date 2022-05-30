import * as storyTypes from '../types/StoryTypes';
export const incStory = ({item}) => {
  return {
    type: storyTypes.INC_STORY,
    payload: item,
  };
};
export const decStory = ({item}) => {
  return {
    type: storyTypes.DEC_STORY,
    payload: item,
  };
};
export const incIndex = ({item}) => {
  return {
    type: storyTypes.INC_INDEX,
    payload: item,
  };
};
export const decIndex = ({item}) => {
  return {
    type: storyTypes.DEC_INDEX,
    payload: item,
  };
};
