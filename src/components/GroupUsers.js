import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import silly from '../Silly/styles/silly';

const GroupUsers = () => {
  return (
    <View style={[silly.fr, silly.jcs]}>
      <Image
        style={[styles.avatar, {marginRight: -10}]}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
        }}
      />
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
        }}
      />
      <Image
        style={[styles.avatar, {marginLeft: -15}]}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
        }}
      />
      <Image
        style={[styles.avatar, {marginLeft: -16}]}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg',
        }}
      />
      <View style={[styles.avatarPlus, {marginLeft: -10}]}>
        <Text>+293</Text>
      </View>
    </View>
  );
};

export default GroupUsers;

const styles = StyleSheet.create({
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 5,
  },
});
