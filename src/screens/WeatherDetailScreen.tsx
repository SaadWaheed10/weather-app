import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainHeader from '../components/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';
import {moderateScale, scale, verticalScale} from '../utils/responsive';
import {useTheme} from '../context/ThemeContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import weatherIconMap from '../assets/icons/weatherIcons';
import rainyAnimation from '../assets/animations/rainy.json';
import cloudyAnimation from '../assets/animations/cloudy.json';
import sunnyAnimation from '../assets/animations/sunny.json';
import LottieView from 'lottie-react-native';

const WeatherDetailScreen = ({route}: any) => {
  const {weather} = route.params;
  const {isDarkMode} = useTheme();
  const weatherIcon = weatherIconMap[weather.weather] || 'question-circle';
  const FA5: any = FontAwesome5;

  const weatherColors: any = {
    Sunny: colors.sunny,
    Cloudy: colors.cloudy,
    Rainy: colors.primary,
    Thunderstorm: colors.primary,
    Snowy: colors.snowy,
    Clear: colors.sunny,
    Mist: colors.mist,
  };

  const weatherAnimations: any = {
    Sunny: sunnyAnimation,
    Cloudy: cloudyAnimation,
    Rainy: rainyAnimation,
  };

  const iconColor = weatherColors[weather.weather] || '#FFFFFF';

  return (
    <LinearGradient
      colors={isDarkMode ? colors.darkGradient : colors.gradientBackground}
      style={styles.container}>
      <MainHeader title={weather.city} showBackButton={true} />

      {/* Centered Content */}
      <View style={styles.content}>
        <LottieView
          source={weatherAnimations[weather.weather]}
          autoPlay
          loop
          style={styles.animation}
        />
        <View style={styles.iconContainer}>
          <Text style={styles.city}>{weather.city}</Text>
          <FA5
            name={weatherIcon}
            size={moderateScale(25)}
            color={iconColor}
            solid
          />
        </View>
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
    marginTop: verticalScale(30),
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  animation: {
    width: moderateScale(130),
    height: moderateScale(130),
    marginBottom: verticalScale(30),
  },
  city: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  temp: {
    fontSize: moderateScale(24),
    marginVertical: verticalScale(5),
    color: colors.textPrimary,
  },
  description: {
    fontSize: moderateScale(18),
    fontStyle: 'italic',
    color: colors.textPrimary,
  },
  details: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    color: colors.textPrimary,
  },
});

export default WeatherDetailScreen;
