import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Scale sizes based on screen width
const scale = (size: number) => (width / 375) * size;

// Scale sizes based on screen height
const verticalScale = (size: number) => (height / 812) * size;

// Adjust font sizes dynamically
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {
  width as SCREEN_WIDTH,
  height as SCREEN_HEIGHT,
  scale,
  verticalScale,
  moderateScale,
};
