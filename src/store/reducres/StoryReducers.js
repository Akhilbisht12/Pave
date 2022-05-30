import * as storyTypes from '../types/StoryTypes';
import story1 from '../../assets/stories/stories-1.png';
import story5 from '../../assets/stories/stories-5.png';
import story3 from '../../assets/stories/stories-3.png';
import story4 from '../../assets/stories/stories-4.png';
const init = {
  stories: [
    {
      user_id: 1,
      user_image:
        'https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_960_720.jpg',
      user_name: 'Jessica Henwick',
      stories: [
        {
          story_id: 1,
          story_image: story1,
          title: 'Jessica saved for 5 straight days',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit augue vitae gravida pharetra.',
          activity: {
            type: 'goal',
          },
          seen: false,
        },
        {
          story_id: 2,
          story_image: story5,
          title: 'Jessica started a new saving plan!',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit augue vitae gravida pharetra.',
          activity: {
            type: 'goal',
          },
          seen: false,
        },
      ],
      seen: false,
    },
    {
      user_id: 2,
      user_image:
        'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
      user_name: 'Jhon Doe',
      stories: [
        {
          story_id: 1,
          story_image: story3,
          title: 'Adam won a game!',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit augue vitae gravida pharetra.',
          activity: {
            type: 'goal',
          },
          seen: false,
        },
        {
          story_id: 2,
          story_image: story4,
          title: 'Brain reached his goal!',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit augue vitae gravida pharetra.',
          activity: {
            type: 'goal',
          },
          seen: false,
        },
      ],
      seen: false,
    },
  ],
  story: 0,
  index: 0,
};

const storyReducer = (state = init, action) => {
  switch (action.type) {
    case storyTypes.INC_STORY:
      return {...state, story: state.story + 1, index: 0};
    case storyTypes.DEC_STORY:
      return {...state, story: state.story - 1, index: 0};
    case storyTypes.INC_INDEX:
      return {...state, index: state.index + 1};
    case storyTypes.DEC_INDEX:
      return {...state, index: state.index - 1};
    default:
      return state;
  }
};

export default storyReducer;
