import React from 'react';
import {Text, StyleSheet, Switch, View} from 'react-native';
import WeatherList from '../components/WeatherList';
import colors from '../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../utils/responsive';
import MainHeader from '../components/MainHeader';
import {useTheme} from '../context/ThemeContext';

const HomeScreen = () => {
  const {isDarkMode, toggleTheme} = useTheme();

  return (
    <LinearGradient
      colors={isDarkMode ? colors.darkGradient : colors.gradientBackground}
      style={styles.container}>
      <MainHeader title="🌤 Weather App" showBackButton={false} />
      <View style={styles.toggleContainer}>
        <Text
          style={[
            styles.toggleText,
            {color: isDarkMode ? colors.textPrimary : colors.black},
          ]}>
          Dark Mode
        </Text>
        <View style={styles.switchContainer}>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>
      <WeatherList />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  toggleText: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
  },
  switchContainer: {
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
  },
});

export default HomeScreen;
