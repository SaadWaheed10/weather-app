import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FavoriteButton from './FavoriteButton';
import colors from '../assets/theme/colors';
import {
  SCREEN_WIDTH,
  scale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';
import TemperatureToggle from './TemperatueToggle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import weatherIconMap from '../assets/icons/weatherIcons';
import LottieView from 'lottie-react-native';
import rainyAnimation from '../assets/animations/rainy.json';
import cloudyAnimation from '../assets/animations/cloudy.json';
import sunnyAnimation from '../assets/animations/sunny.json';

type WeatherCardProps = {
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  weather,
  humidity,
  windSpeed,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const toggleTemperature = () => {
    setIsFahrenheit(prev => !prev);
  };
  const displayedTemp = isFahrenheit ? (temperature * 9) / 5 + 32 : temperature;

  // Dynamically set icon and color based on weather
  const weatherIcon = weatherIconMap[weather] || 'question-circle';
  const weatherColor = getWeatherColor(weather);
  const FA5: any = FontAwesome5;
  const weatherAnimations: any = {
    Sunny: sunnyAnimation,
    Cloudy: cloudyAnimation,
    Rainy: rainyAnimation,
  };
  return (
    <View style={[styles.card, {backgroundColor: weatherColor}]}>
      {/* Top Row: Temperature Toggle & Favorite Button */}
      <View style={styles.topRow}>
        <TemperatureToggle
          isFahrenheit={isFahrenheit}
          onToggle={toggleTemperature}
        />
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </View>

      <LottieView
        source={weatherAnimations[weather]}
        autoPlay
        loop
        style={styles.animation}
      />
      {/* Weather Icon */}
      <View style={styles.iconContainer}>
        {/* City Name */}
        <Text style={styles.city}>{city}</Text>
        <FA5
          name={weatherIcon}
          size={moderateScale(20)}
          color={colors.textPrimary}
          style={styles.icon}
          solid
        />
      </View>

      {/* Temperature and Weather */}
      <Text style={styles.temp}>
        {displayedTemp.toFixed(1)}°{isFahrenheit ? 'F' : 'C'} - {weather}
      </Text>
      <Text style={styles.details}>
        Humidity: {humidity}% | Wind: {windSpeed} km/h
      </Text>
    </View>
  );
};

const getWeatherColor = (weather: string) => {
  switch (weather) {
    case 'Sunny':
      return colors.sunny;
    case 'Cloudy':
      return colors.cloudy;
    case 'Rainy':
      return colors.rainy;
    case 'Stormy':
      return colors.stormy;
    case 'Snowy':
      return colors.snowy;
    default:
      return colors.background;
  }
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    padding: scale(15),
    paddingVertical: scale(20),
    marginVertical: verticalScale(10),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textSecondary,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  animation: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginBottom: scale(10),
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  icon: {
    marginBottom: verticalScale(5),
  },
  city: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: moderateScale(8),
  },
  temp: {
    fontSize: moderateScale(18),
    color: colors.textPrimary,
    marginBottom: moderateScale(5),
  },
  details: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
  },
});

export default WeatherCard;
