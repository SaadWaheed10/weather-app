import React from 'react';
import {Text, StyleSheet} from 'react-native';
import WeatherList from '../components/WeatherList';
import colors from '../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../utils/responsive';

const HomeScreen = () => {
  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <Text style={styles.title}>🌤 Weather App</Text>
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
    fontSize: moderateScale(18),
    color: colors.textSecondary,
    marginBottom: moderateScale(15),
  },
});

export default HomeScreen;
