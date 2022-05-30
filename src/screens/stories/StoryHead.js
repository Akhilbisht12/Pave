import {View, Image, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
const StoryHead = ({story}) => {
  return (
    <View style={[silly.fr, silly.aic]}>
      {story.stories.map((item, index) => {
        return (
          <View key={item.user_id} style={[silly.fr, silly.aic]}>
            <Image
              source={{uri: item.user_image}}
              style={[silly.w60, silly.h60, silly.br30, silly.mxh]}
            />
            {index === story.story ? (
              <SillyText family="SemiBold">
                {item.user_name.split(' ')[0] +
                  '\n' +
                  item.user_name.split(' ')[1]}
              </SillyText>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    story: state.story,
  };
};
export default connect(mapStateToProps)(StoryHead);
