import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Switch, View, ActivityIndicator} from 'react-native';
import WeatherList from '../components/WeatherList';
import UserCurrentWeather from '../components/UserCurrentWeather';
import colors from '../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../utils/responsive';
import MainHeader from '../components/MainHeader';
import {useTheme} from '../context/ThemeContext';
import {fetchWeatherByLocation} from '../utils/weatherServices';

const HomeScreen = () => {
  const {isDarkMode, toggleTheme} = useTheme();
  const [userWeather, setUserWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadUserWeather = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchWeatherByLocation();
        if (!data || !data.main || !data.weather || !data.wind || !data.sys) {
          setError(true);
        } else {
          setUserWeather(data);
        }
        // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
      } catch (error) {
        console.error('Error fetching user weather:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadUserWeather();
  }, []);

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

      {/* Show Loader While Fetching User Weather */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load weather data.</Text>
      ) : (
        userWeather && <UserCurrentWeather userWeather={userWeather} />
      )}

      {/* Other Cities Weather */}
      <WeatherList />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  errorText: {
    fontSize: moderateScale(16),
    color: colors.deepRed,
    marginTop: moderateScale(10),
  },
});

export default HomeScreen;
