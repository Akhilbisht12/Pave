import {View, Animated, PanResponder, Dimensions, Image} from 'react-native';
import React, {useRef} from 'react';
import {connect} from 'react-redux';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import {
  decIndex,
  decStory,
  incIndex,
  incStory,
} from '../../store/actions/StoryActions';
import Streak from './components/Streak';

const {width} = Dimensions.get('window');

const Story = ({story, incStory, decStory, incIndex, decIndex}) => {
  const storyRef = [];
  const SingleStory = ({item, index}) => {
    const RenderStoriesBars = ({barItem, barIndex}) => {
      const headWidth = (width - 40) / barItem.stories.length;
      const barWidth = useRef(
        new Animated.Value(story.index > barIndex ? headWidth : 0),
      ).current;
      if (barIndex === story.index && story.story === index) {
        Animated.timing(barWidth, {
          toValue: headWidth,
          duration: 10000,
          useNativeDriver: false,
        }).start(() => {
          if (
            barWidth.__getValue() === headWidth &&
            story.stories[story.story].stories[story.index + 1]
          ) {
            incIndex({});
          } else if (
            barWidth.__getValue() === headWidth &&
            story.stories[story.story + 1]
          ) {
            incStory({});
          }
        });
      }
      return (
        <View style={[silly.bggray, silly.br5, silly.my1, {width: headWidth}]}>
          <Animated.View
            style={[silly.h5, silly.bg2, silly.br5, {width: barWidth}]}
          />
        </View>
      );
    };
    // story change responders
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gesture) => true,
        onPanResponderMove: (evt, gesture) => {
          storyRef[index].setValue({x: gesture.dx, y: 0});
        },
        onPanResponderRelease: (evt, gesture) => {
          // changes stories through swipe
          if (gesture.vx < -1 && storyRef[index + 1]) {
            storyRef[index].setValue({x: -width, y: 0});
            storyRef[index + 1].setValue({x: 0, y: 0});
            incStory({});
          } else if (gesture.vx > 1 && storyRef[index - 1]) {
            storyRef[index].setValue({x: width, y: 0});
            storyRef[index - 1].setValue({x: 0, y: 0});
            decStory({});
            // changes current user stories through click
          } else if (
            gesture.moveX > 250 &&
            story.stories[index].stories[story.index + 1] &&
            story.story === index
          ) {
            incIndex({});
          } else if (
            gesture.moveX < 250 &&
            story.stories[index].stories[story.index - 1]
          ) {
            decIndex({});
            // move story to default if no desired action found
          } else {
            storyRef[index].setValue({x: 0, y: 0});
          }
        },
      }),
    ).current;
    storyRef.push(
      useRef(new Animated.ValueXY({x: index === story.story ? 0 : width, y: 0}))
        .current,
    );
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          silly.pa,
          silly.w100p,
          silly.h80p,
          {transform: [...storyRef[index].getTranslateTransform()]},
        ]}>
        <View style={[silly.fr, silly.jcaround, silly.aic, silly.mx1]}>
          {item.stories.map((storyhead, barIndex) => {
            return (
              <RenderStoriesBars
                barIndex={barIndex}
                barItem={item}
                key={storyhead.story_id}
              />
            );
          })}
        </View>
        <View style={[silly.aic, silly.jcaround, silly.f1]}>
          <Image
            style={[silly.w80p, silly.h40p, {resizeMode: 'contain'}]}
            source={item.stories[story.index].story_image}
          />
          <SillyText center mx={50} family="SemiBold" size={25} my={20}>
            {item.stories[story.index].title}
          </SillyText>
          <SillyText mx={20} center>
            {item.stories[story.index].desc}
          </SillyText>
          <Streak />
        </View>
      </Animated.View>
    );
  };
  return (
    <View>
      {story.stories.map((item, index) => {
        return <SingleStory item={item} index={index} key={item.user_id} />;
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    story: state.story,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incStory: item => dispatch(incStory(item)),
    decStory: item => dispatch(decStory(item)),
    incIndex: item => dispatch(incIndex(item)),
    decIndex: item => dispatch(decIndex(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);
