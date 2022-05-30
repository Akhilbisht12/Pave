const {Animated} = require('react-native');
class AnimControl {
  AnimTiming = (property, value, duration) => {
    Animated.timing(property, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };
}

export default new AnimControl();
