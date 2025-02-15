import React from 'react';
import {Text, StyleSheet} from 'react-native';
import WeatherList from '../components/WeatherList';
import colors from '../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../utils/responsive';
import MainHeader from '../components/MainHeader';

const HomeScreen = () => {
  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <MainHeader title="🌤 Weather App" showBackButton={false} />
      <Text style={styles.subtitle}>Get real-time weather updates</Text>
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
  title: {
    marginTop: moderateScale(70),
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: moderateScale(10),
  },
  subtitle: {
    fontSize: moderateScale(20),
    color: colors.textSecondary,
    marginVertical: moderateScale(20),
  },
});

export default HomeScreen;
