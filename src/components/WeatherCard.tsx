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

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: getWeatherColor(weather), height: verticalScale(160)},
      ]}>
      {/* Top Row: Temperature Toggle & Favorite Button */}
      <View style={styles.topRow}>
        <TemperatureToggle
          isFahrenheit={isFahrenheit}
          onToggle={toggleTemperature}
        />
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </View>

      {/* City Name */}
      <Text style={styles.city}>{city}</Text>

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
    marginVertical: verticalScale(8),
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
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    right: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
