import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainHeader from '../components/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';
import {moderateScale, scale, verticalScale} from '../utils/responsive';

const WeatherDetailScreen = ({route}: any) => {
  const {weather} = route.params;

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <MainHeader title={weather.city} showBackButton={true} />

      {/* Centered Content */}
      <View style={styles.content}>
        <Text style={styles.city}>{weather.city}</Text>
        <Text style={styles.temp}>{weather.temperature}°C</Text>
        <Text style={styles.description}>{weather.weather}</Text>
        <Text style={styles.details}>Humidity: {weather.humidity}%</Text>
        <Text style={styles.details}>Wind Speed: {weather.windSpeed} km/h</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  city: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  temp: {
    fontSize: moderateScale(24),
    marginVertical: verticalScale(5),
  },
  description: {
    fontSize: moderateScale(18),
    fontStyle: 'italic',
  },
  details: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
  },
});

export default WeatherDetailScreen;
